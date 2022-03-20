<template>
  <v-container>
    <v-card :dark="backgroundColor">
      <v-toolbar flat>
        <v-toolbar-title>&nbsp; {{ titleText }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-switch
              v-model="backgroundColor"
              label="background-color"
              hide-details
          ></v-switch>
        </div>
      </v-toolbar>


      <v-banner single-line>
        {{ bannerText }}
        <template v-slot:actions>
          <v-btn
              text
              color="deep-purple accent-4"
              @click="create()"
          >
            {{ bannerBtnText }}
          </v-btn>
        </template>
      </v-banner>


      <v-card-text class="grey lighten-4">
        <v-sheet
            max-width="800"
            height="1000"
            class="mx-auto"
        >
          <router-view></router-view>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-container>
</template >

<script>

export default {
  name: "my_group",
  data() {
    return {
      titleText: '我创建的小组',
      bannerText: 'The group information you created is shown below.',
      bannerBtnText: 'CREATE A TEAM',
      backgroundColor: false,
    }
  },
  methods: {
    jmp(path) {
      this.$router.replace(path).catch((err) => {
        err;
      });
    },
    create() {
      if (this.bannerBtnText === 'CREATE A TEAM') {
        this.jmp('create_modify');
        this.bannerBtnText = 'RETURN';
        this.bannerText = 'Please input the info of your team.';
        this.titleText = '小组信息填写';
      }
      else {
        this.jmp('show');
        this.bannerBtnText = 'CREATE A TEAM';
        this.bannerText = 'The group information you created is shown below.';
        this.titleText = '我创建的小组';
      }
    }
  },
}
</script >

<style scoped >

</style >