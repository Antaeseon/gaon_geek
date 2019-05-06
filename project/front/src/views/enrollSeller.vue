<template>
<div id="app">
  <v-app id="inspire">
    <v-container grid-list-xl text-xs-center>  
        <!-- 정 가운데로 맞추기 -->
        <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                  <v-toolbar flat height="40" dark color="indigo" > 
                      <v-toolbar-title>Enroll Seller</v-toolbar-title>
                  </v-toolbar>
              </v-card>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">소개</v-stepper-step>
              
                    <v-divider></v-divider>
              
                    <v-stepper-step :complete="e1 > 2" step="2">상점 정보 입력</v-stepper-step>
              
                    <v-divider></v-divider>
              
                    <v-stepper-step :complete="e1 > 3" step="3">업체 증서 제출</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="4">업체 약관 동의</v-stepper-step>
                  </v-stepper-header>
                    <!-- alert 표시 -->
                    <v-alert
                    class="mb-3"
                    :value="isSubmitDup"
                    type="error"
                    >
                    이미 제출했습니다.
                    </v-alert>
                    <v-alert
                    class="mb-3"
                    :value="isSubmitError"
                    type="error"
                    >
                    장애가 발생했습니다. 잠시만 기다려주세요.
                    </v-alert>
                    <v-alert
                    class="mb-3"
                    :value="alreadySeller"
                    type="error"
                    >
                    이미 제출한 유저입니다.
                    </v-alert>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <v-card
                        class="mb-5"
                        height="100%"
                      >
                        <v-carousel>
                        <v-carousel-item
                            v-for="(item,i) in items"
                            :key="i"
                            :src="item.src"
                        ></v-carousel-item>
                        </v-carousel>
                      </v-card>
              
                      <v-btn
                        color="primary"
                        @click="e1 = 2"
                      >
                        Continue
                      </v-btn>
              
                      <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>
              
                    <v-stepper-content step="2">
                      <v-card
                        class="mb-5"
                        height="100%"
                      >
                        <div class="pa-3">
                          <v-text-field
                              v-model="name"
                              :error-messages="nameErrors"
                              required
                              label="업체명을 입력하세요."
                              @input="$v.name.$touch()"
                              @blur="$v.name.$touch()"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="location"
                              :error-messages="locationErrors"
                              required
                              label="업체 위치를 입력하세요."
                              @input="$v.location.$touch()"
                              @blur="$v.location.$touch()"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="about_us"
                              :error-messages="aboutusErrors"
                              required
                              label="업체 소개를 입력하세요."
                              @input="$v.about_us.$touch()"
                              @blur="$v.about_us.$touch()"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="tag"
                              :error-messages="tagErrors"
                              required
                              label="업체 소개에 보여질 카테고리 태그를 입력해주세요."
                              @input="$v.tag.$touch()"
                              @blur="$v.tag.$touch()"
                          >
                          </v-text-field>
                          </div>
                      </v-card>
                      <v-btn
                        color="primary"
                        @click="e1 = 1"
                      >
                        Previous
                      </v-btn>              
                      <v-btn
                        color="primary"
                        @click="e1 = 3"
                      >
                        Continue
                      </v-btn>
              
                      <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>
              
                    <v-stepper-content step="3">
                      <v-card xs12 sm5 md5 offset-xs0 offset-lg2
                      >
                        <template v-if="imageNum >= 1">
                            <div class="img-wrapper">
                                <div class="img-container" v-for="(url, index) in imageUrl" :key="index">
                                <img :src="url" height="150" />
                                </div>
                            </div>
                        </template>
                        <v-text-field
                        readonly
                        label="Select Image"
                        v-model="imageName"
                        prepend-icon='attach_file'
                        required
                        @click='pickFile'
                        @input="$v.imageName.$touch()"
                        @blur="$v.imageName.$touch()"
                        :error-messages="ImageErrors"
                        ></v-text-field>
                        <input
                            type="file"
                            style="display: none"
                            ref="image"
                            @change="onFilePicked"
                            accept="image/*"
                        >
                        </v-card>
                       <v-btn
                        color="primary"
                        @click="e1 = 2"
                      >
                        Previous
                      </v-btn>             
                      <v-btn
                        color="primary"
                        @click="e1 = 4"
                      >
                        Continue
                      </v-btn>
            
                    </v-stepper-content>

                    <v-stepper-content step="4">
                    <v-card
                    class="mb-5"
                    height="100%"
                    >
                        <v-container fluid grid-list-md>
                            <v-textarea
                            box
                            readonly
                            label="약관"
                            auto-grow
                            value="제1조(목적) 이 약관은 OO(이하 “회사”)가 제공하는 쇼핑몰형 구매대행 관련 서비스(이하 “서비스”)를 이용함에 있어 회사와 이용자 간의 권리·의무, 책임사항 및 절차 등을 규정함을 목적으로 합니다."
                            ></v-textarea>
                        </v-container>
                    <v-checkbox
                    v-model="checkbox"
                    :error-messages="checkboxErrors"
                    label="Do you agree?"
                    required
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                    ></v-checkbox>
                    </v-card>
                       <v-btn
                        color="primary"
                        @click="e1 = 3"
                      >
                        Previous
                      </v-btn>             
                      <v-btn
                        color="primary"
                        @click="submit"
                      >
                        Register
                      </v-btn>
                      <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
            </v-flex>
        </v-layout>
    </v-container>
  </v-app>
