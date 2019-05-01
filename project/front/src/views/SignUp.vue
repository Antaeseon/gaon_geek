<template>

<!-- 높이 맞추기 -->
    <v-container fill-height style="max-width:450px;">  
        <!-- 정 가운데로 맞추기 -->
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-card>
                    <v-toolbar flat height="30">
                        <v-toolbar-title>Sign Up</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                    <v-text-field
                        v-model="id"
                        label="아이디를 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="pwd"
                        label="비밀번호를 입력하세요"
                        type="password"
                    >
                    </v-text-field>
                    
                    <v-text-field
                        v-model="name"
                        label="이름을 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="nation"
                        label="국가를 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="email"
                        label="이메일을 입력하세요"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="phoneNum"
                        label="핸드폰 번호를 입력하세요"
                    >
                    </v-text-field>
                    <v-btn
                        color="primary"
                        depressed
                        block
                        large
                        @click="login({
                            email:email,
                            password:password
                        })"
                    >
                        회원가입하기
                    </v-btn>
                     <div id="app">
    <facebook-account-kit ref="accountKit"
      appId="287090742181038"
      version="v1.0"
      :fbAppEventsEnabled='true'
      :debug='true'
      :loginType='loginType'
      state="somecrsf">
      <select v-model="loginType">
        <option disabled value="">choose one</option>
        <option value="EMAIL">EMAIL</option>
        <option value="PHONE">PHONE</option>
      </select>
      <div v-if="loginType == 'PHONE'">
        <input value="+1" id="country_code" v-model="countryCode" />
        <input placeholder="phone number" id="phone_number" v-model="phoneNumber"/>
      </div>
      <div v-if="loginType == 'EMAIL'">
        <input placeholder="email" id="email" v-model="emailAddress"/>
      </div>
      <button @click="login()">Login</button>
    </facebook-account-kit>
  </div>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      loginType: "EMAIL",
      emailAddress: "",
      countryCode: "+1",
      phoneNumber: ""
    };
  },
  methods: {
    login() {
      console.log(this.$refs);
      this.$refs.accountKit.login(
        {
          countryCode: this.countryCode,
          phoneNumber: this.phoneNumber,
          emailAddress: this.emailAddress,
          display: "modal"
        },
        this.loginCallback
      );
    },
    loginCallback(response) {
      console.log(response);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>