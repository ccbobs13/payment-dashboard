<template>
  <v-container grid-list-md>
    <v-card width="540px" :loading="loading">
      <v-card-title primary-title>
        <span class="headline">Mise a jour</span>
      </v-card-title>
      <v-card-text>
        <h3 class="mb-3">Mise a jour de mot de passe</h3>
        <ValidationObserver v-slot="{ invalid }">
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
              v-model="password"
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
              v-model="passwordConfirm"
              :error-messages="errors"
            >
            </v-text-field>
          </ValidationProvider>
          <div class="mb-3">
            <v-btn
              color="primary"
              :disabled="loading || invalid"
              @click="update"
              width="100%"
              :loading="loading"
            >
              Modifier
            </v-btn>
          </div>
        </ValidationObserver>
        <v-alert v-if="message" type="error" class="text-center">
          {{ message }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import userService from "../services/user.service";

export default {
  name: "PasswordUpdateView",
  data() {
    return {
      password: "",
      passwordConfirm: "",
      loading: false,
      show: false,
      show1: false,
      message: "",
    };
  },
  computed: {},
  methods: {
    update() {
      this.message = "";
      this.loading = true;
      if (this.password && this.passwordConfirm && this.$route.params.token) {
        userService
          .updatePassword(this.$route.params.token, this.password)
          .then(() => {
            this.loading = false;
            this.$toast.success("Mot de passe modifié", {
              duration: 5000,
            });
            this.$router.push("/login");
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
