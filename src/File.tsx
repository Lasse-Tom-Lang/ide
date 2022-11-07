interface FileProps {
  name: string[]
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
}

const File: React.FC<FileProps> = (props) => {
  const openFile = () => {
    props.openTab([...props.openTabs, ...[props.name[1]]])
  }
  return (
    <p onClick={openFile}>{props.name[0]}</p>
  )
}

export default File