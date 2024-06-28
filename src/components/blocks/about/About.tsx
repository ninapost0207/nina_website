import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as actions from "../../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./about.scss";
import { IMapdispatchToProps, IMyImage, ISetStore, IState, MeInfo } from "../../../../src/models";
import ImgWithPreloader from "../../../../src/assets/js/ImgWithPreloader";
import { findBestSuitedImg } from "../../../../src/assets/js/findBestSuitedImg";
import ModalImage from "../../../../src/components/modals/ModalImage";
import { TTheme } from "../../../../src/models";
import allData from "../../../assets/js/data";


const ModalImagePort = (p: IMyImage) => createPortal(<ModalImage imageProps={p}/>, (document.querySelector("#portal") as HTMLElement));

interface IAbout {
	theme: TTheme
	setStore: ISetStore
}

const About:React.FC<IAbout> = (props): JSX.Element => {

	const _imgContRef = useRef<HTMLDivElement | null>(null);
	const [firstRender, setFirstRender]= useState<boolean>(true);

	const openGallery = () => {
		props.setStore.setModalImage(true);
	};
	
	
	useEffect(() => {
		setFirstRender(false);
		_imgContRef.current?.addEventListener("click", openGallery);
	}, []);
	
	
	const renderDescrMemo = useMemo(() => {
		return <div className="descr">
			<h3>I am <em>Nina Postnikova</em></h3>
			{allData.aboutIntro.map((text, i) => <p key={i}>{text}</p>)}
			<ul>
				{allData.me.map((item: MeInfo, index: number) => {
					return (
						<li key={index}><b>{item.descr}</b>{item.value}</li>
					);
				})}
			</ul>
			<a className="link_button" href={allData.resumeDoc} target="_blank" rel="noreferrer">Download CV</a>
		</div>;
	}, []);

	return(
		<div className="about__container">
			<ModalImagePort images={props.theme === "light" ? allData.imagesMe.day.images : allData.imagesMe.night.images} descr=""/>
			<div className="img-container" ref={_imgContRef}>
				{_imgContRef.current && <ImgWithPreloader 
					link={findBestSuitedImg({
						images: props.theme === "light" ? allData.imagesMe.day.images : allData.imagesMe.night.images, 
						width: _imgContRef.current.offsetWidth, 
						height: _imgContRef.current.offsetHeight}
					).image} 
					alt={props.theme === "light" ? allData.imagesMe.day.descr : allData.imagesMe.night.descr} 
				/>} 
			</div>
			{renderDescrMemo}
		</div>
	);
};


const mapStateToProps = (state: IState)  => {
	return {
		theme: state.theme,
	};
};


const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(About);