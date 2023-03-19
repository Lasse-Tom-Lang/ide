const nav = document.querySelector("nav") as HTMLElement

let projectID:any = window.location.pathname.split("/")
projectID = projectID[projectID.length - 1]

let files: files

function addExplorerElement(name: string, path: string, parent: HTMLElement) {
  let div = document.createElement("div")
  let label = document.createElement("p")
  label.innerText = name
  div.setAttribute("data-path", path)
  if (parent != nav) {
    div.style.display = "none"
  }
  label.addEventListener("click", (event: Event) => {
    let target = event.target as HTMLElement
    let children = target.parentElement!.children as HTMLCollection
    let firstChild = children[1] as HTMLElement
    if (firstChild) {
      if (firstChild.style.display == "none") {
        for (let i = 0; i < children.length; i++) {
          if (i == 0) continue
          let child = children[i] as HTMLElement
          child.style.display = "block"
        };
      }
      else if (firstChild.style.display == "block") {
        for (let i = 0; i < children.length; i++) {
          if (i == 0) continue
          let child = children[i] as HTMLElement
          child.style.display = "none"
        };
      }
    }
    else {
      let path = target.parentElement!.getAttribute("data-path") as string
      fetch(`/getFile?file=${path}`)
        .then(data => data.text())
        .then(data => {
          text = data
          syntaxHighlight()
          editorWindow.innerHTML = text
        })
    }
  })
  div.appendChild(label)
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