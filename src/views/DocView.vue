<template>
  <!-- 
          background-color="deep-purple accent-4"
                dark
 -->
  <v-card>
    <v-tabs fixed-tabs center-active v-model="tab">
      <v-tab key="tab1">API info</v-tab>
      <v-tab key="tab2">Documentation</v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item key="tab1">
          <v-card flat>
            <v-card-text>
              <h3>API INFO</h3>
              <div class="text-success">
                <hr />
              </div>
              <div class="content" Align="LEFT">
                <p class="body-1">
                  Notre API est une API REST de paiment VueJs. Elle a des URL
                  prévisibles orientées ressources. L'API prend en charge les
                  requetes sous format JSON uniquement.
                </p>

                <h3>Endpoints Disponibles</h3>
                <ul>
                  <li class="body-1">
                    /api/auth: Endpoint de base pour toutes les requetes
                    concernant l'authentification.
                  </li>
                  <li class="body-1">
                    /api/user: Endpoint de base pour toutes les requetes
                    concernant l'utilisateur.
                  </li>
                  <li class="body-1">
                    /api/payment: Endpoint de base pour toutes les requetes
                    concernant le paiement.
                  </li>
                </ul>
                <h3>Formats Supportés</h3>
                <p class="body-1">
                  L'API prend en charge les requetes sous format JSON uniquement
                </p>
              </div>

              <hr />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="tab2">
          <v-card flat>
            <v-card-text>
              <h3>Documentation</h3>
              <div class="text-success">
                <hr />
              </div>
              <div class="content" Align="LEFT">
                <p class="body-1">
                  Notre API est une API REST de paiment VueJs. Elle a des URL
                  prévisibles orientées ressources. L'API prend en charge les
                  requetes sous format JSON uniquement.
                </p>

                <h3>Endpoints</h3>
                <h5>• Authentification (/api/auth/)</h5>
                <p class="body-1">
                  Method: post <br />
                  Route: "/auth/signup" <br />
                  Usage: Enregistrer un nouvel utilisateur <br />
                  Body: {email, password, password_confirm}<br /><br />

                  Method: post <br />
                  Route: "/auth/signin" <br />
                  Usage: Se connecter <br />
                  Body: {email, password, password_confirm}<br />
                  <br />

                  Method: post <br />
                  Route: "/auth/signout" <br />
                  Usage: Se déconnecter <br />
                  Body: {}<br /><br />

                  Method: post <br />
                  Route:"/auth/password-reset" <br />
                  Usage: Reinitialiser son mot de passe <br />
                  Body: {email}<br /><br />
                </p>

                <h5>• Paiement (/api/payment/)</h5>
                <p class="body-1">
                  Method: post<br />
                  Route("/payment" ) <br />
                  Usage: Effectuer un paiement <br />
                  Body: {articles, testUserEmail, options}<br /><br />
                </p>

                <h5>• Utilisateur (/api/user/)</h5>
                <p class="body-1">
                  Method: put <br />
                  Route: "/user/update" <br />
                  Usage: Modifier un utilisateur <br />
                  Body: {Utilisateur}<br /><br />
                </p>
                <p class="body-1">
                  Method: post <br />
                  Route:"/user/password/update" <br />
                  Usage: Mettre a jour son mot de passe <br />
                  Body: {token, password}<br /><br />
                </p>
                <p class="body-1">
                  Method: get <br />
                  Route: "/user/profile" <br />
                  Usage: Afficher le profile d'un utilisateur <br />
                  Body: {}<br /><br />
                </p>
                <p class="body-1">
                  Method: put <br />
                  Route: "/user/profile/update" <br />
                  Usage: Modifier le profile d'un utilisateur <br />
                  Body: {Profile}<br /><br />
                </p>
                <p class="body-1">
                  Method: get <br />
                  Route: "/user/account" <br />
                  Usage:Afficher le compte d'un utilisateur <br />
                  Body: {}<br /><br />
                </p>
                <p class="body-1">
                  Method: get <br />
                  Route: "/user/account/mail/:email" <br />
                  Usage: Récupérer l'utilisateur de test grace à son mail <br />
                  Params: {email}<br /><br />
                </p>
                <p class="body-1">
                  Method: put <br />
                  Route: "/user/account/update" <br />
                  Usage: Modifier le compte de l'utilisateur test <br />
                  Body: {Account}<br /><br />
                </p>
                <p class="body-1">
                  Method: get <br />
                  Route: "/user/transaction"<br />
                  Usage: Renvoie toutes les transactions que l'utilisateur a
                  effectué <br />
                  Body: {}<br /><br />
                </p>
                <p class="body-1">
                  Method: get <br />
                  Route: "/user/transaction/:email"<br />
                  Usage: Renvoie toutes les transactions que l'utilisateur a
                  effectué grace a so email <br />
                  Params: {email}<br /><br />
                </p>
              </div>

              <hr />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "DocView",
  data() {
    return {
      tab: "",
    };
  },
};
</script>

<style scoped>
h3,
h5,
h6 {
  color: rgb(68, 36, 131);
  padding: 5px;
  margin-bottom: 0.5rem;
}
h5 {
  text-transform: uppercase;
}
</style>
