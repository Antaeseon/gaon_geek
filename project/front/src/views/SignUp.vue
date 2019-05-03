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
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
    <v-btn @click="aaa">aaa</v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Vue from 'vue'
export default {
  mixins: [validationMixin],

  validations: {
    id: { required },
    password: { required },
    name: { required },
    nation: { required },
    phone: { required },
    email: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    id: "",
    password: "",
    name: "",
    nation: "",
    phone: "",
    email: "",
    checkbox: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },

    //   selectErrors () {
    //     const errors = []
    //     if (!this.$v.select.$dirty) return errors
    //     !this.$v.select.required && errors.push('Item is required')
    //     return errors
    //   },
    idErrors() {
      const errors = [];
      if (!this.$v.id.$dirty) return errors;
      // !this.$v.id.maxLength && errors.push('Id must be at most 10 characters long')
      !this.$v.id.required && errors.push("Id is required.");
      return errors;
    },
    passErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // !this.$v.password.email && errors.push('Must be valid e-mail')
      !this.$v.password.required && errors.push("Passord is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      // !this.$v.name.email && errors.push('Must be valid e-mail')
      !this.$v.name.required && errors.push("Name is required");
      return errors;
    },
    nationErrors() {
      const errors = [];
      if (!this.$v.nation.$dirty) return errors;
      // !this.$v.nation.email && errors.push('Must be valid e-mail')
      !this.$v.nation.required && errors.push("Nation is required");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      // !this.$v.phone.email && errors.push('Must be valid e-mail')
      !this.$v.phone.required && errors.push("Phone Number is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("Please Enter the Form");
      } else {
        try {
          await this.$http.post(`http://localhost:3000/user/signup`, {
            id: this.id,
            pwd: this.password,
            name: this.name,
            nation: this.nation,
            phoneNum: this.phone,
            email: this.email
          });
        } catch (error) {
          //   console.log(error.response.data.message);
          //   alert(error.response.data.message);
          return;
        }
        console.log("정상적으로 완료");
        this.clear();
      }
    },
    clear() {
      this.$v.$reset();
      this.id = "";
      this.password = "";
      this.name = "";
      this.nation = "";
      this.phone = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
    aaa() {
      console.log("ggg");
      Vue.IMP().certification(
        {
          merchant_uid: "merchant_" + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
        },
        result_success => {
          // 인증성공
          console.log(result_success.imp_uid);
          console.log(result_success.merchant_uid);
          // 이후 Business Logic 처리하시면 됩니다.
        },
        result_failure => {
          //실패시 실행 될 콜백 함수
          var msg = "인증에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;

          alert(msg);
        }
      );
    }
  }
};
</script>
<style>
</style>
