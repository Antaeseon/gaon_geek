<template>
  <div>
    <v-toolbar flat color="dark">
      <v-toolbar-title>판매문의</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">글쓰기</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}props로받아온data->{{childid}}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="childid" label="작성자" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.date" label="작성일" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.title" label="제목" placdholder="제목없음"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-textarea box name="input-7-4" label="글쓰기" v-model="editedItem.content" placeholder="내용없음" ></v-textarea>
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
      :items="board"
      class="elevation-1"
      :expand="expand"
      item-key="title"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-left">{{ props.item.userid }}</td>
          
          <td class="text-xs-left">{{ props.item.date }}</td>
          <td >{{ props.item.title }}</td>

          <td class="text-xs-left">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>
            <h3>문의 내용</h3><br>
            {{ props.item.content }}
            
            <hr color='lightgrey'>
            <v-icon>mdi-subdirectory-arrow-right</v-icon>{{answer}}

          </v-card-text>
          <v-flex xs12 sm6 md12>
            <v-textarea solo name="input-7-4" label="답변달기" v-model="inputanswer"></v-textarea>
            
            <v-btn color="primary" @click="addanswer">답변달기</v-btn>
          </v-flex>
        </v-card>
      </template>
    </v-data-table>
               

  </div>
  
</template> 
<script>
export default {
  props:['childid'],
  data: () => ({
    expand: true,
    dialog: false,
    answer: "답변없음",
    inputanswer:"",
    
    /*headers: [
      {
        text: "작성자",
        align: "right",
        sortable: false,
        value: "userid"
      },
      { text: "작성일",align: "right", value: "date" },
      { text: "제목",align: "right", value: "title" },
    

      { text: "수정/삭제", value: "name",align: "right", sortable: false }
    ],*/
    headers: [
      //{ text: "content내용", value: "content" },
      { text: "작성자", value: "childid" },
      { text: "작성일", value: "date" },
      //{ text: "Protein (g)", value: "protein" },
      {
        text: "제목",
        align: "left",
        sortable: false,
        value: "title"
      },
      { text: "수정/삭제", sortable: false }
    ],

    board: [],
    editedIndex: -1,
    editedItem: {
     
      date: new Date().toISOString().substr(0, 10),
      title: "",
      content: "",
      
    },
    defaultItem: {
     
      date: new Date().toISOString().substr(0, 10),
      title: "",
      content: "",
      
    }
  }),
  created(){
    this.editedItem.userid=this.childid
    this.defaultItem.userid=this.childid
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "글쓰기" : "수정하기";
    }
  },

  watch: {
    dialog(val) {//dsd
      val || this.close();
    }
  },

  methods: {
    addanswer(event){
      this.answer=this.inputanswer;
      this.inputanswer='';
      event.target.reset();
    },    
    editItem(item) {
      this.editedIndex = this.board.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    aaa(){
      console.log('나와라',this.$store.state.id)
    },
    deleteItem(item) {
      const index = this.board.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.board.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.board[this.editedIndex], this.editedItem);
      } else {
        this.board.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>