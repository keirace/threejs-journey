import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, Text } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floorMaterial = new THREE.MeshStandardMaterial({
	color: "greenyellow",
	roughness: 0.5,
	metalness: 0.5,
});
const floor2Material = new THREE.MeshStandardMaterial({
	color: "limegreen",
	roughness: 0.5,
	metalness: 0.5,
});
const obstacleMaterial = new THREE.MeshStandardMaterial({
	color: "red",
});
const wallMaterial = new THREE.MeshStandardMaterial({
	color: "slategrey",
});

export function BlockStart({ position = [0, 0, 0] }) {
	return (
		<group position={position}>
			<Float speed={1} floatIntensity={2} rotationIntensity={0.5}>
				<Text font="bebas-neue-v9-latin-regular.woff" scale={0.5} color="white" position={[0.75, 0.65, 0]} rotation-y={-0.25} maxWidth={0.25} lineHeight={0.75} textAlign="right">
					Marble Race
					<meshBasicMaterial toneMapped={false} />
				</Text>
			</Float>
			<mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
		</group>
	);
}

export function BlockSpinner({ position = [0, 0, 0] }) {
	const obstacle = useRef();
	const [speed] = useState(() => ((Math.random() + 0.2) * Math.random() < 0.5 ? -1 : 1));
	useFrame((state, delta) => {
		const t = state.clock.getElapsedTime();
		const rotation = new THREE.Quaternion();
		rotation.setFromEuler(new THREE.Euler(0, t * speed, 0));
		obstacle.current.setNextKinematicRotation(rotation);
	});
	return (
		<group position={position}>
			<mesh geometry={boxGeometry} material={floor2Material} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
			<RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0} colliders="hull">
				<mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow />
			</RigidBody>
		</group>
	);
}

export function BlockLimbo({ position = [0, 0, 0] }) {
	const obstacle = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
	useFrame((state, delta) => {
		const t = state.clock.getElapsedTime();
		const y = Math.sin(t + timeOffset) + 1.25;
		obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] });
	});
	return (
		<group position={position}>
			<mesh geometry={boxGeometry} material={floor2Material} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
			<RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0} colliders="hull">
				<mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow />
			</RigidBody>
		</group>
	);
}

export function BlockAxe({ position = [0, 0, 0] }) {
	const obstacle = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
	useFrame((state, delta) => {
		const t = state.clock.getElapsedTime();
		const x = Math.sin(t + timeOffset);
		obstacle.current.setNextKinematicTranslation({ x: position[0] - x, y: position[0] + 0.75, z: position[2] });
	});
	return (
		<group position={position}>
			<mesh geometry={boxGeometry} material={floor2Material} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
			<RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0} colliders="hull">
				<mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1.5, 1.5, 0.3]} castShadow />
			</RigidBody>
		</group>
	);
}

export function BlockEnd({ position = [0, 0, 0] }) {
	const hamburger = useGLTF("./hamburger.glb");

	hamburger.scene.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true;
		}
	});

	return (
		<group position={position}>
			<Float speed={1} floatIntensity={2} rotationIntensity={0.5}>
				<Text font="bebas-neue-v9-latin-regular.woff" scale={1} color="white" position={[0, 0.25, 1]}>
					Finish
					<meshBasicMaterial toneMapped={false} />
				</Text>
			</Float>
			<mesh geometry={boxGeometry} material={floorMaterial} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
			<RigidBody type="fixed" colliders="hull" position={[0, 0.5, 0]} restitution={0.2} friction={0}>
				<primitive object={hamburger.scene} position={[0, 0.5, 0]} scale={0.2} />
			</RigidBody>
		</group>
	);
}

function Bounds({ length = 1 }) {
	return (
		<RigidBody type="fixed" restitution={0.2} friction={0} colliders="hull">
			<mesh geometry={boxGeometry} material={wallMaterial} position={[2.15, 0.75, -(length * 2) + 2]} scale={[0.3, 1.5, 4 * length]} castShadow>
				<meshStandardMaterial color="slategrey" />
			</mesh>
			<mesh geometry={boxGeometry} material={wallMaterial} position={[-2.15, 0.75, -(length * 2) + 2]} scale={[0.3, 1.5, 4 * length]} receiveShadow>
				<meshStandardMaterial color="slategrey" />
			</mesh>
			<mesh geometry={boxGeometry} material={wallMaterial} position={[0, 0.75, -(length * 4) + 2]} scale={[4, 1.5, 0.3]} receiveShadow>
				<meshStandardMaterial color="slategrey" />
			</mesh>
			<CuboidCollider args={[2, 0.1, 2 * length]} position={[0, -0.1, -(length * 2) + 2]} restitution={1} friction={1} />
		</RigidBody>
	);
}

export function Level({ count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe], seed = 0 }) {
	const blocks = useMemo(() => {
		const blocks = [];
		for (let i = 1; i <= count; i++) {
			const Block = types[Math.floor(Math.random() * types.length)];
			const position = [0, 0, i * -4];
			blocks.push(<Block key={i} position={position} />);
		}
		return blocks;
	}, [count, types, seed]);

	return (
		<>
			<BlockStart position={[0, 0, 0]} />
			{blocks}
			<BlockEnd position={[0, 0, -(count + 1) * 4]} />
			<Bounds length={count + 2} />
		</>
	);
}
