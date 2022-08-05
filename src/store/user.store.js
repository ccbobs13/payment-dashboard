import UserService from "@/services/user.service";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const store = {
  state: {
    status: initialState.status.loggedIn,
    user: initialState.user,
    userInfos: {
      id: "",
      email: "",
    },
    account: {
      id: "",
      balance: "",
    },
    profile: {
      id: "",
      firstname: "",
      lastname: "",
      country: "",
      age: "",
    },
  },
  getters: {},
  mutations: {
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_PROFILE: (state, profile) => {
      state.profile = profile;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_USERINFOS: (state, userInfos) => {
      state.userInfos = userInfos;
    },
    LOGOUT: (state) => {
      state.status = false;
      state.user = null;
      state.userInfos = { id: "", email: "" };
      state.account = { id: "", balance: "" };
      state.profile = {
        id: "",
        firstname: "",
        lastname: "",
        country: "",
        age: "",
      };
    },
  },
  actions: {
    login: (store, user) => {
      return UserService.login(user)
        .then((response) => {
          store.commit("SET_STATUS", true);
          store.commit("SET_USER", response);
          return Promise.resolve(response);
        })
        .catch((err) => {
          store.commit("SET_STATUS", false);
          store.commit("SET_USER", null);
          return Promise.reject(err);
        });
    },
    logout: (store) => {
      return UserService.logout()
        .then((response) => {
          store.commit("LOGOUT");
          return Promise.resolve(response);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    register: (store, user) => {
      return UserService.register(user)
        .then((response) => {
          store.commit("SET_STATUS", false);
          store.commit("SET_USER", null);
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          store.commit("SET_STATUS", false);
          store.commit("SET_USER", null);
          return Promise.reject(err);
        });
    },
    create: (store, user) => {
      return UserService.create(user)
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    getAccount: (store) => {
      return UserService.getUserAccount()
        .then((response) => {
          store.commit("SET_ACCOUNT", response.account);
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          store.commit("SET_ACCOUNT", null);
          return Promise.reject(err);
        });
    },
    getAccountByMail: (store, email) => {
      return UserService.getUserAccountByMail(email)
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    getProfile: (store) => {
      return UserService.getProfile()
        .then((response) => {
          store.commit("SET_PROFILE", response);
          return Promise.resolve(response);
        })
        .catch((err) => {
          store.commit("SET_PROFILE", null);
          return Promise.reject(err);
        });
    },
    updateProfile: (store, profile) => {
      return UserService.updateProfile(profile)
        .then((response) => {
          store.commit("SET_PROFILE", response);
          return Promise.resolve(response);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    verify: (store, email) => {
      return UserService.getUserByEmail(email)
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    test: (store, { articles, testUserEmail, options }) => {
      return UserService.test(articles, testUserEmail, options)
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  modules: {},
};

export default store;
