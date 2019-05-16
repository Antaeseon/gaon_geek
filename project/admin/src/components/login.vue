<template>
  <div id="app">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
          <v-card height="500px"></v-card>
        </v-flex>
        <v-flex xs4 class="grey lighten-4">
          <v-container style="position: relative;top: 13%;" class="text-xs-center">
            <v-card flat>
              <v-card-title primary-title>
                <h4>Login</h4>
              </v-card-title>
              <v-form>
                <v-text-field prepend-icon="person" name="Username" label="Username" v-model="id"></v-text-field>
                <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="password"></v-text-field>
                <v-card-actions>
                  <v-btn primary large block @click="login">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    id:"",
    password:"",
  }),
  methods:{
    login(){
      try{
        this.$http.post('http://localhost:3000/admin/login',{id:this.id, password : this.password})
        this.$store.state.isLogin=true
      }
      catch(err){
        console.log(err.response.data.message)
        this.$store.state.isLogin=false
      }
    }
  }
};
</script>
