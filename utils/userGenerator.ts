import { faker } from '@faker-js/faker';
import * as fs from 'fs';

export function generateRandomUser() {
  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    company: faker.company.name(),
    address: faker.address.streetAddress(),
    address2: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: faker.address.zipCode(),
    mobileNum: faker.phone.number(),
  };

  fs.writeFileSync(
    './dataGenerate/userData.json',
    JSON.stringify(user, null, 2)
  );

  return user;
}

export function generateRandomData() {
  return {
    contactName: faker.name.firstName(),
    contactEmail: faker.internet.email(),
    contactSubject: faker.lorem.sentence(),
    contactMsg: faker.lorem.paragraph(),
  };
}

export function generateRandomComment() {
  return {
    chekoutComment: faker.lorem.sentence(),
  };
}

export function getRandomSearchTerm(terms) {
  const randomIndex = Math.floor(Math.random() * terms.length);
  return terms[randomIndex];
}

export function generateRandomDataCard() {
  const cardName = faker.name.fullName(); 
  const cardNumber = faker.finance.creditCardNumber(); 
  const expirationDate = faker.date.future({ years: 1 }); 
  const cardMonth = (expirationDate.getMonth() + 1).toString().padStart(2, '0'); 
  const cardYear = expirationDate.getFullYear().toString().slice(-2); 
  const cardCVV = faker.finance.creditCardCVV(); 

  return {
    cardName,
    cardNumber,
    cardMonth,
    cardYear,
    cardCVV,
  };
}
