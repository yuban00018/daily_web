<template>
  <v-container fluid>
    <v-banner
      single-line
      @click:icon="alert"
  >
    <v-icon
        slot="icon"
        color="warning"
        size="36"
    >
      mdi-home-analytics
    </v-icon>
    您加入的小组如下：

    <template v-slot:actions>
      <v-btn
          color="primary"
          text
          @click="exhibitionStyle = !exhibitionStyle"
      >
        Exhibition Settings
      </v-btn>
    </template>
  </v-banner>


    <div v-if="!myJoinGroupInfoIsEmpty">
      <v-card
          v-for="i in myJoinGroupInfo"
          :key="i"
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
          {{ i.memberNumber }}
          <br />
          喜欢
        </v-card>
        <v-card
            outlined
            tile
            width="600"
            height="180"
        >
          <v-card-text id="woc2">
            {{ i.groupName }}
          </v-card-text>

          <v-card-text
              id="woc3"
          >
            {{ i.content }}
          </v-card-text>

          <v-card-actions id="woc4">
            {{ kinds[i.kind - 1] }}
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
            >
              进入
            </v-btn>
            <v-btn
                text
                color="warning"
            >
              退出
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </div>

    <card v-if="myJoinGroupInfoIsEmpty">
        <v-card-title>
          注意
        </v-card-title>
        <v-card-text>
          您还没有选组！
        </v-card-text>
    </card>
  </v-container>




</template>

<script >
import {getGroupInfoById} from "../../../api/group";
export default {
  name: "join_group",
  data() {
    return {
      myName: "",
      myId: -1,
      exhibitionStyle: 1,
      myJoinGroupInfo: [],
      myJoinGroupInfoIsEmpty: 0,
      kinds: ['娱乐', '生活', '电竞', '科技', '体育'],
    }
  },
  mounted() {
    this.myName = localStorage.getItem("name")
    this.myId = localStorage.getItem("id");
    getGroupInfoById(this.myId).then (
      res => {
        // console.log(res.data.data);
        if (res.data.code === 200) {
          this.myJoinGroupInfo = res.data.data;
          if (this.myJoinGroupInfo.length === 0)
            this.myJoinGroupInfoIsEmpty = 1;
        }
      }
    ).catch(err=>{
      this.$message.error(err);
    })
  },
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
#woc4 {
  display: flex;
  align-items: center;
  font-size: 92%;
  position: relative;
  left: 1.4%;
}
</style >