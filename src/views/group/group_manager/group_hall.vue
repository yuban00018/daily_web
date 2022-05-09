<template >
  <v-container>
    <!--标题-->
    <v-footer
        color="indigo lighten-1"
        padless
    >
      <v-row
          justify="center"
          no-gutters
      >
        <v-btn
            v-for="link in links"
            :key="link.name"
            color="white"
            text
            rounded
            class="my-2"
            @click="jmp(link.lnk)"
        >
          {{ link.name }}
        </v-btn>
      </v-row>
    </v-footer>
    <v-footer>
      <router-view></router-view>
    </v-footer>
  </v-container>
</template >


<script >

export default {
  name: "group_hall",
  data() {
    return {
      links: [
        { name: '精选', lnk: 'careful' },
        { name: '娱乐', lnk: 'happy' },
        { name: '生活', lnk: 'life' },
        { name: '电竞', lnk: 'game' },
        { name: '科技', lnk: 'science' },
        { name: '体育', lnk: 'pe' },
        { name: '排行榜', lnk: 'rank' },
      ],
    }
  },
  methods: {
    jmp(path) {
      this.$router.replace("/group/group_hall/" + path).catch((err) => {
        err;
      });
    },
  }
}
</script >

<style scoped >
</style >