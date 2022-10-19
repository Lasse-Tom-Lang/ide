import "./style.scss"
import Tab from "./Tab"
import { useState } from "react"

const App: React.FC = () => {
  let [activeTab, setTab] = useState("")

  return (
    <>
      <nav>

      </nav>
      <div id="filesystem">
        <h1>project name</h1>
        <hr/>

      </div>
      <main>
        <div className="tabList">
          <Tab TabName="File1" setTab={setTab}/>
          <Tab TabName="File2" setTab={setTab}/>
          <Tab TabName="File3" setTab={setTab}/>
        </div>
        <div className="textField" contentEditable={activeTab!=""?"true":"false"} spellCheck="false">

        </div>
      </main>
    </>
  )
}

export default App
