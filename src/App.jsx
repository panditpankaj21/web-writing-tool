import { useState } from 'react';
import './App.css'
import Editor from './pages/EditorPage';
import BlackButton from './components/BlackButton';

function App() {
  const [isFirst, setIsFirst] = useState(true)

  const style = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh"
  }

  const handleClick = () => {
    setIsFirst(false)
  }
  return (
    <>
      {isFirst ? (
        <div style={style} >
          <BlackButton onClick={handleClick} label="Add Block"/>
        </div>
        ): <Editor />
      }
    </>
  )
}

export default App
