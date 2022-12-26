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
            props.file.toString()
              .replace(/ /g, "\u00a0")
              .replace(/[<]/g, "&lt;")
              .replace(/[>]/g, "&gt;")
              .split(/\n/).map((line) =>
                <>{parse(line)}<br/></>
              )
          }
        </div>
    </main>
  )
}

export default Main