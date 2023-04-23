import bcrypt from "bcrypt"
import prisma from "src/lib/prisma"

export default async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash("12345678", 10)

        const user = await prisma.user.create({
            data: {
                id: hashedPassword,
                name: "AYOUB ALAHYANE",
                username: "ayoub2023",
                email: "contact@starthinc.com",
                password: hashedPassword,
                role: "Admin",
                gender: "Male"
            }
        })

        return res.status(201).json({ user })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Failed to create user" })
    }
}
