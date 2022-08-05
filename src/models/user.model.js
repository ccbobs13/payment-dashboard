export default class User {
  constructor(email, password, password_confirm) {
    this.email = email;
    this.password = password;
    this.password_confirm = password_confirm;
  }
}
