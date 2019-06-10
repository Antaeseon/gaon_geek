<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <!-- 라우터 home으로 지정 -->
        <v-list-tile router :to="{name: 'home'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- mypage router로 지시
        <v-list-tile @click="convert_login_status_for_mypage">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>마이페이지</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>-->
        <!-- mypage router로 지시 -->
        <!-- <v-list-tile router :to="{name: 'detail'}" exact>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>상세보기</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>-->

        <!-- mypage router로 지시 -->
        <v-list-tile v-if="isSeller" router :to="{name: 'googlemap'}" exact>
          <v-list-tile-action>
            <v-icon>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>판매자 위치</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- mypage router로 지시 -->
        <v-list-tile router :to="{name: 'selectcountry'}" exact>
          <v-list-tile-action>
            <v-icon>shopping_basket</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>shopping</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- router :to="{name: 'enrollSeller'}" -->
        <!-- v-if="Token !== null" -->
        <v-list-tile @click="convert_login_status" v-if="!isSeller">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content v-if="!isSeller">
            <v-list-tile-title>판매자 등록</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isSeller" router :to="{name: 'modifySeller'}">
          <v-list-tile-action>
              <v-icon>mdi-account-edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>판매자 정보 수정</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isSeller" router :to="{name: 'enrollItem'}">
          <v-list-tile-action>
              <v-icon>mdi-briefcase-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>물품 등록</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router :to="{name: 'aboutus'}">
          <v-list-tile-action>
              <v-icon>mdi-briefcase-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About us</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue-grey darken-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Wearever</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- 로그인 되어있으면 welcome 표시 -->
        <v-btn icon v-if="showId">
          <v-icon>notifications</v-icon>
        </v-btn>

        <v-menu offset-y v-if="showId">
          <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile router :to="{name: 'myPage'}">
              <v-list-tile-title>My Page</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$store.dispatch('signOut')">
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- 로그인이 안되어있으면 로그인 버튼이 우측 상단에 표시 -->
        <!-- <v-btn flat v-else router :to="{name: 'login'}">Log In</v-btn> -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-if="!showId" @click.stop="dialog = true" v-on="on">
              <v-icon>mdi-account-check</v-icon>
            </v-btn>
          </template>
          <span>Sign In</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-if="!showId" router :to="{name: 'SignUp'}" v-on="on">
              <v-icon>person_add</v-icon>
            </v-btn>
          </template>
          <span>Sign Up</span>
        </v-tooltip>

        <v-dialog persistent @keydown.esc="cancel" v-model="dialog" max-width="290">
          <v-card >
            <v-card-title class="headline">Log in</v-card-title>
            <v-form>
              <v-container>
                <v-layout>
                  <v-form>
                    <v-text-field
                      prepend-icon="person"
                      name="login"
                      label="Login"
                      type="text"
                      v-model="uid"
                      v-on:keyup.enter="login" 
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-model="pwd"
                      v-on:keyup.enter="login"
                    ></v-text-field>
                  </v-form>
                </v-layout>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-btn color="green darken-1" flat="flat" @click="login">submit</v-btn>
              <v-btn color="red darken-1" flat="flat" @click="cancel">cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-toolbar>
    <!-- <img src= "https://s3.ap-northeast-2.amazonaws.com/wearever1/1557662747517.png"/> -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="blue-grey darken-4" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import store from "./store";
import router from "./router";

export default {
  data() {
    return {
      dialog: store.state.login_dialog,
      drawer: null,
      uid: "",
      pwd: ""
    };
  },
  computed: {
    ...mapState(["isSeller", "Token"]),
    ...mapGetters({
      showId: "id",
      Token: "Token"
    })
  },
  async created(){
    if(this.$store.state.Token!=null){
      var temp=await this.$http.get(`http://localhost:3000/user/${this.$store.state.id}`)
      if(temp.data.response.isSeller)
        this.$store.state.isSeller=true
    }
  },
  methods: {
    async login() {
      try {
        console.log("들어옴");
        console.log(this.uid, this.pwd);
        await this.$store.dispatch("login", {
          id: this.uid,
          pwd: this.pwd
        });
      } catch (err) {
        console.log(err);
        console.log(err.response.data.message);
        alert(err.response.data.message);
      }
      this.dialog = false;
      this.clear();
    },
    logout() {
      this.$store.dispatch("signOut");
    },
    home() {
      router.push({ name: "home" });
    },
    cancel() {
      this.dialog = false;
      this.clear();
    },
    clear() {
      this.uid = "";
      this.pwd = "";
    },
    convert_login_status() {
      // 로그인 안되어 있을 경우
      if (store.state.Token === null) {
        this.dialog = true;
      }
      // 로그인 되있을 경우
      else {
        router.push({ name: "enrollSeller" });
      }
    },
    convert_login_status_for_mypage() {
      // 로그인 안되어 있을 경우
      if (store.state.Token === null) {
        this.dialog = true;
      }
      // 로그인 되있을 경우
      else {
        router.push({ name: "myPage" });
      }
    }
  },
  watch: {
    dialog () {
      const handler = e => {
        if (e.keyCode === 27) {
          this.cancel();
          window.removeEventListener('keydown', handler)
        }
      }
      if (this.dialog) {
        window.addEventListener('keydown', handler)
      }
    }
  },
};
</script>