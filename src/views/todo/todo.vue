<template>
  <v-container fluid>
    <v-alert v-text="errorMessage" :value="showError" outlined type="error"></v-alert>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-img
              height="60px"
              src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-card-title style="color: azure" v-text="rate"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
          v-for="todo in todoList"
          :key="todo.title"
          cols="col-lg-3 col-md-4 col-sm-12 col-12"
      >
        <v-card>
          <v-card-title v-text="todo.content"></v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                :color="todo.doneButton==='完成'?'primary':'warning'"
                @click="updatePlan(todo)">
              {{ todo.doneButton }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {UpdatePlan, GetList} from "@/api/plan";

export default {
  name: "todo",
  computed: {
    rate() {
      let done = 0;
      this.todoList.forEach(item => {
        if (item.done === '1') done++;
      })
      let denominator = this.todoList.length;
      if(this.todoList.length===0){
        denominator = 1;
        done = 1;
      }
      return "今日完成率 " + Math.round(10000 * done / denominator) / 100 + "%";
    }
  },
  mounted() {
    try {
      GetList().then(res => {
        if (res.data.code === 200) {
          let list = res.data.data;
          let day = new Date().getDay();
          list.forEach(todo => {
            if (todo.type === 'on' && todo.frequency.search(day)!==-1) {
              todo.doneButton = todo.done === '0' ? '完成' : '撤销'
              this.todoList.push(todo)
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
  data: () => {
    return {
      showError: false,
      errorMessage: "",
      todoList: []
    }
  },
  methods: {
    updatePlan(todo) {
      todo.done = todo.done === '0' ? '1' : '0';
      todo.doneButton = todo.doneButton === '完成' ? '撤销' : '完成';
      UpdatePlan(todo).then(res => {
        if (res.data.code !== 200) {
          this.showError = true;
          this.errorMessage = res.data.message;
        }
      })
    },
  }
}
</script>

<style scoped>

</style>