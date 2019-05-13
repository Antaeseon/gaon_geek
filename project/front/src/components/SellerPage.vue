<template>
    <div>
        <v-parallax
        dark
        src="https://www.mwgeothermal.com/wp-content/uploads/2014/10/Parallax-Background-Light-1_1-02.jpg"
        >
        <v-layout
            align-center
            column
            justify-center
        >
            <h1 class="display-2 font-weight-thin mb-3 black">{{shop_name}}</h1><br>
            <h2 style="color:black;"> 총 방문자수: {{total_visit}} </h2><br>
            <h2 style="color:black;"> 평가: {{rating}} </h2><br>
            <v-rating v-model="rating" readonly></v-rating><br>
            <h2 style="color:black;"> 등록날짜: {{enroll_Date.slice(0,10)}} </h2><br>
            
        </v-layout>
        </v-parallax>
        <v-subheader>Item Lists</v-subheader>
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-divider
              v-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.item_name"
              avatar
            >
              <v-list-tile-avatar :size="50">
                <img :src="'https://s3.ap-northeast-2.amazonaws.com/weareverstorage/' + item.imageUrl[0]">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.item_name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.category"></v-list-tile-sub-title>
                <template v-for="(tagcom, idx) in item.tag">
                    <v-list-tile-sub-title v-html="tagcom" :key="idx"></v-list-tile-sub-title>
                </template>
                <v-list-tile-sub-title v-html="item.size"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-if="item.status == 0">대여 가능</v-list-tile-sub-title>
                <v-list-tile-sub-title v-else-if="item.status == 1">대여 중</v-list-tile-sub-title>
                <v-list-tile-sub-title v-else-if="item.status == 2">세탁 중</v-list-tile-sub-title>
                <v-list-tile-sub-title v-else-if="item.status == 3">배송 중</v-list-tile-sub-title>
              </v-list-tile-content>
                <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on" large depressed>상세보기</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">물건 상세 정보</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Item Name" v-model="item.item_name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Brand" v-model="item.brand" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field label="Color" v-model="item.color" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Detail" v-model="item.detail" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Precautious" v-model="item.precautious" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                :items="category"
                                label="Category"
                                v-model="item.category"
                                required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                :items="size"
                                label="Size"
                                v-model="item.size"
                                required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-autocomplete
                                :items="tag"
                                label="Tag"
                                chips
                                multiple
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                :items="status"
                                label="Status"
                                v-model="modified_status"
                                ></v-select>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-layout>
            </v-list-tile>
          </template>
        </v-list>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Vue from "vue";
import store from "./../store";
import attribute from "./../attribute";
// import { mapState, mapActions, mapMutations } from 'vuex'
const axios = require("axios");

export default {
  data: () => ({
    dialog: false,
    shop_name: store.state.sellerInfo.shop_name,
    total_visit: store.state.sellerInfo.total_visit,
    rating: store.state.sellerInfo.rating,
    enroll_Date: store.state.sellerInfo.enroll_Date,
    items: store.state.itemlist,
    size : attribute.size,
    category: attribute.category,
    tag: attribute.tag,
    status: attribute.status,
    modified_status: ''
  }),
  computed: {
  },
  methods: {
      submit()
      {
          this.dialog = false;
      }
  },
}

</script>

<style>

</style>
