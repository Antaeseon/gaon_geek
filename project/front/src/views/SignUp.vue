<template>
  <v-container grid-list-xs text-xs-center>
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
        :type="'password'"
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

      <v-flex xs2>
        <facebook-account-kit
          ref="accountKit"
          appId="287090742181038"
          version="v1.0"
          :fbAppEventsEnabled="true"
          :debug="true"
          state="somecrsf"
        >
          <v-btn block depressed color="blue-grey" class="white--text" @click="smsLogin">
            핸드폰 인증하기
            <v-icon right dark>phone_android</v-icon>
          </v-btn>
        </facebook-account-kit>
      </v-flex>
      
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
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Vue from 'vue'
const axios = require("axios");

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
    creds: {
      fbAppEventsEnabled: true,
      redirect: "http://localhost:8080",
      display: "popup",
      debug: true
    },
    id: "",
    password: "",
    name: "",
    nation: "",
    phone: "",
    email: "",
    checkbox: false,
    isAuthentificated: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },

    methods: {
      async register() {
        if (this.id.length < 3) {
          alert("Please fill Id");
          return;
        } else if (this.password.length < 8) {
          alert("Please fill Password");
          return;
        } else if (!this.selected) {
          alert("Please check category");
          return;
        }
        console.log(this.id, this.password);
        try {
          await this.$http.post(`${config.uri}/register`, {
            id: this.id,
            password: this.password,
            teamName: this.teamname,
            position: this.position,
            sportsCategory: this.selected,
            isTeamLeader: this.teamLeader
          });
        } catch (error) {
          console.log(error.response.data.message);
          alert(error.response.data.message);
          return;
        }
        try {
          await this.$store.dispatch("login", {
            id: this.id,
            password: this.password
          });
        } catch (err) {
          console.log(err.response.data.message);
          alert(err.response.data.message);
        }
        this.$router.push("/");
      }
    },
    mounted() {
      this.getSession();
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
    /**
     * Facebook default init function
     */
    AccountKit_OnInteractive() {
      AccountKit.init(this.creds);
    },
    /**
     * callback after user submit otp
     */
    loginCallback(response) {
      if (response.status === "PARTIALLY_AUTHENTICATED") {
        this.doLogin(response.code, response.state);
        this.isAuthentificated = true;
      } else if (response.status === "NOT_AUTHENTICATED") {
        // handle NOT_AUTHENTICATED error
        this.isAuthentificated = false;
      } else if (response.status === "BAD_PARAMS") {
        // handle BAD_PARAMS error
        this.isAuthentificated = false;
      } else {
        this.isAuthentificated = false;

        // handle unknown error
      }
    },
    /**
     * Init account kit popup
     */
    smsLogin() {
      AccountKit.login(
        "PHONE",
        { countryCode: "+82", phoneNumber: "" }, // will use default values if not specified
        this.loginCallback
      );
    },
    /**
     * For server side verification
     */
    async doLogin(code, state) {
      try {
        const response = await axios.post(
          "http://localhost:3030/api/otp/success",
          { code, state }
        );
        // server validation successful with response.data.phone
      } catch (err) {
        console.log(err.response || err);
      }
    },
    /**
     * get the csrf token and account kit appid & version from server
     */
    async getSession() {
      try {
        const response = await axios.get(
          `http://localhost:3030/api/otp/session`
        );
        this.creds.state = response.data.csrf;
        this.creds.appId = response.data.appId;
        this.creds.version = response.data.version;
        this.loadAccountkitApi();
      } catch (err) {
        console.log(err.response || err);
      }
    },
    /**
     * append the account kit script in head
     */
    loadAccountkitApi() {
      const accountkitScript = document.createElement("script");
      accountkitScript.setAttribute(
        "src",
        `https://sdk.accountkit.com/en_US/sdk.js`
      );
      accountkitScript.onload = () => {
        window.AccountKit_OnInteractive = this.AccountKit_OnInteractive;
      };
      document.head.appendChild(accountkitScript);
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //인증 안될때
      } else {
        if (!this.isAuthentificated) {
          alert("Please authentificate phone");
          return;
        }

        try {
          await this.$http.post(`http://localhost:3000/user/signup`, {
            id: this.id,
            pwd: this.password,
            name: this.name,
            nation: this.nation,
            phoneNum: this.phone,
            email: this.email
          });
          alert("회원가입이 완료되었습니다.")
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
