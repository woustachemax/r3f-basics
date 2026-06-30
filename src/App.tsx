import { Canvas } from "@react-three/fiber"
import StarryNight from "./components/StarryNight"

function App() {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ fov: 75, near: 0.1, far: 300, position: [0, 2, 8] }}
    >
      <StarryNight />
    </Canvas>
  )
}

export default App
