<template >
  <v-container>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
    ></v-data-table>
  </v-container>
</template >

<script >
import {GetGroupRank} from "../../../api/group";
export default {
  name: "group_rank",
  data() {
    return {
      headers: [
        {
          text: 'rank',
          align: 'start',
          sortable: false,
          value: 'rank',
        },
        {text: '小组名', value: 'groupName'},
        {text: '小组id', value: 'groupId'},
        {text: '管理员', value: 'adminName'},
        {text: '小组等级', value: 'groupExp'},
      ],
      desserts: [],
      dessertsTmp: [],
    }
  },
  mounted() {
    GetGroupRank().then(
        res => {
          if (res.data.code === 200) {
            // console.log(res.data.data);
            this.dessertsTmp = res.data.data;
            for (let i = 0; i < this.dessertsTmp.length; i++) {
              let tmp = {};
              tmp.rank = this.dessertsTmp[i].rank;
              tmp.groupName = this.dessertsTmp[i].groupName;
              tmp.groupId = this.dessertsTmp[i].groupId;
              tmp.adminName = this.dessertsTmp[i].adminName;
              tmp.groupExp = parseInt((this.dessertsTmp[i].groupExp - 1) / 10 + 1);
              this.desserts.push(tmp);
            }
          }
          else {
            alert("数据错误！");
          }
        }
    ).catch(err=>{
      this.$message.error(err);
    })
  }
}
</script >

<style scoped >
</style >