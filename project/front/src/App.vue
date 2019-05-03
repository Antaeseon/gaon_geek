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

        <!-- 회원가입  -->
        <v-list-tile router :to="{name: 'SignUp'}">
          <v-list-tile-action>
            <v-icon>assignment_ind</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>회원가입</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- isLogin이 false인 경우에만 왼쪽 바에서 로그인 버튼이 출력된다. -->
        <v-list-tile router :to="{name: 'login'}">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>로그인</v-list-tile-content>
        </v-list-tile>

        <!-- mypage router로 지시 -->
        <v-list-tile router :to="{name: 'mypage'}" exact>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>마이페이지</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- mypage router로 지시 -->
        <v-list-tile router :to="{name: 'googlemap'}" exact>
          <v-list-tile-action>
            <v-icon>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>googleMap</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router :to="{name: 'enrollSeller'}">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>판매자 등록</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- 로그인 되어있으면 welcome 표시 -->
        <v-menu offset-y v-if="showId">
          <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile router :to="{name: 'mypage'}">
              <v-list-tile-title>My Page</v-list-tile-title>
            </v-list-tile>
            <!-- store.action 참조하는 방법 -->
            <!-- store.mutation 참조하는 방법-->
            <!-- @click="$store.commit('loginSuccess')" -->
            <v-list-tile @click="$store.dispatch('signOut')">
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- 로그인이 안되어있으면 로그인 버튼이 우측 상단에 표시 -->
        <!-- <v-btn flat v-else router :to="{name: 'login'}">Log In</v-btn> -->
        <v-btn v-else @click.stop="dialog = true">log in</v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
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
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-model="pwd"
                    ></v-text-field>
                  </v-form>
                </v-layout>
              </v-container>
            </v-form>

            <v-card-actions>
              <v-btn color="green darken-1" flat="flat" @click="login">submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      drawer: null,
      uid: "",
      pwd: ""
    };
  },
  computed: {
    ...mapGetters({
      showId: "id",
      Token: "Token"
    })
  },
  methods: {
    async login() {
      try {
        console.log("들어옴");
        console.log(this.uid, this.pwd);
        await this.$store.dispatch("login", {
          id : this.uid,
          pwd : this.pwd
        });
      } catch (err) {
        console.log(err)
        console.log(err.response.data.message);
        alert(err.response.data.message);
      }
      this.dialog = false;
      this.clear();
    },
    logout() {
      this.$store.dispatch("signOut");
    },
    clear(){
      this.uid='';
      this.pwd='';
    }
  }
};
</script>