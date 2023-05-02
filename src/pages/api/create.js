import prisma from "src/lib/prisma";
import bcrypt from "bcrypt"


export default async (req, res) => {
    console.log("run");
    if (req.method !== "POST") {
        return res.redirect("/404", 404)
    }

    const { table, ...customerData } = req.body;
    try {
        const data = await prisma[table].create({
            data: {
                id: await bcrypt.hash(Date.now().toString(), 1),
                ...customerData
            }
        });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json(error)
    }

}