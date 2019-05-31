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
                  <v-card-text>
                    {{ qna }}
                    <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">글쓰기</v-btn>
        <v-btn
          color="primary"
          dark
          @click="expand = !expand"
        >{{ expand ? 'Close' : 'Keep' }} other rows</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md12>
                <v-text-field v-model="editedItem.userid" label="작성자"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field v-model="editedItem.date" label="작성일"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  outline
                  v-model="editedItem.title"
                  label="제목"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-textarea
                  outline
                  v-model="editedItem.content"
                  label="내용"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-textarea>
              </v-flex>
              
              
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :expand="expand"
      item-key="title"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
             
        <td class="text-xs-left">{{ props.item.userid }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td>{{ props.item.title }}</td>
        
        <td class="text-xs-left">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text><h3>판매 내용</h3>{{ props.item.content }}</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </div>
               
    
                  </v-card-text>
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
                        판매가격 : {{mainItem.price}}
                        
                        <br>
                        1일당 : {{mainItem.rental}}
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
                          <v-flex xs3>
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
                        <v-btn @click="requestPay">결제하기</v-btn>
                        <v-btn @click="makeTrade">찜하기</v-btn>
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
import board from '../components/Board'

export default {
  
  data() {
    return {
     expand: false,
    dialog: false,
    headers: [
        
      //{ text: "content내용", value: "content" },
      { text: "작성자", value: "userid" },
      { text: "작성일", value: "date" },
      //{ text: "Protein (g)", value: "protein" },
      {
        text: "제목",
        align: "left",
        sortable: false,
        value: "title"
      } ,
      { text: "수정/삭제", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title: "제목없음",
      content: "내용없음",
      userid: this.$store.state.id,
      //userid: "id없음",
      date: new Date().toISOString().substr(0, 10)
     // protein: 0
    },
    defaultItem: {
      title: "제목없음",
      content: "내용없음",
      //userid: "id없음",
      userid: this.$store.state.id,
      date: new Date().toISOString().substr(0, 10)
      //protein: 0
    },
      
      isDark: true,
      show: true,
      newTodo: "",
      todo: [],
      todos: [],
      day: this.todoDay(),
      //date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear(),
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
      t_price: 0
    };
  },
  components: {
      board
  },
   
computed: {
    formTitle() {
      return this.editedIndex === -1 ? "글쓰기" : "수정하기";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  async created() {
    console.log("여여여여", this.$route.params.id);

    await this.$http.get(
      `http://localhost:3000/trade/plusVisitor/${this.$route.params.id}`
    );
    var res = await this.$http.get(
      `http://localhost:3000/search/getOneItem/${this.$route.params.id}`
    );
    var rest = await this.$http.get(
      `http://localhost:3000/trade/getTradeListByItemId/${
        this.$route.params.id
      }`
    );
    this.mainItem = res.data.response;
    this.items = this.mainItem.imageUrl;
    this.tradeList = rest.data.response;
    console.log("ddd", this.mainItem);
  },

  methods: {
     

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)  
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    addTodo() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    todoDay() {
      var d = new Date();
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return days[d.getDay()];
    },

    nth(d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    submit() {
      //보내고 싶은 번호와 메세지
      this.$http.post("http://localhost:3000/sens/sendMessage", {
        phone: "01052817702",
        message: "wearever에서 대여 접수가 완료되었습니다."
      });
    },
    makeTrade() {
      this.$http.post("http://localhost:3000/trade/makeTrade", {
        buyer_id: this.$store.state.id,
        seller_id: this.mainItem.shop_id,
        item_id: this.$route.params.id,
        borrow_date: this.dates,
        return_date: this.datesend,
        is_buy: false,
        trade_method: this.t_method,
        total_price: this.t_price
      });
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
.done {
  text-decoration: line-through;
}
</style>

