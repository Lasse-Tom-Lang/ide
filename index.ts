import express from "express"
import sessions from "express-session"

const app = express()
const oneDay = 86400000

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
  }
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