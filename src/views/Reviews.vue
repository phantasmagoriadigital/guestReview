<template>
  <div>
    <!-- <v-btn icon @click="back"><v-icon>mdi-arrow-left</v-icon></v-btn> -->
    <h4>User reviews</h4>
    <v-row>
      <!-- <v-col>
        <p>Average experience: {{ averageReview }}</p>
      </v-col> -->
      <v-col>
        <p>{{ reviewSummary.summary }}</p>
      </v-col>
    </v-row>
    <v-row v-for="(review, index) in guest.reviews" :key="index">
      <v-col>
        <review-card :review="review" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReviewCard from "../components/ReviewCard.vue";
import router from "../router";
import { mapGetters, mapState } from "vuex";
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
  computed: {
    ...mapState(["guest"]),
    ...mapGetters(["reviewSummary"]),
    // reviewSummary() {
    //   let neg = 0,
    //     neut = 0,
    //     pos = 0;
    //   this.guest.reviews.forEach((review) => {
    //     review.rating == 3 ? neut++ : false;
    //     review.rating > 3 ? pos++ : false;
    //     review.rating < 3 ? neg++ : false;
    //   });
    //   return `positive: ${pos} / neutral: ${neut} / negative: ${neg}`;
    // },
    averageReview() {
      let total = 0;
      this.guest.reviews.forEach((review) => {
        total += parseInt(review.rating);
      });
      return Math.round(total / this.guest.reviews.length);
    },
  },
};
</script>

<style lang="scss" scoped></style>
