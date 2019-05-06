<template>
<!-- 높이 맞추기 -->
    <v-container fill-height style="max-width:560px;">  
        <!-- 정 가운데로 맞추기 -->
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-alert
                class="mb-3"
                :value="modifySellerError"
                type="error"
                >
                장애가 발생했습니다. 잠시만 기다려주세요.
                </v-alert>
                <v-card>
                    <v-toolbar flat height="30"> 
                        <v-toolbar-title>Modify Seller</v-toolbar-title>
                    </v-toolbar>
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
                    <v-btn
                        color="primary"
                        depressed
                        block
                        large
                        @click="submit"
                    >
                        Submit
                    </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
        tag: { required }
    },

    data: () => ({
        dialog: false,
        name: store.state.sellerInfo.shop_name,
        location: store.state.sellerInfo.location,
        about_us: store.state.sellerInfo.about_us,
        tag: store.state.sellerInfo.tag,
        lat: 0.0,
        lon: 0.0
    }),

    computed: {
        ...mapState([ "modifySellerError", "sellerInfo"]),
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
        }
    },

    methods: {
        ...mapActions(['modifySellerInfo']),
        async submit () {
            this.$v.$touch()
            if(this.formBlankTest())
            {
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
                    formData.append('lat', results[0].geometry.location.lat());
                    formData.append('lon', results[0].geometry.location.lng());
                    this.modifySellerInfo(formData)
                });
            }
        },
        formBlankTest()
        {
            return this.name !== '' && this.location !== '' && this.about_us !== '' && this.tag !== '';
        }
    }
    }
</script>