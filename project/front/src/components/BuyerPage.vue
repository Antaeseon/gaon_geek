<template>
  <div>
    <v-tabs v-model="active" color="white" light slider-color="yellow">
      <v-tab ripple>구매 내역 조회</v-tab>
      <v-tab ripple>대여 내역 조회</v-tab>
      <v-tab ripple>관심 상품 조회</v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text><v-timeline>
    <v-timeline-item
      v-for="n in 4"
      :key="n"
      color="red lighten-2"
      large
    >
      <template v-slot:opposite>
        <span>Tus eu perfecto</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">Lorem ipsum</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text> <v-data-table :headers="headers" :items="dets" class="elevation-1">
    <template v-slot:items="props">
      <td>{{ props.item.shop_name }}</td>
      <td class="text-xs-left">{{ props.item.location }}</td>
      <td class="text-xs-left">{{ props.item.about_us }}</td>
      <!-- 다이어로그!! -->
      <td class="text-xs-left">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="red lighten-2" dark v-on="on">Click</v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Auth Image</v-card-title>
            <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
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
        <v-btn @click="Auth(props.item.id)">OK</v-btn>
      </td>
    </template>
  </v-data-table></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>관심상품 입니다</v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </div>
</template>
<script>

export default {
     

  data() {
    return {
      active: null,
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
    async Auth(prop){
      console.log(prop)
      await this.$http.post('http://localhost:3000/enrollSeller/accept',{id:prop})
      var tt = await this.$http.get("http://localhost:3000/enrollSeller/lists");
      this.dets = tt.data.body
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>