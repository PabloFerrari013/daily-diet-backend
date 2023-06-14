export class MealAlreadyExists extends Error {
  constructor() {
    super("❌ Meal already exists! ❌");
  }
}
