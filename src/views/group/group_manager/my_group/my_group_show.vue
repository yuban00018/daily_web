<template >
  <v-container>
    <v-card
        v-for="tmp in sliceGroupInfoArr"
        :key="tmp.groupId"
        class="mx-auto"
        flat
        height="300"
        max-width="600"
        tile
    >
      <v-card-title style="height: 25%">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold blue--text text-h5">
              {{ tmp.groupName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-title>
      <v-card-subtitle style="height: 20%">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="font-weight-medium grey--text text-subtitle-2">
              小组等级：{{ parseInt((tmp.allexp - 1) / 10 + 1) }}  近期活跃度：{{ tmp.recexp }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-medium grey--text text-subtitle-2">
              成员数量：{{ tmp.memberNumber }} &nbsp; 分类：{{ kinds[tmp.kind] }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-subtitle>
      <v-card-text style="height: 40%; background-color: #FAFAFA">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              小队宣言：{{ tmp.content }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="modify(tmp.groupId)"
        >
          修改
        </v-btn>
        <v-btn
            text
            color="warning"
            @click="del(tmp)"
        >
          删除
        </v-btn>
        <v-btn
            text
            color="green"
            @click="enter(tmp)"
        >
          进入
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
    </v-card>


    <v-card flat height="25"></v-card>


    <div class="text-center">
      <v-pagination
          v-model="currentPage"
          :length="totalPages"
          circle
      >
      </v-pagination>
    </div>
  </v-container>
</template >

<script >
import {UserPossessGroupInfo} from "@/api/group";
import {UserDelPossessGroup} from "@/api/group";
import {store} from "@/api/commonVar";
export default {
  name: "my_group_show",
  data() {
    return {
      groupInfoArr: [],
      sliceGroupInfoArr: [],
      groupInfoArrIsEmpty: 1,
      showOrCMChoice: 1,
      kinds: {
        1: '娱乐',
        2: '生活',
        3: '电竞',
        4: '科技',
        5: '体育',
      },
      totalPages: 0,
      currentPage: 1,
    }
  },
  mounted() {
    UserPossessGroupInfo(localStorage.getItem('id')).then(
        res => {
          if (res.data.code === 200) {
            // console.log(res.data.data);
            this.groupInfoArr = res.data.data;
            if (this.groupInfoArr.length > 0)
              this.groupInfoArrIsEmpty = 0;
            this.totalPages = parseInt((this.groupInfoArr.length - 1) / 3 + 1);
            this.sliceGroupInfoArr = this.groupInfoArr.slice((this.currentPage-1) * 3, this.currentPage * 3);
          }
          else if (res.data.code === 403) {
            store.setMessage("当前用户不存在");
          }
        }
    ).catch(err=>{
      this.$message.error(err);
    })
  },
  watch: {
  currentPage() {
    // console.log("currentPage: " + this.currentPage);
    // console.log("sliceGroupInfoArr: " + this.sliceGroupInfoArr);
    this.sliceGroupInfoArr = this.groupInfoArr.slice((this.currentPage-1) * 3, this.currentPage * 3);
  }
  },
  methods: {
    del(tmp) {
      UserDelPossessGroup(localStorage.getItem('id'), tmp.groupId).then(
          res => {
            if (res.data.code === 200) {
              store.setMessage('删除成功！')
              this.reload();
            } else if (res.data.code === 403) {
              store.setMessage('无权限or小组不存在！');
            } else if (res.data.code === 405) {
              store.setMessage('数据错误！');
            } else {
              store.setMessage('未知错误');
            }
          }
      )
    },
    reload: function () {
      var {search, href} = window.location;
      href = href.replace(/&?t_reload=(\d+)/g, '')
      window.location.href = href + (search ? '&' : '?') + "t_reload=" + new Date().getTime()
    },
    jmp(path) {
      this.$router.replace(path).catch((err) => {
        err;
      });
    },
    modify(groupId) {
      this.jmp('create_modify?group_id=' + groupId);
    },
    enter(tmp) {
      this.$router.replace('../../group/group_info?group_id=' + tmp.groupId + '&leader=1').catch((err) => {
        err;
      });
    }
  }
}
</script >

<style scoped >

</style >