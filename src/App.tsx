import { Canvas } from "@react-three/fiber"
import Experience from "./components/Exp"

function App() {
  return (
    <> 
          <Canvas 
          flat
          // orthographic
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3,2,6]
          }}>
            <Experience/>
          </Canvas>     
    </>
  )
}

export default App
