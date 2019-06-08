<template>
  <div>
    <v-parallax
      dark
      src="https://www.mwgeothermal.com/wp-content/uploads/2014/10/Parallax-Background-Light-1_1-02.jpg"
    >
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3 black">{{shop_name}}</h1>
        <br>
        <h2 style="color:black;">총 방문자수: {{total_visit}}</h2>
        <br>
        <h2 style="color:black;">평가: {{rating}}</h2>
        <br>
        <v-rating v-model="rating" readonly></v-rating>
        <br>
        <h2 style="color:black;">등록날짜: {{enroll_Date.slice(0,10)}}</h2>
        <!--  -->
        <v-dialog v-model="chatDialog" max-width="500px">
          <br>
          <template v-slot:activator="{ on }">
            <v-btn dark class="mb-2" v-on="on">chattingList</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">ChatRoom</span>
            </v-card-title>

            <v-card-text>
              <v-data-table :headers="headers" :items="buyerRoomId" class="elevation-1">
                <template v-slot:items="buyer">
                  <td class="text-xs-left">{{ buyer.item.buyer_id }}</td>
                  <td class="text-xs-left">
                    <v-btn
                      small
                      color="primary"
                      :to="{name: 'SellerChat',params: { id: buyer.item.buyer_id }}"
                    >Go!!</v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="chatClose">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--  -->
        <br>
      </v-layout>
    </v-parallax>
    <v-layout justify-space-between row wrap>
      <v-flex xs4>
        <v-subheader>Item Lists</v-subheader>
      </v-flex>
      <v-flex xs2>
        <v-select :items="['없음', '대여 가능', '대여 불가', '판매 완료']" label="상태 선택" v-model="statusFilter"></v-select>
      </v-flex>
    </v-layout>
    <v-container grid-list-lg grid-list-xs text-xs-center column>
      <v-layout wrap justify-space-around align-center>
        <v-flex xs6 :key="item._id" v-for="(item, index) in itemlist">
          <v-card v-if="filterCon(item.status)" class="inner_card" height="100%">
            <v-layout align-center row>
              <v-flex xs12 sm12>
                <v-img
                  :src="'https://s3.ap-northeast-2.amazonaws.com/wearever1/' + item.imageUrl[0]"
                  contain
                  aspect-ratio="1.1"
                ></v-img>

                <div class="headline" v-html="item.item_name"></div>
                <div v-html="item.category"></div>
                <span :key="tagCom" v-for="tagCom in item.tag">
                  <span v-html="tagCom + ' '"></span>
                </span>
                <div v-html="item.size"></div>
                <div v-html="item.price + ' (원)'"></div>
                <div v-html="item.rental + ' (원/일)'"></div>
                <div v-if="item.status == 0">대여 가능</div>
                <div v-else-if="item.status == 1">대여 중</div>
                <div v-else-if="item.status == 2">판매 완료</div>
                <div v-else-if="item.status == 3">세탁 중</div>
                <div v-else-if="item.status == 4">배송 중</div>
                <div v-else-if="item.status == 5">수리 중</div>
                <v-btn color="primary" dark @click="item_detail(index)" large depressed>상세보기</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">물건 상세 정보</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Item Name" v-model="item_name_copy" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete v-model="brand_copy" :items="brand" attach required label="Brand"></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete v-model="color_copy" :items="color" attach required label="Color"></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-textarea label="Detail" v-model="detail_copy" required></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Rental" v-model="rental_copy" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Price" v-model="price_copy" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Material" v-model="material_copy" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select :items="state" label="State" v-model="state_copy" required></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    :items="category"
                    label="Category"
                    v-model="category_copy"
                    required
                    attach
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Size" v-model="size_copy" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete :items="tag" label="Tag" v-model="tag_copy" chips multiple></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="status" label="Status" v-model="status_copy"></v-select>
                </v-flex>
                <v-flex :key="imgUrl" v-for="imgUrl in imageUrl_copy" xs12 sm6>
                  <v-img
                    :src="'https://s3.ap-northeast-2.amazonaws.com/wearever1/' + imgUrl"
                    contain
                    aspect-ratio="1.1"
                  ></v-img>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-img
                    :src="'https://s3.ap-northeast-2.amazonaws.com/wearever1/' + certificateUrl_copy"
                    contain
                    aspect-ratio="1.1"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.stop="close">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.stop="submit">Save</v-btn>
            <v-btn color="red darken-1" flat @click.stop="beforedeleteItem({ _id: id_copy })">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Vue from "vue";
import store from "./../store";
import attribute from "./../attribute";
import { mapState, mapActions, mapMutations } from "vuex";
const axios = require("axios");

