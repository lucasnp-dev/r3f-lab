'use client'
import { Fragment, useState } from 'react'
import { Wrapper } from './wrapper'
import { Canvas, useLoader } from '@react-three/fiber'
import { Decal } from '@react-three/drei'
import { TextureLoader } from 'three'
import { useSpring, animated } from '@react-spring/three'

export function ProductPage() {
  const [size, setSize] = useState([0.5, 0.5, 1])
  const [active, setActive] = useState(false)

  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    setActive(false)

    switch (value) {
      case '40x60':
        setSize([0.6, 0.6, 1])
        break
      case '50x70':
        setSize([0.85, 0.8, 1])
        break
      case '60x90':
        setSize([1, 1, 1])
        break
      default:
        break
    }
  }

  return (
    <Wrapper>
      <Canvas shadows>
        <Ligths />
        <Scene sprop={size} active={active} />
      </Canvas>
      <div className="flex gap-4 py-4 px-2">
        <select onChange={handleChangeSize}>
          <option value={'40x60'}>40x60</option>
          <option value={'50x70'}>50x70</option>
          <option value={'60x90'}>60x90</option>
        </select>

        <select onChange={() => setActive(true)}>
          <option value={'c'}>Com Moldura</option>
          <option value={'s'}>Sem Moldura</option>
          <option value={'ca'}>Canvas</option>
        </select>
      </div>
    </Wrapper>
  )
}

function Scene({ sprop, active }: { sprop: number[]; active: boolean }) {
  const {
    position,
    rotation,
    opacity,
    lightPosition,
    lightMapIntensity,
    size,
  } = useSpring({
    position: active ? [0, 0, 2] : [-1.25, 0.5, 0],
    rotation: active ? [0, Math.PI / 4, 0] : [0, 0, 0],
    opacity: active ? 0 : 1,
    lightPosition: active ? [0, 0, 1] : [6, 6, 5],
    lightMapIntensity: active ? 2 : 0,
    size: active ? [1, 1, 1] : sprop,
    config: { mass: 1, tension: 100, friction: 18 },
  })

  const frameImage = useLoader(TextureLoader, 'frame-image.webp')
  const frame = useLoader(TextureLoader, 'ppreta.webp')
  const mockup = useLoader(TextureLoader, 'mockup.webp')

  return (
    <Fragment>
      <animated.directionalLight
        color={'white'}
        castShadow
        position={lightPosition}
      />

      <pointLight position={[0, 0, 5]} castShadow color={'red'} />

      {/* Mockup */}
      <animated.mesh receiveShadow>
        <planeGeometry args={[7.7, 7.7]} />
        <animated.meshStandardMaterial
          map={mockup}
          opacity={opacity}
          transparent
        />
      </animated.mesh>

      {/* Frame */}
      <animated.group position={position} rotation={rotation} scale={size}>
        <mesh castShadow>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial color={'#121214'} />
        </mesh>

        <mesh position={[0, 0, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[2, 3, 0.001]} />
          <meshStandardMaterial />
          <Decal debug position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[2, 3]}>
            <animated.meshStandardMaterial
              map={frameImage}
              aoMap={frameImage}
              lightMap={frameImage}
              lightMapIntensity={lightMapIntensity}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </Decal>
        </mesh>

        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[2, 3, 0.002]} />
          <meshBasicMaterial
            map={frame}
            transparent
            polygonOffset
            polygonOffsetFactor={-2}
          />
        </mesh>
      </animated.group>
    </Fragment>
  )
}

function Ligths() {
  return (
    <>
      <ambientLight intensity={1} />
    </>
  )
}
