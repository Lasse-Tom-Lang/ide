interface TabProbs {
  TabName: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  openTab: React.Dispatch<React.SetStateAction<string[]>>
  openTabs: string[]
}

const Tab: React.FC<TabProbs> = (props) => {
  const setTab = () => {
    props.setTab(props.TabName);
  }

  const closeTab = () => {
    props.openTab(props.openTabs.filter((item) => {
      return item !== props.TabName
    }))
  }

  return (
    <div className="tab">
      <p onClick={setTab}>
        {props.TabName.split("/")[props.TabName.split("/").length - 1]}
      </p>
      <button onClick={closeTab}>
        X
      </button>
    </div>
  )
}

export default Tab