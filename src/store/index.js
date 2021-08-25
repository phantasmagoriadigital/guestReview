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
      const { name, email, mobile } = data.formData;
      try {
        await fb.db.collection("users").doc(data.user.user.uid).set({
          name,
          email,
          mobile,
        });
        router.push({ name: "Login" });
        // dispatch('getUserProfile', data.user.user)
      } catch (error) {
        console.log(error);
      }
    },
    async addReview({ state }, payload) {
      const { phonenumber, score, review } = payload;
      let user = state.userAuth.uid;
      try {
        await fb.db.collection("reviews").add({
          user,
          phonenumber,
          score,
          review,
        });
        // router.push({ name: 'Login' })
        // dispatch('getUserProfile', data.user.user)
      } catch (error) {
        console.log(error);
      }
    },
    async getReviews(context, payload) {
      console.log(payload);
      try {
        return await fb.db
          .collection("reviews")
          .where("phonenumber", "==", payload)
          .get()
          .then((querySnapshot) => {
            // querySnapshot.forEach((doc) => {
            //   // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
            // });
            return querySnapshot;
          });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    },
  },
  modules: {},
});
