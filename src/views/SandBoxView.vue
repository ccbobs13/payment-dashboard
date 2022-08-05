<template>
  <v-container>
    <h1 class="mb-3"><v-icon x-large>mdi-toolbox</v-icon> SandBox</h1>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Creation d'utilisateur
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Ajout d'articles
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Simulation de paiement</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col cols="6">
              <v-card class="mb-12" width="540px" color="#f7f7f7">
                <v-card-title>Formulaire</v-card-title>
                <v-card-text>
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
                        width="100%"
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
                    <div class="mb-3">
                      <v-btn
                        color="primary"
                        :disabled="loading || invalid"
                        @click="register"
                        width="10%"
                        :loading="loading"
                      >
                        Créer
                      </v-btn>
                    </div>
                  </ValidationObserver>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="text-center" color="#f7f7f7">
                <v-card-title>Resultats</v-card-title>
                <v-card-text class="black--text">
                  <v-alert
                    text
                    v-if="message"
                    :type="successful ? 'success' : 'error'"
                  >
                    {{ message }}
                  </v-alert>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-col>
            <v-btn color="primary" @click="e1 = 2"> Continuer </v-btn>

            <v-btn text> Annuler </v-btn>
          </v-col>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row>
            <v-col class="text-center">
              <v-simple-table fixed-header height="300px" width="100%">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">#</th>
                      <th class="text-left">Nom</th>
                      <th class="text-left">Prix</th>
                      <th class="text-left">Quantite</th>
                      <th class="text-left">Total</th>
                      <th class="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in articles" :key="item.name">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.unitPrice }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.totalPrice }}</td>
                      <td>
                        <v-icon color="error" @click="removeItem(index)"
                          >mdi-delete</v-icon
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <ValidationObserver v-slot="{ invalid }">
                      <v-card-title>
                        <span class="text-h5">Ajout d'article</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <ValidationProvider
                                name="nom"
                                rules="required|max:40"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  label="Nom*"
                                  required
                                  outlined
                                  dense
                                  prepend-inner-icon="mdi-card-text"
                                  :error-messages="errors"
                                  v-model="nomField"
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <ValidationProvider
                                name="prix unitaire"
                                rules="required|min:1"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  label="Prix*"
                                  type="number"
                                  required
                                  outlined
                                  dense
                                  prepend-inner-icon="mdi-currency-usd"
                                  :error-messages="errors"
                                  v-model="prixField"
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <ValidationProvider
                                name="quantite"
                                rules="required|min:1"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  label="Quantite*"
                                  type="number"
                                  required
                                  outlined
                                  dense
                                  prepend-inner-icon="mdi-basket"
                                  :error-messages="errors"
                                  v-model="qteField"
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>

                            <v-col cols="12">
                              <ValidationProvider
                                name="total"
                                rules="required|min:1"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  label="Total"
                                  required
                                  outlined
                                  dense
                                  readonly
                                  prefix="$"
                                  :error-messages="errors"
                                  v-model="totalField"
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*indique les champs requis</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog">
                          Fermer
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          :disabled="invalid"
                          text
                          @click="addItem"
                        >
                          Ajouter
                        </v-btn>
                      </v-card-actions>
                    </ValidationObserver>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-col>
          </v-row>
          <v-col class="mt-3">
            <v-btn color="primary" @click="e1 = 3"> Continuer </v-btn>

            <v-btn text @click="e1 = 1"> Annuler </v-btn>
          </v-col>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col cols="4">
              <v-card class="mb-12" color="#f7f7f7" height="300px">
                <v-card-title>Utilisateur de test</v-card-title>
                <v-card-text>
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
                        v-model="userEmailVerifyField"
                        :error-messages="errors"
                        width="100%"
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <div class="mb-3">
                      <v-btn
                        color="primary"
                        :disabled="loading1 || invalid"
                        @click="verify"
                        :loading="loading1"
                      >
                        Verifier
                      </v-btn>
                      <v-alert
                        v-if="message1"
                        :type="successfulVerify ? 'success' : 'error'"
                        class="text-center"
                      >
                        {{ message1 }}
                      </v-alert>
                    </div>
                  </ValidationObserver>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="8">
              <v-card class="mb-12" color="#f7f7f7" height="300px">
                <v-card-title> Informations supplementaires </v-card-title>
                <v-card-text>
                  <ValidationProvider
                    name="Taxes"
                    rules="double|min:0"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      clearable
                      dense
                      type="numeric"
                      label="Taxes"
                      prepend-inner-icon="mdi-currency-usd"
                      v-model="options.taxe"
                      :error-messages="errors"
                      width="100%"
                    >
                    </v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Frais"
                    rules="double|min:0"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      clearable
                      dense
                      type="numeric"
                      label="Frais"
                      prepend-inner-icon="mdi-currency-usd"
                      v-model="options.frais"
                      :error-messages="errors"
                      width="100%"
                    >
                    </v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Frais supplementaires"
                    rules="double|min:0"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      outlined
                      clearable
                      dense
                      type="numeric"
                      label="Frais supplementaires"
                      prepend-inner-icon="mdi-currency-usd"
                      v-model="options.fraisSupplementaires"
                      :error-messages="errors"
                      width="100%"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card class="mb-12" color="#f7f7f7" height="100%">
            <v-card-title> Resultats </v-card-title>
            <v-alert type="error" v-if="result">
              {{ resultats }}
            </v-alert>
            <v-card-text v-if="resultats && !result">
              <p :class="resultatBool ? 'successColor' : 'errorColor'">
                Status : {{ resultatBool ? "Succes" : "Echec" }}
              </p>
              <div>
                <h2>Transaction</h2>
                <h3>Id : {{ resultats?.transaction.value.id }}</h3>
                <h3>Date : {{ resultats?.transaction.value.createdAt }}</h3>

                <h3>
                  Montant :
                  {{
                    resultats?.transaction.value.finalAmount +
                    " " +
                    resultats?.transaction.value.currency
                  }}
                </h3>
              </div>
              <v-divider></v-divider>
              <v-spacer></v-spacer>

              <div>
                <h2>
                  Acheteur :
                  {{ resultats?.transaction.initiateurs.buyer }}
                </h2>
                <h3>
                  Compte Avant :
                  {{
                    resultats?.transaction.initiateurs.buyer_account_before +
                    " " +
                    resultats?.transaction.value.currency
                  }}
                </h3>
                <h3>
                  Compte Apres :
                  {{
                    resultats?.transaction.initiateurs.buyer_account_after +
                    " " +
                    resultats?.transaction.value.currency
                  }}
                </h3>
              </div>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
              <div>
                <h2>
                  Vendeur : {{ resultats?.transaction.initiateurs.seller }}
                </h2>
                <h3>
                  Compte Avant :
                  {{
                    resultats?.transaction.initiateurs.seller_account_before +
                    " " +
                    resultats?.transaction.value.currency
                  }}
                </h3>
                <h3>
                  Compte Apres :
                  {{
                    resultats?.transaction.initiateurs.seller_account_after +
                    " " +
                    resultats?.transaction.value.currency
                  }}
                </h3>
              </div>
              <v-divider></v-divider>
              <v-spacer></v-spacer>

              <div>
                <h2>Articles</h2>
                <v-list>
                  <v-list-item v-for="item in articles" :key="item.name">
                    <h3>Name : {{ item.name }}</h3>
                    •
                    <h3>Total Price : {{ item.totalPrice }}</h3>
                  </v-list-item>
                </v-list>
              </div>
              <v-divider></v-divider>
              <v-spacer></v-spacer>

              <p>Message : {{ resultats?.message }}</p>
            </v-card-text>
          </v-card>

          <v-col class="mt-3">
            <v-btn color="primary" @click="test"> Tester </v-btn>

            <v-btn text @click="e1 = 2"> Annuler </v-btn>
          </v-col>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import User from "@/models/user.model";

