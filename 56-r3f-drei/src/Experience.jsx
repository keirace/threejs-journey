import { MeshReflectorMaterial, Float, Text, Html, TransformControls, OrbitControls, PivotControls, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
	const cubeRef = useRef();
	const sphereRef = useRef();

	// SDF (Signed Distance Field) is used in fragment shader to draw shapes
	return (
		<>
        <PerspectiveCamera makeDefault position={[0, 3, 10]} zoom={0.7} />
			<OrbitControls makeDefault /> {/* fix control conflict with makeDefault */}
			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />
			<PivotControls anchor={[0, 0, 0]} depthTest={false} lineWidth={2} axisColors={["#9381ff", "#ff4d6d", "#7ae582"]} scale={100} fixed>
				{/* PivotControls is not a group unlike transformControl -> can't set position */}
				<mesh ref={sphereRef} position-x={-2} scale={1}>
					<sphereGeometry />
					<meshStandardMaterial color="orange" />
					<Html position={[1, 1, 0]} wrapperClass="label" center distanceFactor={8} occlude={[cubeRef, sphereRef]}>
						That's a sphere 👍
					</Html>
				</mesh>
			</PivotControls>
			<mesh ref={cubeRef} position-x={2} scale={1.5}>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>
			<TransformControls object={cubeRef} mode="translate" />
			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				{/* <meshStandardMaterial color="greenyellow" /> */}
				<MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.6} color="greenyellow" />
			</mesh>
			<Float position={[0, 0, 0]} scale={1} speed={5} floatIntensity={2}>
				<Text position={[0, 4, 0]} fontSize={1.2} color="salmon" maxWidth={2} textAlign="center" font="./bangers-v20-latin-regular.woff">
					I Love R3F
				</Text>
			</Float>
		</>
	);
}
