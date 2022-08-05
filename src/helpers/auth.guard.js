import router from "@/router";
import store from "@/store";

const AUTHGUARD = () => {
  let status = store.state.user.status;
  console.log(status);
  if (status) return true;
  router.push("login");
};

export default AUTHGUARD;
