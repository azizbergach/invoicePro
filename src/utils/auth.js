import JWT from "jsonwebtoken";

const generateToken = (user) => {
  return JWT.sign(
    {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.AUTH_TOKEN,
    {
      expiresIn: "30d",
    }
  )
}

export { generateToken }