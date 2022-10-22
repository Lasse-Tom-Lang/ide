import "./style.scss"
import Tab from "./Tab"
import { useState } from "react"
const { ipcRenderer } = require("electron")

interface project {
  name: string,
  path: string,
  files: string[]
}

const App: React.FC = () => {
  let [activeTab, setTab] = useState("")
  let [project, selectProject] = useState<project>()

  const openProject = async () => {
    ipcRenderer.send("openDirectory");
  }

  ipcRenderer.on("directoryOpened", (event, data:{filePaths:string, canceled: boolean, files: string[]}) => {
    if (!data.canceled) {
      let name = data.filePaths.split("/")[data.filePaths.split("/").length - 1]
      console.log(data.files)
      selectProject({path: data.filePaths[0], name: name, files: data.files})
    }
  });

  return (
    <>
      <nav>

      </nav>
      <div id="filesystem">
        {project?<h1>{project.name}</h1>:<button onClick={openProject}>Open project</button>}
        <hr/>
        { 
          project?.files.map((file) => {if (![".git", ".DS_Store"].includes(file))return <p>{file}</p>})
        }
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
