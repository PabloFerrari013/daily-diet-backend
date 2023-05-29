export class UserAlreadyExists extends Error {
  super() {
    console.error("❌ User already exists! ❌");
  }
}
