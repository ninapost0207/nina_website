import * as actions from "../../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import "./list3d_v.scss";
import { IMapdispatchToProps, ISetStore, IState, ProjectItemListItem } from "../../../../src/models";
import allData from "../../../assets/js/data";

let selected: number = 0;
let rotateStep: number = 0;
const scrollDelay: number = 50;
let timeoutScroll: undefined | ReturnType<typeof setTimeout>;
let listLength: number;
let stepsToMove: number = 0;

interface IList3d_v {
	selected: number
	setStore: ISetStore
}

const List3d_v: React.FC<IList3d_v> = (props): JSX.Element => {
	stepsToMove = props.selected - selected;
	selected = props.selected;
	listLength = allData.portfolios.list.length;
	if (stepsToMove != 0) {
		if (Math.abs(stepsToMove) > listLength / 2) {
			stepsToMove = stepsToMove - Math.sign(stepsToMove)*listLength;
		}
		rotateStep = rotateStep + stepsToMove;  
	}

	const listScroll = (e: WheelEvent) => {
		e.preventDefault();
		if (!timeoutScroll) {
			timeoutScroll = setTimeout(() => {
				clearTimeout(timeoutScroll);
				timeoutScroll = undefined;
			}, scrollDelay);
			e.deltaY > 0 ? rotateStep++ : rotateStep--;
		}
		selected = rotateStep > 0 ? (rotateStep % listLength) : ((listLength + rotateStep % listLength) % listLength);
		props.setStore.setSelectedPortfolio(selected);
	};

	useEffect(() => {
		document.querySelector(".list3d_v__container")?.addEventListener("wheel", listScroll as EventListener);
	},[]);


	return (
		<div className="list3d_v__container">
			<div className="list3d_v" style={{transform: `rotateX(${(360 / listLength) * rotateStep}deg)`}}>
				{[...allData.portfolios.list].map((portfolio, index) => {
					const portfolioStyle: {transform: string, opacity: number} = {
						transform: "",
						opacity: 0
					};
					const step: number = 360 / listLength;
					const deltaPos: number = Math.min(Math.abs(selected - index), listLength - Math.abs(index - selected));
					let opacity: number = 1 - deltaPos/(listLength / 4);
					opacity = opacity < 0 ? 0 : opacity;
					portfolioStyle.transform = `translate(-50%, -50%) rotateX(${-index * step}deg) translateZ(${listLength * 6}px)`;
					portfolioStyle.opacity = opacity;

					return (
						<div key={portfolio.name} style={portfolioStyle} className={selected == index ? "selected" : ""}>
							<a target="_blank" href={portfolio.link} rel="noreferrer">{portfolio.name}</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};


const mapStateToProps = (state: IState) => {
	return {
		selected: state.selectedPortfolio,
	};

};

const mapDispatchToProps:IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(List3d_v);
