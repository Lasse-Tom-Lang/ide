import { useState } from "react"

interface DirectoryProbs {
  directoryName: string,
  subdirectorys?: string[],
  files?: string[]
  level: number
}

const Directory: React.FC<DirectoryProbs> = (props) => {
  let [isOpen, open] = useState(false)

  function openTab() {
    open(isOpen?false:true)
  }

  return (
    <>
      <p onClick={openTab}>{props.directoryName}</p>
      <div style={{display: isOpen?"block":"none", translate: props.level * 10 + "px"}}>
        {
          props.subdirectorys?.map((dir) => {
            if (!dir.split("/").includes(".git") && dir.split("/").length == 1 && dir != "") {
              let subdirs:string[] = []
              props.subdirectorys?.forEach((subdir) => {
                if (subdir.startsWith(dir)) {
                  subdirs.push(subdir.substring(dir.length + 1))
                }
              })
              let files:string[] = []
              props.files?.forEach((file) => {
                if (file.startsWith(dir)) {
                  files.push(file.substring(dir.length + 1))
                }
              })
              return <Directory
                directoryName={dir}
                subdirectorys={subdirs}
                key={dir + props.level}
                level={props.level + 1}
                files={files}
              />
            }
          })
        }
        {
          props.files?.map((file) => {
            if (![".DS_Store"].includes(file) && !file.split("/").includes(".git") && file.split("/").length == 1 && file != "") {
              return <p key={file + props.level}>
                        {file.split("/")[file.split("/").length - 1]}
                      </p>
            }
          })
        }
      </div>
    </>
  )
}

export default Directory