<template>
  <v-container grid-list-md>
    <v-card width="540px" :loading="loading">
      <v-card-title primary-title>
        <span class="headline">Inscription</span>
      </v-card-title>
      <v-card-text>
        <h3 class="mb-3">Inscrivez-vous dès maintenant</h3>
        <ValidationObserver v-slot="{ invalid }">
          <ValidationProvider
            name="adresse mail"
            rules="required|email|max:50"
            v-slot="{ errors }"
          >
            <v-text-field
              outlined
              clearable
              dense
              label="Email"
              prepend-inner-icon="mdi-email"
              v-model="user.email"
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>
          <ValidationProvider
            name="mot de passe"
            rules="required|min:8|max:40"
            v-slot="{ errors }"
            vid="confirmation"
          >
            <v-text-field
              outlined
              clearable
              dense
              label="Password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              prepend-inner-icon="mdi-lock"
              v-model="user.password"
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>
          <ValidationProvider
            name="confirmation de mot de passe"
            rules="required|min:8|max:40|confirmed:confirmation"
            v-slot="{ errors }"
          >
            <v-text-field
              outlined
              clearable
              dense
              label="Password Confirmation"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              prepend-inner-icon="mdi-lock"
              v-model="user.password_confirm"
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>
          <p class="subtitle mb-3">
            Mot de passe oublié ?
            <router-link to="/password-reset" type="button"
              >Reinitialiser</router-link
            >
          </p>
          <div class="mb-3">
            <v-btn
              color="primary"
              :disabled="loading || invalid"
              @click="register"
              width="100%"
              :loading="loading"
            >
              S'inscrire
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
import User from "@/models/user.model";

export default {
  name: "RegisterView",
  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
      show: false,
      show1: false,
      successful: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.status;
    },
  },
  mounted() {
    if (this.loggedIn) this.$router.push("/");
  },
  methods: {
    register() {
      this.loading = true;
      if (this.user.email && this.user.password && this.user.password_confirm) {
        this.$store
          .dispatch("register", this.user)
          .then(() => {
            this.successful = true;
            this.$toast.success("Compte cree avec succes", {
              duration: 3000,
            });
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
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
