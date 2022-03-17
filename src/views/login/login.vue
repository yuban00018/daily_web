<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-container id="Container">
      <v-card v-if="showRegister" :loading="isRegisterLoading">
        <v-form ref="registerForm">
        <v-card-title>注册</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="registerForm.name"
              :rules="[() => !!registerForm.name || '请输入用户名']"
              hint="请输入用户名"
              label="用户名"
              placeholder="用户名"
              required
          ></v-text-field>
          <v-text-field
              v-model="registerForm.email"
              :rules="[() => !!registerForm.email || '请输入邮箱']"
              hint="请输入邮箱"
              label="邮箱"
              placeholder="邮箱"
              required
          ></v-text-field>
          <v-text-field
              v-model="registerForm.password"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[() => !!registerForm.password || '请输入密码']"
              :type="showPwd ? 'text' : 'password'"
              label="密码"
              name="password-input"
              @click:append="showPwd = !showPwd"
          ></v-text-field>
        </v-card-text>
        </v-form>
        <v-divider class="mt-2"></v-divider>
        <v-card-actions>
          <v-btn
              color="primary"
              text
              @click="register"
          >
            注册
          </v-btn>
          <v-spacer>
          </v-spacer>
          <v-btn
              color="warning"
              text
              @click="showRegister = false;showLogin = true;">
            返回
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="showLogin" ref="form" :loading="isLoading">
        <v-card-title>登录</v-card-title>
        <v-form ref="form">
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
        </v-form>
        <v-divider class="mt-2"></v-divider>
        <v-card-actions>
          <v-btn
              color="primary"
              text
              @click="submit"
          >
            登录
          </v-btn>
          <v-spacer>
          </v-spacer>
          <v-btn
              color="warning"
              text
              @click="
      showLogin = false;
      showRegister = true;">
            注册
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import {Register, Submit} from "@/api/login";
import {store} from "@/api/commonVar"

export default {
  name: "login",
  computed: {},
  data() {
    return {
      valid: true,
      name: '',
      password: '',
      showPwd: false,
      rules: [],
      isLoading: false,
      isRegisterLoading: false,
      showLogin: true,
      showRegister: false,
      registerForm:{name:'',email:'',password:''}
    }
  },
  methods: {
    register() {
      this.isRegisterLoading = true;
      Register(this.registerForm).then(res=>{
        this.isRegisterLoading = false;
        if(res.data.code === 200){
          this.showRegister = false;
          this.showLogin = true;
          store.setMessage("注册成功")
        }else{
          store.setMessage(res.data.message)
        }
      })
    },
    submit() {
      if (!this.$refs.form.validate())
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
          localStorage.setItem("signUpDate", res.data.data.signUpDate);
          this.$router.push("/todo")
        } else {
          store.setMessage(res.data.message);
        }
      })
    },
  }
}
</script>

<style scoped>
@media (min-device-width: 550px) {
  #Container {
    width: 550px;
  }
}
</style>