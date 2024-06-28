import { connect } from "react-redux";
import React, { useEffect, useMemo, useRef } from "react";
import "./list3d.scss";
import { ProjectItemListItem } from "../../../../src/models";
import { IState } from "../../../../src/models";
import allData from "../../../assets/js/data";


interface IContactBlock {
    selected: number
}


const List3d: React.FC<IContactBlock> = (props): JSX.Element => {
	console.log(props);
	
	const _listCont = useRef<HTMLDivElement>(null);
	const selected = useRef<number>(props.selected);
	const stepsToMove = useRef<number>(0);
	const listLength: number = allData.portfolios.list.length;
	let deltaMove: number = props.selected - selected.current;
	

	useEffect((): void => {
		selected.current = props.selected;
		_listCont.current?.classList.add("muted");
		setTimeout(() => {
			_listCont.current?.classList.remove("muted");
		}, 300);
	}, [props.selected]);



	if (deltaMove) {
		if (Math.abs(deltaMove) > listLength / 2) {
			deltaMove = deltaMove - Math.sign(deltaMove)*listLength;
		}
	}
	stepsToMove.current = stepsToMove.current + deltaMove;

   

	const listItems = useMemo(() => {
		return allData.portfolios.list.map((portfolio: ProjectItemListItem, index: number): JSX.Element => {
		   const portfolioStyle = {} as React.CSSProperties;
		   const step: number = 360 / listLength;
		   portfolioStyle.transform = `translate(-50%, -50%) rotateZ(${index * step}deg) translateX(${listLength * 15}px)`;
	
		   return (
			   <div key={portfolio.name} style={portfolioStyle}>
				   <a target="_blank" href={portfolio.link} rel="noreferrer">{portfolio.name}</a>
			   </div>
		   );
	   });
	}, []);
	

	return (
		<div className="list3d__container" ref={_listCont}>
			<div className="list3d" style={{transform: `rotateZ(${(-360 / listLength) * stepsToMove.current}deg)`}}>
				{listItems}
			</div>
		</div>
	);
};

const mapStateToProps = (state: IState)  => {
	return {
		selected: state.selectedPortfolio,
	};
};


export default connect(mapStateToProps)(List3d);