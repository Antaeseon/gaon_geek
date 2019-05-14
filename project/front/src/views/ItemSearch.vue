

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
            :prepend-icon-cb="search(seller)"
            v-model="seller"
          ></v-text-field>


          <v-card tile flat color="grey lighten-5">
            
            <v-card-text style="text-align:center; padding-top:0px;">
            <p style="text-align:center">제품 상태</p>
            <v-btn-toggle>
              <v-btn block outline large  @click="change_itemstate(false)">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대여 중&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
              </v-btn>
            
              <v-btn block outline large   @click="change_itemstate(true)">
                <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </v-btn>
            </v-btn-toggle>
            </v-card-text>

          </v-card>

          <v-card tile flat color="grey lighten-5">
            <p style="text-align:center ">사이즈</p>
            <v-card-text style="text-align:center; padding-top:0px;">
            <v-radio-group v-model="size" color="red" row @click="change_size(size)">
              <v-radio label="XL" value="XL" ></v-radio>
              <v-radio label="L" value="L" ></v-radio>
              <v-radio label="M" value="M"  ></v-radio>
              <v-radio label="S" value="S"  ></v-radio>
            </v-radio-group>
            </v-card-text>
          </v-card>

        
        <v-select
            v-model="brand"
            :items="states"
            label="Select brand"
            multiple
            chips
            persistent-hint
            :prepend-icon-cb="change_pickbrand(brand)"
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
    <!-- <img :src="'https://s3.ap-northeast-2.amazonaws.com/weareverstorage/' + item.imageUrl[0]"> -->
    
    <v-img
      src="'https://s3.ap-northeast-2.amazonaws.com/weareverstorage/'+'1557747351964.jpg'"
    >
    
    </v-img>
        <div style="font-weight:bold;">발렌시아가 트리플 S</div>
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
      max-width="250"
      max-height="300"
    >
      <!-- 가방 -->
      

      <v-img
        src="https://post-phinf.pstatic.net/MjAxNzA0MjBfMjc5/MDAxNDkyNjU4MjIyNTgz.ZfLbmNlOhuaqn8TN3I1kH6JnKWr3gNMarBqbfrqknAUg.f24-NZo7jbh82s911RWhzOCJ8nz67gTenftlJ9T7NZQg.PNG/%EA%B5%AC%EC%B0%8C_%EC%8B%A4%EB%B9%84%EB%B0%B1-24.png?type=w1200"
      >
        <v-container
          fill-height
          fluid
          pa-2
        >

        </v-container>
      </v-img>
      <div style="font-weight:bold;">구찌 가방</div>
     

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
        size:"",
        e6: [],
        brand: [],
        // 브랜드 명
        states: [
          'GUCCI','HERMES','LOUIS VUITTON', 'CHANEL', 'PRADA', 'GIVENCHY', 'BOTTENGA VENETA','CELINE', 'SAINT LAURENT'
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
    change_itemstate(available){
      store.state.itemAvailable=available;
      console.log(store.state.itemAvailable);
    },
    change_size(size){
      store.state.size=this.size;
      console.log(store.state.size);
    },
    change_pickbrand(brand){
      store.state.brand=this.brand
      console.log(store.state.brand);
    }
  }
}
</script>

