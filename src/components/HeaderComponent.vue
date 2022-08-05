<template>
  <v-app-bar app elevation-1 color="grey lighten-5">
    <v-app-bar-nav-icon @click="$emit('handleDrawer')"></v-app-bar-nav-icon>
    <v-img src="@/assets/api3.png" max-width="40px" max-height="40px"></v-img>

    <v-toolbar-title>DashboardSPA </v-toolbar-title>
    <v-col></v-col>
    <v-btn
      class="ma-1"
      v-if="!loggedIn"
      small
      outlined
      color="primary"
      text
      to="/login"
    >
      <v-icon color="primary" small left>mdi-login</v-icon>
      Connexion
    </v-btn>
    <v-btn
      class="ma-1"
      v-if="!loggedIn"
      small
      color="primary"
      outlined
      text
      to="/register"
    >
      <v-icon small left color="primary">mdi-account-plus</v-icon>
      Inscription
    </v-btn>
    <v-btn
      class="ma-1"
      v-if="loggedIn"
      small
      color="error"
      outlined
      text
      @click="logout"
    >
      <v-icon small left color="error">mdi-logout</v-icon>
      Deconnexion
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {};
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.status;
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$toast.success("Vous êtes déconnecté", {
            duration: 3000,
          });
          this.$router.push("/login");
        })
        .catch((err) => {
          this.$toast.error(err.message, {
            duration: 3000,
          });
        });
    },
  },
};
</script>
