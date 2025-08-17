import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three'

export default function CustomObject() {
  const verticesCount = 10 * 3;
  const geometryRef:any = useRef(0);
  const positions = useMemo(()=>{
    const positions = new Float32Array(verticesCount*3)
      for (let i = 0; i < verticesCount; i++) {
    positions[i] = (Math.random() - 0.5) * 3;
  }
  return positions
  },[])

    useEffect(()=>{
        geometryRef.current.computeVertexNormals();
    },[])

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide}/>
    </mesh>
  );
}
