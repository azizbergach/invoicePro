import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/auth';


const login = async (req, res) => {

    if (req.method !== "POST") {
        return res.redirect("/notfound", 404)
    }

    const { username, password } = req.body;
    let user;
    if (username.includes('@')) {
        user = await prisma.user.findUnique({
            where: {
                email: username
            }
        });
    } else {
        user = await prisma.user.findUnique({
            where: {
                username
            }
        });
    }
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            return res.status(200).send({
                token,
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            })
        } else {
            return res.status(401).json({ message: "invalid password" })
        }
    }
    return res.status(401).json({ message: "invalid email" })
}

export default login;