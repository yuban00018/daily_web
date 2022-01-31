<template>
  <v-form>
    <v-container id="loginContainer">
      <v-card ref="form" :loading="isLoading">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              label="Username"
              placeholder="username"
              hint="Email login is not available"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="[() => !!password || 'This field is required']"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="Password"
              name="password-input"
              @click:append="showPwd = !showPwd"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-2"></v-divider>
        <v-card-actions>
          <v-btn
              color="primary"
              text
              @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import {Submit} from "@/api/login";
import {SetToken} from "@/api/auth";

export default {
  name: "login",
  computed: {},
  data() {
    return {
      name: '',
      password: '',
      showPwd: false,
      rules: [],
      isLoading:false,
    }
  },
  methods:{
    submit(){
      this.isLoading = true;
        Submit(this.name, this.password).then(res => {
          this.isLoading = false;
          if (res.data.code === 200) {
            SetToken(res.data.data.token);
          }
        })
    },
  }
}
</script>

<style scoped>
@media (min-device-width: 550px) {
  #loginContainer {
    width: 550px;
  }
}
</style>