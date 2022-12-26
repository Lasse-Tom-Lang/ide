import { useState } from "react"
import File from "./File"

interface DirectoryProbs {
  directoryName: string,
  subdirectorys?: string[],
  files?: string[][]
  level: number
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
}

const Directory: React.FC<DirectoryProbs> = (props) => {
  let [isOpen, open] = useState(false)

  function openDir() {
    open(isOpen ? false : true)
  }

  return (
    <>
      <p onClick={openDir}>{props.directoryName}</p>
      <div style={{ display: isOpen ? "block" : "none", translate: props.level * 10 + "px" }}>
        {
          props.subdirectorys?.map((dir) => {
            if (!dir.split("/").includes(".git") && dir.split("/").length == 1 && dir != "") {
              let subdirs: string[] = []
              props.subdirectorys?.forEach((subdir) => {
                if (subdir.startsWith(dir)) {
                  subdirs.push(subdir.substring(dir.length + 1))
                }
              })
              let files: string[][] = []
              props.files?.forEach((file) => {
                if (file[0].startsWith(dir)) {
                  files.push([file[0].substring(dir.length + 1), file[1]])
                }
              })
              return <Directory
                directoryName={dir}
                subdirectorys={subdirs}
                key={dir + props.level}
                level={props.level + 1}
                files={files}
                openTab={props.openTab}
                openTabs={props.openTabs}
              />
            }
          })
        }
        {
          props.files?.map((file) => {
            if (![".DS_Store"].includes(file[0]) && !file[0].split("/").includes(".git") && file[0].split("/").length == 1) {
              return <File key={file[0] + props.level} name={[file[0], file[1]]} openTab={props.openTab} openTabs={props.openTabs} />
            }
          })
        }
      </div>
    </>
  )
}

export default Directory