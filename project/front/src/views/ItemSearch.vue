

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
      
        <v-flex>
        <!-- <v-flex md3> -->
          <div><h3>TODAY'S EDITION</h3></div>
          
          <v-text-field 
            outline
            label="업체 검색"
            append-icon="search"
            v-model="seller"
             :prepend-icon-cb="search(seller)"
            
          ></v-text-field>


            
            <div><h3>제품 상태</h3></div>
            
            <v-radio-group   
            class="justify-center" 
            v-model="state" 
            color="red" 
            row 
             :prepend-icon-cb="change_itemstate(state)">
           
              <v-radio label="대여 중" value="대여 중" ></v-radio>
              <v-radio label="대여 가능" value="대여 가능" ></v-radio>

            </v-radio-group>

            <div><h3>사이즈</h3></div>
            

            <v-radio-group   
            class="justify-center" 
            v-model="size" 
            color="red" 
            row 
             :prepend-icon-cb="change_size(size)">
           
              <v-radio label="XL" value="XL" ></v-radio>
              <v-radio label="L" value="L" ></v-radio>
              <v-radio label="M" value="M"  ></v-radio>
              <v-radio label="S" value="S"  ></v-radio>
              <v-radio label="NONE" value="NONE"  ></v-radio>
            </v-radio-group>
            
          
            <div><h3>브랜드 선택</h3></div>
        <v-select
            v-model="selected_brand"
            :items="brand"
            label="Select brand"
            chips
            multiple
            persistent-hint
             :prepend-icon-cb="change_pickbrand(selected_brand)"
        ></v-select>

          <div><h3>카테고리</h3></div>
        <v-select
            v-model="selected_category"
            :items="category"
            label="Select Category"
            multiple
            chips
            persistent-hint
             :prepend-icon-cb="change_pickcategory(selected_category)"
        ></v-select>

        <v-btn @click="check_itemlist()">
           조회하기
        </v-btn>

        </v-flex>
        </v-layout>
        
        </v-container>


<!-- :src="'https://s3.ap-northeast-2.amazonaws.com/wearever1/' + item.imageUrl[0]" -->
     <!-- <v-img :src="'https://s3.ap-northeast-2.amazonaws.com/wearever1/'+filter_map[0][4][0]" -->
       <!-- <v-img src="http://visualshock.kr/web/product/big/201807/18752_shop1_15305994850023.jpg" 
              aspect-ratio="1.1"
              contain
              ></v-img> -->
       
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex  v-for="i in this.uniq" :key="i" xs4  style="padding-bottom:80px;">
              <a style="color:black" >
              <v-img v-ripple @click="pass_id(all_info[i].object_id)" :src="`https://s3.ap-northeast-2.amazonaws.com/wearever1/`+all_info[i].imageUrl[0]" class="image" alt="lorem" contain
                    aspect-ratio="1.1">
              </v-img>
              <!-- <a v-bind:href="link">link</a> -->
              <div style="text-align:center; color:#808080">{{status[all_info[i].status]}}</div>
              <div class="text-xs-center" @click="pass_id(all_info[i].object_id)" style="font-weight:bold; text-overflow:ellipsis; overflow:hidden;">{{all_info[i].item_name}}</div>
              <div style="text-align:center; color:#808080">{{all_info[i].price}}원</div>
              </a>    
            </v-flex>
          </v-layout>
        </v-container>

      <!-- <div class="text-xs-center">
        <v-pagination
          v-model="page"
          :length="5"
          circle
        ></v-pagination>
      </div> -->

      </v-container>

      </v-layout>

    </v-container>
    
  
</template>


<script>
  import store from './../store.js'
  import attribute from './../attribute.js'
