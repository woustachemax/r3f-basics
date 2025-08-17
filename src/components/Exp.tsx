import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import CustomObject from "./CustomObject"

export default function Experience(){

    const three = useThree()
    const groupRef: any =  useRef(0)

    useFrame((state, delta)=>{
            console.log(three)
            console.log(state)
            groupRef.current.rotation.y += delta
            state.camera.position.x = Math.sin(state.clock.elapsedTime) * 8
            state.camera.position.z = Math.cos(state.clock.elapsedTime) * 8
            state.camera.lookAt(0, 0, 0)

    })

    return<>
        
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 }/>
        <ambientLight intensity={1.5}/>

        <group>
            <mesh position-x={-2}>
                <sphereGeometry/>
                <meshStandardMaterial color="orange"/>
            </mesh>

            <mesh ref={groupRef} rotation-y={Math.PI*0.25} position-x={2}  scale={1.5}>
                <boxGeometry scale={1.5}/>
                {/* <sphereGeometry args={[1.5, 32 ,16]} /> */}
                {/* <meshBasicMaterial args={[{color: 'red', wireframe: true}]}/> */}
                {/* <meshBasicMaterial color="mediumpurple" wireframe={true}/> */}
                <meshStandardMaterial color="blue" />
            </mesh>
        </group>
        <mesh position-y={-1} rotation-x={ -Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <CustomObject/>
    </>
}