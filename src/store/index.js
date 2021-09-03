import { vuexfireMutations, firestoreAction } from "vuexfire";

import Vue from "vue";
import Vuex from "vuex";

import "es6-promise/auto";

import router from "../router";
import * as fb from "@/db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Authentication & User Profile
    userAuth: {}, // Receives current user from fb.authentication in loginUser() (null if not signed in)
    userProfile: {}, // bindUser() binds user profile doc from firestore

    // Loading status & message
    loading: false, // show/hide loading indicator
    loadingMessage: "Loading",

    // Snackbar status & message
    snackbar: false, // show/hide snack
    snackbarMessage: "", // message for snackbar
    guest: {
      phone: false,
    },
  },
  mutations: {
    SET_USER_AUTH(state, val) {
      state.userAuth = val;
    },
    SET_LOADING_STATUS(state, val) {
      state.loading = val;
    },
    SET_LOADING_MESSAGE(state, val) {
      state.loadingMessage = val;
    },
    SET_SNACKBAR_STATUS(state, val) {
      state.snackbar = val;
    },
    SET_SNACKBAR_MESSAGE(state, val) {
      state.snackbarMessage = val;
    },
    SET_GUEST(state, val) {
      state.guest = val;
    },
    ...vuexfireMutations,
  },
  actions: {
    /**
     * Bind user data to the state
     * — Initiated during loginUser
     */
    bindUser: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef(
        "userProfile",
        fb.db.collection("users").doc(id),
        {
          maxRefDepth: 0,
        }
      );
    }),
    /**
     * #################################################
     * ########### AUTHENTICATION ######################
     * #################################################
     */

    /**
     * Login User through firebase Auth
     * @param {object} context
     * @param {object} loginData form email and password
     * loginData = {
        email: this.email,
        password: this.password
      }
     */
    async loginUser({ commit, dispatch }, loginData) {
      let route = "";
      try {
        // Firebase Authenticate with email and password
        const authenticateUser = await fb.auth.signInWithEmailAndPassword(
          loginData.email,
          loginData.password
        );
        // Commit user object to the state.userAuth
        commit("SET_USER_AUTH", authenticateUser.user);

        // Binds user profile to state.userProfile
        dispatch("bindUser", authenticateUser.user.uid);

        // Update the route
        route = "Home";
      } catch (error) {
        // Update route in case of error
        route = "";
        console.error("There was an error while signing in", error.code);
        console.error(error.message);
        throw error;
      } finally {
        // console.info("Finally, we'll send you to: /", route)
        route != "" ? router.push({ name: route }) : null;
      }
    },

    /**
     * logOut
     */
    async logOut({ commit }) {
      await fb.auth.signOut();
      commit("SET_USER_AUTH", {});
      router.push({ name: "Login" });
    },
    /**
     * updateUser
     * @param {*} context
     * @param {*} data
     */
    updateUser({ commit }, data) {
      data.user
        .updateProfile({
          displayName: "My Display Name",
        })
        .then(() => {
          console.log("updated User Profile successfully");
        })
        .catch((err) => {
          console.log("error: ", err.message);
          this.error = err.message;
        });
      commit("USER_IS_CREATED", true);
    },

    /**
     * createUser
     * @param {*} context
     * @param {*} formData
     */
    async createUser({ dispatch }, formData) {
      try {
        // create new email user in firebase
        const user = await fb.auth.createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );

        // create user profile
        dispatch("createUserProfile", { user, formData });
      } catch (error) {
        console.error(
          "🚀 ~ file: index.js ~ line 141 ~ createUser ~ error",
          error.message
        );
      }
    },

    /**
     * createUserProfile
     * @param {*} context
     * @param {*} data
     */
    async createUserProfile(context, data) {
      const { name, email, mobile, propertyName, propertyAddress } =
        data.formData;
      try {
        await fb.db.collection("users").doc(data.user.user.uid).set({
          userId: data.user.user.uid,
          name,
          email,
          mobile,
          propertyName,
          propertyAddress,
        });
        router.push({ name: "Login" });
        // dispatch('getUserProfile', data.user.user)
      } catch (error) {
        console.log(error);
      }
    },
    async addReview({ state, dispatch }, payload) {
      const { phonenumber, rating, email, incident, name, description } =
        payload;
      let user = state.userAuth.uid;
      let property = state.userProfile.propertyName || "n/a";
      try {
        await fb.db.collection("reviews").add({
          user,
          property,
          phonenumber,
          rating,
          email,
          incident,
          name,
          description,
        });
        dispatch("getReviews", phonenumber);
        router.push({ name: "Home" });
        // dispatch('getUserProfile', data.user.user)
      } catch (error) {
        console.log(error);
      }
    },
    async getReviews({ commit }, payload) {
      console.log(payload);
      try {
        const querySnapshot = await fb.db
          .collection("reviews")
          .where("phonenumber", "==", payload)
          .get();
        let reviews = [];
        if (querySnapshot.docs.length) {
          console.log("YES reviews available");
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            reviews.push(doc.data());
            console.log(doc.id, " => ", doc.data());
          });
        }

        commit("SET_GUEST", { phone: payload, reviews });
        return querySnapshot;
        // return await fb.db
        //   .collection("reviews")
        //   .where("phonenumber", "==", payload)
        //   .get()
        //   .then((querySnapshot) => {
        //     // querySnapshot.forEach((doc) => {
        //     //   // doc.data() is never undefined for query doc snapshots
        //     //   console.log(doc.id, " => ", doc.data());
        //     // });
        //     return querySnapshot;
        //   });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    },
  },
  getters: {
    reviewSummary: (state) => {
      let neg = 0,
        neut = 0,
        pos = 0;
      state.guest.reviews.forEach((review) => {
        review.rating == 3 ? neut++ : false;
        review.rating > 3 ? pos++ : false;
        review.rating < 3 ? neg++ : false;
      });
      let summary = {
        sentiment: pos > neg ? "pos" : "neg",
        summary: ` negative: ${neg}/ neutral: ${neut} /  positive: ${pos}`,
      };
      return summary;
    },
  },
  modules: {},
});
