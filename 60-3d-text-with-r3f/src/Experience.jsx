import { useMatcapTexture, Center, Text3D, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Second solution
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 16, 32);
const material = new THREE.MeshMatcapMaterial();
// const material = new THREE.MeshNormalMaterial();

export default function Experience() {
	const ref = useRef([]);

	// First solution
	// const [torusGeometry, setTorusGeometry] = useState();
	// const [material, setMaterial] = useState();

	// Matcap texture - useMatcapTexture returns an array of textures
	const [matcapTexture] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256); // 256 is the size of the texture

	// Second solution
	useEffect(() => {
		matcapTexture.colorSpace = THREE.SRGBColorSpace;
		matcapTexture.needsUpdate = true;

		material.matcap = matcapTexture;
		material.needsUpdate = true;
	}, []);

	useFrame((state, delta) => {
		for (const donut of ref.current) {
			donut.rotation.x += delta * 0.1;
		}
	});

	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			{/* First solution */}
			{/* <torusGeometry ref={setTorusGeometry} />
			<meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

			<Center>
				<Text3D
					font="./fonts/helvetiker_regular.typeface.json"
					size={0.75}
					height={0.2}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelSize={0.02}
					bevelSegments={5}
					material={material}
				>
					Hello R3F
					{/* <meshMatcapMaterial matcap={matcapTexture} /> */}
				</Text3D>
			</Center>

			{/* Animation - First solution */}
			{/* <group ref={ref}> */}
			{[...Array(100)].map((_, i) => (
				<mesh
					// Animation - Second solution
					ref={(ele) => {
						ref.current[i] = ele;
					}}
					key={i}
					geometry={torusGeometry}
					material={material}
					position={
                        [
                            Math.sin(Math.random() * Math.PI * 2) * (3 + Math.random() * 7), 
                            Math.cos(Math.random() * Math.PI * 2) * (2 + Math.random() * 8), 
                            (Math.random() - 0.5) * 10
                        ]
                    }
					scale={0.2 + Math.random() * 0.2}
					rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
				></mesh>
			))}
			{/* </group> */}

			<color args={[0, 0, 0]} attach={"background"} />
		</>
	);
}
