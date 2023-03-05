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
      /(interface|var |let |const |if|else|function|import|from|await|async|for)/g,
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

function setCaretPosition(caretPosition: number, selection: Selection) {
  const updatedRange = document.createRange();
  const walker = document.createTreeWalker(
    editorWindow,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
  );

  let currentNode = walker.nextNode();
  let charCount = 0;

  while (currentNode) {
    if (currentNode.nodeType === Node.TEXT_NODE) {
      const textLength = currentNode.textContent!.length;
      if (charCount + textLength >= caretPosition) {
        updatedRange.setStart(currentNode, caretPosition - charCount);
        break;
      } else {
        charCount += textLength;
      }
    } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
      let currentNodeElement = currentNode as HTMLElement
      if (currentNodeElement.contentEditable === "false") {
        charCount += 1;
      }
    }

    currentNode = walker.nextNode();
  }

  updatedRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(updatedRange);
}

function getCaretPosition(selection: Selection) {
  const range = selection!.getRangeAt(0)
  const newRange = document.createRange()
  newRange.setStart(editorWindow, 0)
  newRange.setEnd(range.startContainer, range.startOffset)
  const textBeforeCursor = newRange.toString()
  const caretPosition = textBeforeCursor.length
  return caretPosition
}

syntaxHighlight()

editorWindow.innerHTML = text

editorWindow.addEventListener("keyup", (event:KeyboardEvent) => {
  
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(event.code)) {
    return
  }
  
  const selection = window.getSelection() as Selection
  let caretPosition = getCaretPosition(selection)

  text = editorWindow.innerText
  syntaxHighlight()
  editorWindow.innerHTML = text

  setCaretPosition(caretPosition, selection)
})