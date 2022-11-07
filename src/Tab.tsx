interface TabProbs {
  TabName: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}

const Tab: React.FC<TabProbs> = (props) => {
  const setTab = () => {
    props.setTab(props.TabName);
  }

  const closeTab = () => {

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