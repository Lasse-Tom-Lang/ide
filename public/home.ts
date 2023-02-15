const dashboardTitle = document.querySelector("h1") as HTMLHeadingElement
const dashboardProjectGrid = document.getElementById("dashboard-projectGrid") as HTMLDivElement

let dashboardData: dashboardData

fetch("/getDashboardData")
  .then(data => data.json())
  .then(data => {
    if (data.status == 0) {
      return
    }
    dashboardData = data.data
    setupDashboard()
  })

function setupDashboard() {
  dashboardTitle.innerText = `Welcome back ${dashboardData.name}`
  dashboardData.projects.forEach(project => addProjectToGrid(project))
}

function addProjectToGrid(project: project) {
  let div = document.createElement("div")
  let title = document.createElement("h2")
  title.innerText = project.name
  div.appendChild(title)
  dashboardProjectGrid.appendChild(div)
}