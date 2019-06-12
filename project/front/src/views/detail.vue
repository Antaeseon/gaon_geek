<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex d-flex>
            <v-tabs v-model="active" color="grey lighten-1" light slider-color="blue">
              <v-tab ripple>상세설명</v-tab>
              <v-tab ripple>판매문의</v-tab>
              <v-tab ripple>리뷰</v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>{{ mainItem.detail }}</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <board :childid="this.$store.state.id"></board>
                  <v-card-text>{{ qna }}</v-card-text>
                </v-card>
              </v-tab-item>

              <!-- 리뷰 -->

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-data-table :headers="headers" :items="reviewList" class="elevation-1">
                      <template v-slot:items="props">
                        <td>{{ props.item.buyer_id }}</td>
                        <td class="text-xs-left">{{ props.item.contents }}</td>
                        <td class="text-xs-left">
                          <v-rating
                            v-model="props.item.rating"
                            background-color="grey lighten-1"
                            color="purple"
                            small
                            :readonly="true"
                          ></v-rating>
                        </td>
                        <td class="text-xs-left">{{ props.item.date.substr(0,10) }}</td>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="white" dark tile flat>
              <v-card-text>
                <template>
                  <v-carousel>
                    <v-carousel-item
                      v-for="(item,i) in items"
                      :key="i"
                      :src="'https://s3.ap-northeast-2.amazonaws.com/wearever1/'+item"
                    ></v-carousel-item>
                  </v-carousel>
                </template>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md6>
            <v-layout row wrap>
              <v-flex d-flex>
                <v-layout row wrap>
                  <v-flex d-flex xs12 order-lg2>
                    <v-card color="grey lighten-4" light>
                      <v-card-text>
                        <h2>상품명 : {{mainItem.item_name}}</h2>
                        <br>
                        <hr>
                        <hr>
                        <br>
                        <v-chip color="white" text-color="secondary">
                          <v-icon left>mdi-cash-multiple</v-icon>price
                        </v-chip>
                        {{mainItem.price}}원
                        <br>

                        <v-chip color="white" text-color="secondary">
                          <v-icon left>mdi-cash</v-icon>rental fee per day
                        </v-chip>
                        {{mainItem.rental}}원/day
                        <v-flex xs12 sm6 md12>
                          <v-chip color="white" text-color="secondary">
                            <v-icon left>mdi-palette-outline</v-icon>Color
                          </v-chip>
                          {{mainItem.color}}
                          <br>
                          <v-chip color="white" text-color="secondary">
                            <v-icon left>mdi-tshirt-crew-outline</v-icon>size
                          </v-chip>
                          {{mainItem.size}}
                          <br>
                          <v-chip color="white" text-color="secondary">
                            <v-icon left>mdi-wrench-outline</v-icon>item state
                          </v-chip>
                          {{mainItem.state}}
                          <br>
                          <v-chip color="white" text-color="secondary">
                            <v-icon left>mdi-zodiac-aquarius</v-icon>item material
                          </v-chip>
                          {{mainItem.material}}
                          <div>
                            <v-chip label color="pink" text-color="white">
                              <v-icon left>label</v-icon>Tags
                            </v-chip>
                            <v-chip
                              outline
                              color="primary"
                              v-for="(t,i) in mainItem.tag"
                              :key="i"
                            >#{{t}}</v-chip>
                          </div>
                          <br>
                          <hr>
                          <hr>
                          <br>
                          <v-flex xs5>
                            <v-select :items="['렌탈', '구매']" label="구매방법" v-model="statusFilter"></v-select>
                          </v-flex>

                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="dates"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                            v-if="statusFilter=='렌탈'"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="dates"
                                label="시작일"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="dates"
                              :allowed-dates="allowedDates"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="datesend"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                            v-if="statusFilter=='렌탈'"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="datesend"
                                label="마감일"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="datesend"
                              :allowed-dates="allowedDates"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.menu2.save(datesend)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-btn fab dark small color="white" @click="requestPay">
                          <v-icon color="green">mdi-currency-usd</v-icon>
                        </v-btn>
                        <v-btn fab dark small color="white" @click="likeitToggle()">
                          <v-icon v-if="likeit == true" color="pink">favorite</v-icon>
                          <v-icon v-if="likeit == false" color="pink">favorite_border</v-icon>
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { mapState } from "vuex";
import board from "../components/Board";
const config = require("../config");

