<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img
              height="60px"
              src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-card-title style="color: azure" v-text="title"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-sheet height="500">
          <v-calendar
              ref="calendar"
              :now="today"
              :value="today"
              color="primary"
          >
            <template v-slot:day="{ past, date }">
              <v-row
                  class="fill-height"
              >
                <template v-if="past && tracked[date]">
                  <v-sheet
                      v-for="(percent, i) in tracked[date]"
                      :key="i"
                      :color="colors[i]"
                      :title="category[i]"
                      :width="`${percent}%`"
                      height="100%"
                      tile
                  ></v-sheet>
                </template>
              </v-row>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '@/api/tool'
import {GetRecent} from "@/api/statistic";

export default {
  name: "statistic",
  created() {
    GetRecent().then(res => {
      if (res.data.code === 200) {
        let failedList = res.data.data;
        failedList.forEach(failed => {
          // rate是完成率
          this.tracked[failed.date] = [failed.rate, 100 - failed.rate];
          this.failed.push(failed.date);
        })
        // 拿到数据之后开始处理默认数据
        let today = new Date();
        this.today = today.format("yyyy-MM-dd");
        let dayDiff = (new Date() - new Date(localStorage.getItem("signUpDate"))) / 1000 / 60 / 60 / 24;
        let max = 30 < Math.round(dayDiff) ? 30 : Math.round(dayDiff);
        for (let i = 1; i <= max; i++) {
          let day = new Date(today - 1000 * 60 * 60 * 24 * i);
          let validDay = true;
          for (let j = 0; j < this.failed.length; j++) {
            if (day.format("yyyy-MM-dd") === this.failed[j]) {
              validDay = false;
              break;
            }
          }
          if (validDay) {
            this.tracked[day.format("yyyy-MM-dd")] = [100, 0];
          }
        }
        //初始1997-01-01，当日期发生变化就会触发样式变更，同步新的样式
        this.$refs.calendar.updateTimes();
      } else {
        console.log(res.data.message);
      }
    })
  },
  data() {
    return {
      title: '本月完成度',
      today: '1997-01-01', //时间变化
      tracked: {},
      colors: ['primary', 'warning'],
      category: ['完成', '未完成'],
      failed: []
    }
  }
}
</script>

<style scoped>

</style>