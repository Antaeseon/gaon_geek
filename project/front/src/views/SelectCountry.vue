<template>
    
<v-container fluid grid-list-md>
  <div style="text-align:center">
    <h1>{{ $t("message.chooseCountry") }}</h1>
  </div>
  <v-layout row wrap>
    

    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
        
    <v-hover>
      
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('대한민국')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.korea") }}
          </h2>
      </div>

    </v-card>
    </v-hover>

    </v-flex>
    
    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('이탈리아')"

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.italy") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
     <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('일본')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.japan") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('호주')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1920px-Flag_of_Australia.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.austrailia") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>


    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('영국')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/450px-Flag_of_the_United_Kingdom.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.uk") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>
   <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('미국')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.usa") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('프랑스')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/338px-Flag_of_France.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.france") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>

    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('중국')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="http://i.011st.com/ex_t/R/400x400/1/85/0/src/pd/17/4/3/0/2/4/1/126430241_B_1.jpg"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.china") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>

    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('독일')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            {{ $t("message.germany") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>

    <v-flex xs12 sm6 md4 lg3 xl2 >
      <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      @click ="change_nation('인도')"
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/338px-Flag_of_India.svg.png"
      ></v-img>

      <div style="text-align:center; font-weight:bold;">
          <h2>
            {{ $t("message.india") }}
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>

  
  </v-layout>
</v-container>


</template>
<script>
import store from './../store.js'
import router from './../router.js'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  // data: () => {},
  // computed: {
  //   ...mapState([]),
  //   ...mapGetters()
  // },
  methods: {
    ...mapActions(['getNationShoplist']),
    change_nation(nationInfo){
      store.state.nation=nationInfo;
      this.getNationShoplist({ nation: nationInfo.slice()})
    }
  }
}
</script>
