<template>
  <v-container fluid>
    <v-banner
      single-line
  >
    <v-icon
        slot="icon"
        color="warning"
        size="36"
    >
      mdi-home-analytics
    </v-icon>
    您加入的小组如下：

    <template v-slot:actions>
      <v-btn
          color="primary"
          text
          @click="exhibitionStyle = !exhibitionStyle;"
      >
        Exhibition Settings
      </v-btn>
    </template>
  </v-banner>

    <div v-if="!myJoinGroupInfoIsEmpty && exhibitionStyle">
      <v-card
          v-for="i in myJoinGroupInfo"
          :key="i.groupId"
          class="d-flex mb-12 justify-center"
          flat
      >
        <v-card
            id="woc1"
            color="#FAE9DA"
            outlined
            tile
            height="65"
            width="65"
        >
          {{ i.memberNumber }}
          <br />
          喜欢
        </v-card>
        <v-card
            outlined
            tile
            width="600"
            height="180"
        >
          <v-card-text id="woc2">
            {{ i.groupName }}
          </v-card-text>

          <v-card-text
              id="woc3"
              v-text="changeContent(i.content, 58)"
          >
          </v-card-text>

          <v-card-actions class="woc4">
            {{ kinds[i.kind - 1] }}
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="find(i.groupId)"
            >
              进入
            </v-btn>
            <v-btn
                text
                color="warning"
                @click="exit(i)"
            >
              退出
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </div>


    <div v-if="!myJoinGroupInfoIsEmpty && !exhibitionStyle">
      <v-row dense>
        <v-col
            v-for="tmp in myJoinGroupInfo"
            :key="tmp.groupId"
            cols="col-lg-3 col-md-6 col-sm-12 col-12 pa-6"
        >
          <v-card min-height="195">
            <v-card-title>
              {{ tmp.groupName }}
            </v-card-title>
            <v-card-subtitle>
              成员数：{{ tmp.memberNumber }}
              &nbsp;&nbsp;&nbsp;
              等级：{{ parseInt(parseInt((tmp.allexp - 1) / 10)) + 1 }}
            </v-card-subtitle>
            <v-card-text v-text="changeContent(tmp.content, 80)"></v-card-text>
            <v-card-actions
              class="woc4"
            >
              {{ kinds[tmp.kind - 1] }}
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="find(tmp.groupId)"
              >
                进入
              </v-btn>
              <v-btn
                  text
                  color="warning"
                  @click="exit(tmp)"
              >
                退出
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>


    <card v-if="myJoinGroupInfoIsEmpty">
        <v-card-title>
          注意
        </v-card-title>
        <v-card-text>
          您还没有选组！
        </v-card-text>
    </card>
  </v-container>




</template>

<script >
import {GetGroupInfoById} from "@/api/group";
import {UserExitGroup} from "@/api/group";
import {store} from "@/api/commonVar";
export default {
  name: "join_group",
  data() {
    return {
      myName: "",
      myId: -1,
      exhibitionStyle: 1,
      myJoinGroupInfo: [],
      myJoinGroupInfoIsEmpty: 0,
      kinds: ['娱乐', '生活', '电竞', '科技', '体育'],
    }
  },
  mounted() {
    this.myName = localStorage.getItem("name")
    this.myId = localStorage.getItem("id");
    GetGroupInfoById(this.myId).then (
      res => {
        // console.log(res.data.data);
        if (res.data.code === 200) {
          this.myJoinGroupInfo = res.data.data;
          if (this.myJoinGroupInfo.length === 0)
            this.myJoinGroupInfoIsEmpty = 1;
        }
      }
    ).catch(err=>{
      this.$message.error(err);
    })
  },
  methods: {
    changeContent(words, len) {
      if (words.length > len) {
        words = words.substr(0, len);
        words += ". . .";
      }
      return words;
    },
    find(tmp) {
      // console.log("tmp: " + tmp);
      this.$router.replace({path: '/group/group_info', query: {group_id: tmp}})
          .catch((err) => {
            this.$message.error(err);
          });
    },
    exit(tmp) {
      UserExitGroup(localStorage.getItem("id"), tmp.groupId).then(
          res => {
            // console.log("res.data.code: " + res.data.code);
            if (res.data.code === 200) {
              store.setMessage("退出成功！");
              this.reload();
            }
            else if (res.data.code === 403) {
              store.setMessage("您还未加入该小组！");
              this.reload();
            }
            else if (res.data.code === 405) {
              alert("组长无法退出！若要退出请到管理页面删除小组！");
              this.reload();
            }
          }
      ).catch(err=>{
        this.$message.error(err);
        this.reload();
      })
    },
    reload: function (){
      var {search,href} = window.location;
      href = href.replace(/&?t_reload=(\d+)/g,'')
      window.location.href = href+(search?'&':'?')+"t_reload="+new Date().getTime()
    }
  }
}
</script >

<style scoped >
#woc1 {
  position:relative;
  margin-top: 1.2%;
  font-size: 15px;
  text-align: center;
  margin-right: 1.2%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #CA6445;
}
#woc2 {
  color: #3377AA;
  font-size: large;
  height: 25%;
  display: flex;
  align-items: center;
}
#woc3 {
  background-color: #F9F9F9;
  font-size: medium;
  min-height: 50%;
}
.woc4 {
  display: flex;
  align-items: center;
  font-size: 92%;
  position: relative;
  left: 1.4%;
}
</style >