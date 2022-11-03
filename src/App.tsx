import "./style.scss"
import Tab from "./Tab"
import Directory from "./Directory"
import File from "./File"
import { useState } from "react"
import FolderIcon  from "./icons/folder-icon.png" 
import GitIcon from "./icons/git-icon.png"
const { ipcRenderer } = require("electron")

interface project {
  name: string,
  path: string,
  files: string[]
  dirs: string[]
}

const App: React.FC = () => {
  let [activeTab, setTab] = useState("")
  let [openTabs, openTab] = useState<string[]>([])
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
        <img src={FolderIcon} style={{aspectRatio: "44 / 36"}}/>
        <img src={GitIcon} style={{aspectRatio: "1", filter: "invert(90%)"}}/>
      </nav>
      <div id="filesystem">
        {project ? <h1>{project.name}</h1> : <button onClick={openProject}>Open project</button>}
        <hr />
        {
          project?.dirs.map((dir) => {
            if (!dir.split("/").includes(".git") && dir.split("/").length == 1) {
              let subdirs: string[] = []
              project?.dirs.forEach((subdir) => {
                if (subdir.startsWith(dir)) {
                  subdirs.push(subdir.substring(dir.length + 1))
                }
              })
              let files: string[] = []
              project?.files.forEach((file) => {
                if (file.startsWith(dir)) {
                  files.push(file.substring(dir.length + 1))
                }
              })
              return <Directory
                directoryName={dir}
                subdirectorys={subdirs}
                key={dir + 1}
                level={1}
                files={files}
                openTab={openTab}
                openTabs={openTabs}
              />
            }
          })
        }
        {
          project?.files.map((file) => {
            if (![".DS_Store"].includes(file) && !file.split("/").includes(".git") && file.split("/").length == 1) {
              return <File key={file + 1} name={file} openTab={openTab} openTabs={openTabs}/>
            }
          })
        }
      </div>
      <main>
        <div className="tabList">
          {
            openTabs.map((file) => {
              return <Tab TabName={file} setTab={setTab} />
            })
          }
        </div>
        <div className="textField" contentEditable={activeTab != "" ? "true" : "false"} spellCheck="false">

        </div>
      </main>
    </>
  )
}

export default App
