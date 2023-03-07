const nav = document.querySelector("nav") as HTMLElement

let projectID:any = window.location.pathname.split("/")
projectID = projectID[projectID.length - 1]

let files: files

function addExplorerElement(name: string, path: string, parent: HTMLElement) {
  let div = document.createElement("div")
  div.innerText = name
  div.setAttribute("data-path", path)
  parent.appendChild(div)
}

function createChildren(directory: files) {
  if (directory.path == `./projects/${projectID}`) {
    addExplorerElement("Project", `projects/${projectID}`, nav)
  }
  else {
    let path: any = directory.path.split("/")
    path.pop()
    path = path.join("/")
    let parent = document.querySelector(`[data-path="${path}"]`) as HTMLElement
    addExplorerElement(directory.name, directory.path, parent)
  }
  if (directory.children) {
    directory.children.forEach(child => {
      createChildren(child)
    })
  }
}

fetch(`/getFiles?projectID=${projectID}`)
  .then(data => data.json())
  .then(data => {
    files = data
    createChildren(files)
  })