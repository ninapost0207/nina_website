import { MouseEventHandler, useEffect, useMemo } from "react";
import "./sidePanel.scss";
import { Link, NavLink } from "react-router-dom";
import * as actions from "../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IRemoveEventListener, PageItem,  IMapdispatchToProps, ISetStore, IState } from "../../../src/models";
import allData from "../../assets/js/data";


interface ISidePanel {
	nav_ham: string
	setStore: ISetStore
}

const SidePanel: React.FC<ISidePanel> = (props): JSX.Element => {

	const changeNav: MouseEventHandler = () => {
		props.nav_ham === "" ? props.setStore.setNavOpen() : props.setStore.setNavClose();
	};

	const clicked = (e: MouseEvent): void => {
		if (props.nav_ham === "nav_opened" && (e.clientX > 250)) {
			props.setStore.setNavClose();
			document.removeEventListener("click", clicked);
		}
	};
 

	useEffect((): IRemoveEventListener => { //after dom rendered
		if (props.nav_ham === "nav_opened") {
			document.addEventListener("click", clicked); 
		}
		return (): ReturnType<typeof document.removeEventListener> => document.removeEventListener("click", clicked);
	});


    
	useEffect((): void => { //update
		const _container: HTMLDivElement | null = document.querySelector(".page-container");
		const _sidePanel: HTMLDivElement | null = document.querySelector(".side-panel");
		const _hamburgerIcon: HTMLDivElement | null = document.querySelector(".hamburger");
		if (props.nav_ham === "nav_opened") {
			_container?.classList?.add("nav_opened");
			_sidePanel?.classList.add("nav_opened");
			_hamburgerIcon?.classList.add("nav_opened");
		} else {
			_container?.classList?.remove("nav_opened");
			_sidePanel?.classList.remove("nav_opened");
			_hamburgerIcon?.classList.remove("nav_opened");
		}
	}, [props.nav_ham]);


	const renderMemo = useMemo(() => {
		
		return <div className="side-panel">
			<figure>
				<Link to="/home"> 
					<img src={allData.imagesMe.side} alt="It's me" />
				</Link>
			</figure>
			<nav>
				<ul className="site-navigation">
					{allData.pages.map((page: PageItem) => {
						return(
							<li key={page.link}>
								<NavLink 
									className={ ({ isActive }) => {
										return isActive ? "selected" : "";
									}}
									onClick={props.setStore.setNavClose}
									to={page.link}>
									{page.text}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>
			<div className="hamburger" onClick={changeNav}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>;
	}, []);
	
	return renderMemo;
};



const mapStateToProps = (state: IState)  => {
	return {
		nav_ham: state.nav_ham,
	};
};


const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);