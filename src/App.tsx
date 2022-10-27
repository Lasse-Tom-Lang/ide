import "./style.scss"
import Tab from "./Tab"
import { useState } from "react"
const { ipcRenderer } = require("electron")

interface project {
  name: string,
  path: string,
  files: string[]
  dirs: string[]
}

const App: React.FC = () => {
  let [activeTab, setTab] = useState("")
  let [project, selectProject] = useState<project>()

  const openProject = async () => {
    ipcRenderer.send("openDirectory");
  }

  ipcRenderer.on("directoryOpened", (event, data: { filePaths: string, canceled: boolean, files: string[], dirs: string[] }) => {
    if (!data.canceled) {
      let name = data.filePaths.split("/")[data.filePaths.split("/").length - 1]
      selectProject({ path: data.filePaths[0], name: name, files: data.files, dirs: data.dirs })
    }
  });

  return (
    <>
      <nav>

      </nav>
      <div id="filesystem">
        {project ? <h1>{project.name}</h1> : <button onClick={openProject}>Open project</button>}
        <hr />
        {/* {
          project?.files.map((file) => {
            if (![".DS_Store"].includes(file) && !file.split("/").includes(".git")) {
              let transform = (file.split("/").length - 1) * 10
              return <p style={{translate: transform + "px"}}>{file.split("/")[file.split("/").length - 1]}</p>
            }
          })
        } */}
        {
          project?.dirs.map((dir) => {
            if (!dir.split("/").includes(".git")) {
              let transform = (dir.split("/").length - 1) * 10
              return <p style={{translate: transform + "px"}}>{dir.split("/")[dir.split("/").length - 1]}</p>
            }
          })
        }
      </div>
      <main>
        <div className="tabList">
          <Tab TabName="File1" setTab={setTab} />
          <Tab TabName="File2" setTab={setTab} />
          <Tab TabName="File3" setTab={setTab} />
        </div>
        <div className="textField" contentEditable={activeTab != "" ? "true" : "false"} spellCheck="false">

        </div>
      </main>
    </>
  )
}

export default App
