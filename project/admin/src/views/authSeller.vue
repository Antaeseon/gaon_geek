<template>
  <v-data-table :headers="headers" :items="dets" class="elevation-1">
    <template v-slot:items="props">
      <td>{{ props.item.shop_name }}</td>
      <td class="text-xs-left">{{ props.item.location }}</td>
      <td class="text-xs-left">{{ props.item.about_us }}</td>
      <!-- 다이어로그!! -->
      <td class="text-xs-left">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <template v-slot:activator="{ on }">
            <v-btn small dark v-on="on">Normal</v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Auth Image</v-card-title>
            <v-img
              :src="'https://s3.ap-northeast-2.amazonaws.com/wearever1/'+props.item.imageUrl"
            ></v-img>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </td>
      <!-- 다이어로그 끝 -->
      <td class="text-xs-left">
        <v-btn small color="primary" @click="Auth(props.item.id)">Accept</v-btn>
        <v-btn small color="error" @click="Reject(props.item.id)">Reject</v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,

      headers: [
        {
          text: "SHOP_NAME",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Location", value: "lat", sortable: false },
        { text: "About_us", sortable: false },
        { text: "Image", sortable: false },
        { text: "Auth", sortable: false }
      ],
      dets: []
    };
  },
  async created() {
    var tt = await this.$http.get("http://localhost:3000/enrollSeller/lists");
    this.dets = tt.data.body;
    console.log("이건", this.dets);
  },
  methods: {
    image(prop) {
      console.log(prop);
    },
    sendSMS(phoneNum, messageS) {
      //보내고 싶은 번호와 메세지
      console.log(phoneNum, messageS);
      this.$http.post("http://localhost:3000/sens/sendMessage", {
        phone: phoneNum,
        message: messageS
      });
    },
    async Auth(prop) {
      console.log(prop);
      var getUser = await this.$http.get(`http://localhost:3000/user/${prop}`);
      console.log(getUser.data.response.phoneNum);
      await this.$http.post("http://localhost:3000/enrollSeller/accept", {
        id: prop
      });
      var tt = await this.$http.get("http://localhost:3000/enrollSeller/lists");
      this.dets = tt.data.body;
      alert("승인되었습니다.");
      this.sendSMS(
        getUser.data.response.phoneNum,
        "판매자 등록이 완료되었습니다."
      );
    },
    async Reject(prop) {
      var getUser = await this.$http.get(`http://localhost:3000/user/${prop}`);

      await this.$http.post("http://localhost:3000/enrollSeller/reject", {
        id: prop
      });
      var tt = await this.$http.get("http://localhost:3000/enrollSeller/lists");
      this.dets = tt.data.body;
      alert("승인 거절 되었습니다.");
      this.sendSMS(
        getUser.data.response.phoneNum,
        "판매자 등록이 거절되었습니다."
      );
    }
  }
};
</script>
<style>
</style>
