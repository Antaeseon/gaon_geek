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


<script>
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'

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
        name: '',
        location: '',
        about_us: '',
        tag: '',
        title: "Image Upload",
        dialog: false,
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
        submit () {
        this.$v.$touch()
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