

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
          ></v-text-field>


          <v-card tile flat color="grey lighten-5">
            
            <v-card-text style="text-align:center; padding-top:0px;">
            <p style="text-align:center">제품 상태</p>
            <v-btn-toggle v-model="toggle_none">
              <v-btn block outline large  value="renting">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대여 중&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
              </v-btn>
            
              <v-btn block outline large  value="available">
                <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </v-btn>
            </v-btn-toggle>
            </v-card-text>
          </v-card>

          <v-card tile flat color="grey lighten-5">
            <p style="text-align:center ">사이즈</p>
            <v-card-text style="text-align:center; padding-top:0px;">
            <v-radio-group v-model="color" row>
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
        
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="250"

    >
    <div style="padding-top:10px"></div>

      <v-img
        :aspect-ratio="16/9"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1280px-Flag_of_South_Korea.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            한국
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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png"
      ></v-img>

      <div style="font-weight:bold;">
          <h2>
            이탈리아
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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png"
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
              v-model="page"
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

  export default {
    data () {
      return {
        e6: [],
        e7: [],
        // 브랜드 명
        states: [
          'A','B','C'
        ]
      }
    },
  mounted () {
    console.log(this.$vuetify.breakpoint)
  },

  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '220px'
        case 'sm': return '400px'
        case 'md': return '500px'
        case 'lg': return '600px'
        case 'xl': return '800px'
      }
    }
  }
}
</script>

