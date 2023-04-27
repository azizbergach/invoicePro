import prisma from "src/lib/prisma";


export default async (req, res) => {

    if (req.method !== "POST") {
        return res.redirect("/404", 404)
    }

    const { table, idsToDelete } = req.body;
    try {
        const deleted = await prisma[table].deleteMany({
            where: {
                id: {
                    in: idsToDelete
                }
            }
        });
        return res.status(200).json(deleted)
    } catch (error) {
        return res.status(200).json(error)
    }

}