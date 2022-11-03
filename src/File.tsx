interface FileProps {
  name: string
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
}

const File: React.FC<FileProps> = (props) => {
  const openFile = () => {
    props.openTab([...props.openTabs, ...[props.name]])
  }
  return (
    <p onClick={openFile}>{props.name}</p>
  )
}

export default File