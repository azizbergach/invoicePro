import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";


export function generateCompanyMockData() {
    const data = [];
    const Type = ['société', 'auto-entrepreneur'];
    const Bank = ['CIH', 'Al barid bank', 'Bank of Africa'];
    for (let i = 0; i < 50; i++) {
        data.push({
            id: faker.random.alphaNumeric(10),
            name: faker.name.fullName(),
            phoneNumber: faker.phone.number('6########'),
            address: faker.address.streetAddress(),
            city: faker.address.cityName(),
            ifNumber: faker.datatype.number({ min: 100000 }).toString(),
            tpNumber: faker.datatype.number({ min: 1000000000 }).toString(),
            iceNumber: faker.datatype.number({ min: 1000000000 }).toString(),
            type: Type[Math.floor(Math.random() * 2)],
            bank: Bank[Math.floor(Math.random() * 3)],
            rib: faker.random.numeric(16),
            logoUrl: faker.image.avatar(),
            invoiceId: faker.random.alphaNumeric(10)
        });
    }
    return data;
}


export function generateCustomerMockData() {
    const data = [];
    const Type = ['individual', 'company'];
    for (let i = 0; i < 10; i++) {
        data.push({
            id: faker.random.alphaNumeric(10),
            name: faker.name.fullName(),
            phoneNumber: faker.phone.number('6########'),
            address: faker.address.streetAddress(),
            city: faker.address.cityName(),
            cinNumber: faker.datatype.number({ min: 100000 }).toString(),
            iceNumber: faker.datatype.number({ min: 1000000000 }).toString(),
            type: Type[Math.floor(Math.random() * 2)]
        });
    }
    return data;
}

export async function generateuserMockData() {
    const data = [];
    data.push({
        id: faker.random.alphaNumeric(10),
        name: faker.name.fullName(),
        username: 'ayoub2023',
        email: faker.internet.email(),
        password: await bcrypt.hash("12345678", 10),
        role: 'Admin',
        gender: 'Male',
        isAdmin: true
    });
    return data;
}