import { mapActions } from 'vuex';

  export default {
    name: 'paginated-list',
    data: () => ({
      seller:"",
      e6: [],
      selected_category: [],
      selected_brand: [],
      selected_tag: [],
      size:"",
      state:"",
      brand: attribute.brand,
      tag: attribute.tag,
      category: attribute.category,
      status: attribute.status,
      nation: store.state.nation,
      itemlist: store.state.searchItemlist,
      all_info: store.state.all_info,
      uniq: store.state.cnt_length,

    }),

  methods: {
    ...mapActions(['pass_id']),
    search(seller){
      store.state.seller=this.seller;
      console.log(store.state.seller);
    },
    change_itemstate(state){
      store.state.itemAvailable=this.state;
      console.log(store.state.itemAvailable);
    },
    change_size(size){
      store.state.size=this.size;
      console.log(store.state.size);
    },
    change_pickbrand(selected_brand){
      store.state.brand=this.selected_brand
      console.log(store.state.brand);
    },
    change_pickcategory(selected_category){
      store.state.category=this.selected_category
      console.log(store.state.category);
    },
    change_picktag(selected_tag){
      store.state.tag=this.selected_tag
      console.log(store.state.tag);
    },
    check_itemlist(){
      // var char = this.itemlist[0].shopid
      // console.log("all_info: "+ this.all_info.length);
      const filter_map=[[],[]];
      const picked_cnt=[];
      
      const use_cnt_state=[];
      // const shop_id_cnt=[];
      // const status_cnt=[];
      // const size_cnt=[];
      // const brand_cnt=[];
      // const category_cnt=[];
      // 2차원 배열 5 x N 화면 출력 개수
      // item_name
      // brand
      // price
      // status
      // imageUrl
      // console.log("all_info:" + this.all_info[0].imageUrl[0]);
      
      // console.log("cnt_length "+this.uniq)
      // console.log("seller: "+store.state.seller);
      // console.log("this.all_info[i]:"+this.all_info[0].shop_id)

      // console.log("store status: "+ store.state.category)
      // console.log("all_info status: "+ this.all_info[0].category)
      for(var i=0; i<this.all_info.length; i++){
        var use_cnt=1;
        // console.log("store.state.seller :" + store.state.seller)
        // console.log("null: " + null);
        // 필터링 사용중인지 아닌지
        if(store.state.seller !== '')
        {
          if(store.state.seller !== this.all_info[i].shop_id){
            use_cnt--;
          }
        }

        console.log("store.state.itemAvailable: "+ store.state.itemAvailable)
        if(store.state.itemAvailable !== '')
        {
         if((store.state.itemAvailable !== "대여 중" && this.all_info[i].status === 1) || (store.state.itemAvailable !== "대여 가능" && this.all_info[i].status === 0)  )
          {
            use_cnt--; 
          }
        }
        if(store.state.size !== '')
        {
          // 사이즈
          if(store.state.size !== this.all_info[i].size)
          {
            use_cnt--;
          }
        }
        if(store.state.brand.toString() !== '')
        {
        // 브랜드
          if(store.state.brand.toString() !== this.all_info[i].brand)
          {
            use_cnt--;
          }
        }
        if(store.state.category.toString() !== '')
        {

        // 카테고리
          if(store.state.category.toString() !== this.all_info[i].category)
          {
            use_cnt--;
          }
        }   
        console.log("i:"+ i);
        console.log("use_cnt:"+ use_cnt);
        if(use_cnt == 1)
        {
          picked_cnt.push(i);
        }
        console.log("all_info_id:"+this.all_info[0].object_id)
        

          
        
        


        // //  업체
        // if(store.state.seller === this.all_info[i].shop_id){
        //   // 기존 i를 저장해놓는 배열 생성
        //   // all_info[i]에 넣어놓기.
        //     console.log("shop_id")
            
        //     picked_cnt.push(i);

        // } 

        // // 제품 상태
        // // string to number
        
        // if((store.state.itemAvailable === "대여 중" && this.all_info[i].status === 1) || (store.state.itemAvailable === "대여 가능" && this.all_info[i].status === 0)  )
        // {
        //   // console.log("??");
        //   console.log("status")
        //     picked_cnt.push(i);
        // }
        // // 사이즈
        // if(store.state.size === this.all_info[i].size)
        // {
        //   console.log("size")
        //     picked_cnt.push(i);
        // }
        // // 브랜드
        // if(store.state.brand.toString() === this.all_info[i].brand)
        // {
        //   console.log("brand")
        //     picked_cnt.push(i);
        // }
        // // 카테고리
        // if(store.state.category.toString() === this.all_info[i].category)
        // {
        //   console.log("category")
        //     picked_cnt.push(i);
        // }
        
      }

      console.log("uniq1: "+this.uniq);
      // 정렬 및 중복 제거 
      this.uniq = picked_cnt.slice() // 정렬하기 전에 복사본을 만든다.
      .sort(function(a,b){
        return a - b;
      })
      .reduce(function(a,b){
        if (a.slice(-1)[0] !== b) a.push(b); // slice(-1)[0] 을 통해 마지막 아이템을 가져온다.
        return a;
      },[]);
      
      console.log("uniq2: "+this.uniq);
      
      // console.log("filter_map: "+filter_map)

      // console.log("shop_id: "+this.itemlist[0].shop_id);
    
      // console.log("item_name: "+this.itemlist[0].item_name);
      // console.log("brand: "+this.itemlist[0].brand);
      // console.log("color: "+this.itemlist[0].color);
      // console.log("category: "+this.itemlist[0].cagtegory);
      // console.log("size: "+this.itemlist[0].size);
      // console.log("tag: "+this.itemlist[0].tag);
      // console.log("detail: "+this.itemlist[0].detail);
      // console.log("precautious: "+this.itemlist[0].precautious);
      // console.log("price: "+this.itemlist[0].price);
      // console.log("status: "+this.itemlist[0].status);
      // console.log("imageNum: "+this.itemlist[0].imageNum);
      // console.log("imageUrl: "+this.itemlist[0].imageUrl);    
    },

  },
   
}
</script>

<style>
.clickable {
  cursor: pointer;
  border: 1px solid black;
}
</style>
