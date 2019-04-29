<template>
  <form>
    <v-text-field
      v-model="id"
      :error-messages="idErrors"
      :counter="10"
      label="ID"
      required
      @input="$v.id.$touch()"
      @blur="$v.id.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="nation"
      :error-messages="nationErrors"
      label="Nation"
      required
      @input="$v.nation.$touch()"
      @blur="$v.nation.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :error-messages="phoneErrors"
      label="Phone"
      required
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
    ></v-text-field>    
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>


    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      id: { required},
      password: { required },
      name: { required },
      nation: { required },
      phone: { required },
      email: { required },
      checkbox: {
        checked (val) {
          return val
        }
      }
    },

    data: () => ({
      id: '',
      password: '',
      name: '',
      nation: '',
      phone: '',
      email: '',
      checkbox: false
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
    //   selectErrors () {
    //     const errors = []
    //     if (!this.$v.select.$dirty) return errors
    //     !this.$v.select.required && errors.push('Item is required')
    //     return errors
    //   },
      idErrors () {
        const errors = []
        if (!this.$v.id.$dirty) return errors
        // !this.$v.id.maxLength && errors.push('Id must be at most 10 characters long')
        !this.$v.id.required && errors.push('Id is required.')
        return errors
      },
      passErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        // !this.$v.password.email && errors.push('Must be valid e-mail')
        !this.$v.password.required && errors.push('Passord is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        // !this.$v.name.email && errors.push('Must be valid e-mail')
        !this.$v.name.required && errors.push('Name is required')
        return errors
      },
      nationErrors () {
        const errors = []
        if (!this.$v.nation.$dirty) return errors
        // !this.$v.nation.email && errors.push('Must be valid e-mail')
        !this.$v.nation.required && errors.push('Nation is required')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        // !this.$v.phone.email && errors.push('Must be valid e-mail')
        !this.$v.phone.required && errors.push('Phone Number is required')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        // !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.id = ''
        this.password = ''
        this.name=''
        this.nation=''
        this.phone=''
        this.email=''
        this.select = null
        this.checkbox = false
      }
    }
  }
</script>



<style>

</style>
