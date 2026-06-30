import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function DustField({ count = 8000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 35 + Math.random() * 95
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      if (t < 0.45) {
        col[i * 3] = 0.6 + Math.random() * 0.3
        col[i * 3 + 1] = 0.75 + Math.random() * 0.2
        col[i * 3 + 2] = 1
      } else if (t < 0.72) {
        col[i * 3] = 1
        col[i * 3 + 1] = 0.93 + Math.random() * 0.07
        col[i * 3 + 2] = 0.72 + Math.random() * 0.28
      } else if (t < 0.88) {
        col[i * 3] = 0.72 + Math.random() * 0.1
        col[i * 3 + 1] = 0.45 + Math.random() * 0.2
        col[i * 3 + 2] = 1
      } else {
        col[i * 3] = 0.4 + Math.random() * 0.15
        col[i * 3 + 1] = 0.78 + Math.random() * 0.22
        col[i * 3 + 2] = 0.55 + Math.random() * 0.35
      }
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.013
    ref.current.rotation.z = state.clock.elapsedTime * 0.0035
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors sizeAttenuation transparent opacity={0.88} depthWrite={false} />
    </points>
  )
}

function BrightStars({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 28 + Math.random() * 85
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const warm = Math.random() > 0.6
      col[i * 3] = warm ? 1 : 0.82 + Math.random() * 0.18
      col[i * 3 + 1] = warm ? 0.95 + Math.random() * 0.05 : 0.88 + Math.random() * 0.12
      col[i * 3 + 2] = warm ? 0.65 + Math.random() * 0.2 : 1
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    const mat = ref.current.material as THREE.PointsMaterial
    mat.size = 0.52 + Math.sin(state.clock.elapsedTime * 1.1) * 0.12
    ref.current.rotation.y = state.clock.elapsedTime * 0.013
    ref.current.rotation.z = state.clock.elapsedTime * 0.0035
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.52} vertexColors sizeAttenuation transparent opacity={1} depthWrite={false} />
    </points>
  )
}

function Moon() {
  const haloRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const mat = haloRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.55) * 0.04
  })

  return (
    <group position={[-18, 14, -55]}>
      <mesh>
        <sphereGeometry args={[7, 64, 64]} />
        <meshStandardMaterial color="#f0dda0" emissive="#c89010" emissiveIntensity={0.7} roughness={1} />
      </mesh>
      <mesh ref={haloRef} scale={1.6}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshBasicMaterial color="#f5c840" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color="#ffe06a" intensity={5} distance={150} decay={1.4} />
    </group>
  )
}

function NebulaCloud({
  position,
  color,
  radius,
  speed,
}: {
  position: [number, number, number]
  color: string
  radius: number
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.6
    ref.current.rotation.y = state.clock.elapsedTime * speed
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.4
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.022} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function ShootingStar({ delay }: { delay: number }) {
  const stateRef = useRef({
    active: false,
    nextTime: delay,
    start: new THREE.Vector3(),
    dir: new THREE.Vector3(),
  })

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3))
    const mat = new THREE.LineBasicMaterial({
      color: "#e0eeff",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    return new THREE.Line(geo, mat)
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const s = stateRef.current
    const pos = lineObj.geometry.attributes.position.array as Float32Array
    const mat = lineObj.material as THREE.LineBasicMaterial

    if (!s.active && t >= s.nextTime) {
      s.active = true
      s.start.set(
        (Math.random() - 0.5) * 90,
        12 + Math.random() * 28,
        -12 - Math.random() * 35
      )
      s.dir.set(
        (Math.random() - 0.5) * 35,
        -14 - Math.random() * 12,
        (Math.random() - 0.5) * 10
      )
    }

    if (s.active) {
      const elapsed = (t - s.nextTime) * 0.62
      const tail = Math.max(elapsed - 0.28, 0)
      pos[0] = s.start.x + s.dir.x * tail
      pos[1] = s.start.y + s.dir.y * tail
      pos[2] = s.start.z + s.dir.z * tail
      pos[3] = s.start.x + s.dir.x * elapsed
      pos[4] = s.start.y + s.dir.y * elapsed
      pos[5] = s.start.z + s.dir.z * elapsed
      mat.opacity = Math.max(0, 0.95 - elapsed * 0.48)
      lineObj.geometry.attributes.position.needsUpdate = true

      if (elapsed >= 2.4) {
        s.active = false
        s.nextTime = t + 5 + Math.random() * 12
        pos.fill(0)
        mat.opacity = 0
        lineObj.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return <primitive object={lineObj} />
}

function ContextCore() {
  const ref = useRef<THREE.Mesh>(null!)
  const haloRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const scale = 0.18 + Math.sin(t * 1.8) * 0.055 + Math.sin(t * 0.65) * 0.035
    ref.current.scale.setScalar(scale)
    haloRef.current.scale.setScalar(scale * 3.2)
    ;(haloRef.current.material as THREE.MeshBasicMaterial).opacity = 0.18 + Math.sin(t * 1.8) * 0.08
  })

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#a0e0ff" />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#60b8ff" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color="#80c8ff" intensity={1.2} distance={30} decay={2} />
    </group>
  )
}

export default function StarryNight() {
  return (
    <>
      <color attach="background" args={["#00000c"]} />
      <ambientLight intensity={0.04} color="#0a1880" />

      <OrbitControls
        enableDamping
        dampingFactor={0.04}
        minDistance={1}
        maxDistance={90}
        autoRotate
        autoRotateSpeed={0.06}
      />

      <DustField count={8000} />
      <BrightStars count={500} />
      <Moon />
      <ContextCore />

      <NebulaCloud position={[22, -6, -42]} color="#1830c0" radius={28} speed={0.003} />
      <NebulaCloud position={[-32, 12, -65]} color="#7018a0" radius={22} speed={0.004} />
      <NebulaCloud position={[12, 22, -32]} color="#0e1870" radius={20} speed={0.0055} />
      <NebulaCloud position={[-12, -18, -52]} color="#003838" radius={32} speed={0.002} />
      <NebulaCloud position={[38, 8, -50]} color="#200845" radius={18} speed={0.006} />

      {[0, 4, 9, 15, 22].map((delay) => (
        <ShootingStar key={delay} delay={delay} />
      ))}
    </>
  )
}
