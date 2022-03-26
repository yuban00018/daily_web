<template >
  <v-container>
    <v-icon>mdi-pirate</v-icon>
    <div>
        <v-card height="20" flat></v-card>
        <v-text-field
            label="Group Name"
            :rules="rules"
            hide-details="auto"
            v-model="groupName"
            height="40"
            append-icon="mdi-account-supervisor-outline"
        ></v-text-field>


        <v-card height="60" flat></v-card>
        <v-textarea
            name="content"
            v-model="content"
            filled
            label="Announcement"
            auto-grow
            hint="Please input the announcement of your team here."
            append-icon="mdi-clipboard-text-multiple-outline"
        ></v-textarea>


        <v-card height="30" flat></v-card>
        <v-radio-group v-model="kind">
          <template v-slot:label>
            <div>The <strong>sort</strong> of your team</div>
          </template>
          <v-radio value="1">
            <template v-slot:label>
              <div><strong class="red--text">娱乐</strong></div>
            </template>
          </v-radio>
          <v-radio value="2">
            <template v-slot:label>
              <div><strong class="green--text">生活</strong></div>
            </template>
          </v-radio>
          <v-radio value="3">
            <template v-slot:label>
              <div><strong class="primary--text">电竞</strong></div>
            </template>
          </v-radio>
          <v-radio value="4">
            <template v-slot:label>
              <div><strong class="blue--text">科技</strong></div>
            </template>
          </v-radio>
          <v-radio value="5">
            <template v-slot:label>
              <div><strong class="warning--text">体育</strong></div>
            </template>
          </v-radio>
        </v-radio-group>


        <v-card height="50" flat></v-card>
        <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
        >
          Click the button below to create your own group, be a good group administrator and contribute to our community.
        </v-alert>


        <div class="text-center">
          <v-dialog
              v-model="dialog"
              width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="red lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                Click Me
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Privacy Policy
              </v-card-title>
              <v-card-subtitle>&nbsp;</v-card-subtitle>
              <v-card-text>
                All information and charts published on this website are for reference only. The publication of these documents does not constitute an offer or intention to acquire, purchase, subscribe, sell or hold any shares. Those who refer to the documents published on this website shall be deemed to have confirmed the above position.
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="done()"
                >
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
  </div>
  </v-container>
</template >

<script >

import {CreateOrModifyGroupInfo, GetGroupInfoByGroupId} from "@/api/group";
import {store} from "@/api/commonVar";

export default {
  name: "my_group_create_modify",
  data() {
    return {
      groupId: -1,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      groupName: '',
      content: '',
      kind: '',
      allexp: 0,
      recexp: 0,
      memberNumber: 1,
      dialog: false,
    }
  },
  mounted() {
    this.groupId = Number(this.$route.query.group_id);
    if (isNaN(this.groupId))
      this.groupId = -1;
    else {
      // console.log(666);
      GetGroupInfoByGroupId(this.groupId).then(
          res => {
            // console.log(res.data.data);
            if (res.data.code === 200) {
              this.groupName = res.data.data.groupName;
              this.content = res.data.data.content;
              this.kind = res.data.data.kind;
              this.allexp = res.data.data.allexp;
              this.recexp = res.data.data.recexp;
              this.memberNumber = res.data.data.memberNumber;
            }
            else {
              store.setMessage("未找到该小组！请返回！");
            }
          }
      ).catch(err=>{
        this.$message.error(err);
      })
    }
  },
  methods: {
    done() {
      this.dialog = false;
      let tmp = {};
      tmp.groupId = this.groupId;
      tmp.allexp = this.allexp;
      tmp.recexp = this.recexp;
      tmp.leaderId = localStorage.getItem('id');
      tmp.content = this.content;
      tmp.memberNumber = this.memberNumber;
      tmp.kind = this.kind;
      tmp.groupName = this.groupName;
      CreateOrModifyGroupInfo(tmp).then(
          res => {
            // console.log(res);
            if (res.data.code === 200) {
              if (tmp.groupId === -1)
                store.setMessage("创建小组成功！");
              else
                store.setMessage("修改小组成功！");
            }
            else if (res.data.code !== 200) {
              store.setMessage("失败！");
            }
          }
      ).catch(err=>{
        this.$message.error(err);
      })
      this.jmp('show');
    },
    jmp(path) {
      this.$router.replace(path).catch((err) => {
        err;
      });
    },
  }
}
</script >

<style scoped >

</style >