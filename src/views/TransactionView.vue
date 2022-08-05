<template>
  <v-container>
    <h1 class="mb-3">
      <v-icon x-large>mdi-clipboard-text-clock</v-icon> Transactions
    </h1>
    <v-card>
      <v-tabs fixed-tabs center-active v-model="tab">
        <v-tab key="tab1">Vos transactions</v-tab>
        <v-tab key="tab2"
          >Voir les transactions d'un utilisateur grace a son email</v-tab
        >

        <v-tabs-items v-model="tab">
          <v-tab-item key="tab1">
            <v-card flat>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="tab2">
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-card class="mb-12" color="#f7f7f7">
                    <v-card-title
                      >Recherche des transactions par email</v-card-title
                    >
                    <v-card-text>
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
                            label="Email d'un utilisateur de test"
                            prepend-inner-icon="mdi-email"
                            v-model="email"
                            :error-messages="errors"
                            width="100%"
                          >
                          </v-text-field>
                        </ValidationProvider>
                        <div class="mb-3">
                          <v-btn
                            color="primary"
                            :disabled="loading || invalid"
                            @click="rechercher"
                            width="40%"
                            :loading="loading"
                          >
                            Rechercher
                          </v-btn>
                        </div>
                      </ValidationObserver>
                    </v-card-text>
                  </v-card>
                  <v-alert
                    text
                    v-if="message"
                    :type="successful ? 'success' : 'error'"
                  >
                    {{ message }}
                  </v-alert>
                </v-row>
                <v-row class="mb-3">
                  <v-data-table
                    :headers="headers"
                    :items="items2"
                    :items-per-page="5"
                    class="elevation-1"
                  ></v-data-table>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import userService from "../services/user.service";

export default {
  name: "TransactionView",
  data() {
    return {
      tab: "",
      headers: [
        { text: "#", value: "id", align: "start" },
        {
          text: "Status",
          value: "status",
        },
        { text: "Amount", value: "amount" },
        { text: "Balance", value: "balance" },
        { text: "Currency", value: "currency" },
        { text: "Taxes", value: "taxes" },
        { text: "Fees", value: "fees" },
        { text: "Added Fees", value: "addedFees" },
        { text: "Final Amount", value: "finalAmount" },
        { text: "Date", value: "createdAt" },
      ],
      items: [],
      items2: [],
      itemsPerPage: 4,
      loading: false,
      message: "",
      email: "",
    };
  },
  mounted() {
    userService
      .getUserTransactions()
      .then((result) => {
        this.items = result?.transactions;
      })
      .catch(() => {});
  },
  methods: {
    rechercher() {
      this.message = "";
      this.loading = true;
      userService
        .getUserTransactionsByMail(this.email)
        .then((result) => {
          this.loading = false;
          this.items2 = result?.transactions;
        })
        .catch((err) => {
          this.loading = false;

          this.message =
            (err.response && err.response.data) ||
            err.message ||
            err.toString();
        });
    },
  },
};
</script>

<style scoped></style>
