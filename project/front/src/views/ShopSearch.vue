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
              <!-- <v-btn @click="show_map()">지도로 보기</v-btn> -->
               
    <v-btn
      @click.stop="addMarker()"
    >
      지도로 보기
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title class="headline">명품 중고 업체 위치</v-card-title>

        <v-card-text>
          <!-- Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running. -->
           <gmap-map ref="mymap" :options="{
                          zoomControl: false,
                          mapTypeControl: false,
                          scaleControl: false,
                          streetViewControl: false,
                          rotateControl: false,
                          fullscreenControl: false,
                          disableDefaultUi: false,
           }"
              :center="startLocation" :zoom="10" style="width: 100%; height: 300px">
              
              <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
              {{infoContent}}
              </gmap-info-window>

              <gmap-marker v-for="(item, key) in coordinates" :key="key" :position="getPosition(item)" :clickable="true" @click="toggleInfo(item, key)" />
            </gmap-map>
        </v-card-text>

        <v-card-actions>
          
          <v-spacer></v-spacer>

      

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            확인
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <v-layout row justify-center>
  </v-layout>
               <!-- <div>
                    <div>
                      <h2>Search and add a pin</h2>
                      <label>
                        <gmap-autocomplete
                          @place_changed="setPlace">
                        </gmap-autocomplete>
                        <button @click="addMarker">Add</button>
                      </label>
                      <br/>

                    </div>
                    <br>
                    <gmap-map
                      :center="center"
                      :zoom="12"
                      style="width:100%;  height: 400px;"
                    >
                      <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center=m.position"
                      ></gmap-marker>
                    </gmap-map>
                  </div> -->
                  
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
                <div style="text-align:center; color:#808080;">{{i.location}}</div>
                <div style="text-align:center; color:#808080;">{{i.tag}}</div>
              </a>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </v-layout>
    
  </v-container>
</template>


<script>
import MarkerClusterer from '@google/markerclusterer'
import gmapsInit from './../utils/gmaps'
import store from "./../store.js";
import attribute from "./../attribute.js";
import { mapActions, mapState } from "vuex";
import GmapCustomMarker from 'vue2-gmap-custom-marker';


export default {
  data: () => ({
    dialog: false,
    shoplist: [],
    filteredShoplist: [],
    shopNameKeyword: '',
    locationKeyword: '',
    distanceKeyword: 10,
    distance: [5, 10, 20, 40, 100],
    show: [true, true],
    markers: [
      
    ],
    places: [],
    currentPlace: null,

    startLocation: {
      lat: 0,
      lng: 0
    },
    coordinates: {},
    infoPosition: null,
    infoContent: null,
    infoOpened: false,
    infoCurrentKey: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    },
  
  }),
   components: {
      'gmap-custom-marker': GmapCustomMarker
  },
  mounted() {
    this.geolocate();
   
  },
  async created() {
    var res = await this.$http.post(
      `http://localhost:3000/search/getNationShoplist/`, { nation: this.$route.params.nation }
    );
    this.shoplist = res.data.data;
    this.filteredShoplist = res.data.data;
  },
  methods: {
    ...mapActions(['getItemlistforSearch']),
    show_itemlist(id) {
      this.getItemlistforSearch({shop_id: id});
    },
    filter() {
      this.filteredShoplist = [];
      // this.window_open= [];
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
    },
     setPlace(place) {
      this.currentPlace = place;
    },

    // shop name, tag, shop사진, 클릭했을 때가 가장 좋음.
    addMarker() {
      console.log("A:"+this.startLocation.lat, this.startLocation.lng);
      this.dialog = true;
      this.markers=[];
      let middle_lat = 0;
      let middle_lon = 0;
      // if (this.currentPlace) {
      for(let index=0; index < this.filteredShoplist.length; index++){
        this.coordinates[index] = {};
        this.coordinates[index].full_name = this.filteredShoplist[index].shop_name.slice();
        this.coordinates[index].lat = this.filteredShoplist[index].lat;
        this.coordinates[index].lng = this.filteredShoplist[index].lon;
        // console.log(this.coordinates);
        middle_lat += this.coordinates[index].lat;
        middle_lon += this.coordinates[index].lng;
      }
      middle_lat= middle_lat/this.filteredShoplist.length;
      middle_lon= middle_lon/this.filteredShoplist.length;
      this.startLocation.lat = middle_lat;
      this.startLocation.lng = middle_lon;

      console.log("A:"+this.startLocation.lat, this.startLocation.lng);
      //   const marker = {
      //     // lat: this.currentPlace.geometry.location.lat(),
      //     // lng: this.currentPlace.geometry.location.lng() v
      //       lat: this.filteredShoplist[index].lat,
      //       lng: this.filteredShoplist[index].lon,
      //       open: false,
      //   };

      //   // console.log("lat:"+marker.lat);
      //   // console.log("lng:"+marker.lng);
      //   if(this.filteredShoplist[index].shop_name.toLowerCase().search(this.shopNameKeyword.toLowerCase()) != -1)
      //   {
      //     this.markers.push({ position: marker});
      //   }
          
      //   // this.places.push(this.currentPlace);
      //   this.center = marker;

      //   // this.currentPlace = null;
      // // }

    },
    
    openWindow (index) {
        this.markers.map(marker => {
          this.$set(this.window_open[index], 'open', true);
        });
        console.log("windows:"+this.window_open[index].open);
        // console.log("index:"+index)
        // this.window_open[index]=true;
        // console.log("window_open:"+this.window_open)
        
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
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
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker)
      this.infoContent = marker.full_name
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = key
      }
    }
    
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