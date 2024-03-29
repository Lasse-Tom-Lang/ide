const editorWindow = document.getElementById("textWindow") as HTMLTextAreaElement
const lineNumbers = document.getElementById("lineNumbers") as HTMLDivElement

let text = ""

function syntaxHighlight() {
  text = text
    .replace(
      /\n/g,
      "<br>"
    ).replace(
      /(let|var|const|interface)+\s+(\S*)+\s/g,
      "$1\u00A0<span style='color:red;'>$2</span>\u00A0"
    ).replace(
      /(interface|var\s|let\s|const\s|if|else|function|fetch|import\s|from|await|async|for)/g,
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

function setLineNumbers() {
  lineNumbers.innerHTML = ""
  let lines = text.split("<br>").length
  for (let i = 1; i <= lines; i++) {
    let span = document.createElement("span")
    span.innerText = i.toString()
    lineNumbers.appendChild(span)
  }
}

editorWindow.addEventListener("keyup", (event:KeyboardEvent) => {
  
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(event.code)) {
    return
  }
  
  const selection = window.getSelection() as Selection
  let caretPosition = getCaretPosition(selection)

  text = editorWindow.innerText
  syntaxHighlight()
  editorWindow.innerHTML = text
  setLineNumbers()

  setCaretPosition(caretPosition, selection)
})

editorWindow.addEventListener("keydown", (event:KeyboardEvent) => {
  if (event.key == "Tab") {
    event.preventDefault();
    var selection = window.getSelection() as Selection;
    var range = selection.getRangeAt(0);
    var textNode = document.createTextNode("\u00A0\u00A0");
    range.insertNode(textNode);
    let caretPosition = getCaretPosition(selection)
    setCaretPosition(caretPosition + 2, selection)
  }
})

document.querySelector("body")?.addEventListener("contextmenu", (event:Event) => {
  event.preventDefault()
})

document.addEventListener('keydown', (event:KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
  }
});