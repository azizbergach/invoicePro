import prisma from "src/lib/prisma";

export default async (req, res) => {

    if (req.method !== "POST") {
        return res.redirect("/404", 404)
    }

    const { table, ...data } = req.body;
    console.log("table", table);
    console.log("data", data);
    try {
        const newElement = await prisma[table].create({
            data
        });
        return res.status(200).json({
            data: newElement
        })
    } catch (error) {
        return res.status(200).json(error)
    }

}