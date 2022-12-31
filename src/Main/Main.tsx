import Tab from "./Tab"
import parse from "html-react-parser"
import TypeScriptHighlight from "@/syntax/TypeScript"
import PythonHighlight from "@/syntax/Python"
import StandartHighlight from "@/syntax/Standart"
import { useRef, useState, useEffect } from "react"

interface MainProps {
  setTab: React.Dispatch<React.SetStateAction<string>>
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
  activeTab: string
  file: string
}

const Main: React.FC<MainProps> = (props) => {

  const textFieldRef = useRef() as React.RefObject<HTMLDivElement>

  const [text, setText] = useState("")
  useEffect(() => {
    switch (props.activeTab.split(".")[props.activeTab.split(".").length - 1]) {
      case "ts": setText(TypeScriptHighlight(props.file.toString())); break
      case "py": setText(PythonHighlight(props.file.toString())); break
      default: setText(StandartHighlight(props.file.toString()))
    }
  }, [props.activeTab])

  function ReplaceBrackets(event:React.KeyboardEvent<HTMLDivElement>) {
    let textAreaText = textFieldRef.current?.innerHTML as string
    if (event.key == "<") {
      textAreaText = textAreaText.replace(/<(?!(span style="[A-z:; ]{1,}">)|(\/span>)|(<br>))/g, "&lt;")
    }
    if (event.key == ">") {
      textAreaText = textAreaText.replace(/(?<!(<span style="[A-z:; ]{1,}")|(<\/span)|(<br>))>/g, "&gt;")
    }
    textAreaText = textAreaText.replace(/((<span style="[A-z:; ]{1,}">)|(<\/span>))/g, "")
    textAreaText = textAreaText.replace(/(<br>)/g, "\n")
    switch (props.activeTab.split(".")[props.activeTab.split(".").length - 1]) {
      case "ts": setText(TypeScriptHighlight(textAreaText)); break
      case "py": setText(PythonHighlight(textAreaText)); break
      default: setText(StandartHighlight(textAreaText))
    }
  }

  return (
    <main>
      <div className="tabList">
          {
            props.openTabs.map((file) => {
              return <Tab openTab={props.openTab} openTabs={props.openTabs} TabName={file} setTab={props.setTab} />
            })
          }
        </div>
        <div className="textField" ref={textFieldRef} onKeyDown={ReplaceBrackets} contentEditable={props.activeTab != "" ? "true" : "false"} spellCheck="false">
          {
            text.split(/\n/).map((line) =>
                  <>{parse(line)}<br/></>
            )
          }
        </div>
    </main>
  )
}

export default Main