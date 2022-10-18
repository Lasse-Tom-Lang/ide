import "./style.scss"

const App: React.FC = () => {

  return (
    <>
      <nav>

      </nav>
      <div id="filesystem">

      </div>
      <main>
        <div className="tabList">
          <div className="tab">
            File 1
          </div>
          <div className="tab">
            File 2
          </div>
          <div className="tab">
            File 3
          </div>
        </div>
        <div className="textField" contentEditable="true" spellCheck="false">

        </div>
      </main>
    </>
  )
}

export default App
