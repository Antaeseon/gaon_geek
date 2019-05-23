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
          <v-text-field 
            outline
            label="아이템 이름"
            append-icon="search"
            v-model="item_name"
          ></v-text-field>
            <div><h3>사이즈</h3></div>
            <v-radio-group 
            class="justify-center" 
            v-model="size" 
            color="red" 
            row 
            >
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
        ></v-select>
        <v-layout>
          <v-flex xs6>
          <div><h3>카테고리</h3></div>
        <v-select
            v-model="selected_category"
            :items="category"
            label="Select Category"
            multiple
            chips
            persistent-hint
        ></v-select>
          </v-flex>
          <v-flex xs6>
          <div><h3>태그</h3></div>
        <v-select
            v-model="selected_tag"
            :items="tag"
            label="Select Tag"
            multiple
            chips
            persistent-hint
        ></v-select>
          </v-flex>
        </v-layout>
        <v-btn @click="filter()">
           조회하기
        </v-btn>

        </v-flex>
        </v-layout>
        
        </v-container>      
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex 
            v-if="all_info[index].item_name.toLowerCase().search(item_name.toLowerCase()) != -1"
             v-for="(i, index) in uniq" :key="i"
             xs4  style="padding-bottom:80px;">
              <a style="color:black" >
              <v-img v-ripple @click="pass_id(all_info[i].object_id)" :src="`https://s3.ap-northeast-2.amazonaws.com/wearever1/`+all_info[i].imageUrl[0]" class="image" alt="lorem" contain
                    aspect-ratio="1.1">
              </v-img>
              <div style="text-align:center; color:#808080">{{status[all_info[i].status]}}</div>
              <div class="text-xs-center" @click="pass_id(all_info[i].object_id)" style="font-weight:bold; text-overflow:ellipsis; overflow:hidden;">{{all_info[i].item_name}}</div>
              <div style="text-align:center; color:#808080">{{all_info[i].price}}원</div>
              <div style="text-align:center; color:#808080">{{all_info[i].rental}}(원/일)</div>
              </a>    
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>

      </v-layout>

    </v-container>
    
  
</template>


<script>
  import store from './../store.js'
  import attribute from './../attribute.js'
  import { mapActions, mapMutations } from 'vuex';
  var _ = require('lodash');
  export default {
    name: 'paginated-list',
    data: () => ({
      item_name:"",
      selected_category: [],
      selected_brand: [],
      selected_tag: [],
      size:"",
      itemAvailable: null,
      brand: attribute.brand,
      tag: attribute.tag,
      category: attribute.category,
      status: attribute.status,
      all_info: [],
      all_index: [],
      uniq: [],
    }),
  async created() {
    var res = await this.$http.post(
      `http://localhost:3000/search/getItemlist/`, { shop_id: this.$route.params.shop_id }
    );
    this.searchItemlist = res.data.data;
    for (var i = 0; i < res.data.data.length; i++) {
      if(res.data.data[i].status !== 2)
      {
        this.all_index.push(i);
        let price = res.data.data[i].price;
        price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let rental = res.data.data[i].rental;
        rental = rental.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.all_info[i] = {
            item_name: res.data.data[i].item_name,
            brand: res.data.data[i].brand,
            price: price,
            rental: rental,
            rprice: res.data.data[i].price,
            rrental: res.data.data[i].rental,
            size: res.data.data[i].size,
            status: res.data.data[i].status,
            imageUrl: res.data.data[i].imageUrl,
            shop_id: res.data.data[i].shop_id,
            category: res.data.data[i].category,
            tag: res.data.data[i].tag,
            object_id: res.data.data[i]._id
        };
      }
    }
    this.uniq = this.all_index.slice();
  },
  computed: {
    ...mapMutations(['searchItemlistinsert']),
  },
  methods: {
    ...mapActions(['pass_id']),
    filter(){
      let picked_cnt=[];
      for(var i=0; i<this.all_info.length; i++){
        var use_cnt=1;
        if(this.item_name !== '')
        {
          if(this.all_info[i].item_name.search(this.item_name)  === -1){
            use_cnt--;
          }
        }
        if(this.size !== '')
        {
          // 사이즈
          if(this.size !== this.all_info[i].size)
          {
            use_cnt--;
          }
        }
        if(this.selected_brand.toString() !== '')
        {
        // 브랜드
          if(this.selected_brand.indexOf(this.all_info[i].brand) === -1)
          {
            use_cnt--;
          }
        }
        if(this.selected_category.toString() !== '')
        {
        // 카테고리
          if(this.selected_category.indexOf(this.all_info[i].category) === -1)
          {
            use_cnt--;
          }
        }
        if(this.selected_tag.toString() !== '')
        {
          let tagNum = 0;
          // 태그
          for(let j = 0; j < this.all_info[i].tag.length; j++)
          {
            if(this.selected_tag.indexOf(this.all_info[i].tag[j]) !== -1)
            {
              tagNum++;
            }
          }
          if(tagNum === 0) use_cnt--;
        }
        if(use_cnt == 1)
        {
          picked_cnt.push(i);
        }
        
      } 
      this.uniq = picked_cnt.slice();
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
