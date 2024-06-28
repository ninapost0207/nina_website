import Splide from "@splidejs/splide";
import "@splidejs/react-splide/css";
import "./splide_reviews.scss";
import { ISliderOptions, ReviewItem } from "../../../../src/models";
import { useEffect, useRef } from "react";
import allData from "../../../assets/js/data";



const SliderReviews: React.FC = (): JSX.Element => {
    
	const _reviewsSplideCont = useRef<HTMLDivElement>(null);
	const reviewsSplide = useRef<Splide | null>(null);

	const options: ISliderOptions = {
		updateOnMove: true,
		perPage: 2,
		gap   : "2rem",
		breakpoints: {
			768: {
				perPage: 1,
				gap   : "2rem",
			},
		},
		perMove: 1,
		pagination: false,
		arrows: true,
		drag: true,
		speed: 500,
		snap: false,
		wheel: true,
		wheelSleep: 500,
		autoplay: true,
		interval: 10000,
		pauseOnHover: true,
	};

	useEffect(() => {
		if (!_reviewsSplideCont.current) return
		reviewsSplide.current = new Splide(_reviewsSplideCont.current, options);
		reviewsSplide.current.mount();
		return () => {
			reviewsSplide.current?.destroy();
		};
	}, []);

	
	return (
		<div className="reviews__container">
			<div ref={_reviewsSplideCont} className="splide">
				<div className="splide__track">
					<ul className="splide__list">
						{allData.reviews.map((review: ReviewItem) => {
							return (
								<li className="splide__slide" key={review.name}>
									<div className="splide__slide-container">
										<div className="review__slide">
											<p>{review.text}</p>
										</div>
										<span>{review.name}</span>
										<span>{review.add}</span>
									</div>
								</li>
							);
					
						})

						}
						
					</ul>
				</div>
			</div>
		</div>
	);
};



export default SliderReviews;

