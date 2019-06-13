<template>
  <div>
    <v-toolbar flat color="dark">
      <h1>판매문의</h1>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">글쓰기</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="childid" readonly label="작성자"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="today" readonly label="작성일"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="title" placeholder="제목"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-textarea box name="input-7-4" label="글쓰기" v-model="content"></v-textarea>
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
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="this.Board"
      class="elevation-1"
      :expand="expand"
      item-key="_id"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-left">{{ props.item.buyer_id }}</td>
          <td>{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.date.substr(0,10) }}</td>
          <td class="text-xs-left">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>
            <h3>문의 내용</h3>
            <br>
            {{ props.item.content }}
            <hr color="lightgrey">
            <v-icon>mdi-subdirectory-arrow-right</v-icon>
            <div v-if="props.item.answer_status==true">
              <span style="color:blue">(답변완료)</span>
              {{props.item.answer_content}}
            </div>
            <div v-else>답을 기다리는 중입니다.</div>
          </v-card-text>
          <v-flex xs12 sm6 md12 v-if="props.item.answer_status==false">
            <v-textarea solo name="input-7-4" label="답변달기" v-model="inputanswer"></v-textarea>
            <v-btn color="primary" @click="addanswer(props.item._id)">답변달기</v-btn>
          </v-flex>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template> 
<script>
const config = require("../config");
export default {
  props: ["childid", "Board", "pItem"],
  data: () => ({
    expand: false,
    dialog: false,
    answer: "답변없음",
    inputanswer: "",
    today: new Date().toISOString().substr(0, 10),
    title: "",
    content: "",
    userid: "",
    itemInfo: {},
    headers: [
      { text: "작성자", value: "childid" },
      {
        text: "제목",
        align: "left",
        sortable: false,
        value: "title"
      },
      { text: "작성일", value: "date" },
      { text: "수정/삭제", sortable: false }
    ],

    board: [],
    editedIndex: -1
  }),
  created() {
    console.log(this.Board);
  },
  // async created() {
  //   this.userid = this.childid;
  //   console.log("daadd", this.pItem);
  //   let itemInfo = await this.$http.get(
  //     `${config.serverUri}/search/getOneItem/${this.pItem}`
  //   );
  //   console.log("아이템인포", itemInfo.data.response);
  //   this.itemInfo = itemInfo.data.response;
  //   var retrunBoardList = await this.$http.get(
  //     `${config.serverUri}/board/getBoard/${this.pItem}`
  //   );
  //   console.log('히히',retrunBoardList.data.data)
  //   this.allBoard=retrunBoardList.data.data
  // },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "글쓰기" : "수정하기";
    }
  },

  watch: {
    dialog(val) {
      //dsd
      val || this.close();
    }
  },

  methods: {
    async addanswer(id) {
      if (this.pItem.shop_id != this.$store.state.id) {
        alert("판매자가 아닙니다.");
        return;
      }
      await this.$http.post(`${config.serverUri}/board/saveAnswer`, {
        id: id,
        answer_content: this.inputanswer
      });
      this.inputanswer = "";
      var retrunBoardList = await this.$http.get(
        `${config.serverUri}/board/getBoard/${this.pItem._id}`
      );
      this.allBoard = retrunBoardList.data.data;
      this.Board = this.allBoard;
      console.log(id);
    },
    editItem(item) {
      this.editedIndex = this.board.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    aaa() {
      console.log("나와라", this.$store.state.id);
    },
    deleteItem(item) {
      const index = this.board.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.board.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.title = "";
        this.content = "";
      }, 300);
    },

    async save() {
      await this.$http.post(`${config.serverUri}/board/saveBoard`, {
        shop_id: this.pItem.shop_id,
        buyer_id: this.childid,
        item_id: this.pItem._id,
        title: this.title,
        content: this.content
      });
      var retrunBoardList = await this.$http.get(
        `${config.serverUri}/board/getBoard/${this.pItem._id}`
      );
      this.allBoard = retrunBoardList.data.data;
      this.Board = this.allBoard;

      this.close();
    }
  }
};
</script>