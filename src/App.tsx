import './App.css'
import GameProvider from './contexts/GameContext'
import Game from './pages/Game'

function App() {

  return (
    <>
      <GameProvider>
        <Game/>
      </GameProvider>
    </>
  )
}

export default App
