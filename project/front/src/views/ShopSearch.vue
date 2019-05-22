<template>
  <!-- xs:mobile, sm:tablet, md:notebook, lg:desktop -->
  <v-container fluid>
    <v-layout justify-space-around>
      <v-flex md12>
        <div style="text-align:center; font-size:30px; font-weight:bold">SHOP</div>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-container>
        <!-- 왼쪽 리스트 -->
        <v-container grid-list-xl text-xs-center>
          <v-layout row wrap>
            <v-flex>
              <div>
                <h3>업체 검색</h3>
              </div>
              <v-text-field
                outline
                v-model="shopNameKeyword"
                label="업체 검색"
                append-icon="search"
              ></v-text-field>
              <v-layout justify-space-between row wrap>
              <v-flex xs6>
                <v-text-field
                  outline
                  v-model="locationKeyword"
                  label="위치 검색"
                  append-icon="search"
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-select
                :items="distance"
                v-model="distanceKeyword"
                label="거리(Km)"
                ></v-select>
              </v-flex>
              </v-layout>
              <v-btn @click="filter()">조회하기</v-btn>
              <v-btn @click="show_map()">지도로 보기</v-btn>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-if="showShop[index]"
            v-for="(i, index) in searchShoplist"
            :key="i._id" xs4 style="padding-bottom:80px;">
              <a style="color:black">
                <v-img
                  v-ripple
                  :src="`https://s3.ap-northeast-2.amazonaws.com/wearever1/wearever.png`"
                  class="image"
                  alt="lorem"
                  contain
                  aspect-ratio="1.1"
                  @click ="show_itemlist(i.id)"
                ></v-img>
                <div style="text-align:center; font-weight:bold;">{{i.shop_name}}</div>
                <div style="text-align:center; color:#808080;">{{i.location}}</div>
                <div style="text-align:center; color:#808080;">{{i.tag}}</div>
              </a>
            </v-flex>
          </v-layout>
        </v-container>

        <!-- <div class="text-xs-center">
        <v-pagination
          v-model="page"
          :length="5"
          circle
        ></v-pagination>
        </div>-->
      </v-container>
    </v-layout>
    <v-dialog v-model="dialog" max-width="600px">
      <div class="App"/>
    </v-dialog>
  </v-container>
</template>


<script>
import MarkerClusterer from '@google/markerclusterer'
import gmapsInit from './../utils/gmaps'
import store from "./../store.js";
import attribute from "./../attribute.js";
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    dialog: false,
    shopNameKeyword: '',
    locationKeyword: '',
    distanceKeyword: 10,
    distance: [5, 10, 20, 40, 100],
    show: [true, true],
    locations : [
    {
      // 서울
      // position: {
      //   lat: 37.541,
      //   lng: 126.986,
      // },
    }
  ]
  }),
  methods: {
    ...mapActions(['getItemlist','renew_showShop']),
    show_map() {
      // this.dialog = true;
      // this.mounted();
    },
    show_itemlist(id) {
      this.getItemlist({shop_id: id});
    },
    filter() {
      var distanceFilter = async function(keyword) {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();
        return new Promise(function (resolve, reject) {
          geocoder.geocode({ address: keyword }, (results, status) => {
            let result = null;
            if (status !== `OK` || !results[0]) result = { tag: 'Error'};
            else result = { tag: 'Success', lat: results[0].geometry.location.lat() , lon: results[0].geometry.location.lng() };
            resolve(result);
          });
        });
      }
        for(let index = 0; index < this.searchShoplist.length; index++)
        {
          distanceFilter(this.locationKeyword).then((result) =>{
          if(result.tag != 'Error')
            {
              let dist = this.computeDistance(result.lat,result.lon, this.searchShoplist[index].lat, this.searchShoplist[index].lon);
              if(dist <= this.distanceKeyword) this.show[index] = true;
              else this.show[index] = false;
            }
            else this.show[index] = true;
          });
          this.show[index] = this.show[index] && (this.searchShoplist[index].shop_name.toLowerCase().search(this.shopNameKeyword.toLowerCase()) != -1);
        }
        this.renew_showShop({show: this.show});
    },
    // search(index) {
    //   if( ) return true;
    //   else return false;
    // },
    computeDistance(lat1, lon1, lat2, lon2) {
      let theta = lon1 - lon2;
      let dist = Math.sin(this.deg2rad(lat1)) * Math.sin(this.deg2rad(lat2)) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.cos(this.deg2rad(theta));
      dist = Math.acos(dist);
      dist = this.rad2deg(dist);
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    },
    deg2rad(deg)
    {
      return (deg * Math.PI / 180.0);
    },
    rad2deg(rad)
    {
      return (rad * 180 / Math.PI);
    },
    async mounted() {
      try {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();
        const map = new google.maps.Map(this.$el);
        var loc = "";
        if(this.isSeller)
        {
          loc = this.sellerInfo.location;
          this.locations.push({position : { lat: this.sellerInfo.lat , lng: this.sellerInfo.lon }});
        }
        else
          loc = 'Korea';
        geocoder.geocode({ address: loc }, (results, status) => {
          if (status !== `OK` || !results[0]) {
            throw new Error(status);
          }
          map.setCenter(results[0].geometry.location);
          map.fitBounds(results[0].geometry.viewport);
        });

        const markerClickHandler = (marker) => {
          map.setZoom(13);
          map.setCenter(marker.getPosition());
        };

        const markers = this.locations
          .map((location) => {
            const marker = new google.maps.Marker({ ...location, map, });
            marker.addListener(`click`, () => markerClickHandler(marker));

            return marker;
          });

        // eslint-disable-next-line no-new
        new MarkerClusterer(map, markers, {
          imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
  },
  computed: {
    ...mapState(['searchShoplist','showShop']),
  },
}
</script>

<style>
.clickable {
  cursor: pointer;
  border: 1px solid black;
}
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 100vw;
  height: 100vh;
}
</style>