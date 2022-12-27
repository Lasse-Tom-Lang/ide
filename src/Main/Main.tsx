import Tab from "./Tab"
import parse from "html-react-parser"
import TypeScriptHighlight from "@/syntax/TypeScript"
import StandartHighlight from "@/syntax/Standart"

interface MainProps {
  setTab: React.Dispatch<React.SetStateAction<string>>
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
  activeTab: string
  file: string
}

const Main: React.FC<MainProps> = (props) => {
  let text = ""
  switch (props.activeTab.split(".")[props.activeTab.split(".").length - 1]) {
    case "ts": text = TypeScriptHighlight(props.file.toString()); break
    default: text = StandartHighlight(props.file.toString())
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
        <div className="textField" contentEditable={props.activeTab != "" ? "true" : "false"} spellCheck="false">
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