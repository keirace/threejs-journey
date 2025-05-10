import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level } from "./Level.js";
import Player from "./Player.js";
import { Physics } from "@react-three/rapier";
import useGame from "./useGame.js";

export default function Experience() {
	const blocksCount = useGame((state) => state.blocksCount);
	const blockSeed = useGame((state) => state.blockSeed);
	console.log(blocksCount);
	return (
		<>
			{/* <OrbitControls makeDefault /> */}
			<color attach="background" args={["skyblue"]} />

			<Physics debug={false}>
				<Lights />
				<Level count={blocksCount} seed={blockSeed} />
				<Player />
			</Physics>
		</>
	);
}
