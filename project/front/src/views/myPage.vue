<template>
  <div>
    <v-container>
      <v-tabs centered color="indigo darken-4" dark icons-and-text v-model="tabs">
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab href="#tab-1">
          Buyer
          <v-icon>face</v-icon>
        </v-tab>

        <v-tab href="#tab-2" v-if="isSeller">
          Seller
          <v-icon>work</v-icon>
        </v-tab>
      </v-tabs>
    </v-container>

    <v-container v-if="tabs=='tab-1'">
        <Buyer/>
    </v-container>
    <v-container v-if="tabs=='tab-2'">
        <Seller/>
    </v-container>
  </div>
</template>

<script>
import Buyer from '../components/BuyerPage'
import Seller from '../components/SellerPage'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      tabs: null,
    };
  },
  components: {
      Buyer,
      Seller
  },
  computed: {
    ...mapState([ "isSeller"]),
  },
};
</script>

<style>
</style>
