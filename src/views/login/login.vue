<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-alert :value="showLoginError" outlined type="error">
      {{ errorMessage }}
    </v-alert>
    <v-container id="loginContainer">
      <v-card ref="form" :loading="isLoading">
        <v-card-title>登录</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="name"
              :rules="[() => !!name || '请输入用户名']"
              label="用户名"
              placeholder="用户名"
              hint="请输入用户名而非邮箱"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="[() => !!password || '请输入密码']"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="密码"
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
            登录
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import {Submit} from "@/api/login";

export default {
  name: "login",
  computed: {},
  data() {
    return {
      valid:true,
      name: '',
      password: '',
      showPwd: false,
      rules: [],
      isLoading: false,
      showLoginError: false,
      errorMessage: ''
    }
  },
  methods: {
    submit() {
      if(!this.$refs.form.validate())
        return;
      this.isLoading = true;
      Submit(this.name, this.password).then(res => {
        this.isLoading = false;
        if (res.data.code === 200) {
          this.showLoginError = false;
          localStorage.setItem("id", res.data.data.id);
          localStorage.setItem("name", res.data.data.name);
          localStorage.setItem("avatar", res.data.data.avatar);
          localStorage.setItem("TokenKey", res.data.data.token); //SetToken不能正常工作
          localStorage.setItem("signUpDate",res.data.data.signUpDate);
          this.$router.push("/todo")
        } else {
          this.showLoginError = true
          this.errorMessage = "账号或密码错误"
          this.password = ""
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