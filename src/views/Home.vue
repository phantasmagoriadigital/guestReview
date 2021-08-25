<template>
  <div>
    <!-- <v-row justify="center">
      <v-col sm="12" md="6"> -->
    <h1>Know your guest</h1>

    <dashboard />
    <router-link to="/Reviews">
      <v-btn block>Reviews</v-btn>
    </router-link>
    <!-- </v-col>
    </v-row> -->
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";

export default {
  name: "Home",

  components: {
    Dashboard,
  },
};
</script>
