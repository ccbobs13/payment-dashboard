import instance from "./http.service";

class UserService {
  login(user) {
    return instance()
      .post("auth/signin", {
        email: user.email,
        password: user.password,
        password_confirm: user.password_confirm,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  register(user) {
    return instance().post("auth/signup", {
      email: user.email,
      password: user.password,
      password_confirm: user.password_confirm,
    });
  }

  create(user) {
    return instance().post("auth/signup", {
      email: user.email,
      password: user.password,
      password_confirm: user.password_confirm,
      category: "CLIENT",
    });
  }

  getUserTransactions() {
    return instance()
      .get("user/transaction", {})
      .then((response) => {
        return response.data;
      });
  }

  getUserTransactionsByMail(email) {
    return instance()
      .get("user/transaction/" + email, {})
      .then((response) => {
        return response.data;
      });
  }

  getUserAccount() {
    return instance()
      .get("user/account", {})
      .then((response) => {
        return response.data;
      });
  }

  getUserAccountByMail(email) {
    return instance()
      .get("user/account/mail/" + email, {})
      .then((response) => {
        return response.data;
      });
  }

  getProfile() {
    return instance()
      .get("user/profile", {})
      .then((response) => {
        return response.data;
      });
  }

  updateProfile(profile) {
    return instance()
      .put("user/profile/update", {
        firstname: profile.firstname,
        lastname: profile.lastname,
        country: profile.country,
        age: profile.age,
      })
      .then((response) => {
        return response.data;
      });
  }

  getUserByEmail(email) {
    return instance()
      .get("user/" + email, {})
      .then((response) => {
        return response.data;
      });
  }

  test(articles, testUserEmail, options) {
    console.log(articles, testUserEmail, options);
    return instance()
      .post("payment", {
        articles: articles,
        userTestEmail: testUserEmail,
        options: options,
      })
      .then((response) => {
        return response.data;
      });
  }

  resetPassword(email) {
    return instance()
      .post("auth/password-reset", { email })
      .then((response) => {
        return response.data;
      });
  }

  updatePassword(token, password) {
    return instance()
      .post("user/password/update", { token, password })
      .then((response) => {
        return response.data;
      });
  }

  logout() {
    return instance()
      .post("auth/signout", {})
      .then((response) => {
        localStorage.removeItem("user");
        return response.data;
      });
  }
}

export default new UserService();
