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
          cols="6"
      >
        <v-card>
          <v-card-title v-text="todo.content"></v-card-title>
          <v-card-actions>
            <v-btn v-if="todo.done==='0'"
                   text
                   color="primary"
                   @click="check(todo.planId,'1');todo.done='1';">
              Done
            </v-btn>
            <v-btn v-if="todo.done!=='0'"
                   text
                   color="primary"
                   @click="check(todo.planId,'0');todo.done='0';">
              Undo
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {Check,GetList} from "@/api/plan";
export default {
  name: "todo",
  computed:{
    rate(){
      let done = 0;
      this.todoList.forEach(item=>{
        if(item.done==='1')done++;
      })
      return "今日完成率 "+Math.round(10000*done/this.todoList.length)/100+"%";
    }
  },
  mounted() {
    try {
      GetList().then(res => {
        if (res.data.code === 200) {
          this.todoList = res.data.data;
        } else {
          this.showError = true;
          this.errorMessage = res.data.message;
        }
      })
    }catch (e) {
      this.showError = true;
      this.errorMessage = e.message;
    }
  },
  data: () => {
    return {
      showError:false,
      errorMessage:"",
      todoList: [
      ]
    }
  },
  methods:{
    check(planId,done){
      Check(planId,done).then(res=>{
        if(res.data.code!==200){
          this.showError=true;
          this.errorMessage = res.data.message;
        }
      })
    },
  }
}
</script>

<style scoped>

</style>