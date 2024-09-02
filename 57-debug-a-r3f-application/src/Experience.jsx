import { OrbitControls } from "@react-three/drei";
import { folder, button, useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
	const { perfVisible } = useControls({ perfVisible: true });
	const { position, color, visible } = useControls("sphere", {
		position: {
			value: { x: -2, y: 0 },
			step: 0.1,
			label: "Cube Position",
			joystick: "invertY",
		},
		color: "#ff0000",
		visible: true,
		myInterval: {
			min: 0,
			max: 10,
			value: [4, 5],
		},
		clickMe: button(() => console.log("clicked")),
		choice: {
			options: ["Option 1", "Option 2"],
			value: "Option 1",
		},
	});

	const { scale } = useControls("cube", {
		scale: {
			value: 1.5,
			min: 0.1,
			max: 3,
			step: 0.1,
		},
	});

	return (
		<>
			{perfVisible ? <Perf position="top-left" /> : null}
			<OrbitControls makeDefault />

			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			<mesh position={[position.x, position.y, 0]} visible={visible}>
				<sphereGeometry />
				<meshStandardMaterial color={color} />
			</mesh>

			<mesh position={[1, 0, 0]} scale={scale}>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
}
