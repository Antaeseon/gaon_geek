

<template>
    <!-- xs:mobile, sm:tablet, md:notebook, lg:desktop -->
  <v-container fluid>
 
      <v-layout justify-space-around>
        <v-flex md12 >
            <div style="text-align:center; font-size:30px; font-weight:bold">CLOTHING</div>
        </v-flex>
      </v-layout>
 
      <v-layout>
        
        <v-container>
        <!-- 왼쪽 리스트 -->
      <v-container grid-list-xl text-xs-center >
      <v-layout row wrap>
      
        <v-flex >
        <!-- <v-flex md3> -->
          <div><h3>TODAY'S EDITION</h3></div>
          
          <v-text-field 
            outline
            label="업체 검색"
            append-icon="search"
            :prepend-icon-cb="search(seller)"
            v-model="seller"
          ></v-text-field>


            
            <div><h3>제품 상태</h3></div>
            
            <v-btn-toggle >
              <v-btn block outline large  @click="change_itemstate(false)">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;대여 중&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
              </v-btn>
            
              <v-btn block outline large   @click="change_itemstate(true)">
                <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </v-btn>
            </v-btn-toggle>
          

            <div><h3>사이즈</h3></div>
            

            <v-radio-group   class="justify-center" v-model="size" color="red" row @click="change_size(size)">
              <v-radio label="XL" value="XL" ></v-radio>
              <v-radio label="L" value="L" ></v-radio>
              <v-radio label="M" value="M"  ></v-radio>
              <v-radio label="S" value="S"  ></v-radio>
            </v-radio-group>
            
          
            <div><h3>브랜드 선택</h3></div>
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
        </v-layout>
        
        </v-container>

        <!-- 오른쪽 리스트 -->
        <v-container >
        <v-layout justify-space-around>
          <v-flex xs5>
            <div class="title mb-1"></div>
            <v-layout column>
              <v-img src="http://visualshock.kr/web/product/big/201807/18752_shop1_15305994850023.jpg" aspect-ratio="1.7" contain></v-img>
              <div class="subheading" style="text-align:center; font-weight:bold">구찌 가방 토드 크로스백‎ 퀸 마가렛 탑 핸들 스몰</div>
              <div class="subheading" style="text-align:center; font-weight:bold">3,580,000원</div>              
              
              <v-img src="https://thumbnail12.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/images/2018/10/30/23/4/467b6d25-56ac-4dd0-9a1d-dd1a75ed4731.jpg" aspect-ratio="1.7" contain></v-img>
              <div class="subheading" style="text-align:center; font-weight:bold">[에르메스]넥크리스 악세사리 레이디스 HERMES H147991FP 1B 오렌지 실버</div>
              <div class="subheading" style="text-align:center; font-weight:bold">1,056,800원 </div>              

              <v-img src="https://thumbnail12.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/images/2018/02/08/0/6/146990d9-6de7-4413-acad-fd43f078a719.jpg" aspect-ratio="1.7" contain></v-img>
              <div class="subheading" style="text-align:center; font-weight:bold">LOUIS VUITTON 루이비통 몽테뉴 BB 모노그램 캔버스 (M41055)</div>
              <div class="subheading" style="text-align:center; font-weight:bold">2,670,000원</div>              
            </v-layout>
          </v-flex>

          <v-flex xs5>
            <div class="title mb-1"></div>
            <v-layout column>
              <v-img src="https://cdn.reebonzkorea.co.kr/uploads/product_meta_info/201806/3398087/representative_CHANEL__EC_83_A4_EB_84_AC__EB_B3_B4_EC_9D_B4_ED_94_84_EB_A0_8C_EB_93_9C__ED_8A_B8_EC_9C_84_EB_93_9C__EC_8B_9C_EA_B3_84_120180615-23501-1ibire.jpg" aspect-ratio="1.7" contain></v-img>
              <div class="subheading" style="text-align:center; font-weight:bold">샤넬 보이프렌드 트위드 시계</div>
              <div class="subheading" style="text-align:center; font-weight:bold">4,032,000원</div>              

              <v-img src="https://cdn.reebonzkorea.co.kr/uploads/product_meta_info/201812/5242430/representative_23500520181223-19565-9btf5d.jpg" aspect-ratio="1.7" contain></v-img>
              <div class="subheading" style="text-align:center; font-weight:bold">프라다1BP006사피아노럭스 체인크로스백</div>
              <div class="subheading" style="text-align:center; font-weight:bold">1,142,400원</div>              

              <v-img src="https://cdn.reebonzkorea.co.kr/uploads/product_meta_info/201903/5912833/representative_eneta_19SS__EB_B3_B4_ED_85_8C_EA_B0_80_EB_B2_A0_EB_84_A4_ED_83_80__EC_9A_B0_EB_B8_90__EB_A0_88_EB_8D_94__ED_8C_94_EC_B0_8C_120190311-13757-1jn8lkt.jpg" aspect-ratio="1.7" contain></v-img>
              <div class="subheading" style="text-align:center; font-weight:bold">보테가베네타 우븐 레더 팔찌</div>
              <div class="subheading" style="text-align:center; font-weight:bold">288,800원</div>              
              
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
</v-container>

         
        
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

