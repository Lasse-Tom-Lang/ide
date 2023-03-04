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

app.get("/home.js", (req, res) => {
  res.sendFile(__dirname + "/public/home.js")
})

app.get("/editor/editor.js", (req, res) => {
  res.sendFile(__dirname + "/public/editor/editor.js")
})

app.get("/editor/:projectID", async (req, res) => {
  let projectID = req.params.projectID as string
  let project = await prisma.project.findFirst({
    where: {
      id: projectID
    },
    select: {
      user: {
        select: {
          id: true
        }
      }
    }
  })
  let allow = false
  project?.user.forEach(user => {
    if (user.id == req.session.userID) {
      allow = true
      return
    }
  })
  if (!allow) {
    res.redirect("/")
    return
  }
  res.sendFile(__dirname + "/public/editor/editor.html")
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

app.get("/getDashboardData", async (req, res) => {
  if (!req.session.userID) {
    res.json({status: 0})
    res.end()
    return
  }
  const data = await prisma.user.findFirst({
    where: {
      id: req.session.userID
    },
    select: {
      name: true,
      id: true,
      projects: {
        select: {
          name: true,
          id: true,
          user: {
            select: {
              name: true,
              id: true
            }
          }
        }
      }
    }
  })
  res.json({status: 1, data})
  res.end()
})

app.get("/logout", (req, res) => {
  req.session.userID = undefined
  res.end()
})