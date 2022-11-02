interface FileProps {
  name: string
}

const File: React.FC<FileProps> = (props) => {
  return (
    <p>{props.name}</p>
  )
}

export default File