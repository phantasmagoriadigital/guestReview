<template>
  <div>
    <v-row>
      <v-col>
        <review-form />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReviewForm from "../components/ReviewForm.vue";

export default {
  components: {
    ReviewForm,
  },
};
</script>

<style lang="scss" scoped></style>
