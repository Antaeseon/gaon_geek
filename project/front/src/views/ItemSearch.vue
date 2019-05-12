<template>
    

  <div class="text-xs-center">
    <div>
        <h1>CLOTHING</h1>

        <div style="text-align:left; padding-left:10px;">
            TODAY'S EDITION
        </div>
    </div>

    <v-flex xs12 sm5 md2>
      <v-text-field
            outline
            label="업체 검색"
            append-icon="search"
      ></v-text-field>
    </v-flex>

    <div style="text-align:left; padding-left:10px;">
            제품 상태
    </div>

     <v-flex xs12 sm5 md2>
        <v-btn-toggle v-model="icon">
            <v-btn flat value="left">
            <span>대여 중</span> 
            </v-btn>
            <v-btn flat value="center">
            <span style>사용 가능</span>
            </v-btn>
        </v-btn-toggle>
    </v-flex>
    
    
    <div style="text-align:left; padding-top:20px;padding-left:10px;">
            사이즈
    </div>

    <v-flex xs12>
        <v-radio-group v-model="color" row>
            <v-radio
            v-for="(colorValue, i) in ['XL', 'L', 'M', 'S']"
            :key="i"
            :color="colorValue"
            :label="colorValue"
            :value="colorValue"
            ></v-radio>
        </v-radio-group>
    </v-flex>

    <!-- <div style="text-align:left; padding-left:10px;">
            컬러
    </div> -->

    <div style="text-align:left; padding-left:10px;">
            브랜드
    </div>    

    <v-flex xs12 sm5 md2>
    <v-select
        v-model="e7"
        :items="states"
        label="Select brand"
        multiple
        chips
        persistent-hint
    ></v-select>
    </v-flex>

    <v-pagination
      v-model="page"
      :length="5"
    ></v-pagination>
  </div>
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
    }
  }
</script>