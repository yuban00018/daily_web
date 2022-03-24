<template >
  <v-container>
    <v-banner
        single-line
        v-if="isLeader"
    >
      <v-icon
          slot="icon"
          color="warning"
          size="36"
      >
        mdi-home-analytics
      </v-icon>
      <v-card-text class="text-h5">
        欢迎组长 {{ this.groupInfo.leaderName }}！
      </v-card-text>
      <template v-slot:actions>
        <v-btn
            color="warning"
            text
            @click="publish()"
        >
          <v-card-text class="font-weight-bold text-subtitle-1">
            发布小组任务
          </v-card-text>
        </v-btn>
      </template>
    </v-banner>


    <v-container
        class="d-flex justify-center"
        v-if="isComputer"
    >
      <v-card
          class="mx-auto"
          max-width="300"
          tile
          height="350"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title >
              <div class="font-weight-medium text-h6" style="display: inline-block;">
                小组名：
              </div>
              <div class="font-weight-bold blue--text text-h6" style="display: inline-block;">
                {{ groupInfo.groupName }}
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>小组id：{{ groupInfo.groupId }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>管理员：{{ groupInfo.leaderName }}</v-list-item-title>
            <v-list-item-subtitle>管理员id：{{ groupInfo.leaderId }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>小组等级：{{ parseInt((groupInfo.allexp - 1) / 10 + 1) }}</v-list-item-title>
            <v-list-item-subtitle>
              近期活跃度：{{ groupInfo.recexp }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>成员数量：{{ groupInfo.memberNumber }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>分类：{{ kinds[groupInfo.kind] }}</v-list-item-title>
            <v-list-item-subtitle>
              小队宣言：{{ groupInfo.content }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>


      <v-carousel height="350">
        <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item"
            reverse-transition="fade-transition"
            transition="fade-transition"
        >
        </v-carousel-item>
      </v-carousel>


      <v-card height="350" max-width="300">
        <v-date-picker v-model="picker"></v-date-picker>
      </v-card>
    </v-container>


    <v-card height="50" flat></v-card>


    <div v-if="!groupPlanIsEmpty">
      <v-card
          v-for="i in groupPlan"
          :key="i.planId"
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
          任务
          <br />
          {{ i.planId }}
        </v-card>

        <v-card
            outlined
            tile
            width="600"
            height="180"
        >
          <v-card-text id="woc2">
            {{ i.planName }}
          </v-card-text>

          <v-card-text
              id="woc3"
              v-text="changeContent(i.content, 58)"
          >
          </v-card-text>

          <v-card-actions class="woc4">
            <v-spacer></v-spacer>
            <v-btn
                text
                color="green"
                @click="modify(i);"
                v-if="isLeader"
            >
              修改
            </v-btn>
            <v-btn
                text
                color="warning"
                @click="del(i);"
                v-if="isLeader"
            >
              删除
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="dealWith(i);"
            >
              {{ i.type }}
            </v-btn>
            <v-card
              width="10"
              flat
            ></v-card>
          </v-card-actions>
        </v-card>
      </v-card>
    </div>


    <v-card v-if="groupPlanIsEmpty">
      <v-card-title>
        注意
      </v-card-title>
      <v-card-text>
        该小组目前还未发布任务！
      </v-card-text>
    </v-card>
  </v-container>
</template >

<script >
import {GetGroupInfoByGroupId, UserDelPlanInfo} from "../../../api/group";
import {GetGroupPlanByGroupId} from "../../../api/group";
import {judge} from "../../../api/judge";
import {UserDoGroupPlan} from "../../../api/group";
import {UserFailGroupPlan} from "../../../api/group";

export default {
  name: "group_info",
  data() {
    return {
      groupId: -1,
      showGroupRecommendError: false,
      errorMessage: "",
      groupPlan: [],
      groupPlanIsEmpty: 1,
      groupInfo: [],
      isComputer: 1,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      items: [
        require('@/assets/1.jpg'),
        require('@/assets/2.jpg'),
      ],
      arrays: [
        require('@/assets/娱乐1.jpg'),
        require('@/assets/娱乐2.jpg'),
        require('@/assets/生活1.jpg'),
        require('@/assets/生活2.jpg'),
        require('@/assets/电竞1.jpg'),
        require('@/assets/电竞2.jpg'),
        require('@/assets/科技1.jpg'),
        require('@/assets/科技2.jpg'),
        require('@/assets/体育1.jpg'),
        require('@/assets/体育2.jpg'),
      ],
      kinds: {
        1: '娱乐',
        2: '生活',
        3: '电竞',
        4: '科技',
        5: '体育',
      },
      isLeader: 1,
    }
  },
  mounted() {
    this.groupId = Number(this.$route.query.group_id);
    if (isNaN(this.groupId)) {
      alert('操作有误！')
      this.$router.go(-1);
    }
    GetGroupInfoByGroupId(this.groupId).then(
        res => {
          if (res.data.code === 200) {
            this.groupInfo = res.data.data;
            localStorage.setItem('groupId', this.groupInfo.groupId);
            this.items.push(this.arrays[parseInt(this.groupInfo.kind) * 2 - 1]);
            this.items.push(this.arrays[parseInt(this.groupInfo.kind) * 2 - 2]);
            this.items.reverse();
            // console.log(parseInt(this.groupInfo.kind) * 2 - 1);
            // console.log(this.items[3]);
            if (isNaN(Number(this.$route.query.leader)))
              this.isLeader = 0;
          }
          else {
            this.errorMessage = "未找到该小组！";
            this.showGroupRecommendError = true;
          }
        }
    ).catch(err=>{
      this.$message.error(err);
    })
    // console.log("前面顺利")
    GetGroupPlanByGroupId(this.groupId).then(
        res => {
          if (res.data.code === 200) {
            this.groupPlan = res.data.data;
            // console.log(this.groupPlan);
            if (this.groupPlan.length > 0)
              this.groupPlanIsEmpty = 0;
          }
          else {
            this.errorMessage = "未找到小组发布的信息！";
            this.showGroupRecommendError = true;
          }
        }
    ).catch(err=>{
      this.$message.error(err);
    })
    this.isComputer = judge();
  },
  methods: {
    changeContent(words, len) {
      if (words.length > len) {
        words = words.substr(0, len);
        words += ". . .";
      }
      return words;
    },
    dealWith(tmp) {
      if (tmp.type === "on") {
        UserFailGroupPlan(localStorage.getItem("id"), tmp.planId).then(
            res => {
              if (res.data.code !== 200) {
                alert("数据错误！")
                tmp.type = "on";
              }
              else
                tmp.type = "off";
            }
        ).catch(err=>{
          this.$message.error(err);
          tmp.type = "on";
        })
      }
      else {
        UserDoGroupPlan(localStorage.getItem("id"), tmp.planId).then(
            res => {
              if (res.data.code !== 200) {
                alert("您还没有加入该组！");
                tmp.type = 'off';
              }
              else
                tmp.type = "on";
            }
        ).catch(err=>{
          this.$message.error(err);
          tmp.type = 'off';
        })
      }
    },
    publish() {
      this.jmp('publish_task');
    },
    modify(i) {
      this.jmp('publish_task?plan_id=' + i.planId);
    },
    del(i) {
      UserDelPlanInfo(localStorage.getItem('id'), i.planId).then(
          res => {
            if (res.data.code === 200) {
              alert('删除成功！');
              this.reload();
            }
            else {
              alert("出错！");
              this.reload();
            }
          }
      ).catch(err=>{
        this.$message.error(err);
        this.reload();
      })
    },
    jmp(path) {
      this.$router.replace(path).catch((err) => {
        err;
      });
    },
    reload: function (){
      var {search,href} = window.location;
      href = href.replace(/&?t_reload=(\d+)/g,'')
      window.location.href = href+(search?'&':'?')+"t_reload="+new Date().getTime()
    },
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