export default {
  name: "SandBoxView",
  data() {
    return {
      user: new User("", "", ""),

      e1: 1,
      message: "",
      message1: "",
      successful: false,
      successfulVerify: false,
      nomField: "",
      loading: false,
      loading1: false,
      prixField: 1,
      qteField: 1,
      totalField: 1,
      userEmailVerifyField: "",
      fraisSupplementaire: 0,
      frais: 0,
      taxe: 0,
      show: false,
      show1: false,
      dialog: false,
      articles: [
        {
          name: "Airpod local",
          unitPrice: 5000,
          quantity: 1,
          totalPrice: 5000,
        },
        {
          name: "Cable iPhone",
          unitPrice: 1500,
          quantity: 2,
          totalPrice: 3000,
        },
        {
          name: "Souris HP",
          unitPrice: 2500,
          quantity: 1,
          totalPrice: 2500,
        },
      ],
      resultats: "",
      result: false,
      resultatBool: false,
      options: {
        taxe: 0,
        frais: 0,
        fraisSupplementaires: 0,
      },
    };
  },
  methods: {
    addItem() {
      this.articles.push({
        name: this.nomField,
        unitPrice: this.prixField,
        quantity: this.qteField,
        totalPrice: parseFloat(this.prixField * this.qteField),
      });
      this.closeDialog();
    },
    removeItem(index) {
      this.articles.splice(index, 1);
    },
    closeDialog() {
      this.nomField = " ";
      this.qteField = 1;
      this.prixField = 1;
      this.dialog = false;
    },
    verify() {
      this.loading1 = true;
      this.message1 = "";

      if (this.userEmailVerifyField) {
        this.$store
          .dispatch("verify", this.userEmailVerifyField)
          .then((data) => {
            console.log(data);
            this.message1 = "User Found";
            this.successfulVerify = true;
            this.loading1 = false;
          })
          .catch((err) => {
            this.loading1 = false;
            this.successfulVerify = false;
            this.message1 =
              (err.response && err.response.data) ||
              err.message ||
              err.toString();
          });
      }
    },
    register() {
      this.message = "";
      this.loading = true;
      if (this.user.email && this.user.password && this.user.password_confirm) {
        this.$store
          .dispatch("create", this.user)
          .then(() => {
            this.$store
              .dispatch("getAccountByMail", this.user.email)
              .then((data) => {
                this.successful = true;
                this.message = {
                  Compte: data.account.id,
                  Balance: data.account.balance + " " + data.account.currency,
                };
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                this.successful = false;
                this.message =
                  (err.response && err.response.data) ||
                  err.message ||
                  err.toString();
              });
          })
          .catch((err) => {
            this.loading = false;
            this.successful = false;
            this.message =
              (err.response && err.response.data) ||
              err.message ||
              err.toString();
          });
      }
    },
    test() {
      this.resultats = "";
      this.result = false;

      if (!this.userEmailVerifyField) {
        this.$toast.error("Veuillez entrer un utilisateur de test", {
          duration: 3000,
        });
      } else if (this.articles.length == 0) {
        this.$toast.error("Veuillez fournir des articles de test", {
          duration: 3000,
        });
      } else {
        this.$store
          .dispatch("test", {
            articles: this.articles,
            testUserEmail: this.userEmailVerifyField,
            options: this.options,
          })
          .then((data) => {
            this.resultatBool = true;
            this.resultats = data;
            this.result = false;

            this.$store
              .dispatch("getAccount", {})
              .then(() => {})
              .catch((err) => {
                console.log(err.message);
              });

            this.$toast.success(
              "Transaction reussie • Veuillez consulter votre solde ou voir l'historique des transactions",
              {
                duration: 5000,
              }
            );
          })
          .catch((err) => {
            this.resultatBool = false;
            this.result = true;
            this.resultats =
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
.successColor {
  background-color: rgb(11, 133, 11);
}
.errorColor {
  background-color: rgb(197, 23, 23);
}
</style>
