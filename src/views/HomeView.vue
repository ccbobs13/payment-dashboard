<template>
  <div class="home">
    <h1><v-icon x-large>mdi-home</v-icon> Accueil</h1>
    <div class="image">
      <img
        max-width="100%"
        src="@/assets/Quelles-sont-veritables-utilites-API-dans-monde-numerique--F.jpg"
        class="rounded float-start"
        alt="..."
      />
      <h1 class="welcome">WELCOME TO OUR DASHBOARDSPA</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  mounted() {
    this.$store
      .dispatch("getAccount", {})
      .then(() => {})
      .catch(() => {});
  },
};
</script>

<style scoped>
img {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.image {
  display: flex;
}

h1.welcome {
  color: rgb(68, 36, 131);
  padding: 15%;
  margin: 0 40px;
}
</style>
