<template>
  <div class="container chat">
    <h1 class="text-xs-center">WearEver</h1>
    <h4 class="text-xs-center">Enjoy your life</h4>
    <div class="card">
      <div class="card-body">
        <p class="text-secondary nomessages" v-if="messages.length == 0">[No messages yet!]</p>
        <div class="messages" v-chat-scroll="{always: false, smooth: true}">
          <div v-for="message in messages" :key="message.id">
            <span class="blue--text">[{{ message.name }}]:</span>
            <span>{{message.message}}</span>
            <span class="text-secondary time">{{message.timestamp}}</span>
          </div>
        </div>
      </div>
      <!-- 메세지 보내기 -->
      <div class="card-action">
        <div class="container" style="margin-bottom: 30px">
          <form @submit.prevent="createMessage">
            <div class="form-group">
              <v-text-field label="Input" placeholder="Enter message ..."
                v-model="newMessage"></v-text-field>
              <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>
            <v-btn flat small color="primary" type="submit">Submit</v-btn>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fb from "../firebase/init";
import moment from "moment";
const config = require('../config')

export default {
  name: "Chat",
  data() {
    return {
      messages: [],
      newMessage: null,
      errorText: null,
      roomNumber:null
    };
  },
  async created() {
    let tempRoomNum=await this.$http.post(
      `${config.serverUri}/chat/getRoomNumber`,{
        buyer_id:this.$route.params.id,
        seller_id:this.$store.state.id,
      }
    );
    console.log(tempRoomNum.data.data)
    this.roomNumber=tempRoomNum.data.data._id
    console.log('aaaa',this.roomNumber)
    let ref = fb.collection(this.roomNumber).orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if ((change.type = "added")) {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
    });
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        fb.collection(this.roomNumber)
          .add({
            message: this.newMessage,
            name: this.$store.state.id,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A message must be entered first!";
      }
    }
  }
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}

.chat h5 {
  margin-top: 0px;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.2em;
}

.chat .time {
  display: block;
  font-size: 0.7em;
}

.messages {
  max-height: 300px;
  overflow: auto;
}
</style>
