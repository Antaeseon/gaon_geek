<template>
  <div>
    <v-tabs v-model="active" color="white" light slider-color="yellow">
      <v-tab ripple>구매 내역 조회</v-tab>
      <v-tab ripple>대여 내역 조회</v-tab>
      <v-tab ripple>관심 상품 조회</v-tab>

      <!--  -->

      <v-dialog right v-model="chatDialog" max-width="500px">
        <br>
        <template v-slot:activator="{ on }">
          <v-btn dark class="mb-2" v-on="on">chattingList</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">ChatRoom</span>
          </v-card-title>

          <v-card-text>
            <v-data-table :headers="headers4" :items="sellerRoomId" class="elevation-1">
              <template v-slot:items="seller">
                <td class="text-xs-left">{{ seller.item.seller_id }}</td>
                <td class="text-xs-left">
                  <v-btn
                    small
                    color="primary"
                    :to="{name: 'BuyerChat',params: { id: seller.item.seller_id }}"
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
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-data-table :headers="headers2" :items="buyItem" class="elevation-1">
              <template v-slot:items="props">
                <td>{{ props.item.item_id.item_name }}</td>
                <td class="text-xs-left">{{ props.item.pay_date.substring(0,10) }}</td>
                <td class="text-xs-left">{{ props.item.total_price }}(Won)</td>
                <td>
                  <v-btn
                    small
                    color="primary"
                    :to="{name: 'BuyerChat',params: { id: props.item.item_id.shop_id }}"
                  >chatting</v-btn>
                </td>
                <td class="text-xs-left">
                  <v-btn
                    small
                    color="primary"
                    :to="{name: 'detail',params: { id: props.item.item_id._id }  }"
                  >Detail</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-data-table :headers="headers" :items="borrowItem" class="elevation-1">
              <template v-slot:items="props">
                <td>{{ props.item.item_id.item_name }}</td>
                <td class="text-xs-left">{{ props.item.borrow_date.substring(0,10) }}</td>
                <td class="text-xs-left">{{ props.item.return_date.substring(0,10) }}</td>
                <td class="text-xs-left">{{ props.item.total_price }}(Won)</td>
                <td class="text-xs-left">
                  <v-btn
                    small
                    color="primary"
                    :to="{name: 'detail',params: { id: props.item.item_id._id }  }"
                  >Detail</v-btn>
                </td>
                <td>
                  <v-btn
                    small
                    color="primary"
                    :to="{name: 'BuyerChat',params: { id: props.item.item_id.shop_id }}"
                  >chatting</v-btn>
                </td>
                <td class="text-xs-left">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn small color="primary" dark v-on="on" @click="reviewRating">Review</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">리뷰 작성</span>
                      </v-card-title>
                      <hr>
                      <hr>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm6 md12>
                              상품은 만족하셨나요?*
                              <v-rating
                                v-model="itemrating"
                                background-color="red lighten-3"
                                color="red"
                                x-large
                              ></v-rating>상점은 만족하셨나요?*
                              <v-rating
                                v-model="shoprating"
                                background-color="red lighten-3"
                                color="red"
                                x-large
                              ></v-rating>
                              <hr>
                              <br>리뷰*
                              <v-textarea box placeholder="최소 10자리 이상 입력해주세요"></v-textarea>
                            </v-flex>
                            <small>
                              *필수 입력
                              <br>상품과 무관한 사진/동영상을 첨부한 리뷰는 통보없이 삭제 및 적립 혜택이 회수될 수 있습니다.
                            </small>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-data-table :headers="headers3" :items="LikeItem" class="elevation-1">
              <template v-slot:items="props">
                <td>{{ props.item.item_name }}</td>
                <td class="text-xs-left">{{ props.item.brand }}</td>
                <td class="text-xs-left">{{ props.item.category }}</td>
                <td class="text-xs-left">{{ props.item.srental }}(Won/Day)</td>
                <td class="text-xs-left">{{ props.item.sprice }}(Won)</td>
                <td class="text-xs-left">
                  <v-btn
                    small
                    color="primary"
                    :to="{name: 'detail',params: { id: props.item._id }  }"
                  >Detail</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
const config = require('../config')
var _ = require("lodash");
export default {
  data() {
    return {
      itemrating: 5,
      shoprating: 5,
      active: null,
      dialog: false,
      mainItem: [],
      sellerRoomId: [],
      chatDialog:false,
      headers: [
        {
          text: "상품명",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "대여일", sortable: false },
        { text: "반납일", sortable: false },
        { text: "금액", sortable: false },
        { text: "상세정보", sortable: false },
        { text: "1:1대화", sortable: false },
        { text: "리뷰작성", sortable: false }
      ],
      headers2: [
        {
          text: "상품명",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "구매일", sortable: false },
        { text: "금액", sortable: false },
        { text: "1:1대화", sortable: false },
        { text: "상세정보", sortable: false },
        { text: "리뷰작성", sortable: false }
      ],
      headers3: [
        {
          text: "상품명",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "브랜드", sortable: false },
        { text: "종류", sortable: false },
        { text: "렌탈 가격", sortable: false },
        { text: "구매 가격", sortable: false }
      ],
      buyItem: [],
      borrowItem: [],
      LikeItem: [],

      //
      headers4: [
        {
          text: "Seller ID",
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
  async created() {
    let chatRoomNum = await this.$http.post(
      `${config.serverUri}/chat/getSellerRoomList`,
      {
        buyer_id: this.$store.state.id
      }
    );
    console.log("허허", chatRoomNum.data);
    this.sellerRoomId = chatRoomNum.data;

    var tlist = await this.$http.post(
      `${config.serverUri}/trade/getItemListByUserId`,
      {
        id: this.$store.state.id
      }
    );
    var user = await this.$http.get(
      `${config.serverUri}/user/${sessionStorage.getItem("id")}`
    );
    var items = await this.$http.post(
      `${config.serverUri}/search/getItemLikeit`,
      {
        likeit: user.data.response.likeit
      }
    );

    this.LikeItem = items.data.data;
    for (let i = 0; i < this.LikeItem.length; i++) {
      let price = this.LikeItem[i].price;
      price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let rental = this.LikeItem[i].rental;
      rental = rental.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.LikeItem[i].sprice = price.slice();
      this.LikeItem[i].srental = rental.slice();
    }
    this.buyItem = _.filter(tlist.data.response, { trade_method: "buy" });
    this.borrowItem = _.filter(tlist.data.response, { trade_method: "borrow" });
  },
  methods: {
    image(prop) {
      console.log(prop);
    },
    chatClose() {
      this.chatDialog = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>