import * as actions from "../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import "./modalImage.scss";
import { IMapdispatchToProps, IMyImage, ISetStore, IState, TTheme } from "../../../src/models";
import ImgWithPreloader from "../../../src/assets/js/ImgWithPreloader";
import allData from "../../assets/js/data";

interface IModalImage {
	show: boolean
	theme: TTheme
	setStore: ISetStore
	imageProps: IMyImage
}

const ModalImage: React.FC<IModalImage> = (props): JSX.Element => {

	const _imgContRef = useRef<HTMLDivElement | null>(null);

	const closeModal = () => {
		document.querySelector("body")?.classList.remove("noscroll");
		props.setStore.setModalImage(false);
	};

	function modalKeyListener(e: KeyboardEvent) {
		e.key === "Escape" && closeModal();
	}


	useEffect(() => {
		if (!props.show) return;
		document.addEventListener("keyup", modalKeyListener);
		document.querySelector("body")?.classList.add("noscroll");
		return (() => {
			document.removeEventListener("keyup", modalKeyListener);
		});
	}, [props.show]);


	const renderMemo = useMemo(() => {
		return (
			<div className={props.show ? "modal-image__background show" : "modal-image__background"}>
				<div className="modal">
					<div ref={_imgContRef}>
						{props.show &&
								<ImgWithPreloader 
									link={props.theme === "light" ? 
										allData.imagesMe.day.images[allData.imagesMe.day.images.length - 1].image
										: allData.imagesMe.night.images[allData.imagesMe.day.images.length - 1].image
									} alt={props.theme === "light" ? allData.imagesMe.day.descr : allData.imagesMe.night.descr } />
						}
					</div>
				</div>

				<button className="modal-image__close" onClick={closeModal}>
					<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-label="Close this modal window">
						<path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
					</svg>
				</button>
			</div>
		);
	}, [props.show]
	);
	
	return renderMemo; 
};



const mapStateToProps = (state: IState) => {
	return {
		show: state.modalImage.show,
		theme: state.theme
	};
};


const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});



export default connect(mapStateToProps, mapDispatchToProps)(ModalImage);
