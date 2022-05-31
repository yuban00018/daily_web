<template >
  <v-container>
    <v-card
        width="700"
        height="1100"
        class="mx-auto"
        flat
    >
      <v-icon>mdi-robot-confused-outline</v-icon>


      <div>
        <v-card height="20" flat></v-card>
        <v-text-field
            label="Task Name"
            :rules="rules"
            hide-details="auto"
            v-model="taskName"
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
            hint="Please input the explanation of your task here."
            append-icon="mdi-clipboard-text-multiple-outline"
        ></v-textarea>


        <v-card height="30" flat></v-card>
        <v-container>
          <p>
            您发布的任务每周日期为&nbsp; <strong>{{ daysChoice2 }}</strong>
          </p>
          <v-checkbox
              v-model="daysChoice"
              label="周一"
              color="red"
              value="周一"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="daysChoice"
              label="周二"
              color="red"
              value="周二"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="daysChoice"
              label="周三"
              color="red"
              value="周三"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="daysChoice"
              label="周四"
              color="red"
              value="周四"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="daysChoice"
              label="周五"
              color="red"
              value="周五"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="daysChoice"
              label="周六"
              color="red"
              value="周六"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="daysChoice"
              label="周日"
              color="red"
              value="周日"
              hide-details
          ></v-checkbox>
        </v-container>


        <v-card height="50" flat></v-card>
        <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
        >
          If you click the button below, a new task will be released. Any team member will receive a message and they will decide whether to complete it.
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
    </v-card>
  </v-container>
</template >

<script >
import {CreateOrModifyPlanInfo, GetPlanInfoByPlanId} from "@/api/group";
import {store} from "@/api/commonVar";

export default {
  name: "publish_task",
  data() {
    return {
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      content: '',
      taskName: '',
      daysChoice: [],
      daysChoice2: '',
      dialog: false,
      frequency: '',
      daysArr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      planId: -1,
    }
  },
  mounted() {
    this.planId = Number(this.$route.query.plan_id);
    if (isNaN(this.planId))
      this.planId = -1;
    else {
      // console.log(666);
      GetPlanInfoByPlanId(this.planId).then(
          res => {
            // console.log(res.data.data);
            if (res.data.code === 200) {
              this.taskName = res.data.data.planName;
              this.content = res.data.data.content;
              this.frequency = res.data.data.frequency;
              localStorage.setItem('groupId', res.data.data.groupId);
              this.planId = res.data.data.planId;
            } else {
              store.setMessage("未找到该任务！请返回！");
            }
          }
      ).catch(err => {
        this.$message.error(err);
      })
    }
  },
  watch: {
    daysChoice() {
      this.daysChoice2 = '';
      this.frequency = '';
      for (var i = 0; i < this.daysArr.length; i++) {
        for (var j = 0; j < this.daysChoice.length; j++) {
          if (this.daysArr[i] === this.daysChoice[j]) {
            if (this.daysChoice2.length > 0)
              this.daysChoice2 += '、' + this.daysArr[i];
            else
              this.daysChoice2 += this.daysArr[i];
            this.frequency += (i + 1).toString();
            break;
          }
        }
      }
      // console.log(this.frequency);
    }
  },
  methods: {
    done() {
      var tmp = {};
      tmp.groupId = localStorage.getItem('groupId');
      tmp.content = this.content;
      tmp.planName = this.taskName;
      tmp.frequency = this.frequency;
      tmp.userId = localStorage.getItem('id');
      tmp.planId = this.planId;
      CreateOrModifyPlanInfo(tmp).then(
          res => {
            // console.log(res);
            if (res.data.code === 200) {
              if (tmp.groupId === -1)
                store.setMessage("创建小组任务成功！");
              else
                store.setMessage("修改小组任务成功！");
            }
            else if (res.data.code !== 200) {
              store.setMessage("失败！");
            }
          }
      ).catch(err=>{
        this.$message.error(err);
      })
      this.$router.replace("my_group/show");
    },
  }
}
</script >

<style scoped >

</style >
