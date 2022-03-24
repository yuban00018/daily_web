<template>
  <v-app>
    <v-expand-x-transition mode="appear">
      <v-navigation-drawer
        v-if="drawer"
        v-model="drawer"
        app
        clipped
        permanent
    >

      <!-- 添加permanent和v-if才能让抽屉导航处于app-bar下方 -->
      <v-list
          nav
      >
        <v-list-item-group
            v-model="selectedMenu"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(item,i) in menu"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </v-expand-x-transition>


    <v-app-bar
        app
        clipped-left
        elevate-on-scroll
        scroll-target="#scroll"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Daily</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
          transition="slide-y-transition"
          offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group
              v-model="selectedVertical"
              active-class="deep-purple--text text--accent-4"
          >
            <v-list-item
              v-for="(item,i) in verticalList"
              :key="i"
          >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <v-container fluid id="scroll">
        <v-snackbar v-model="snackbarState.showSnack">
          {{ snackbarState.message }}
          <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbarState.showSnack = false"
            >
              关闭
            </v-btn>
          </template>
        </v-snackbar>
        <homepage></homepage>
      </v-container>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

import Homepage from "@/views/homepage";
import {store} from "@/api/commonVar"

export default {
  name: 'App',

  components: {
    Homepage
  },

  data: () => ({
    snackbarState: store.state,
    drawer: false,
    selectedVertical:null,
    selectedMenu: null,
    menu: [
      { text: '今日待办', icon: 'mdi-format-list-checks' },
      { text: '新增待办', icon: 'mdi-pencil-ruler' },
      { text: '统计数据', icon: 'mdi-chart-line' },
      { text: '小组', icon: 'mdi-human-queue' },
    ],
    verticalList: [{text:'登出',icon: 'mdi-logout'}]
  }),

  watch: {
    selectedMenu () {
      this.drawer = false
      let path = ['/todo','/plan','/statistic','/group']
      this.$router.push(path[this.selectedMenu])
    },
    selectedVertical(){
      //console.log(this.selectedVertical)
      this.$router.push('/')
      localStorage.clear()
    }
  },
};
</script>
