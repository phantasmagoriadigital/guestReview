<template>
  <div>
    <v-card
      class="ds-card"
      v-bind:class="{
        neg: parseInt(review.rating) < 3,
        neut: parseInt(review.rating) == 3,
        pos: parseInt(review.rating) > 3,
      }"
      elevation="0"
    >
      <v-row>
        <v-col>
          <h5>Experience: {{ scoreWords }}</h5>
        </v-col>
        <v-col>
          <v-icon v-bind:class="{ selected: review.rating == '1' }"
            >mdi-emoticon-cry-outline</v-icon
          >
          <v-icon v-bind:class="{ selected: review.rating == '2' }"
            >mdi-emoticon-sad-outline</v-icon
          >
          <v-icon v-bind:class="{ selected: review.rating == '3' }"
            >mdi-emoticon-neutral-outline</v-icon
          >
          <v-icon v-bind:class="{ selected: review.rating == '4' }"
            >mdi-emoticon-happy-outline</v-icon
          >
          <v-icon v-bind:class="{ selected: review.rating == '5' }"
            >mdi-emoticon-excited-outline</v-icon
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-chip
            v-for="(incident, index) in review.incident"
            :key="index"
            class="ds-incident"
            color="deep-purple accent-4"
            outlined
            >{{ incident }}</v-chip
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col>
          <v-card-text
            >{{ review.description }} <br />
            <small
              ><b>— by {{ review.property }}</b></small
            ></v-card-text
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ReviewCard",
  props: {
    review: {
      type: Object,
    },
  },
  computed: {
    scoreWords() {
      switch (this.review.rating) {
        case "1":
          return "Never Again";
        case "2":
          return "Bad";
        case "3":
          return "Neutral";
        case "4":
          return "Good";
        case "5":
          return "Excellent";

        default:
          return "Unavailable";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #ffeecc;
  border-radius: 2rem;
  height: 2rem;
  width: 2rem;
}
.ds-card {
  padding: 0.75rem;
  border-radius: 0 !important;
  &.neg {
    background-color: #ffddd6;
    border: 1px solid #ff5630;
  }
  &.neut {
    background-color: #ccdcf5;
    border: 1px solid #0052cc;
  }
  &.pos {
    background-color: #d7f0e5;
    border: 1px solid #36b37e;
  }
  // margin-bottom: 0.25rem;
}
.ds-incident {
  margin: 0.125rem;
}
</style>
