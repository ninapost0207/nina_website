import { useEffect, useRef } from "react";
import { arrow_right, logoIssue, logoSolution } from "../../../assets/js/svgs";
import Tile from "../tile/Tile";
import "./resume_tiles.scss";
import { IResumeTile } from "../../../models";

interface IContent {
    content: IResumeTile
}


const ResumeTiles: React.FC<IContent> = ({content}: IContent): JSX.Element => {
    
    const _tile = useRef<HTMLDivElement>(null)

    const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
			}
		});
	}, {
		threshold: .8
	});

	useEffect(() => {
		_tile.current?.querySelectorAll("[data-observe='tile']").forEach(el => observer.observe(el));
	}, []);


	return (
		<div className="resume-tiles" ref={_tile}>
			<Tile logo={logoIssue} header="Challenges" list={content.challenges} />
            <div className="tile__arrow" data-observe="tile">
                {arrow_right}
            </div>
			<Tile logo={logoSolution} header="Solutions" list={content.solutions} />
		</div>
	);
};

export default ResumeTiles;