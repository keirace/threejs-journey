import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from "@react-three/drei";

export default function Experience() {
	const computer = useGLTF("https://threejs-journey.com/resources/models/macbook_model.gltf");

	return (
		<>
			<Environment files={"./blender-2k.hdr"} intensity={5} background />

			<color attach="background" args={["#241a1a"]} />

			<PresentationControls global rotation={[0.13, 0.1, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} config={{ mass: 2, config: 400 }} snap={{ mass: 4, tension: 400 }}>
				<Float rotationIntensity={0.4}>
					<rectAreaLight width={2.5} height={1.65} intensity={65} color={"#ff6900"} rotation={[0.1, Math.PI, 0]} position={[0, 0.55, -1.15]} />
					<primitive object={computer.scene} position-y={-1.2}>
						<Html transform wrapperClass="htmlScreen" distanceFactor={1.17} position={[0, 1.56, -1.4]} rotation-x={-0.256}>
							<iframe src="./resume.html" />
							{/* <iframe src="https://bruno-simon.com/html" /> */}
						</Html>
					</primitive>
					<Text font="./bangers-v20-latin-regular.woff" fontSize={0.6} position={[2, 1, 0.75]} rotation-y={-1.25} maxWidth={2} /* children={"PINKAEW\nHORPUTRA"} */>
						PINKAEW HORPURTA
					</Text>
					<Text font="./bangers-v20-latin-regular.woff" fontSize={0.3} position={[2, -0.2, 0.75]} rotation-y={-1.25} maxWidth={2} >
						My Actual Portfolio Site is Coming Soon!
					</Text>
				</Float>
			</PresentationControls>

			<ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
		</>
	);
}
