"use client"

import * as THREE from "three"
import { useRef, useMemo } from "react"
import { Canvas, useFrame, useLoader, useThree, extend, ReactThreeFiber } from "@react-three/fiber"
import { Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl } from "@react-three/drei"
// import { useControls } from "leva"
import { memo } from 'react';
import { Water } from "three-stdlib"
import WaterNormals from "@/assets/waternormals.jpeg"

extend({ Water })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: ReactThreeFiber.Object3DNode<Water, typeof Water>
    }
  }
}

export default memo(function GameClouds({ cloudColor } : { cloudColor: number }) {
  // const { className, ...rest } = props
  return (
    <Canvas camera={{ position: [0, 8, 10], fov: 55, near: 1, far: 20000}} 
      className={"pointer-events-none"}
      style={{position: "absolute", height: "100vh", opacity: "100%", 
              background: "transparent", pointerEvents: "none", zIndex: -1}} 
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      {/* <StatsGl /> */}
      <Sky cloudColor={cloudColor} />
      <Ocean />
      <ambientLight intensity={5} />
      {/* <spotLight position={[0, 40, 0]} decay={0} distance={45} penumbra={1} intensity={100} /> */}
      {/* <spotLight position={[-20, 0, 10]} color="red" angle={0.15} decay={0} penumbra={-1} intensity={30} /> */}
      {/* <spotLight position={[20, -10, 10]} color="red" angle={0.2} decay={0} penumbra={-1} intensity={20} /> */}
      <CameraControls />
    </Canvas>
  )
});

function Ocean() {
  const ref = useRef<any>()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, WaterNormals.src)
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta/4))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

function Sky({ cloudColor } : { cloudColor: number }) {
  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
  // const cloud0 = useRef()
  // const { color, x, y, z, range, ...config } = useControls({
  //   seed: { value: 1, min: 1, max: 100, step: 1 },
  //   segments: { value: 20, min: 1, max: 80, step: 1 },
  //   volume: { value: 6, min: 0, max: 100, step: 0.1 },
  //   opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
  //   fade: { value: 10, min: 0, max: 400, step: 1 },
  //   growth: { value: 4, min: 0, max: 20, step: 1 },
  //   speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
  //   x: { value: 6, min: 0, max: 100, step: 1 },
  //   y: { value: 1, min: 0, max: 100, step: 1 },
  //   z: { value: 1, min: 0, max: 100, step: 1 },
  //   color: "white",
  // })
  const { color, x, y, z, range, speed, ...config } = {
    seed: 1,
    segments: 20,
    volume: 6,
    opacity: 0.8,
    fade: 10,
    growth: 4,
    speed: 0.01,
    x: 6,
    y: 1,
    z: 1,
    color: "white",
    range: 400,
  }
  const { camera } = useThree()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2
    }
    camera.lookAt(0, 10, 0)
    // cloud0.current.rotation.y -= delta 
  })
  return (
    <>
      <SkyImpl/>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range}>
          {/* <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={color} /> */}
          {/* <Cloud {...config} bounds={[x, y, z]} color="#404040" seed={2} position={[15, 0, 0]} />
          <Cloud {...config} bounds={[x, y, z]} color="#404040" seed={3} position={[-15, 0, 0]} />
          <Cloud {...config} bounds={[x, y, z]} color="#404040" seed={4} position={[0, 0, -12]} />
          <Cloud {...config} bounds={[x, y, z]} color="#404040" seed={5} position={[0, 0, 12]} /> */}
          <Cloud concentrate="outside" growth={100} color={cloudColor} opacity={1.25} 
                 seed={0.3} bounds={200} volume={200} speed={speed} fade={0} />
        </Clouds>
      </group>
    </>
  )
}