export default {
  name: "Board",
  data() {
    return {
      tradeList: [],
      pagaItem: [],
      mainItem: {},
      items: [],
      active: null,
      qna: "판매문의입니다아",
      review: "리뷰입니다아",
      dates: "",
      datesend: "",
      menu: false,
      modal: false,
      menu2: false,
      daylength: null,
      statusFilter: "",
      t_method: "",
      t_price: 0,
      likeit: false,
      likeitList: [],
      reviewList: [],
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "내용", sortable: false },
        { text: "평점", sortable: false },
        { text: "날짜", sortable: false }
      ]
    };
  },
  async created() {
    console.log("여여여여", this.$route.params.id);
    var rList = await this.$http.get(
      `${config.serverUri}/review/getReview/${this.$route.params.id}`
    );
    console.log(`알리스트`, rList.data.data);
    this.reviewList = rList.data.data;
    await this.$http.get(
      `${config.serverUri}/trade/plusVisitor/${this.$route.params.id}`
    );
    var res = await this.$http.get(
      `${config.serverUri}/search/getOneItem/${this.$route.params.id}`
    );
    var rest = await this.$http.get(
      `${config.serverUri}/trade/getTradeListByItemId/${this.$route.params.id}`
    );
    // 로그인이 안되어 있다면, likeit 해제
    if (this.Token !== null) {
      var user = await this.$http.get(
        `${config.serverUri}/user/${sessionStorage.getItem("id")}`
      );
      if (user.data.response.likeit.includes(this.$route.params.id))
        this.likeit = true;
      else this.likeit = false;
      this.likeitList = user.data.response.likeit;
    } else this.likeit = false;

    this.mainItem = res.data.response;
    this.items = this.mainItem.imageUrl;
    this.tradeList = rest.data.response;
    console.log("ddd", this.mainItem);
  },
  components: {
    board
  },
  computed: {
    ...mapState(["Token"])
  },
  methods: {
    likeitToggle() {
      if (this.Token === null) {
        alert("로그인이 필요한 서비스입니다.");
      } else {
        if (this.likeit === true) {
          const idx = this.likeitList.indexOf(this.$route.params.id);
          this.likeitList.splice(idx, 1);
        } else {
          this.likeitList.push(this.$route.params.id);
        }
        this.likeit = !this.likeit;
        this.$http.post(`${config.serverUri}/user/likeit`, {
          id: sessionStorage.getItem("id"),
          body: { likeit: this.likeitList }
        });
      }
    },
    submit() {
      //보내고 싶은 번호와 메세지
      this.$http.post(`${config.serverUri}/sens/sendMessage`, {
        phone: "01052817702",
        message: "wearever에서 대여 접수가 완료되었습니다."
      });
    },
    async makeTrade() {
      await this.$http.post(`${config.serverUri}/trade/makeTrade`, {
        buyer_id: this.$store.state.id,
        seller_id: this.mainItem.shop_id,
        item_id: this.$route.params.id,
        borrow_date: this.dates,
        return_date: this.datesend,
        is_buy: false,
        trade_method: this.t_method,
        total_price: this.t_price
      });

      if (this.t_method == "buy") {
        await this.$http.post(`${config.serverUri}/item/itemStatusUpdate`, {
          id: this.$route.params.id,
          status: 2
        });
      }
    },
    computeDate() {
      console.log("dd", this.dates, "dd", this.datesend);
      var sarray = this.dates.split("-");
      var endarray = this.datesend.split("-");
      var tarray = sarray[0] + sarray[1] + sarray[2];
      var s_date = new Date(sarray[0], Number(sarray[1]) - 1, sarray[2]);
      var e_date = new Date(endarray[0], Number(endarray[1]) - 1, endarray[2]);

      var between = parseInt(
        (e_date.getTime() - s_date.getTime()) / 1000 / 60 / 60 / 24
      );
      this.daylength = between;
    },
    allowedDates: function(val) {
      console.log("gg");
      console.log(val);
      var temp = val.substring(0, 10).split("-");
      var temp_date = temp[0] + temp[1] + temp[2];
      console.log(this.tradeList.length);
      for (var i = 0; i < this.tradeList.length; i++) {
        if (
          this.tradeList[i].borrow_date == null ||
          this.tradeList[i].return_date == null
        )
          continue;
        var sarray = this.tradeList[i].borrow_date.substring(0, 10).split("-");
        var tarray = sarray[0] + sarray[1] + sarray[2];
        var endarray = this.tradeList[i].return_date
          .substring(0, 10)
          .split("-");
        var tearray = endarray[0] + endarray[1] + endarray[2];
        if (temp_date >= tarray && temp_date <= tearray) return false;
      }
      if (
        parseInt(val.substring(5, 7)) <
        parseInt(new Date().toISOString().substring(5, 7))
      )
        return false;
      else if (
        parseInt(val.substring(5, 7)) >
        parseInt(new Date().toISOString().substring(5, 7))
      )
        return true;
      if (
        parseInt(val.split("-")[2], 10) >
        parseInt(
          new Date()
            .toISOString()
            .substr(0, 10)
            .split("-")[2],
          10
        )
      )
        return true;
    },
    requestPay: function() {
      if (this.$store.state.Token == null) {
        alert("로그인을 해 주세요.");
        return;
      }
      // IMP.request_pay(param, callback) 호출
      var totalPrice;
      if (this.statusFilter == "구매") {
        totalPrice = this.mainItem.price;
        this.is_buy = true;
        this.t_method = "buy";
      } else {
        this.is_buy = false;
        this.computeDate();
        this.t_method = "borrow";
        if (this.daylength <= 0) {
          alert("날짜 설정이 잘못되었습니다.");
          return;
        }
        totalPrice = this.mainItem.rental * (this.daylength + 1);
      }
      this.t_price = totalPrice;
      Vue.IMP().request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: "merchant_" + new Date().getTime(),
          name: this.mainItem.item_name,
          amount: totalPrice,
          buyer_email: "iamport@siot.do",
          buyer_name: "구매자이름",
          buyer_tel: "010-1234-5678",
          buyer_addr: "temp",
          buyer_postcode: "123-456"
        },
        result_success => {
          //성공할 때 실행 될 콜백 함수
          var msg = "결제가 완료되었습니다.";
          // msg += "고유ID : " + result_success.imp_uid;
          //msg += "상점 거래ID : " + result_success.merchant_uid;
          // msg += "결제 금액 : " + result_success.paid_amount;
          // msg += "카드 승인번호 : " + result_success.apply_num;
          alert(msg);
          this.makeTrade();
        },
        result_failure => {
          //실패시 실행 될 콜백 함수
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + result_failure.error_msg;
          alert(msg);
        }
      );
    }
  }
};
</script>
<style>
h2 {
  font-family: NanumGothicRegular;
  font-style: normal;
  font-weight: normal;
}
</style>
