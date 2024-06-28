import { Suspense, lazy } from "react";
import List3d from "../../components/blocks/list3d/List3d";
import List3d_v from "../../components/blocks/list3d_v/List3d_v";
import List from "../../components/blocks/list/List";
import InfoPortfolio from "../../components/blocks/info_portfolio/Info_portfolio";
import InfoPortfolioSlide from "../../components/blocks/info_portfolio-slide/Info_portfolio-slide";
import Preloader from "../../components/preloader/Preloader";
import "./portfolio.scss";
const LazySplidePortfolio = lazy(() => import("../../components/blocks/splide_portfolios/Splide_portfolio"));

const Portfolio: React.FC  = (): JSX.Element  => {
	return(
		<div className="page-container">
			<div className="page_portfolio">
				<section className='portfolio'> 
					<div className="header_portfolio">
						<h2>Portfolio<em>Portfolio</em></h2>
						<div>
							<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="256pt" height="256pt" viewBox="0 0 256 256" preserveAspectRatio="xMidYMid meet">
								<g transform="translate(0,256) scale(0.1,-0.1)" fill="#000000" stroke="none">
									<path className='body' d="M195 2524 c-55 -19 -109 -66 -143 -122 -26 -46 -27 -51 -30 -234 -3 -178 -3 -187 17 -207 l21 -21 1090 0 c1077 0 1090 0 1110 20 25 25 25 55 0 80 -20 20 -33 20 -1070 20 l-1050 0 0 128 c0 143 11 175 72 212 32 20 53 20 1068 20 1015 0 1036 0 1068 -20 18 -11 41 -34 52 -52 20 -32 20 -53 20 -1068 0 -1015 0 -1036 -20 -1068 -11 -18 -34 -41 -52 -52 -32 -20 -53 -20 -1068 -20 -1015 0 -1036 0 -1068 20 -18 11 -41 34 -52 52 -19 32 -20 52 -20 791 0 744 0 757 -20 777 -11 11 -29 20 -40 20 -11 0 -29 -9 -40 -20 -20 -20 -20 -33 -20 -778 0 -834 -2 -809 61 -885 17 -20 52 -49 77 -65 l47 -27 1075 0 1075 0 47 27 c25 16 60 45 77 65 64 78 62 23 59 1184 l-3 1054 -27 47 c-35 58 -88 103 -147 123 -65 22 -2104 21 -2166 -1z"/>
									<path className='dot dot_left' d="M280 2280 c-11 -11 -20 -29 -20 -40 0 -26 34 -60 60 -60 26 0 60 34 60 60 0 11 -9 29 -20 40 -11 11 -29 20 -40 20 -11 0 -29 -9 -40 -20z"/>
									<path className='dot dot_middle' d="M480 2280 c-11 -11 -20 -29 -20 -40 0 -26 34 -60 60 -60 26 0 60 34 60 60 0 11 -9 29 -20 40 -11 11 -29 20 -40 20 -11 0 -29 -9 -40 -20z"/>
									<path className='dot dot_right' d="M680 2280 c-11 -11 -20 -29 -20 -40 0 -11 9 -29 20 -40 11 -11 29 -20 40 -20 11 0 29 9 40 20 11 11 20 29 20 40 0 11 -9 29 -20 40 -11 11 -29 20 -40 20 -11 0 -29 -9 -40 -20z"/>
									<path className='link link_left' d="M590 1311 c-51 -16 -108 -51 -137 -85 -38 -42 -73 -133 -73 -186 0 -53 35 -144 73 -186 16 -20 53 -47 81 -62 47 -25 62 -27 198 -30 138 -4 147 -3 167 17 24 24 27 49 7 77 -13 17 -31 20 -159 24 -127 4 -149 8 -173 26 -53 39 -69 71 -69 134 0 63 16 95 69 134 27 20 39 21 386 21 347 0 359 -1 386 -21 43 -31 63 -64 73 -118 14 -74 59 -98 102 -55 18 18 21 29 16 69 -8 62 -46 139 -91 177 -19 17 -60 40 -91 52 -53 20 -74 21 -398 20 -188 0 -353 -4 -367 -8z"/>
									<path className='link link_right' d="M1700 1300 c-24 -24 -25 -49 -6 -76 12 -16 31 -20 139 -24 106 -4 130 -8 153 -26 53 -39 69 -71 69 -134 0 -63 -16 -95 -69 -134 -27 -20 -39 -21 -386 -21 -347 0 -359 1 -386 21 -43 31 -63 64 -73 118 -13 73 -59 98 -101 56 -26 -26 -25 -65 1 -135 26 -71 68 -119 133 -153 l51 -27 356 -3 c343 -3 358 -2 413 19 72 27 120 68 154 133 38 73 38 179 0 252 -58 111 -147 154 -318 154 -97 0 -112 -2 -130 -20z"/>
								</g>
							</svg>
							<List3d />
						</div>
					</div>
					<div className="portfolio__content">
						<List />
						<List3d_v />

						<div className="portfolio__splide">
							<InfoPortfolio />
							<Suspense fallback={<Preloader />}>
								<LazySplidePortfolio />
							</Suspense>
							<InfoPortfolioSlide />
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};


export default Portfolio;