<template>
<!-- 높이 맞추기 -->
    <v-container fill-height style="max-width:560px;">  
        <!-- 정 가운데로 맞추기 -->
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-card>
                    <v-toolbar flat height="30">
                        <v-toolbar-title>Enroll Seller</v-toolbar-title>
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
                    <template v-if="imageNum >= 1">
                        <div class="img-wrapper">
                            <div class="img-container" v-for="(url, index) in imageUrl" :key="index">
                            <img :src="url" height="150" />
                            </div>
                        </div>
                    </template>
					<v-text-field
                        label="Select Image"
                        @click='pickFile'
                        v-model="imageName"
                        prepend-icon='attach_file'
                        required
                        :error-messages="ImageErrors"
                        @input="$v.imageName.$touch()"
                        @blur="$v.imageName.$touch()"
                        ></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
                        multiple
						accept="image/*"
						@change="onFilePicked"
					>
                    <v-btn
                        color="primary"
                        depressed
                        block
                        large
                        @click="submit"
                    >
                        Register
                    </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<!-- Replace the value of the key parameter with your own API key. -->
<!-- script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN-EalhkgItu9dDWfcr02Ca0u7w64XN-I&callback=gmapsCallback" async defer -->
<script>
    // import MarkerClusterer from '@google/markerclusterer'
    // import gmapsInit from './../utils/gmaps'
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    import { mapActions } from 'vuex'

    export default {
    mixins: [validationMixin],

    validations: {
        name: { required },
        location: { required },
        about_us: { required },
        tag: { required },
        imageName: { required }
    },

    data: () => ({
        title: "Image Upload",
        dialog: false,
        name: '',
        location: '',
        about_us: '',
        tag: '',
        // lat: 0.0,
        // lon: 0.0,
		imageName: [],
		imageUrl: [],
        imageFile: [],
        imageNum: 0
    }),

    computed: {
        nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required')
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
        }
    },

    methods: {
        ...mapActions(['requestEnrollSeller']),
        submit () {
            this.$v.$touch()
            if(this.name !== '' && this.location !== '' && this.about_us !== '' && this.tag !== '' && this.imageName !== [])
            {
                // var autocomplete = new google.maps.places.Autocomplete(this.location,{types: ['geocode']});
                // autocomplete.addListener('place_changed', () => {
                //     var place = autocomplete.getPlace();
                //     this.lat = place.geometry.location.lat();
                //     this.lon = place.geometry.location.lng();
                //     console.log(this.lat + " " + this.lon);
                // });
                const formData = new FormData();
                formData.append('id', 'temp');
                formData.append('name', this.name);
                formData.append('location', this.location);
                formData.append('about_us', this.about_us);
                formData.append('tag', this.tag);
                formData.append('imageNum', this.imageNum);
                // formData.append('lat', this.lat);
                // formData.append('lon', this.lon);
                for (var i = 0; i < this.imageNum; i++)
                {
                    var tempfileUrl = 'resources/images/' + this.imageName[i];
                    formData.append('img', this.imageFile[i]);
                    formData.append('imageUrl', tempfileUrl);
                }
                this.requestEnrollSeller(formData)
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
		}
    }
    }

</script>