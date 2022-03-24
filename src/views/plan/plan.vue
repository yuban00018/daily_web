<template>
  <v-container fluid>
    <v-row>
      <v-col
          cols="12"
      >
        <v-card>
          <v-card-title>
            新增待办
          </v-card-title>
          <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-text-field
                  v-model="plan"
                  :counter="25"
                  :rules="planRules"
                  label="待办内容"
                  outlined
                  required
              ></v-text-field>
              <v-divider class="mt-2"></v-divider>
              <v-combobox
                  v-model="selectedFrequent"
                  :items="frequent"
                  label="频率"
                  :rules="frequentRules"
                  outlined
                  multiple
                  clearable
                  dense
              ></v-combobox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
                text
                color="primary"
                @click="addPlan"
            >
              提交
            </v-btn>
            <v-btn
                text
                color="warning"
                class="mr-4"
                @click="reset"
            >
              重置
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img
              height="60px"
              src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-card-title style="color: azure" v-text="listTitle"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="todo in todoList"
          :key="todo.title"
          cols="col-lg-3 col-md-4 col-sm-12 col-12"
      >
        <v-card>
          <v-card-title v-text="todo.content"></v-card-title>
          <v-card-text>
            <v-combobox
                v-model="todo.Frequency"
                :items="frequent"
                label="频率"
                :rules="frequentRules"
                multiple
                outlined
                dense
                @change="updatePlan(todo)"
            ></v-combobox>
          </v-card-text>
          <v-card-actions>
            <v-btn
                text
                color="warning"
                @click="deletePlan(todo)"
            >
              删除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                text
                false-value="off"
                true-value="on"
                :label="todo.type"
                :color="todo.type==='on'?'primary':'gray'"
                inset
                @click="todo.type=todo.type==='on'?'off':'on';updatePlan(todo);"
            >{{ todo.type }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {AddPlan, GetList, UpdatePlan, DeletePlan} from "@/api/plan";
import {Reload} from "@/api/tool";

export default {
  name: "plan",
  data() {
    return {
      todoSwitch: [],
      valid: true,
      frequent: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
      selectedFrequent: [],
      plan: '',
      planRules: [
        v => !!v || '内容不能为空',
        v => (v && v.length <= 25) || '内容不能多于25字',
      ],
      frequentRules: [
        v => v && v.length > 0 || '频率不能为空'
      ],
      todoList: [],
      listTitle: '现有待办事项'
    }
  },
  mounted() {
    try {
      GetList().then(res => {
        if (res.data.code === 200) {
          this.todoList = res.data.data;
          console.log(res.data.data)
          this.todoList.forEach(todo => {
            todo.Frequency = [];
            for (let i = 0;i<todo.frequency.length;i++) {
              switch (todo.frequency[i]) {
                case '1':
                  todo.Frequency.push('周一');
                  break;
                case '2':
                  todo.Frequency.push('周二');
                  break;
                case '3':
                  todo.Frequency.push('周三');
                  break;
                case '4':
                  todo.Frequency.push('周四');
                  break;
                case '5':
                  todo.Frequency.push('周五');
                  break;
                case '6':
                  todo.Frequency.push('周六');
                  break;
                case '7':
                  todo.Frequency.push('周天');
                  break;
                default:
                  break;
              }
            }
          })
        } else {
          this.showError = true;
          this.errorMessage = res.data.message;
        }
      })
    } catch (e) {
      this.showError = true;
      this.errorMessage = e.message;
    }
  },
  methods: {
    deletePlan(todo) {
      DeletePlan(todo.planId).then(res => {
        if (res.data.code !== 200) {
          this.showError = true;
          this.errorMessage = res.data.message;
        }
        Reload();
      })
    },
    updatePlan(todo) {
      // eslint-disable-next-line no-unused-vars
      let frequency = ''
      todo.Frequency.forEach(day => {
        switch (day) {
          case '周一':
            frequency += '1';
            break;
          case '周二':
            frequency += '2';
            break;
          case '周三':
            frequency += '3';
            break;
          case '周四':
            frequency += '4';
            break;
          case '周五':
            frequency += '5';
            break;
          case '周六':
            frequency += '6';
            break;
          case '周天':
            frequency += '7';
            break;
        }
      })
      todo.frequency = frequency
      UpdatePlan(todo).then(res => {
        if (res.data.code !== 200) {
          this.showError = true;
          this.errorMessage = res.data.message;
        }
      })
    },
    addPlan() {
      if (!this.$refs.form.validate())
        return;
      // eslint-disable-next-line no-unused-vars
      let frequency = '';
      this.selectedFrequent.forEach(day => {
        switch (day) {
          case '周一':
            frequency += '1';
            break;
          case '周二':
            frequency += '2';
            break;
          case '周三':
            frequency += '3';
            break;
          case '周四':
            frequency += '4';
            break;
          case '周五':
            frequency += '5';
            break;
          case '周六':
            frequency += '6';
            break;
          case '周天':
            frequency += '7';
            break;
        }
      })
      AddPlan(this.plan, frequency).then(res => {
        if (res.data.code === 200) {
          Reload();
        }
        Reload();
      })
    },
    reset() {
      this.$refs.form.reset();
    },
  }
}
</script>

<style scoped>

</style>