<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex xs12 order-xs5 >
        <v-layout column>
          <v-flex d-flex>
            <v-tabs
              v-model="active"
              color="blue lighten-5"
              light
              slider-color="yellow"
            >
              <v-tab
                v-for="n in 3"
                :key="n"
                ripple
              >
                Item {{ n }}

              </v-tab>
              <v-tab-item
                v-for="n in 3"
                :key="n"
              >
                <v-card flat>
                 <v-card-text>{{ text }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>          
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="white" dark tile flat>
              <v-card-text>
                <template>
                  <v-carousel>
                    <v-carousel-item
                      v-for="(item,i) in items"
                      :key="i"
                      :src="item.src"
                    ></v-carousel-item>
                  </v-carousel>
                </template>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md6>
            <v-layout row wrap>
              <v-flex d-flex>
                <v-layout row wrap>
                  <v-flex
                    
                    d-flex
                    xs12
                    order-lg2
                    
                  >
                    <v-card
                      color="teal lighten-4"
                      light
                    >
                      <v-card-text>
                        상품번호:1212121212<br><br>
                        <h2>다양한색깔의 맨투맨!</h2>
                        전상품 무료배송!<br><br>

                        판매가 :  10,000원<br><br>
                        
                        
                        <v-select
                          :items="coloritems"
                          label="색깔"
                        ></v-select>
                        <v-select
                          :items="sizeitems"
                          label="사이즈"
                        ></v-select>
                        
                <v-flex xs12 sm6>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="dates"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-combobox
                        v-model="dates"
                        multiple
                        chips
                        small-chips
                        label="Multiple picker in menu"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-combobox>
                    </template>
                    <v-date-picker v-model="dates" multiple :allowed-dates="allowedDates" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                      </v-card-text>

                    </v-card>
                  </v-flex>
                  
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>          
        </v-layout>
      </v-flex>
    
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://post.phinf.naver.net/20150407_265/whtmdgml0926_1428380959893rD5PC_PNG/mug_obj_142838095863420428.jpg'
          },
          {
            src: 'http://blogfiles.naver.net/MjAxODA1MDZfMTMx/MDAxNTI1NTc2OTg3NDg4.Z3T6dTsd13id8LiqOu4dYhd9SVqIctmBpO1PbgGeHdcg.8eACPA-6fS4NOTqaYiqe3TbJyHmUFgbUiM5Xq3TqOLIg.PNG.inys9713/26731411_1551787741607861_6320936988644832438_n.png'
          },
          {
            src: 'http://kinimage.naver.net/20160424_39/1461508564664lpiMF_JPEG/1461508564349.jpeg'
          },
          {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fimg.phinf.pholar.net%2F20161110_215%2F1478747924937xpu71_JPEG%2Fp&type=b400'
          },
          
        ],
        active: null,
        text: '상세 상세 상세에에에에 설명 상세 설며어어어엉쓰',
        coloritems: ['black shirt', 'white shirt'],
        sizeitems: ['S','M','L'],
        dates: ['2018-09-15', '2018-09-20'],
        menu: false,
        
      }
      
    },

    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0
    }
  }
</script>

