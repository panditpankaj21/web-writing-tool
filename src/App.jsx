import { useState } from 'react';
import Editor from './pages/EditorPage';
import BlackButton from './components/BlackButton';
import './App.css';

function App() {
  const [isClicked, setIsClicked] = useState(true)

  const style = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh"
  }

  const handleClick = () => {
    setIsClicked(false)
  }
  return (
    <>
      {isClicked ? (
        <div style={style} >
          <BlackButton onClick={handleClick} label="Add Block"/>
        </div>
        ): <Editor />
      }
    </>
  )
}

export default App
