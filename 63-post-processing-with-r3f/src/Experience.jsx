import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { DepthOfField, EffectComposer, ToneMapping, Vignette, Glitch, Noise, Bloom } from "@react-three/postprocessing";
import { GlitchMode, BlendFunction, ToneMappingMode } from "postprocessing";
import Drunk from "./Drunk";
import { forwardRef, useRef } from "react";
import { useControls } from "leva";

export default function Experience() {
	const drunk = useRef();

	const drunkProps = useControls('Drunk Effect', {
		frequency: { value: 2, min: 0, max: 10 },
		amplitude: { value: 0.1, min: 0, max: 1 },
        offset: { value: 0.0, min: 0, max: 1 },
	});

	return (
		<>
			<color args={["#fff"]} attach={"background"} />
			<EffectComposer>
				{/* <ToneMapping mode={ToneMappingMode.ACESFilmic} /> */}
				{/* <Vignette offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} /> */}
				{/* <Glitch delay={[0.5, 1]} duration={[0.1,0.3]} strength={[0.2, 0.4]} mode={GlitchMode.SPORADIC} /> */}
				{/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}
				{/* <Bloom intensity={0.5} luminanceThreshold={ 1.1 } mipmapBlur /> */}
				{/* <DepthOfField focusDistance={0.05} focalLength={0.025} bokehScale={6} /> */}
				<Drunk ref={drunk} {...drunkProps} blendFunction={BlendFunction.DARKEN} />
			</EffectComposer>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			<mesh castShadow position-x={-2}>
				<sphereGeometry />
				<meshStandardMaterial color="orange" />
			</mesh>

			<mesh castShadow position-x={2} scale={1.5}>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" /* color={[1.5, 1, 4]} toneMapped={false} */ />
			</mesh>

			<mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
}
