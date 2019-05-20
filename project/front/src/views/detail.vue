<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex d-flex>
            <v-tabs v-model="active" color="blue lighten-5" light slider-color="blue">
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
                  <v-card-text>{{ qna }}</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>{{ review }}</v-card-text>
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
<<<<<<< HEAD
                    >
                    </v-carousel-item>
=======
                      touchless='true'
                    ></v-carousel-item>
>>>>>>> 309f3c48909d4b699495b473845903f351a90fef
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
                        <br>
                        1일당 : {{mainItem.price}}
                        <br>
                        <br>
                        <v-flex xs12 sm6>
                          <br>
                          색깔 : {{mainItem.color}}
                          <br>
                          사이즈 : {{mainItem.size}}
                          <br>
                          상태 : {{mainItem.state}}
                          <br>
                          소재 : {{mainItem.material}}
                          <div>
<<<<<<< HEAD
                          <v-chip label color="pink" text-color="white">
                            <v-icon left>label</v-icon>Tags
                          </v-chip>
                          <v-chip outline color="primary" v-for="(t,i) in mainItem.tag" :key="i">#{{t}}</v-chip>
=======
                            <v-chip label color="pink" text-color="white">
                              <v-icon left>label</v-icon>Tags
                            </v-chip>
                            <v-chip
                              outline
                              color="primary"
                              v-for="(t,i) in mainItem.tag"
                              :key="i"
                            >{{t}}</v-chip>
>>>>>>> 309f3c48909d4b699495b473845903f351a90fef
                          </div>
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
                        <v-btn @click="requestPay">결제하기</v-btn>
                        <v-btn @click="submit">찜하기</v-btn>
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

export default {
  data() {
    return {
      pagaItem: [],
      mainItem: {},
      items: [],
      active: null,
      qna: "판매문의입니다아",
      review: "리뷰입니다아",
      dates: new Date().toISOString().substr(0, 10),
      datesend: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false
    };
  },
  async created() {
    console.log("여여여여", this.$route.params.id);
    var res = await this.$http.get(
      `http://localhost:3000/search/getOneItem/${this.$route.params.id}`
    );
    this.mainItem = res.data.response;
    this.items = this.mainItem.imageUrl;
    console.log("ddd", this.items);
  },

  methods: {
    submit() {
      //보내고 싶은 번호와 메세지
      this.$http.post("http://localhost:3000/sens/sendMessage", {
        phone: "01052817702",
        message: "wearever에서 대여 접수가 완료되었습니다."
      });
    },
    allowedDates: val => {
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
      // IMP.request_pay(param, callback) 호출
      Vue.IMP().request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: "merchant_" + new Date().getTime(),
          name: this.mainItem.item_name,
          amount: this.mainItem.price * this.dates.length,
          buyer_email: "iamport@siot.do",
          buyer_name: "구매자이름",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
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

