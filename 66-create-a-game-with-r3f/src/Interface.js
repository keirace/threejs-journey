import { useRef, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "./useGame";
import { addEffect } from "@react-three/fiber";
import { add } from "three/src/nodes/TSL.js";

function Interface() {
    const time = useRef();

    const restart = useGame((state) => state.restart);
    const phase = useGame((state) => state.phase);

	const forward = useKeyboardControls((state) => state.forward);
	const backward = useKeyboardControls((state) => state.backward);
	const rightward = useKeyboardControls((state) => state.rightward);
	const leftward = useKeyboardControls((state) => state.leftward);
	const jump = useKeyboardControls((state) => state.jump);

    useEffect(() => {
        const unsubscribe = addEffect(() => {
            const state = useGame.getState();
            let elapsedTime = 0;
            if (state.phase === "playing") {
                elapsedTime = Date.now() - state.startTime;
            } else if (state.phase === "ended") {
                elapsedTime = state.endTime - state.startTime;
            }
            elapsedTime /= 1000;
            elapsedTime = elapsedTime.toFixed(2);

            if (time.current) {
                time.current.textContent = elapsedTime;
            }
        }, time);
        return () => {
            unsubscribe();
        };
    }
    , []);
	return (
		<div className="interface">
			<div ref={time} className="time">00:00</div>
			{phase === "ended" && <div className="restart" onClick={restart}>RESTART</div>}

			{/* Controls */}
			<div className="controls">
				<div className="raw">
					<div className={`key ${forward ? "active" : ""}`}></div>
				</div>
				<div className="raw">
					<div className={`key ${leftward ? "active" : ""}`}></div>
					<div className={`key ${backward ? "active" : ""}`}></div>
					<div className={`key ${rightward ? "active" : ""}`}></div>
				</div>
				<div className="raw">
					<div className={`key large ${jump ? "active" : ""}`}></div>
				</div>
			</div>
		</div>
	);
}

export default Interface;
