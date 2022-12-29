import Tab from "./Tab"
import parse from "html-react-parser"
import TypeScriptHighlight from "@/syntax/TypeScript"
import PythonHighlight from "@/syntax/Python"
import StandartHighlight from "@/syntax/Standart"
import { useRef } from "react"

interface MainProps {
  setTab: React.Dispatch<React.SetStateAction<string>>
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
  activeTab: string
  file: string
}

const Main: React.FC<MainProps> = (props) => {

  const textFieldRef = useRef() as React.RefObject<HTMLDivElement>

  let text = ""
  switch (props.activeTab.split(".")[props.activeTab.split(".").length - 1]) {
    case "ts": text = TypeScriptHighlight(props.file.toString()); break
    case "py": text = PythonHighlight(props.file.toString()); break
    default: text = StandartHighlight(props.file.toString())
  }

  function ReplaceBrackets(event:React.KeyboardEvent<HTMLDivElement>) {
    let textAreaText = textFieldRef.current?.innerHTML as string
    if (event.key == "<") {
      text = textAreaText.replace(/<(?!(span class='[A-z]{1,}'>)|(\/span>))/g, "&lt;")
    }
    if (event.key == ">") {
      text = textAreaText.replace(/(?<!(<span class='[A-z]{1,}')|(<\/span))>/g, "&gt;")
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