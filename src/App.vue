<template>
  <v-app>
    <HeaderComponent @handleDrawer="handleDrawer" />
    <SidebarComponent :drawer="drawer" />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer padless
      ><v-col class="text-center">
        {{ new Date().getFullYear() }} — <strong>CCB</strong>
      </v-col></v-footer
    >
  </v-app>
</template>

<script>
import SidebarComponent from "./components/SidebarComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    SidebarComponent,
    HeaderComponent,
  },
  data: () => ({ drawer: true }),
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
<style>
#app {
  font-family: Inter, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
