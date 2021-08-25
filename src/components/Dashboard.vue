<template>
  <div>
    <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
    <p>Type a phone number to get started</p>
    <v-form v-model="valid">
      <validation-provider
        v-slot="{ errors }"
        name="phoneNumber"
        :rules="{
          required: true,
          digits: 10,
          regex: '^[0-9]{10}$',
        }"
      >
        <v-text-field
          v-model="phonenumber"
          :counter="10"
          :error-messages="errors"
          label="Phone Number"
          required
        >
        </v-text-field>
      </validation-provider>
      <v-btn class="mr-4 mb-4 ds-btn" type="submit" block> Verify Guest </v-btn>
      <v-btn class="mr-4 mb-4" @click="AddReview" block>
        Add review for this guest
      </v-btn>
    </v-form>
    <h1>Know your guest</h1>
    <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
    <v-form>
      <v-text-field v-model="phonenumber"> </v-text-field>
    </v-form>
  </div>
</template>

<script>
import { required, digits, max, regex } from "vee-validate/dist/rules";
import { extend, ValidationProvider, setInteractionMode } from "vee-validate";
import router from "../router";
setInteractionMode("eager");
extend("digits", {
  ...digits,
  message: "Phone number needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "Phone number can not be empty",
});
extend("regex", {
  ...regex,
  message: "Phone number {_value_} is not valid ",
});
extend("max", {
  ...max,
  message: "Phone number may not be greater than {length} characters",
});
export default {
  name: "Dashboard",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      valid: false,
      phonenumber: "",
      AddReview: () => {
        router.push({ name: "AddReview" });
      },
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
.ds-btn {
  background-color: red !important;
  color: white !important;
}
</style>
