<template >
  <v-container>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
          class="indigo lighten-2 py-2 text-center white--text"
          cols="12"
      >
        欢迎来到小组大厅，{{ myName }}
      </v-col>
      <v-col
          class="indigo lighten-3 py-2 text-center white--text"
          cols="12"
      >
        加入一些小组来定制你的小组首页，我们为你推荐了一些，按分类选择你感兴趣的加入，试试看！
      </v-col>
    </v-row>


    <!--推荐小组部分-->
    <v-row>
      <v-col
          v-for="tmp in recommendList"
          :key="tmp.title"
          cols="col-lg-1 col-md-4 col-sm-12 col-12 pa-6"
      >
        <v-card
            min-width="180"
        >
          <v-card-title>
            {{ tmp.groupName }}
          </v-card-title>
          <v-card-subtitle v-text="'等级：' + (parseInt(parseInt((tmp.allexp - 1) / 10)) + 1) + '级'"></v-card-subtitle>
          <v-card-text
              v-text="changeContent(tmp.content)"
              style="min-height: 90px"
          ></v-card-text>
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
  </v-container>
</template >

<script >
import {GetRecommend, UserJoinGroup} from "@/api/group";
import {store} from "@/api/commonVar";
export default {
  name: "group_hall_default",
  mounted() {
    this.myName = localStorage.getItem("name")
    this.header_visible = true;
    GetRecommend().then(
        res => {
          if (res.data.code === 200) {
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
      myName: "",
      recommendList: [],
      recommendListIsEmpty: 0,
      header_visible: true,
      showGroupRecommendError: false,
      errorMessage: "",
    }
  },
  methods: {
    changeContent(words) {
      if (words.length > 58) {
        words = words.substr(0, 58);
        words += ". . .";
      }
      return words;
    },
    find(tmp) {
      this.$router.replace({path: '/group/group_info', query: {group_id: tmp.groupId}})
          .catch((err) => {
            this.$message.error(err);
          });
    },
    join(tmp) {
      UserJoinGroup(localStorage.getItem("id"), tmp.groupId).then(
          res => {
            // console.log("res.data.code: " + res.data.code);
            if (res.data.code === 200) {
              store.setMessage("加入成功！")
            }
            else if (res.data.code === 403) {
              store.setMessage("您已经加入过了！")
            }
            else if (res.data.code === 405) {
              store.setMessage("数据信息错误！")
            }
          }
      ).catch(err=>{
        this.$message.error(err);
      })
    }
  }
}
</script >

<style scoped >
</style >