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
                  <v-card-text>{{ detailinfo }}</v-card-text>
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
                    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
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
                        상품번호:1212121212
                        <br>
                        <br>
                        <h2>다양한색깔의 맨투맨!</h2>전상품 무료배송!
                        <br>
                        <br>판매가 : 10,000원
                        <br>
                        <br>

                        <v-flex xs12 sm6>
                          <v-select :items="coloritems" label="색깔"></v-select>
                          <v-select :items="sizeitems" label="사이즈"></v-select>
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
                              <v-combobox
                                v-model="dates"
                                multiple
                                chips
                                small-chips
                                label="대여 날짜 선택"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-combobox>
                            </template>
                            <v-date-picker
                              v-model="dates"
                              multiple
                              :allowed-dates="allowedDates"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-btn @click="requestPay">결제하기</v-btn>
                        <v-btn @click="sendsms">찜하기</v-btn>
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
      items: [
        {
          src:
            "http://post.phinf.naver.net/20150407_265/whtmdgml0926_1428380959893rD5PC_PNG/mug_obj_142838095863420428.jpg"
        },
        {
          src:
            "http://blogfiles.naver.net/MjAxODA1MDZfMTMx/MDAxNTI1NTc2OTg3NDg4.Z3T6dTsd13id8LiqOu4dYhd9SVqIctmBpO1PbgGeHdcg.8eACPA-6fS4NOTqaYiqe3TbJyHmUFgbUiM5Xq3TqOLIg.PNG.inys9713/26731411_1551787741607861_6320936988644832438_n.png"
        },
        {
          src:
            "http://kinimage.naver.net/20160424_39/1461508564664lpiMF_JPEG/1461508564349.jpeg"
        },
        {
          src:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fimg.phinf.pholar.net%2F20161110_215%2F1478747924937xpu71_JPEG%2Fp&type=b400"
        }
      ],
      active: null,
      detailinfo: "상세 상세 상세에에에에 설명 상세 설며어어어엉쓰",
      qna: "판매문의입니다아",
      review: "리뷰입니다아",
      coloritems: ["black shirt", "white shirt"],
      sizeitems: ["S", "M", "L"],
      dates: [],
      menu: false
    };
  },

  methods: {
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0,
    sendsms: function() {

      axios
        .post(
          "https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:255920239534:wearever/messages",
          {
            type: "sms",
            contentType: "COMM",
            countryCode: "82",
            from: "01052817702",
            to: ["01052817702"],
            content: "성공!"
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
                  
        });
    },

    requestPay: function() {
      // IMP.request_pay(param, callback) 호출
      Vue.IMP().request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: "merchant_" + new Date().getTime(),
          name: "주문명:결제테스트",
          amount: 1,
          buyer_email: "iamport@siot.do",
          buyer_name: "구매자이름",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구 삼성동",
          buyer_postcode: "123-456"
        },
        result_success => {
          //성공할 때 실행 될 콜백 함수
          var msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + result_success.imp_uid;
          msg += "상점 거래ID : " + result_success.merchant_uid;
          msg += "결제 금액 : " + result_success.paid_amount;
          msg += "카드 승인번호 : " + result_success.apply_num;
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

