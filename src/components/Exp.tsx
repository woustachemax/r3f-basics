// import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
// import CustomObject from "./CustomObject"
import { Text ,
    Html,
    PivotControls,
    OrbitControls, 
    TransformControls,
    Float, 
    MeshReflectorMaterial} from "@react-three/drei"

export default function Experience(){

    // const three = useThree()
    // const groupRef: any =  useRef(0)

    // useFrame((state, delta)=>{
    //         console.log(three)
    //         console.log(state)
    //         groupRef.current.rotation.y += delta
    //         state.camera.position.x = Math.sin(state.clock.elapsedTime) * 8
    //         state.camera.position.z = Math.cos(state.clock.elapsedTime) * 8
    //         state.camera.lookAt(0, 0, 0)

    // })

    const cubeRef: any =  useRef(0)
    const sphereRef: any = useRef(0)


    return<>
        
        <OrbitControls  makeDefault />
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 }/>
        <ambientLight />

        <group>
            
            <PivotControls anchor={[1,1,1]} 
            depthTest={false}
            lineWidth={1}
            scale={100}
            fixed={true}
            > 
            <mesh ref={sphereRef} position-x={-2}>
                <sphereGeometry/>
                <meshStandardMaterial color="orange"/>
                <Html position={[1,1,1]}
                wrapperClass="label"
                center
                distanceFactor={3}
                occlude={[sphereRef, cubeRef]}>
                This is a Sphere
                </Html>
         </mesh>
            </PivotControls>

            <mesh ref={cubeRef} scale={1.5} position-x={2}>
                <boxGeometry scale={1.5}/>
                {/* <sphereGeometry args={[1.5, 32 ,16]} /> */}
                {/* <meshBasicMaterial args={[{color: 'red', wireframe: true}]}/> */}
                {/* <meshBasicMaterial color="mediumpurple" wireframe={true}/> */}
                <meshStandardMaterial color="blue" />
            </mesh>
            <TransformControls object={cubeRef} />

        </group>
        <mesh position-y={-1} rotation-x={ -Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <MeshReflectorMaterial resolution={512}
            blur={[1000,1000]}
            mixBlur={1}
            color='greenyellow'/>
        </mesh>
        
        <Float
        speed={2}
        floatIntensity={2}
        position-y={3}>
        <Text position-z={4}
        // fontSize={1}
        color="salmon"
        maxWidth={2}
        >
            I love R3f
        </Text>
        </Float>

   

        {/* <CustomObject/> */}
    </>
}