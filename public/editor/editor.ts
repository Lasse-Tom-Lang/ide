const editorWindow = document.getElementById("editorWindow") as HTMLTextAreaElement

let text = `
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
  dashboardTitle.innerText = \`Welcome back \${dashboardData.name}\`
  dashboardData.projects.forEach(project => addProjectToGrid(project))
}

function addProjectToGrid(project: project) {
  let div = document.createElement("div")
  let title = document.createElement("h2")
  title.innerText = project.name
  div.appendChild(title)
  project.user.forEach(user => {
    let userP = document.createElement("p")
    userP.innerText = user.name
    div.appendChild(userP)
  })
  let link = document.createElement("a")
  link.href = \`/editor/\${project.id}\`
  link.innerText = "Open"
  div.appendChild(link)
  dashboardProjectGrid.appendChild(div)
}
`

function syntaxHighlight() {
  text = text
  .replace(
    /\n/g,
    "<br>"
  ).replace(
    /(let|var|const|interface)+\s+(\S*)+\s/g,
    "$1 <span style='color:red;'>$2</span> "
  ).replace(
    /(interface|\svar |\slet |\sconst |if|else|function|import|from|await|async|for)/g,
    "<span style='color:orange;'>$1</span>"
  ).replace(
    /("([\s\S]*?)")/g,
    "<span style='color:green'>$1</span>"
  ).replace(
    /((\/{2})+.*)/g,
    "<span style='color:lightgreen'>$1</span>"
  ).replace(
    /  /g,
    "&nbsp;&nbsp;"
  )
}

syntaxHighlight()

editorWindow.innerHTML = text

editorWindow.addEventListener("keyup", () => {
  text = editorWindow.innerText
  console.log(text)
  syntaxHighlight()
  editorWindow.innerHTML = text
})