import { useThree, useFrame } from "@react-three/fiber";
import { Stage, Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, useHelper, OrbitControls, BakeShadows } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
	const cube = useRef();
	const directionalLight = useRef();
	useHelper(directionalLight, THREE.DirectionalLightHelper, 1, "red"); // 1 is size

	// Contact Shadows
	const { color, opacity, blur } = useControls("Contact Shadows", {
		color: "#4b2729",
		opacity: { value: 0.4, min: 0, max: 1 },
		blur: { value: 2.8, min: 0, max: 10 },
	});

	// Sky
	const { sunPosition } = useControls("Sun Position", {
		sunPosition: { value: [1, 2, 3], step: 0.1 },
	});

	// Environment Map
	const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls("Environment Map", {
		envMapIntensity: { value: 5, min: 0, max: 12, step: 0.1 },
		envMapHeight: { value: 7, min: 0, max: 100, step: 1 },
		envMapRadius: { value: 28, min: 0, max: 500, step: 1 },
		envMapScale: { value: 100, min: 0, max: 50, step: 1 },
	});
	const scene = useThree((state) => state.scene);
	// // update environment intensity
	// useEffect(() => {
	// 	scene.environmentIntensity = envMapIntensity;
	// }, [envMapIntensity]);

	// Mesh
	const { planeVisible } = useControls("Plane", {
		planeVisible: false,
	});

	useFrame((state, delta) => {
		// const time = state.clock.elapsedTime;
		// cube.current.position.x = Math.sin(time);
		cube.current.rotation.y += delta * 0.2;
	});

	return (
		<>
			<Environment ground={{ height: envMapHeight, radius: envMapRadius, scale: envMapScale }} files={["./environmentMaps/the_sky_is_on_fire_2k.hdr"]} resolution={32}>
				<color args={[0, 0, 0]} attach={"background"} />
				<Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" />
				<mesh scale={10} position-z={-5}>
					<planeGeometry />
					<meshBasicMaterial color={[5, 0, 0]} />
				</mesh>
			</Environment>
			{/* <color attach="background" args={["ivory"]} /> */}
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			{/* <Sky sunPosition={sunPosition} /> */}

			{/* <directionalLight
				ref={directionalLight}
				position={sunPosition}
				intensity={4.5}
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={10}
				shadow-camera-top={10}
				shadow-camera-left={10}
				shadow-camera-right={-10}
				shadow-camera-bottom={-10}
			/>
			<ambientLight intensity={1.5} /> */}

			{/* <BakeShadows /> */}
			{/* <SoftShadows size={25} samples={10} focus={0} /> */}
			{/* AccumulativeShadows is not good for moving objects */}
			{/* <AccumulativeShadows position-y={-0.99} opacity={0.8} color="#316d39" frames={Infinity} blend={100} temporal>
				<RandomizedLight amount={8} radius={1} ambient={0.5} intensity={3} position={[1, 2, 3]} bias={0.001} />
			</AccumulativeShadows> */}
			{/* ContactShadows works without a light and only on a plane */}
			<ContactShadows position-y={0} resolution={256} scale={10} far={5} color={color} opacity={opacity} blur={blur} frames={1} />

			{/* <Stage
				shadows={{
					type: "contact",
					opacity: 0.5,
					blur: 3,
				}}
				environment={null}
				preset="portrait"
				intensity={envMapIntensity}
			> */}
				<mesh position-x={-2} position-y={1} castShadow>
					<sphereGeometry />
					<meshStandardMaterial color="orange" />
				</mesh>

				<mesh ref={cube} position-x={2} position-y={1} scale={1.5} castShadow>
					<boxGeometry />
					<meshStandardMaterial color="mediumpurple" />
				</mesh>
			{/* </Stage> */}

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow visible={planeVisible}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
}
