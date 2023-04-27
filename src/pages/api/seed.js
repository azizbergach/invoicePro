import bcrypt from "bcrypt"
import prisma from "src/lib/prisma"

export default async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash("12345678", 10)

        const user = await prisma.customer.create({
            data: {
                id: await bcrypt.hash(Date.now().toString(), 1),
                name: 'Aziz',
                type: 'individual',
                phoneNumber: '630633523',
                city: 'Agadir',
                address: 'DOUAR AMSDEKT TIDSSI NISSENDALNE',
                cinNumber: '12000',
                iceNumber: '00000000000'
            }
        })

        return res.status(201).json({ user })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Failed to create user" })
    }
}