export default {
  data() {
    return {
      dialog: false,
      shop_name: store.state.sellerInfo.shop_name,
      total_visit: store.state.sellerInfo.total_visit,
      rating: store.state.sellerInfo.rating,
      enroll_Date: store.state.sellerInfo.enroll_Date,
      imageUrl: store.state.sellerInfo.imageUrl[1],
      size: attribute.size,
      category: attribute.category,
      tag: attribute.tag,
      status: attribute.status,
      color: attribute.color,
      brand: attribute.brand,
      state: attribute.state,
      statusFilter: "",
      id_copy: "",
      item_name_copy: "",
      brand_copy: "",
      color_copy: "",
      detail_copy: "",
      material_copy: "",
      state_copy: "",
      category_copy: "",
      size_copy: "",
      rental_copy: 0,
      price_copy: 0,
      tag_copy: [],
      certificateUrl_copy: "wearever.png",
      imageUrl_copy: ["wearever.png"],
      status_copy: "",
      index_copy: 0,
      buyerRoomId: [],
      chatDialog: false,
      headers: [
        {
          text: "Buyer ID",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Go ChatRoom",
          sortable: false,
          align: "left"
        }
      ]
    };
  },
  computed: {
    ...mapState(["itemlist"])
  },
  methods: {
    ...mapActions(["modifyItem", "deleteItem"]),
    async submit() {
      this.dialog = false;
      const formData = new FormData();
      formData.append("_id", this.id_copy);
      formData.append("item_name", this.item_name_copy);
      formData.append("brand", this.brand_copy);
      formData.append("color", this.color_copy);
      formData.append("detail", this.detail_copy);
      formData.append("state", this.state_copy);
      formData.append("material", this.material_copy);
      formData.append("rental", this.rental_copy);
      formData.append("price", this.price_copy);
      formData.append("category", this.category_copy);
      formData.append("size", this.size_copy);
      formData.append("status", this.status.indexOf(this.status_copy));
      formData.append("index", this.index_copy);
      for (var j = 0; j < this.tag_copy.length; j++) {
        formData.append("tag", this.tag_copy[j]);
      }
      this.modifyItem(formData);

      this.clear();
    },
    close() {
      this.dialog = false;
      this.clear();
    },
    chatClose() {
      this.chatDialog = false;
    },
    item_detail(index) {
      this.index_copy = index;
      this.dialog = true;
      this.id_copy = this.itemlist[index]._id.slice();
      this.item_name_copy = this.itemlist[index].item_name.slice();
      this.brand_copy = this.itemlist[index].brand.slice();
      this.color_copy = this.itemlist[index].color.slice();
      this.detail_copy = this.itemlist[index].detail.slice();
      this.state_copy = this.itemlist[index].state.slice();
      this.material_copy = this.itemlist[index].material.slice();
      this.category_copy = this.itemlist[index].category.slice();
      this.size_copy = this.itemlist[index].size.slice();
      this.status_copy = this.status[this.itemlist[index].status];
      this.rental_copy = this.itemlist[index].rental;
      this.price_copy = this.itemlist[index].price;
      this.tag_copy = this.itemlist[index].tag.slice();
      this.certificateUrl_copy = this.itemlist[index].certificateUrl.slice();
      this.imageUrl_copy = this.itemlist[index].imageUrl.slice();
    },
    filterCon(status) {
      if (this.statusFilter == "대여 가능" && status == 0) return true;
      if (this.statusFilter == "판매 완료" && status == 2) return true;
      if (this.statusFilter == "대여 불가" && status != 0 && status != 2)
        return true;
      if (this.statusFilter == "없음" || this.statusFilter == "") return true;
      else return false;
    },
    beforedeleteItem(form) {
      this.deleteItem({ _id: id_copy });
      this.close();
    },
    clear() {
      this.item_name_copy = "";
      this.brand_copy = "";
      this.color_copy = "";
      this.detail_copy = "";
      this.state_copy = "";
      this.material_copy = "";
      this.category_copy = "";
      this.size_copy = "";
      this.status_copy = "";
      this.rental_copy = 0;
      this.price_copy = 0;
      this.tag_copy = [];
      this.index_copy = 0;
      this.certificateUrl_copy = "wearever.png";
      this.imageUrl_copy = ["wearever.png"];
    }
  },
  async created() {
    console.log("들어오");
    let chatRoomNum = await this.$http.post(
      `http://localhost:3000/chat/getBuyerRoomList`,
      {
        seller_id: this.$store.state.id
      }
    );
    console.log("허허", chatRoomNum.data);
    this.buyerRoomId = chatRoomNum.data;
  }
};
</script>

<style>
.avatar {
  margin-left: 5%;
  margin-right: 2%;
}
.inner_card {
  padding-bottom: 1%;
}
</style>
