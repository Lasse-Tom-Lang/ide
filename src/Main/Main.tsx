import Tab from "./Tab"

interface MainProps {
  setTab: React.Dispatch<React.SetStateAction<string>>
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
  activeTab: string
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
          {/* {
            file
          } */}
        </div>
    </main>
  )
}

export default Main