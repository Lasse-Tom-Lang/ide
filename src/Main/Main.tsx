import Tab from "./Tab"
import parse from "html-react-parser"

interface MainProps {
  setTab: React.Dispatch<React.SetStateAction<string>>
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
  activeTab: string
  file: string
}

const Main: React.FC<MainProps> = (props) => {
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
            props.activeTab.split(".")[props.activeTab.split(".").length - 1] == "ts" ?
              props.file.toString()
                .replace(/ /g, "\u00a0")
                .replace(/[<]/g, "&lt;")
                .replace(/[>]/g, "&gt;")
                .replace(/(let|var|const|interface)+\s+(\S*)+\s/g, "$1 <span style='color:red;'>$2</span> ")
                .replace(/(interface |var |let |const |if|else|function)/g, "<span style='color:orange;'>$1</span>")
                .replace(/({|}|\(|\))/g, "<span style='color:blue;'>$1</span>")
                .replace(/("(.*?)")/g, "<span style='color:green'>$1</span>")
                .split(/\n/).map((line) =>
                  <>{parse(line)}<br/></>
                )
                : 
                props.file.toString().split(/\n/).map((line) => <>{parse(line)}<br/></>)
          }
        </div>
    </main>
  )
}

export default Main