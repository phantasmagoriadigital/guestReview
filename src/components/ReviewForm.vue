<template>
  <div>
    <v-form v-model="form.valid" ref="form">
      <v-row>
        <h2>My overall experience</h2>
      </v-row>
      <v-row>
        <v-col>
          <!-- <validation-provider
            v-slot="{ errors }"
            name="Rating"
            :rules="{
              required: true,
            }"
          > -->
          <v-select
            :items="form.ratingItems"
            label="Rate your experience"
            :rules="form.ratingRules"
            v-model="form.model.rating"
          >
          </v-select>
          <!-- <v-btn-toggle
              class="ds-icon-btn"
              tile
              color="deep-purple accent-3"
              v-model="form.model.rating"
              group
              :error-messages="errors"
              :rules="form.ratingRules"
            >
              <v-btn class="ds-rating-btn" value="1">
                <v-icon>mdi-emoticon-cry-outline</v-icon>
                <span class="ds-rating-text"
                  >Never <br />
                  again</span
                >
              </v-btn>

              <v-btn class="ds-rating-btn" value="2">
                <v-icon>mdi-emoticon-sad-outline</v-icon>
                <span class="ds-rating-text">Bad</span>
              </v-btn>

              <v-btn class="ds-rating-btn" value="3">
                <v-icon>mdi-emoticon-neutral-outline</v-icon>
                <span class="ds-rating-text">Neutral</span>
              </v-btn>

              <v-btn class="ds-rating-btn" value="4">
                <v-icon>mdi-emoticon-happy-outline</v-icon>
                <span class="ds-rating-text">Good</span>
              </v-btn>
              <v-btn class="ds-rating-btn" value="5">
                <v-icon>mdi-emoticon-excited-outline</v-icon>
                <span class="ds-rating-text">Excellent</span>
              </v-btn>
            </v-btn-toggle> -->
          <!-- </validation-provider> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Name of guest"
            :rules="{
              required: true,
            }"
          >
            <v-text-field
              required
              v-model="form.model.name"
              label="Name of guest"
              :error-messages="errors"
              :rules="form.nameRules"
            >
            </v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="form.model.email" label="Email Address">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Incident"
            :rules="{
              required: true,
            }"
          >
            <v-select
              required
              :items="form.items"
              v-model="form.model.incident"
              label="Incident Type"
              multiple
              :error-messages="errors"
              :rules="form.incidentRules"
            >
            </v-select>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Description"
            :rules="{
              required: true,
            }"
          >
            <v-textarea
              required
              v-model="form.model.description"
              label="Describe your experince with the guest"
              :error-messages="errors"
              :rules="form.descriptionRules"
            >
            </v-textarea>
          </validation-provider>
        </v-col>
      </v-row>
    </v-form>
    <v-row align="center" justify="space-around">
      <v-btn @click="reset"> Cancel </v-btn>
      <v-span></v-span>
      <v-btn @click="validate" color="primary"> Add review </v-btn>
    </v-row>
  </div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationProvider, setInteractionMode } from "vee-validate";
import { mapState } from "vuex";
import router from "../router";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
export default {
  name: "reviewForm",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      form: {
        valid: true,
        model: {
          rating: "",
          name: "",
          email: "",
          incident: "",
          phonenumber: "",
          description: "",
        },

        items: [
          "Violence",
          "Bribing",
          "Non Payment",
          "Rude Behavior",
          "Issues with driver",
          "Miscellaneous/Other",
        ],
        ratingItems: [
          {
            text: "Never Again",
            value: "1",
          },
          {
            text: "Bad",
            value: "2",
          },
          {
            text: "Neutral",
            value: "3",
          },
          {
            text: "Good",
            value: "4",
          },
          {
            text: "Excellent",
            value: "5",
          },
        ],
        // "Bad", "Neutral", "Good", "Excellent"},
        nameRules: [(v) => !!v || "Name is required"],
        emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
        incidentRules: [(v) => !!v || "Incident is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
        ratingRules: [(v) => !!v || "Rating is required"],
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate() ? this.submitReview() : console.log("error");
    },
    reset() {
      // reset form
      this.$refs.form.reset();
      router.push("/");
    },
    submitReview() {
      this.form.model.phonenumber = this.guest.phone;
      console.log("Submit review: ", this.form.model);
      this.$store.dispatch("addReview", this.form.model);
    },
  },
  computed: {
    ...mapState(["guest"]),
  },
};
</script>

<style lang="scss" scoped>
.ds-icon-btn::v-deep .v-btn__content {
  flex-direction: column;
}
.ds-rating-text {
  font-size: 0.625rem;
}
.ds-rating-btn {
  align-items: flex-start;
  padding: 0 0.625rem !important;
}
</style>
