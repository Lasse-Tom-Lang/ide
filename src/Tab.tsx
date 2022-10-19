interface TabProbs {
  TabName: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}

const Tab: React.FC<TabProbs> = (props) => {
  const setTab = () => {
    props.setTab(props.TabName);
  }

  return (
    <div className="tab" onClick={setTab}>
      {props.TabName}
    </div>
  )
}

export default Tab