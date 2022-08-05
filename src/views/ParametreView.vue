<template>
  <v-container class="">
    <v-row>
      <v-col class="justify-center">
        <h1><v-icon x-large>mdi-cog</v-icon> Paramètres</h1>
        <v-switch v-model="switch1" inset label="Dark Mode"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" cols="6">
        <v-card dense width="100%">
          <v-card-title>Profile</v-card-title>
          <v-card-text>
            <ValidationObserver v-slot="{ invalid }">
              <ValidationProvider
                name="firstname"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  clearable
                  dense
                  label="Firstname"
                  prepend-inner-icon="mdi-account"
                  v-model="profile.firstname"
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="lastname"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  clearable
                  dense
                  label="Lastname"
                  prepend-inner-icon="mdi-account"
                  v-model="profile.lastname"
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="country"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  clearable
                  dense
                  label="Country"
                  prepend-inner-icon="mdi-flag"
                  v-model="profile.country"
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="Age"
                rules="required|integer"
                v-slot="{ errors }"
              >
                <v-text-field
                  outlined
                  clearable
                  dense
                  label="Age"
                  type="numeric"
                  prepend-inner-icon="mdi-calendar-blank"
                  v-model="profile.age"
                  :error-messages="errors"
                >
                </v-text-field>
              </ValidationProvider>
              <div class="mb-3">
                <v-btn
                  color="primary"
                  :disabled="invalid || loading"
                  @click="updateProfile"
                  width="100%"
                  :loading="loading"
                >
                  Mettre a jour
                </v-btn>
              </div>
            </ValidationObserver>
            <v-alert v-if="message" type="error" class="text-center">
              {{ message }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="6">
        <v-card dense width="100%">
          <v-card-title>Compte</v-card-title>
          <v-card-text>
            {{ account.balance }} {{ account.currency }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Profile from "@/models/profile.model";
import Account from "@/models/account.model";

export default {
  name: "ParametreView",
  data() {
    return {
      profile: new Profile("", "", "", ""),
      account: new Account(""),
      loading: false,
      switch1: false,
      message: "",
      firstname: "",
      lastname: "",
      country: "",
      age: "",
    };
  },
  methods: {
    updateProfile() {
      this.loading = true;
      this.$store
        .dispatch("updateProfile", this.profile)
        .then(() => {
          this.loading = false;
          this.$toast.success("Profile modifie avec succes", {
            duration: 3000,
          });
        })
        .catch((err) => {
          this.message =
            (err.response && err.response.data) ||
            err.message ||
            err.toString();
        });
    },
  },
  created() {
    this.$store
      .dispatch("getProfile", {})
      .then(() => {
        this.profile = this.$store.state.user.profile.profile;
      })
      .catch((err) => {
        this.message =
          (err.response && err.response.data) || err.message || err.toString();
      });

    this.$store
      .dispatch("getAccount", {})
      .then(() => {
        this.account = this.$store.state.user.account;
      })
      .catch((err) => {
        this.message =
          (err.response && err.response.data) || err.message || err.toString();
      });
  },
  computed: {},
};
</script>

<style scoped>
v-container {
  display: flex;
}

/* .v-card {
  margin: auto;
} */
</style>
