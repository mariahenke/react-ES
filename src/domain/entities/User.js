// src/domain/entities/User.js
export class User {
  constructor({ id, name, email, status, userType }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
    this.userType = userType;
  }
}
