"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, ContactShadows, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 4)
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime / 2)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.2}
          roughness={0.1}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

export function Hero3DScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isMobile) {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-violet-500 rounded-full blur-[100px]" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <MorphingBlob />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={20}
          blur={1.5}
          far={4.5}
        />
      </Canvas>
    </div>
  )
}
