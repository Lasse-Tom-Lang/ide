interface project {
  name: string
  id: string
  user: user[]
}

interface user {
  name: string
  id: string
}

interface dashboardData {
  id: string,
  name: string,
  projects: project[]
}