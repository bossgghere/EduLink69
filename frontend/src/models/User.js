export default class User {
  constructor({ _id, name, email, role, avatar }) {
    this.id = _id
    this.name = name
    this.email = email
    this.role = role
    this.avatar = avatar
  }
}
