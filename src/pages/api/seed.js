import prisma from "src/lib/prisma";
import {
    generateCompanyMockData,
    generateCustomerMockData,
    generateuserMockData,
    generateProductMockData
} from "../../utils/mock-data";


export default async (req, res) => {
    try {

        const data = generateProductMockData(); /// use "await" if it is an "async" func
        console.log(data);
        /* const user = await prisma.company.createMany({ data }) */

        return res.status(201).json({ data })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}
