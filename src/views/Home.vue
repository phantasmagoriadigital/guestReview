<template>
  <div>
    <!-- <v-row justify="center">
      <v-col sm="12" md="6"> -->
    <!-- <h4>Know your guest</h4> -->

    <dashboard />

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
