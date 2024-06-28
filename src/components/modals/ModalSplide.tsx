import * as actions from "../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect, useMemo, useRef, } from "react";
import "@splidejs/react-splide/css";
import "./modalSplide.scss";
import { IMapdispatchToProps, ISetStore, IState, ProjectItemListItem } from "../../../src/models";
import Splide from "@splidejs/splide";
import ImgWithPreloader from "../../../src/assets/js/ImgWithPreloader";
import allData from "../../assets/js/data";


interface IOptions {
	lazyLoad	: boolean
	perPage		: number
	gap        	: number
	rewind     	: boolean
	pagination 	: boolean
	isNavigation: boolean
	focus		: number | "center"
	breakpoints	: {
		[key: number]: {
			perPage?: number;
			wheel?: boolean
		};
	},
	type      : string
	speed	  : number
	wheel	  : boolean
	wheelSleep: number
}




interface IModalSplide {
	selected: number
	selectedImage: number
	show: boolean
	setStore: ISetStore
}



const ModalSplide: React.FC<IModalSplide> = (props:IModalSplide): JSX.Element => {
	const _splideMain = useRef<HTMLDivElement | null>(null);
	const _splideThumbs = useRef<HTMLDivElement | null>(null);
	const mainRef = useRef<Splide | null>(null);
	const thumbsRef = useRef<Splide | null>(null);

	const optionsThumbs: Partial<IOptions> = {
		lazyLoad	: false,
		perPage		: 12,
		gap        	: 10,
		rewind     	: false,
		pagination 	: false,
		isNavigation: true,
		focus		: "center",
		breakpoints	: {
			1600: {
				perPage: 10
			}, 
			1241: {
				perPage: 8
			}, 
			992: {
				perPage: 7
			}, 
			768: {
				perPage: 5
			}, 
			480: {
				perPage: 4
			}, 
		},
	};


	const optionsMain: Partial<IOptions> = {
		lazyLoad: true,
		type      : "fade",
		rewind    : false,
		pagination: false,
		speed: 500,
		wheel: true,
		wheelSleep: 300,
		breakpoints	: {
			768: {
				wheel: false
			}, 
		}
	};

	const closeSplideModal = () => {
		props.setStore.setSelectedPortfolioImage(thumbsRef.current?.index);
		document.querySelector("body")?.classList.remove("noscroll");
		props.setStore.setModalSplide(false);
	};

	const showSlide = (slideToGo: string | number) => {
		thumbsRef.current?.go(slideToGo);
	};

	const modalKeyListener = (e: KeyboardEvent) => {
		e.key === "Escape" && closeSplideModal();
		e.keyCode === 37 && showSlide("<");
		e.keyCode === 39 && showSlide(">");
	}



	useEffect(() => {
		if (!_splideThumbs.current || !_splideMain.current) return
		thumbsRef.current = new Splide(_splideThumbs.current, optionsThumbs);
		mainRef.current = new Splide(_splideMain.current, optionsMain);
		mainRef.current.sync(thumbsRef.current);
		mainRef.current.mount();
		thumbsRef.current.mount();
		
		return () => {
			thumbsRef.current?.destroy();
			mainRef.current?.destroy();
		};
		
	}, [props.selected]);

	
	useEffect(() => {
		showSlide(props.selectedImage);
		props.show && document.addEventListener("keyup", modalKeyListener);
		props.show && document.querySelector("body")?.classList.add("noscroll");
		return (() => {
			document.removeEventListener("keyup", modalKeyListener);
		});
	}, [props.show]);


	const renderMemo = useMemo(() => {
		return (
			<div className={props.show ? "modal-splide__background show" : "modal-splide__background"}>
				<div className="modal">
					<div>
						<div>
							<div id="modalMain" className="splide" ref={_splideMain}>
								<div className="splide__track">
									<ul className="splide__list">
										{allData.portfolios.list[props.selected].images.map((slide) => {
											return (
												<li className="splide__slide" key={slide.images[0].image}>
													{props.show && <ImgWithPreloader link={slide.images[slide.images.length - 1].image} alt={slide.descr} />}
												</li>
											);
										})
										}
									</ul>
								</div>
							</div>
			
							<div id="modalThumbs" className="splide" ref={_splideThumbs}>
								<div className="splide__track">
									<ul className="splide__list">
										{allData.portfolios.list[props.selected].images.map((slide) => {
											return (
												<li className="splide__slide" key={slide.images[0].image}>
													{props.show && <ImgWithPreloader link={slide.images[0].image} alt={slide.descr} />}
												</li>
											);
			
										})

										}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>


				<button className="modal__close" onClick={closeSplideModal}>
					<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-label="Close this modal window">
						<path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
					</svg>
				</button>
			</div>
		);
	}, [props.show, props.selected]
	);
	
	return renderMemo; 
};



const mapStateToProps = (state: IState): Omit<IModalSplide, "setStore"> => ({
	selected: state.selectedPortfolio,
	selectedImage: state.selectedPortfolioImage,
	show: state.modalSplide.show
})


const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSplide);
