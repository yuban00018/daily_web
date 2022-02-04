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
                      :title="category[i]"
                      :color="colors[i]"
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

export default {
  name: "statistic",
  created() {
    let today = new Date();
    let dayDiff = (new Date() - new Date(localStorage.getItem("signUpDate"))) / 1000 / 60 / 60 / 24;
    let max = 30 < Math.round(dayDiff) ? 30 : Math.round(dayDiff);
    for (let i = 1; i <= max; i++) {
      let day = new Date(today - 1000 * 60 * 60 * 24 * i);
      this.tracked[day.format("yyyy-MM-dd")] = [55, 45];
    }
  },
  data() {
    return {
      title: '近30天完成度',
      today: '',
      tracked: {},
      colors: ['primary','warning'],
      category: ['完成', '未完成'],
    }
  }
}
</script>

<style scoped>

</style>