import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "@/utils/validators";

describe("Validators utils", () => {
  it("should give an error with empty payload", () => {
    expect(validateEmptyAndLength3()).toBe("* Este campo é obrigatório.");
  });

  it("should give an error with payload length less than 3", () => {
    expect(validateEmptyAndLength3("12")).toBe(
      "* Este campo precisa ter no mínimo 3 caracteres."
    );
  });

  it("should return true with payload length equal or greater than 3", () => {
    expect(validateEmptyAndLength3("123")).toBe(true);
    expect(validateEmptyAndLength3("1234")).toBe(true);
  });

  it("should give an error with empty payload", () => {
    expect(validateEmptyAndEmail()).toBe("* Este campo é obrigatório.");
  });

  it("should give an error with invalid payload", () => {
    expect(validateEmptyAndEmail("john@")).toBe(
      "* Este campo precisa ser um e-mail válido."
    );
  });

  it("should return true with valid payload", () => {
    expect(validateEmptyAndEmail("john@doe.com")).toBe(true);
  });
});
