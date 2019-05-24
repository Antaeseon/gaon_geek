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
              <v-layout justify-space-between>
              <v-flex xs10>
              <v-btn @click="filter()">조회하기</v-btn>
              <v-btn @click="show_map()">지도로 보기</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn-toggle v-model="selected_sorting">
                  <v-btn flat value="ru" @click="sorting('ru')">
                    <span>평점</span>
                    <v-icon>arrow_drop_up</v-icon>
                  </v-btn>
                  <v-btn flat value="rd" @click="sorting('rd')">
                    <span>평점</span>
                    <v-icon>arrow_drop_down</v-icon>
                  </v-btn>
                </v-btn-toggle>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>

        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex 
            v-if="filteredShoplist[index].shop_name.toLowerCase().search(shopNameKeyword.toLowerCase()) != -1"
            v-for="(i, index) in filteredShoplist"
            :key="i._id" xs4 style="padding-bottom:80px;">
              <a style="color:black">
                <v-img
                  v-ripple
                  :src="`https://s3.ap-northeast-2.amazonaws.com/wearever1/` + i.imageUrl[1]"
                  class="image"
                  alt="lorem"
                  contain
                  aspect-ratio="1.1"
                  @click ="show_itemlist(i.id)"
                ></v-img>
                <div style="text-align:center; font-weight:bold;">{{i.shop_name}}</div>
                <div style="text-align:center;"><v-rating small v-model="i.rating" readonly></v-rating></div>
                <div style="text-align:center; color:#808080;">{{i.location}}</div>
                <div style="text-align:center; color:#808080;">{{i.tag}}</div>
              </a>
            </v-flex>
          </v-layout>
        </v-container>
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
    shoplist: [],
    filteredShoplist: [],
    filteredShoplistBackup: [],
    shopNameKeyword: '',
    locationKeyword: '',
    distanceKeyword: 10,
    distance: [5, 10, 20, 40, 100],
    show: [true, true],
    selected_sorting: undefined,
  }),
  async created() {
    var res = await this.$http.post(
      `http://localhost:3000/search/getNationShoplist/`, { nation: this.$route.params.nation }
    );
    this.shoplist = res.data.data;
    this.filteredShoplist = res.data.data;
    this.filteredShoplistBackup = res.data.data;
  },
  methods: {
    ...mapActions(['getItemlistforSearch']),
    show_itemlist(id) {
      this.getItemlistforSearch({shop_id: id});
    },
    sorting(what) {
      if(this.selected_sorting === what)
      {
        console.log(this.filteredShoplist);
        this.filteredShoplist = this.filteredShoplistBackup.slice();
        console.log(this.filteredShoplist);
      }
      else
      {
        if(what === 'ru')
        {
          this.filteredShoplist.sort(function(a,b) {
            return a.rating - b.rating;
          });
        }
        else if(what === 'rd')
        { 
          this.filteredShoplist.sort(function(a,b) {
            return b.rating - a.rating;
          });
        }
      }
    },
    filter() {
      this.filteredShoplist = [];
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
        for(let index = 0; index < this.shoplist.length; index++)
        {
          distanceFilter(this.locationKeyword).then((result) =>{
          if(result.tag != 'Error')
          {
            let dist = this.computeDistance(result.lat,result.lon, this.shoplist[index].lat, this.shoplist[index].lon);
            if(dist <= this.distanceKeyword) this.filteredShoplist.push(this.shoplist[index]);
          }
          else this.filteredShoplist.push(this.shoplist[index]);
          });
        }
        this.filteredShoplistBackup = filteredShoplist.slice();
    },
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
  },
  computed: {
    ...mapState(['showShop']),
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