<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn @click="home" text elevation="0">
        <v-icon v-if="userAuth.uid">mdi-home</v-icon>
        <h4>Know your guest</h4>
      </v-btn>

      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main class="ds-app">
      <v-container class="ds-main">
        <v-row justify="center">
          <v-col sm="12" md="6">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-text-field v-model="phonenumber"></v-text-field>
      <button @click="checkPhoneNumber">checkPhoneNumber</button> |
      <button @click="login">Login</button> |
      <button @click="register">Register</button> |
      <button @click="submitReview">Submit Review</button>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          {{ index }}. {{ review.review }}
        </li>
        <li v-if="!reviews.length">Sorry, no reviews for this guest yet</li>
      </ul> -->
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import router from "./router";
export default {
  name: "App",

  data: () => ({
    // input phone number
    phonenumber: "7330802228",
    loginCredentials: {
      email: "mike@kamminga.net",
      password: "Password@123",
    },
    registerCredentials: {
      name: "Mike",
      email: "mike@kamminga.net",
      password: "Password@123",
      mobile: "+917330802228",
    },
    review: {
      phonenumber: "7893555120",
      score: 1,
      review: "this was a score 1 guest",
    },
    reviews: [],
  }),
  computed: {
    ...mapState(["userAuth"]),
  },
  methods: {
    async checkPhoneNumber() {
      console.log("Checking phone number", this.phonenumber);
      // Check if there are any reviews with this phone checkPhoneNumber
      const reviews = await this.$store.dispatch(
        "getReviews",
        this.phonenumber
      );
      console.log("reviews available: ", reviews.docs.length);
      this.reviews = [];
      if (reviews.docs.length) {
        console.log("YES reviews available");
        reviews.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.reviews.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      } else {
        console.log("NO reviews available");
      }
      // YES -> show sentiment screen

      // NO -> show no reviews yet screen
    },
    login() {
      console.log("Signing in with: ", this.loginCredentials);
      this.$store.dispatch("loginUser", this.loginCredentials);
    },
    register() {
      console.log("Registering with: ", this.registerCredentials);
      this.$store.dispatch("createUser", this.registerCredentials);
    },
    submitReview() {
      this.review.phonenumber = this.phonenumber;
      console.log("Submit review: ", this.review);
      this.$store.dispatch("addReview", this.review);
    },
    home() {
      router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.ds-main {
  padding: 32px 21px;
}
.ds-app {
  background-color: #ebeef2;
}
</style>
