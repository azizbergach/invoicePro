import prisma from "src/lib/prisma";


export default async (req, res) => {

    if (req.method !== "POST") {
        return res.redirect("/404", 404)
    }

    const { table, id } = req.body;
    try {
        const data = await prisma[table].findFirst({
            where: {
                id
            }
        });
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json(error)
    }

}