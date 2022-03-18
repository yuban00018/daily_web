<template >
  <div>
    <!--标题-->
    <v-footer
        color="indigo lighten-1"
        padless
    >
      <v-row
          justify="center"
          no-gutters
      >
        <v-btn
            v-for="link in links"
            :key="link.name"
            color="white"
            text
            rounded
            class="my-2"
            @click="jmp(link.lnk)"
        >
          {{ link.name }}
        </v-btn>
        <v-col
            class="indigo lighten-2 py-2 text-center white--text"
            cols="12"
            v-if="header_visible"
        >
          欢迎来到小组大厅，{{ myName }}
        </v-col>
        <v-col
            class="indigo lighten-3 py-2 text-center white--text"
            cols="12"
            v-if="header_visible"
        >
          加入一些小组来定制你的小组首页，我们为你推荐了一些，按分类选择你感兴趣的加入，试试看！
        </v-col>
      </v-row>
    </v-footer>

    <!--推荐小组部分-->
    <v-row dense>
      <v-col
          v-for="tmp in recommendList"
          :key="tmp.title"
          cols="col-lg-3 col-md-4 col-sm-12 col-12 pa-6"
      >
        <v-card>
          <v-card-title v-text="tmp.groupName"></v-card-title>
          <v-card-subtitle v-text="'等级：' + (parseInt((tmp.allexp - 1) / 10) + 1) + '级'"></v-card-subtitle>
          <v-card-text v-text="tmp.content"></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                :color="'primary'"
                @click="join(tmp)">
              加入
            </v-btn>
            <v-btn
                text
                :color="'warning'"
                @click="find(tmp)">
              了解
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="recommendListIsEmpty">
      未找到小组推荐
    </div>

    <v-alert :value="showGroupRecommendError" outlined type="error">
      {{ errorMessage }}
    </v-alert>
    <div id="common_group">
      <router-view></router-view>
    </div>
  </div>
</template >


<script >
import {GetRecommend} from "../../../api/group";
export default {
  name: "group_hall",
  mounted() {
    this.myName = localStorage.getItem("name")
    this.header_visible = true;
    GetRecommend().then(
        res=> {
          if (res.data.code === 200) {
            // console.log(res.data.data);
            this.recommendList = res.data.data;
            if (this.recommendList.length === 0)
              this.recommendListIsEmpty = 1;
          }
          else {
            this.errorMessage = "推荐信息出错";
            this.showGroupRecommendError = true;
          }
        }
    ).catch(err=>{
      this.$message.error(err);
    })
  },
  data() {
    return {
      links: [
        { name: '精选', lnk: 'careful' },
        { name: '娱乐', lnk: 'happy' },
        { name: '生活', lnk: 'life' },
        { name: '电竞', lnk: 'game' },
        { name: '科技', lnk: 'science' },
        { name: '体育', lnk: 'pe' },
      ],
      myName: "",
      recommendList: [],
      recommendListIsEmpty: 0,
      header_visible: true,
  showGroupRecommendError: false,
      errorMessage: "",
    }
  },
  methods: {
    jmp(path) {
      this.header_visible = false;
      console.log(this.header_visible)
      this.$router.replace("/group/group_hall/" + path).catch((err) => {
        err;
      });
    }
  }
}
</script >

<style scoped >
  #common_group {
    position: absolute;
    top: 10%;
  }
</style >