<template>
  <v-navigation-drawer app v-if="loggedIn" v-model="drawerV">
    <v-list>
      <v-list-item class="justify-center">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6 text-center">
            {{ userInfos.email }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <div class="mt-3 text-center">
      <h2>Compte</h2>
      <h4>{{ userBalance }}</h4>
      <h4>{{ currency }}</h4>
    </div>
  </v-navigation-drawer>
</template>

<script>
import Account from "@/models/account.model";

export default {
  name: "SidebarComponent",
  props: ["drawer"],
  data() {
    return {
      drawerV: this.drawer,
      account: new Account(""),
      a: true,
      selectedItem: 0,
      items: [
        { text: "Accueil", icon: "mdi-home", to: "/" },
        {
          text: "Documentation",
          icon: "mdi-book-open-blank-variant",
          to: "/documentation",
        },
        { text: "SandBox", icon: "mdi-toolbox", to: "/sandbox" },
        {
          text: "Transactions",
          icon: "mdi-clipboard-text-clock",
          to: "/transaction",
        },

        { text: "Paramètres", icon: "mdi-cog", to: "/parametre" },
      ],
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.status;
    },
    userInfos() {
      return this.$store.state.user.user;
    },
    userAccount() {
      return this.$store.state.user.account?.account;
    },
    userBalance() {
      return this.$store.state.user.account?.balance;
    },
    currency() {
      return this.$store.state.user.account?.currency;
    },
  },
  watch: {
    drawer: function () {
      this.drawerV = !this.drawerV;
    },
  },
  mounted() {},
};
</script>

<style scoped>
v-list-item.active {
  color: red;
}
</style>
