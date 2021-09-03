<template>
  <div>
    <v-row>
      <v-col class="ds-icon-col">
        <v-icon class="ds-icon" v-if="!guest.phone"
          >mdi-dots-horizontal-circle-outline</v-icon
        >
        <v-icon
          class="ds-icon"
          v-if="guest.phone && reviewSummary.sentiment == 'pos'"
          >mdi-check-circle-outline</v-icon
        >
        <v-icon
          class="ds-icon"
          v-if="guest.phone && reviewSummary.sentiment == 'neg'"
          >mdi-close-circle-outline</v-icon
        >
      </v-col>
    </v-row>
    <p v-if="!guest.phone">Type a phone number to get started</p>
    <p v-if="guest.phone">{{ reviewSummary.summary }}</p>
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
          type="number"
        >
        </v-text-field>
      </validation-provider>
      <v-btn
        class="mr-4 mb-4 ds-btn"
        @click="checkPhoneNumber"
        block
        color="primary"
      >
        Verify Guest
      </v-btn>
      <template v-if="guest.phone">
        <v-btn
          class="mr-4 mb-4"
          @click="AddReview"
          block
          elevation="0"
          outlined
        >
          Add review for this guest
        </v-btn>
        <v-btn block @click="reviews" elevation="0" outlined
          >Read reviews</v-btn
        >
      </template>
    </v-form>
  </div>
</template>

<script>
import { required, digits, max, regex } from "vee-validate/dist/rules";
import { extend, ValidationProvider, setInteractionMode } from "vee-validate";
import router from "../router";
import { mapGetters, mapState } from "vuex";
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
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    AddReview: () => {
      router.push({ name: "AddReview" });
    },
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
    reviews() {
      router.push("Reviews");
    },
  },
  computed: {
    ...mapState(["guest"]),
    ...mapGetters(["reviewSummary"]),
  },
  mounted: function () {
    this.guest.phone ? (this.phonenumber = this.guest.phone) : false;
  },
};
</script>

<style lang="scss" scoped>
.ds-icon {
  color: green !important;
  font-size: 128px !important;
  margin: 1rem 0;
}
.ds-icon-col {
  text-align: center;
}
</style>
