<template >
  <div :visible.sync="cards_visible">
    <!--{{ lnk_type }}-->
    <!--推荐小组部分-->
    <v-row dense>
      <v-col
          v-for="tmp in recommendList"
          :key="tmp.title"
          cols="col-lg-1 col-md-4 col-sm-12 col-12 pa-6"
      >
        <v-card
            min-width="180"
        >
          <v-card-title>
            {{ tmp.groupName }}
          </v-card-title>
          <v-card-subtitle v-text="'等级：' + (parseInt(parseInt((tmp.allexp - 1) / 10)) + 1) + '级'"></v-card-subtitle>
          <v-card-text
              style="min-height: 90px"
          >
            {{ changeContent(tmp.content) }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                :color="'primary'"
                @click="join(tmp)">
              加入
            </v-btn>
            <v-btn
                text
                :color="'warning'"
                @click="find(tmp)">
              了解
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <div v-if="recommendListIsEmpty">
      未找到小组推荐
    </div>


    <v-alert :value="showGroupRecommendError" outlined type="error">
      {{ errorMessage }}
    </v-alert>
  </div>
</template >

<script >
import {GetGroupInfoByKind} from "../../../api/group";
export default {
  name: "common_group",
  props: ['lnk_type'],
  mounted() {
    this.cards_visible = 1;
    GetGroupInfoByKind(this.kinds[this.lnk_type]).then(
        res => {
          if (res.data.code === 200) {
            // console.log(res.data.data);
            this.recommendList = res.data.data;
            if (this.recommendList.length === 0)
              this.recommendListIsEmpty = 1;
          }
          else {
            this.errorMessage = "推荐信息出错";
            this.showGroupRecommendError = true;
          }
        }
    ).catch(err=>{
      this.$message.error(err);
    })
  },
  data() {
    return {
      kinds: {
        careful: '0',
        happy: '1',
        life: '2',
        game: '3',
        science: '4',
        pe: '5',
      },
      recommendList: [],
      recommendListIsEmpty: 0,
      showGroupRecommendError: false,
      errorMessage: "",
      cards_visible: 0,
    }
  },
  methods: {
    changeContent(words) {
      if (words.length > 80) {
        words = words.substr(0, 80);
        words += ". . .";
      }
      return words;
    }
  }
}
</script >

<style scoped >

</style >