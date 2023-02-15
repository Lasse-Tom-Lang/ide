import express from "express"
import sessions from "express-session"
import { PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'

const app = express()
const oneDay = 86400000
const prisma = new PrismaClient()

declare module 'express-session' {
  interface SessionData {
    userID: string
  }
}

app.listen(80, () => {
  console.log("Listening on port 80")
})

app.use(sessions({
  secret: ".f2.97rrh34?r318b24!82rb",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.get("/", (req, res) => {
  if (!req.session.userID) {
    res.redirect("/login")
    return
  }
  res.sendFile(__dirname + "/public/home.html")
})

app.get("/login", (req, res) => {
  if (req.session.userID) {
    res.redirect("/")
    return
  }
  res.sendFile(__dirname + "/public/login.html")
})

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/public/style.css")
})

app.get("/login.js", (req, res) => {
  res.sendFile(__dirname + "/public/login.js")
})

app.get("/checkLogin", async (req, res) => {
  const userName = req.query.userName as string

  if (!userName || !req.query.password) {
    res.json({status: 0})
    res.end()
    return
  }
  let password = req.query.password as string
  password = createHash('sha256').update(password).digest('base64') as string
  const user = await prisma.user.findFirst({
    where: {
      name: userName,
      password: password
    },
    select: {
      id: true
    }
  })
  if (!user) {
    res.json({status: 0})
    res.end()
    return
  }
  req.session.userID = user.id
  res.json({status: 1, user})
  res.end()
})