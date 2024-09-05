import { shaderMaterial, Sparkles, Center, useTexture, useGLTF, OrbitControls } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import * as THREE from "three";

const PortalMaterial = shaderMaterial({ uTime: 0, uColorStart: new THREE.Color("#fff"), uColorEnd: new THREE.Color("#000") }, portalVertexShader, portalFragmentShader);

extend({ PortalMaterial }); // convert to an R3F tag

export default function Experience() {
	const { nodes } = useGLTF("./model/portal.glb");

	const bakedTexture = useTexture("./model/baked.jpg");
	bakedTexture.flipY = false;

	// Portal Light Animation
	const portalMaterial = useRef();
	useFrame((state, delta) => {
		portalMaterial.current.uTime += delta;
	});

	return (
		<>
			<OrbitControls makeDefault />

			<color attach="background" args={["#201919"]} />

			<Center>
				<mesh geometry={nodes.baked.geometry}>
					<meshBasicMaterial map={bakedTexture} /* map-flipY={false} */ />
				</mesh>

				{/* Pole Lights */}
				<mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
					<meshBasicMaterial color={"#ffffe5"} />
				</mesh>
				<mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
					<meshBasicMaterial color={"#ffffe5"} />
				</mesh>

				{/* Portal Light */}
				<mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
					{/* <shaderMaterial
						vertexShader={portalVertexShader}
						fragmentShader={portalFragmentShader}
						uniforms={{ uTime: { value: 0 }, uColorStart: { value: new THREE.Color("#fff") }, uColorEnd: { value: new THREE.Color("#000") } }}
					/> */}
					<portalMaterial ref={portalMaterial} />
				</mesh>

				<Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />
			</Center>
		</>
	);
}
