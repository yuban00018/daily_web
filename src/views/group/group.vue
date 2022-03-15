<template>
  <div>
    <v-card flat>
      <v-navigation-drawer
          :mini-variant.sync="mini"
          permanent
          id="drawer"
          height="950"
          width="16%"
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://ss2.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2554268124,3494511532&fm=26&gp=0.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ myName }}</v-list-item-title>

          <v-btn
              icon
              @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="jmp(item.nav)"
              link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <div id="content">
        <router-view></router-view>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "group",
  data() {
    return {
      myName: "",
      items: [
        { title: '我加入的', icon: 'mdi-account', nav: 'my_group' },
        { title: '发现小组', icon: 'mdi-account-group-outline', nav: 'group_hall' },
      ],
      mini: false,
    }
  },
  mounted() {
    this.myName = localStorage.getItem("name")
  },
  watch: {
    mini() {
      if (this.mini === false)
        document.getElementById("content").style.left = "18%";
      else
        document.getElementById("content").style.left = "12%";
      return this.mini;
    },
  },
  methods: {
    jmp(path) {
      this.$router.replace("/group/" + path).catch((err) => {
        err;
      });
    },
  },
}
</script>

<style scoped>
 #content {
   position: absolute;
   height: 92%;
   width: 80%;
   left: 18%;
   top: 0%;
 }
</style>