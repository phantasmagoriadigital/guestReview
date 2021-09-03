<template>
  <div>
    <v-form v-model="form.valid" ref="form">
      <v-text-field
        v-model="form.model.email"
        label="Email"
        :rules="form.emailRules"
      >
      </v-text-field>
      <v-text-field
        v-model="form.model.password"
        label="Password"
        :append-icon="form.show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[form.rules.required, form.rules.min]"
        :type="form.show ? 'text' : 'password'"
        @click:append="form.show = !form.show"
        hint="At least 8 characters"
        counter
      >
      </v-text-field>
      <v-alert outlined type="error" v-if="form.loginError">{{
        form.loginError
      }}</v-alert>
      <v-btn class="mb-4" @click="login" block color="primary">Login</v-btn>
    </v-form>
    <h5>Not registered?</h5>
    <!-- <router-link to="Register"> -->
    <v-btn block @click="register">Register</v-btn>
    <!-- </router-link> -->
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      form: {
        show: false,
        valid: true,
        model: {
          email: "",
          password: "",
        },
        loginError: "",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        rules: {
          required: (value) => !!value || "Required.",
          min: (v) => v.length >= 8 || "Min 8 characters",
          emailMatch: () => `The email and password you entered don't match`,
        },
      },
    };
  },
  methods: {
    login() {
      console.log("Signing in with: ", this.form.model);
      this.$store.dispatch("loginUser", this.form.model).catch((error) => {
        this.form.loginError = error.message;
      });
    },
    register() {
      router.push("Register");
    },
  },
};
</script>

<style lang="scss" scoped></style>
