import prisma from "src/lib/prisma";


export default async (req, res) => {

    if (req.method !== "POST") {
        return res.redirect("/404", 404)
    }

    const { table, where, data } = req.body;
    try {
        const updated = await prisma[table].update({
            where,
            data
        });
        return res.status(200).json(updated)
    } catch (error) {
        return res.status(200).json(error)
    }

}