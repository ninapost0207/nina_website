import React, { useRef, useEffect, useState, useMemo } from "react";
import * as actions from "../../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Splide from "@splidejs/splide";
import "./splide_portfolio.scss";
import { IMapdispatchToProps, ISetStore, ISliderOptions, IState, ProjectItemListItem } from "../../../../src/models";
import ImgWithPreloader from "../../../../src/assets/js/ImgWithPreloader";
import { findBestSuitedImg } from "../../../../src/assets/js/findBestSuitedImg";
import allData from "../../../assets/js/data";

interface IContainerSize {
	width: number
	height: number
}

interface ISplidePortfolio {
	selected: number
	selectedImage: number
	setStore: ISetStore
}

const SplidePortfolio: React.FC<ISplidePortfolio> = (props): JSX.Element => {
	const portfolioSplide = useRef<Splide | null>(null);
	const containerSize = useRef<IContainerSize | null>(null);
	const _splideMain = useRef<HTMLDivElement | null>(null);
	const [firstRender, setFirstRender] = useState<boolean>(true);

	const optionsMain: ISliderOptions = {
		lazyLoad: false,
		updateOnMove: true,
		perPage: 1,
		fixedWidth: "100%",
		perMove: 1,
		pagination: true,
		arrows: true,
		drag: true,
		speed: 500,
		wheel: true,
		wheelSleep: 300,
		interval: 15000,
		pauseOnHover: true,
		breakpoints: {
			768: {
				wheel: false,
			}, 
		},
	};

    
	const changeDescription = (selectedImage: number) => {
		props.setStore.setSelectedPortfolioImage(selectedImage);
	};
	
	const showSplideModal = () => {
		props.setStore.setModalSplide(true);
	};


	const goToImage = (imageOrder: number) => {
		portfolioSplide.current?.go(imageOrder);
	};

	const additionalRender = () => {
		setFirstRender(false);
	};

	useEffect(() => {
		if (!_splideMain.current) return
		containerSize.current = {
			width:  _splideMain.current.offsetWidth,
			height:  _splideMain.current.offsetHeight,
		};
		portfolioSplide.current = new Splide(_splideMain.current, optionsMain);
		portfolioSplide.current.mount();		
		portfolioSplide.current.on("active", () => {changeDescription(portfolioSplide.current?.index || 0);});
			
		const _slides: NodeList = _splideMain.current.querySelectorAll(".splide__slide-container");
		_slides.forEach(cont => cont.addEventListener("click", showSplideModal));
		changeDescription(portfolioSplide.current.index);
		return () => {
			_slides.forEach(cont => cont.removeEventListener("click", showSplideModal));
			portfolioSplide.current?.destroy();
		};
	}, [props.selected]);


	useEffect(() => {
		goToImage(props.selectedImage);
	}, [props.selectedImage]);
	

	useEffect(() => {
		additionalRender();
	},[]);
	

	const renderMemo = useMemo(() => {
		return <div className="splide_portfolio__container">
			<div id="portfolioMainSplide" className="splide" ref={_splideMain} aria-label="The carousel with thumbnails. Click the image to expand.">
				<div className="splide__track">
					<ul className="splide__list">
						{allData.portfolios.list[props.selected].images.map((slide, index: number) => {
							return (
								<li className="splide__slide" key={props.selected * 1000 + index}>
									<div className="splide__slide-container">
										{portfolioSplide.current && <ImgWithPreloader link={findBestSuitedImg({images: slide.images, width: containerSize.current?.width || 0, height: containerSize.current?.height || 0}).image} alt={slide.descr}/>}
									</div>
								</li>
							);
						})
						}
					</ul>
				</div>
			</div>
		</div>;
	},[firstRender, props.selected]);

	return renderMemo;
};


const mapStateToProps = (state: IState)  => {
	return {
		selected: state.selectedPortfolio,
		selectedImage: state.selectedPortfolioImage,
	};
};


const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplidePortfolio);
