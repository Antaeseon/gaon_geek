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
          <v-layout>
            <v-flex xs6>
            <div><h3>브랜드 선택</h3></div>
        <v-select
            v-model="selected_brand"
            :items="brand"
            label="Select Brand"
            chips
            multiple
            persistent-hint
        ></v-select>
            </v-flex>
            <v-flex xs6>
            <div><h3>색상 선택</h3></div>
        <v-select
            v-model="selected_color"
            :items="color"
            label="Select Color"
            chips
            multiple
            persistent-hint
        >
        </v-select>
            </v-flex>
          </v-layout>
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
        <div><h3>가격대</h3></div>
        <v-radio-group 
        class="justify-center" 
        v-model="priceORrental" 
        color="red" 
        row 
        >
          <v-radio label="구매" value="구매" ></v-radio>
          <v-radio label="렌탈" value="렌탈" ></v-radio>
        </v-radio-group>
        <v-layout>
          <v-flex xs6>
          <v-text-field 
            label="최소 가격"
            v-model="min_price"
          ></v-text-field>
          </v-flex>
          <v-flex xs6>
          <v-text-field 
            label="최대 가격"
            v-model="max_price"
          ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout justify-space-between>
          <v-flex xs10>
        <v-btn @click="filter()">
           조회하기
        </v-btn>
        <v-btn @click="clear()">
           초기화
        </v-btn>
        </v-flex>
        <v-flex xs5>
          <v-btn-toggle v-model="selected_sorting">
            <v-btn flat value="pu" @click="sorting('pu')">
              <span>가격</span>
              <v-icon>arrow_drop_up</v-icon>
            </v-btn>
            <v-btn flat value="pd" @click="sorting('pd')">
              <span>가격</span>
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-btn flat value="ru" @click="sorting('ru')">
              <span>렌탈</span>
              <v-icon>arrow_drop_up</v-icon>
            </v-btn>
            <v-btn flat value="rd" @click="sorting('rd')">
              <span>렌탈</span>
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </v-btn-toggle>
          </v-flex>
        </v-layout>
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
      max_price:"",
      min_price:"",
      priceORrental: "",
      selected_category: [],
      selected_brand: [],
      selected_tag: [],
      selected_color: [],
      selected_sorting: undefined,
      itemAvailable: null,
      brand: attribute.brand,
      tag: attribute.tag,
      category: attribute.category,
      status: attribute.status,
      color: attribute.color,
      all_info: [],
      all_index: [],
      uniq: [],
      uniqBackup : []
    }),
  async created() {
    var res = await this.$http.post(
      `http://localhost:3000/search/getItemlist/`, { shop_id: this.$route.params.shop_id }
    );
    let cnt = 0;
    this.searchItemlist = res.data.data;
    for (var i = 0; i < res.data.data.length; i++) {
      if(res.data.data[i].status !== 2)
      {
        this.all_index.push(cnt);
        let price = res.data.data[i].price;
        price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let rental = res.data.data[i].rental;
        rental = rental.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.all_info[cnt] = {
            item_name: res.data.data[i].item_name,
            brand: res.data.data[i].brand,
            price: price,
            rental: rental,
            rprice: res.data.data[i].price,
            rrental: res.data.data[i].rental,
            size: res.data.data[i].size,
            color: res.data.data[i].color,
            status: res.data.data[i].status,
            imageUrl: res.data.data[i].imageUrl,
            shop_id: res.data.data[i].shop_id,
            category: res.data.data[i].category,
            tag: res.data.data[i].tag,
            object_id: res.data.data[i]._id
        };
        cnt++;
      }
    }
    this.uniq = this.all_index.slice();
    this.uniqBackup = this.uniq.slice();
  },
  computed: {
    ...mapMutations(['searchItemlistinsert']),
  },
  methods: {
    ...mapActions(['pass_id']),
    filter(){
      let picked_cnt=[];
      if(this.beforefiltering() === false)
      {
        return;
      }
      for(var i=0; i<this.all_info.length; i++){
        var use_cnt=1;
        if(this.item_name !== '')
        {
          if(this.all_info[i].item_name.search(this.item_name)  === -1){
            use_cnt--;
          }
        }
        if(this.selected_color.toString() !== '')
        {
        // 색
          if(this.selected_color.indexOf(this.all_info[i].color) === -1)
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
        let filterPrice = null;
        if(this.priceORrental === '판매') filterPrice = this.all_info[i].rprice;
        else filterPrice = this.all_info[i].rrental;

        if(this.min_price !== '')
        {
          // 최소 가격
          if(Number(this.min_price) > filterPrice)
          {
            use_cnt--;
          }
        }
        if(this.max_price !== '')
        {
          // 최소 가격
          if(Number(this.max_price) < filterPrice)
          {
            use_cnt--;
          }
        }
        if(use_cnt == 1)
        {
          picked_cnt.push(i);
        }
        
      } 
      this.uniq = picked_cnt.slice();
      this.uniqBackup = this.uniq.slice();
    },
    beforefiltering(){
      if(this.min_price !== "" || this.max_price !== "")
        if(this.priceORrental === "")
        {
          alert("구매인지 렌탈인지 선택해주세요.");
          return false;
        }
      if(this.min_price !== "" && this.max_price !== "")
        if(Number(this.min_price) > Number(this.max_price))
        {
          alert("최소 가격이 최대 가격보다 큽니다 재설정해주세요.");
          return false;
        }
      return true;
    },
    sorting(what)
    {
      if(this.selected_sorting === what)
      {
        this.uniq = this.uniqBackup.slice();
      }
      else
      {
        let pandr = [];
        for(let i = 0; i < this.uniq.length; i++)
          pandr.push({ 'index' : this.uniq[i] , 'price' : this.all_info[this.uniq[i]].rprice , 'rental' : this.all_info[this.uniq[i]].rrental });
        if(what === 'pu')
        {
          pandr.sort(function(a,b) {
            return a.price - b.price;
          });
        }
        else if(what === 'pd')
        { 
          pandr.sort(function(a,b) {
            return b.price - a.price;
          });
        }
        else if(what === 'ru')
        {
          pandr.sort(function(a,b) {
            return a.rental - b.rental;
          });
        }
        else if(what === 'rd')
        {
          pandr.sort(function(a,b) {
            return b.rental - a.rental;
          });
        }
        this.uniq = [];
        for(let j = 0; j < pandr.length; j++)
          this.uniq[j] = pandr[j].index;
      }
    },
    clear()
    {
      this.item_name = "";
      this.max_price = "";
      this.min_price = "";
      this.priceORrental = "";
      this.selected_category = [];
      this.selected_brand = [];
      this.selected_tag = [];
      this.selected_color = [];
      this.selected_sorting = "";
    }
  },
   
}
</script>

<style>
.clickable {
  cursor: pointer;
  border: 1px solid black;
}
</style>
