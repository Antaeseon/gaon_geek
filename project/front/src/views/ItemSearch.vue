

<template>
    <!-- xs:mobile, sm:tablet, md:notebook, lg:desktop -->
  <v-container fluid>
      <v-layout row>
        <v-flex md12 >
          <v-card tile flat color="grey lighten-5">
            <v-card-text style="text-align:center; font-size:30px; font-weight:bold">CLOTHING</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
 
      
      <v-layout row>
        
        <!-- 왼쪽 리스트 -->
       
      <v-flex xs12 sm4 md4 lg4 xl4 text-xs-center>
        <!-- <v-flex md3> -->
          <v-card tile flat color="grey lighten-5">
            <v-card-text style="text-align:center;">TODAY'S EDITION</v-card-text>
          </v-card>
         
          <v-text-field 
            outline
            label="업체 검색"
            append-icon="search"
            :append-icon-cb="search(seller)"
            v-model="seller"
          ></v-text-field>


          <v-card tile flat color="grey lighten-5">
            
            <v-card-text style="text-align:center; padding-top:0px;">
            <p style="text-align:center">제품 상태</p>
            <v-btn-toggle>
              <v-btn block outline large  @click="change_state(false)">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대여 중&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
              </v-btn>
            
              <v-btn block outline large   @click="change_state(true)">
                <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </v-btn>
            </v-btn-toggle>
            </v-card-text>
          </v-card>

          <v-card tile flat color="grey lighten-5">
            <p style="text-align:center ">사이즈</p>
            <v-card-text style="text-align:center; padding-top:0px;">
            <v-radio-group row>
                <v-radio
                v-for="(colorValue, i) in ['XL', 'L', 'M', 'S']"
                :key="i"
                :color="colorValue"
                :label="colorValue"
                :value="colorValue"
                ></v-radio>
            </v-radio-group>
            </v-card-text>
          </v-card>

        
        <v-select
            v-model="e7"
            :items="states"
            label="Select brand"
            multiple
            chips
            persistent-hint
        ></v-select>


        </v-flex>
        
        
        
        <!-- 오른쪽 리스트 -->
        
  <v-container fluid grid-list-md>
  <v-layout row wrap>
    
    
    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
        
    <v-hover>
    <!-- <v-flex xs12> -->
    <!-- <v-container> -->
    
    <v-card
     slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      height="300"

    >

      <v-img
        src="data:image/jpeg;base64,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"
      ></v-img>

      </v-card>
     
     <!-- </v-container> -->

    <!-- </v-flex> -->
    </v-hover>

    </v-flex>
   
    
    <v-flex xs12 sm6 md4 lg3 xl2 text-xs-center>
    <v-hover>
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"
      height="300"
    >

      <v-img
        src="https://post-phinf.pstatic.net/MjAxNzA0MjBfMjc5/MDAxNDkyNjU4MjIyNTgz.ZfLbmNlOhuaqn8TN3I1kH6JnKWr3gNMarBqbfrqknAUg.f24-NZo7jbh82s911RWhzOCJ8nz67gTenftlJ9T7NZQg.PNG/%EA%B5%AC%EC%B0%8C_%EC%8B%A4%EB%B9%84%EB%B0%B1-24.png?type=w1200"
      ></v-img>

     

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

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://seoul-p-studio.bunjang.net/product/61404448_1_1476777762_w640.jpg"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            일본
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

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/1920px-Flag_of_Australia.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            호주
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

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/450px-Flag_of_the_United_Kingdom.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            영국
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

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            미국
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

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/338px-Flag_of_France.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            프랑스
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

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="http://i.011st.com/ex_t/R/400x400/1/85/0/src/pd/17/4/3/0/2/4/1/126430241_B_1.jpg"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            중국
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

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            독일
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
    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/338px-Flag_of_India.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            인도
          </h2>
      </div>

    </v-card>
    </v-hover>
    </v-flex>
<v-card-text style="text-align:center">
            <v-pagination
              
              :length="5"
            ></v-pagination>
          </v-card-text>
  
  </v-layout>
</v-container>

    

          <!-- <v-flex md3>
          <v-card dark tile flat color="pink darken-4">
            <v-card-text>#1</v-card-text>
          </v-card>
          </v-flex>
          <v-flex md3>
          <v-card dark tile flat color="pink darken-4">
            <v-card-text>#2</v-card-text>
          </v-card>
          </v-flex>
          <v-flex md3>
          <v-card dark tile flat color="pink darken-4">
            <v-card-text>#3</v-card-text>
          </v-card>
          </v-flex> -->

          <!-- <v-card-text style="text-align:center">
            <v-pagination
              v-model="page"
              :length="5"
            ></v-pagination>
          </v-card-text>
          
        </v-flex> -->

         
        
      </v-layout>

    </v-container>
    
  
</template>


<script>
  import store from './../store.js'
  
  export default {
    data () {


      return {
        seller:"",
        e6: [],
        e7: [],
        // 브랜드 명
        states: [
          'A','B','C'
        ]
      }
    },
  mounted () {
   
  },

  computed: {
    
  },
  methods: {
    search(seller){
      store.state.seller=this.seller;
      console.log(store.state.seller);
    },
    change_state(available){
      store.state.itemAvailable=available;
      console.log(store.state.itemAvailable);
    }
  }
}
</script>

