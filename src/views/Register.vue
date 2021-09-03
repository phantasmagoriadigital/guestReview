<template>
  <div>
    <v-form v-model="form.valid" ref="form" lazy-validation>
      <v-text-field
        v-model="form.model.name"
        label="Name"
        :rules="form.rules.required"
      >
      </v-text-field>
      <v-text-field v-model="form.model.email" label="Email"> </v-text-field>
      <v-text-field v-model="form.model.mobile" label="Phone" type="number">
      </v-text-field>
      <v-text-field v-model="form.model.propertyName" label="Property Name">
      </v-text-field>
      <v-text-field
        v-model="form.model.propertyAddress"
        label="Property Address"
      >
      </v-text-field>
      <!-- <vue-google-autocomplete
        ref="address"
        id="map"
        classname="form-control"
        placeholder="Start typing"
        v-on:placechanged="getAddressData"
      >
      </vue-google-autocomplete> -->
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
      <v-text-field
        v-model="form.model.confirmPassword"
        label="Confirm Password"
        :append-icon="form.show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[form.rules.required, form.rules.min]"
        :type="form.show ? 'text' : 'password'"
        @click:append="form.show = !form.show"
        hint="At least 8 characters"
        counter
      >
      </v-text-field>
      <v-btn @click="register" block>Register</v-btn>
    </v-form>
    <h5>Already a user?</h5>
    <v-btn block @click="login">Login</v-btn>
  </div>
</template>

<script>
import router from "../router";
// import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  // components: {
  //   VueGoogleAutocomplete,
  // },
  data() {
    return {
      // address: "",
      form: {
        show: false,
        valid: true,
        model: {
          name: "",
          email: "",
          mobile: "",
          propertyName: "",
          propertyAddress: "",
          password: "",
          confirmPassword: "",
        },
        rules: {
          required: (value) => !!value || "Required.",
          min: (v) => v.length >= 8 || "Min 8 characters",
          emailMatch: () => `The email and password you entered don't match`,
        },
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate() ? this.register() : console.log("error");
    },
    register() {
      console.log("Registering with: ", this.form.model);
      this.$store.dispatch("createUser", this.form.model);
    },
    login() {
      router.push("Login");
    },
    // getAddressData: function (addressData, placeResultData, id) {
    //   this.address = addressData;
    //   console.log(placeResultData, id);
    // },
  },
};
</script>

<style lang="scss" scoped></style>
