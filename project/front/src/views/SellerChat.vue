<template>
  <div class="container chat">
    <h2 class="text-primary text-center">WearEver</h2>
    <h5 class="text-secondary text-center">Enjoy your life</h5>
    <div class="card">
      <div class="card-body">
        <p class="text-secondary nomessages" v-if="messages.length == 0">[No messages yet!]</p>
        <div class="messages" v-chat-scroll="{always: false, smooth: true}">
          <div v-for="message in messages" :key="message.id">
            <span class="text-info">[{{ message.name }}]:</span>
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
              <input
                type="text"
                name="message"
                class="form-control"
                placeholder="Enter message ..."
                v-model="newMessage"
              >
              <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>
            <button class="btn btn-primary" type="submit" name="action">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fb from "../firebase/init";
import moment from "moment";

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
      `http://localhost:3000/chat/getRoomNumber`,{
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
