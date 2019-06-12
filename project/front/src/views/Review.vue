<template>
  <v-card>
    <v-card-title>
      <span class="headline">리뷰 작성</span>
    </v-card-title>
    <hr>
    <hr>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md12>
            서비스는 만족하셨나요?*
            <v-rating
              v-model="shoprating"
              background-color="grey lighten-1"
              color="red"
              :hover="true"
              x-large
            ></v-rating>
            <hr>
            <br>리뷰*
            <v-textarea box placeholder="최소 10자리 이상 입력해주세요" v-model="contents"></v-textarea>
          </v-flex>
          <small>
            *필수 입력
            <br>상품과 무관한 사진/동영상을 첨부한 리뷰는 통보없이 삭제 및 적립 혜택이 회수될 수 있습니다.
          </small>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :to="{name: 'myPage'}" color="red darken-1" flat>Return</v-btn>
      <v-btn
        color="blue darken-1"
        flat
        @click="saveReview"
      >Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const config = require("../config");

export default {
  data() {
    return {
      shoprating: 5,
      contents: "",
      itemInfo: {}
    };
  },
  async created() {
    let itemInfo = await this.$http.get(
      `${config.serverUri}/search/getOneItem/${this.$route.params.id}`)
    console.log('아이템인포',itemInfo.data.response);
    this.itemInfo=itemInfo.data.response
  },
  methods: {
    async saveReview(sellerId, itemId) {
      await this.$http.post(`${config.serverUri}/review/saveReview`, {
        shop_id: this.itemInfo.shop_id,
        buyer_id: this.$store.state.id,
        item_id: this.$route.params.id,
        contents: this.contents,
        rating: this.shoprating
      });
      this.$router.push({ name: "myPage" })
    }
  }
};
</script>

<style>
</style>
