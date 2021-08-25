<template>
  <div>
    <v-btn icon @click="back"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <h1>User reviews</h1>
    <v-row>
      <v-col>
        <p>Average experience: positive</p>
      </v-col>
      <v-col>
        <p>positive: 7 / neutral: 1 / negative: 2</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <review-card />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReviewCard from "../components/ReviewCard.vue";
import router from "../router";
export default {
  components: {
    ReviewCard,
  },
  data() {
    return {
      back: () => {
        router.push({ name: "Home" });
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
