import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObjects from "./CustomObjects";

extend({ OrbitControls });

export default function Experience() {
	const { camera, gl } = useThree();
	const cubeRef = useRef();
	const groupRef = useRef();

	useFrame((state, delta) => {
		// const elapsedTime = state.clock.elapsedTime;
		// state.camera.position.x = Math.sin(elapsedTime) * 8;
		// state.camera.position.z = Math.cos(elapsedTime) * 8;

		// Rotate the objects
		cubeRef.current.rotation.y += delta;
		// groupRef.current.rotation.y += delta;
	});

	return (
		<>
			<orbitControls args={[camera, gl.domElement]} />

			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			<group ref={groupRef}>
				<mesh position-x={-2}>
					<sphereGeometry args={[1, 32, 32]} />
					<meshStandardMaterial color="orange" />
				</mesh>

				<mesh ref={cubeRef} rotation-y={Math.PI / 4} position-x={2} scale={1.5}>
					<boxGeometry scale={1.5} /> {}
					<meshStandardMaterial color="mediumPurple" />
				</mesh>
			</group>

			<mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenYellow" />
			</mesh>

			<CustomObjects />
		</>
	);
}
