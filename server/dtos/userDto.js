module.exports = class UserDto {
  email;
  id;
  isActivated;
  firstName;
  lastName;
  birthDate;
  gender;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.birthDate = model.birthDate;
    this.gender = model.gender;
  }
};
