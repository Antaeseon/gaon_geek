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
                        @input="$v.tag.$tag()"
                        @blur="$v.tag.$tag()"
                    >
                    </v-text-field>
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
      tag: { required }
    },

    data: () => ({
      name: '',
      location: '',
      about_us: '',
      tag: '',
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
      
    },

    methods: {
      submit () {
        this.$v.$touch()
      }
    }
  }
</script>