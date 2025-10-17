export default class Course {
  constructor({ _id, title, description, image, content }) {
    this.id = _id
    this.title = title
    this.description = description
    this.image = image
    this.content = content // array of lessons
  }
}
