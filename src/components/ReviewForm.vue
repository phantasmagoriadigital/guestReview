<template>
  <div>
    <v-form v-model="form.valid" ref="form">
      <v-row>
        <h2>My overall experience</h2>
      </v-row>
      <v-row>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Rating"
            :rules="{
              required: true,
            }"
          >
            <v-btn-toggle
              class="ds-icon-btn"
              tile
              color="deep-purple accent-3"
              v-model="form.model.rating"
              group
              :error-messages="errors"
            >
              <v-btn value="1">
                <v-icon>mdi-emoticon-cry-outline</v-icon>
                <span>Never again</span>
              </v-btn>

              <v-btn value="2">
                <v-icon>mdi-emoticon-sad-outline</v-icon>
                <span>Bad</span>
              </v-btn>

              <v-btn value="3">
                <v-icon>mdi-emoticon-neutral-outline</v-icon>
                <span>Neutral</span>
              </v-btn>

              <v-btn value="4">
                <v-icon>mdi-emoticon-happy-outline</v-icon>
                <span>Good</span>
              </v-btn>
              <v-btn value="5">
                <v-icon>mdi-emoticon-excited-outline</v-icon>
                <span>Excellent</span>
              </v-btn>
            </v-btn-toggle>
          </validation-provider>
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
            >
            </v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            :rules="{
              required: true,
            }"
          >
            <v-text-field
              required
              v-model="form.model.email"
              label="Email Address"
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>
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
              v-model="form.description"
              label="Describe your experince with the guest"
              :error-messages="errors"
            >
            </v-textarea>
          </validation-provider>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col>
        <v-btn @click="reset"> Cancel </v-btn>
        <v-btn @click="validate"> Add review </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationProvider, setInteractionMode } from "vee-validate";
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
        },

        items: [
          "Violence",
          "Bribing",
          "Non Payment",
          "Rude Behavior",
          "Issues with driver",
          "Miscellaneous/Other",
        ],
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate()
        ? console.log("successful")
        : console.log("error");
    },
    reset() {
      // reset form
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.ds-icon-btn::v-deep .v-btn__content {
  flex-direction: column;
}
</style>
