<template>
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
</template>
<script>



export default {
  data: () => ({
    expand: false,
    dialog: false,
    headers: [
        
      //{ text: "content내용", value: "content" },
      { text: "userid 작성자", value: "userid" },
      { text: "date 작성일", value: "date" },
      //{ text: "Protein (g)", value: "protein" },
      {
        text: "제목",
        align: "left",
        sortable: false,
        value: "title"
      },
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
    }
  }),

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

  

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>