</div>
</template>

<script>
    import MarkerClusterer from '@google/markerclusterer'
    import gmapsInit from './../utils/gmaps'
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    import { mapState, mapActions, mapMutations } from 'vuex'
    import store from './../store'

    export default {
    mixins: [validationMixin],

    validations: {
        name: { required },
        location: { required },
        about_us: { required },
        tag: { required },
        imageName: { required },
        checkbox: {
        checked(val) {
        return val;
      }
    }
    },

    data: () => ({
        e1: 0,
        title: "Image Upload",
        dialog: false,
        name: '',
        location: '',
        about_us: '',
        tag: '',
        lat: 0.0,
        lon: 0.0,
		imageName: [],
		imageUrl: [],
        imageFile: [],
        imageNum: 0,
        checkbox: false,
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ]
    }),

    computed: {
        ...mapState([ "isSubmitted", "isSubmitDup", "isSubmitError","alreadySeller"]),
        ...mapMutations(["enrollError"]),
        nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Shop name is required')
        return errors
        },
        locationErrors () {
        const errors = []
        if (!this.$v.location.$dirty) return errors
        !this.$v.location.required && errors.push('Location is required')
        return errors
        },
        aboutusErrors () {
        const errors = []
        if (!this.$v.about_us.$dirty) return errors
        !this.$v.about_us.required && errors.push('About us is required')
        return errors
        },
        tagErrors () {
        const errors = []
        if (!this.$v.tag.$dirty) return errors
        !this.$v.tag.required && errors.push('Tag info is required')
        return errors
        },
        ImageErrors () {
        const errors = []
        if (!this.$v.imageName.$dirty) return errors
        !this.$v.imageName.required && errors.push('Seller Authentication Image is required')
        return errors
        },
        checkboxErrors() {
            const errors = [];
            if (!this.$v.checkbox.$dirty) return errors;
            !this.$v.checkbox.checked && errors.push("You must agree to continue!");
            return errors;
        },
    },

    methods: {
        ...mapActions(['requestEnrollSeller']),
        async submit () {
            this.$v.$touch()
            if(this.formBlankTest())
            {
                if (!this.checkbox) {
                alert("약관에 동의해주세요");
                return;
                }
                const google = await gmapsInit();
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: this.location }, (results, status) => {
                    if (status !== `OK` || !results[0]) {
                        this.enrollError()
                    // throw new Error(status);
                    }
                    const formData = new FormData();
                    formData.append('id', store.state.id);
                    formData.append('shop_name', this.name);
                    formData.append('location', this.location);
                    formData.append('about_us', this.about_us);
                    formData.append('tag', this.tag);
                    formData.append('imageNum', this.imageNum);
                    formData.append('lat', results[0].geometry.location.lat());
                    formData.append('lon', results[0].geometry.location.lng());
                    for (var i = 0; i < this.imageNum; i++)
                    {
                        var tempfileUrl = 'resources/images/' + this.imageName[i];
                        formData.append('img', this.imageFile[i]);
                        formData.append('imageUrl', tempfileUrl);
                    }
                    this.requestEnrollSeller(formData)
                });
            }
        },
        pickFile () {
            this.$refs.image.click ()
        },
      
		onFilePicked (e) {
            const files = e.target.files
            this.imageNum = files.length
            for(var i = 0; i < this.imageNum; i++)
            {
                const fileElement = files[i];
                if(fileElement !== undefined) {
                    this.imageName.push(fileElement.name)
                    if(this.imageName[i].lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(fileElement)
                    fr.addEventListener('load', () => {
                        this.imageUrl.push(fr.result)
                        this.imageFile.push(fileElement) // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = []
                    this.imageFile = []
                    this.imageUrl = []
                }
            }
        },
        formBlankTest()
        {
            return this.name !== '' && this.location !== '' && this.about_us !== '' && this.tag !== '' && this.imageName !== [];
        }
    },
    clear() {
        this.$v.$reset();
        this.e1= 1,
        this.title= "Image Upload",
        this.dialog= false,
        this.name= '',
        this.location= '',
        this.about_us= '',
        this.tag= '',
        this.imageName= [],
        this.imageUrl= [],
        this.imageFile= [],
        this.imageNum= 0,
        this.checkbox= false
    }
    }
</script>