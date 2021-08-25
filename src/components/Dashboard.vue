<template>
  <div>
    <h1>Know your guest</h1>
    <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
    <v-form>
      <v-text-field v-model="phonenumber"> </v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      phonenumber: "value",
    };
  },
};
</script>

<style lang="scss" scoped></style>
