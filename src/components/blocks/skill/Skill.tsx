import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MySkill } from "../../../../src/models";
import "./skill.scss";

type TUseState = [number, Dispatch<SetStateAction<number>>]


function Skill ({name, percent}: MySkill): JSX.Element {

	const [currentPercent, setCurrentPercent]: TUseState = useState(0);

	useEffect(()  => {
		setTimeout(() => {
			setCurrentPercent(percent);
		},100);
		return () => {
			setCurrentPercent(0);
		};
	}, []);

	

	return(
		<div className="resume__skill">
			<h5>{name}</h5>
			<div className="skill__graph">
				<span className={currentPercent ? "visible" : ""} >{currentPercent}%</span>
				<div> 
					<div className="skill__percent-line" style={{width: currentPercent+"%"}}>
					</div>
				</div>
			</div>
		</div>
	);
}


export default Skill;

