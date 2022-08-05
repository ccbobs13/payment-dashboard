<template>
  <v-container grid-list-md>
    <v-card width="540px" :loading="loading">
      <v-card-title primary-title>
        <span class="headline">Réinitialisation</span>
      </v-card-title>
      <v-card-text>
        <h3 class="mb-3">Réinitialisation de mot de passe</h3>
        <ValidationObserver v-slot="{ invalid }">
          <ValidationProvider
            name="adresse mail"
            rules="required|email"
            v-slot="{ errors }"
          >
            <v-text-field
              outlined
              clearable
              dense
              label="Email"
              prepend-inner-icon="mdi-email"
              v-model="email"
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>
          <div class="mb-3">
            <v-btn
              color="primary"
              :disabled="loading || invalid"
              @click="reset"
              width="100%"
              :loading="loading"
            >
              Reinitialiser
            </v-btn>
          </div>
        </ValidationObserver>
        <v-alert v-if="message" type="error" class="text-center">
          {{ message }}
        </v-alert>
      </v-card-text>
    </v-card>
    <v-card class="mt-5 text-center" width="540px" color="#f7f7f7">
      <v-card-text class="black--text"
        >Vous avez déjà un compte?
        <router-link to="/login" type="button"
          >Connectez-vous</router-link
        ></v-card-text
      >
    </v-card>
  </v-container>
</template>

<script>
import userService from "../services/user.service";

export default {
  name: "PasswordResetView",
  data() {
    return {
      email: "",
      loading: false,
      message: "",
    };
  },
  computed: {},
  methods: {
    reset() {
      this.message = "";
      this.loading = true;
      if (this.email) {
        userService
          .resetPassword(this.email)
          .then(() => {
            this.$toast.success("Veuillez consulter votre boite mail", {
              duration: 5000,
            });
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            this.message =
              (err.response && err.response.data) ||
              err.message ||
              err.toString();
          });
      }
    },
  },
};
</script>

<style scoped>
v-container {
  display: flex;
}

.v-card {
  margin: auto;
}
.alert-error {
  color: red;
  font-size: 12px;
}
.v-card__title {
  background: #f7f7f7;
}

a {
  text-decoration: none;
}
</style>
