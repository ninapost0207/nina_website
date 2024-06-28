import Skill from "../../components/blocks/skill/Skill";
import History from "../../components/blocks/history/History";
import "./resume.scss";
import { IEducationItem, IWorkItem, MySkill } from "../../../src/models";
import { useEffect } from "react";
import allData from "../../assets/js/data";


const Resume: React.FC  = (): JSX.Element => {

	const observerRule = (entries: IntersectionObserverEntry[], thisObserver: IntersectionObserver) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
				thisObserver.unobserve(entry.target);
			}
		});
	};
	
	const observerOptions: {threshold: number} = {
		threshold: 0.4,
	};
	
	
	
	useEffect(() => {
		const observer: IntersectionObserver = new IntersectionObserver(observerRule, observerOptions);
		const listToObserve: NodeList = document.querySelectorAll(".history .history__block .history__description");
		Array.from(listToObserve).forEach((el) => observer.observe(el as Element));
		return () => {
			listToObserve.forEach((el) => observer.unobserve(el as Element));
		};
	}, []);


	return(
		<div className="page-container">
			<div className="page_resume">
				<section className='skills'> 
					<h2>My skills<em>My skills</em></h2>
					<div className="skills__container"> 
						{allData.skills.map((skill: MySkill) => {
							return(
								<Skill key={skill.name} name={skill.name} percent={skill.percent}/>
							);
						})}
					</div>
				</section>
				<section className='history'> 
					<h2>Resume<em>Resume</em></h2>
					<div className='history__section'>
						<div className="history__header">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<g>
									<path d="m496,120h-112c0-8.844-7.164-16-16-16v-16c0-26.469-21.531-48-48-48h-128c-26.469,0-48,21.531-48,48v16c-8.836,0-16,7.156-16,16h-112c-8.836,0-16,7.156-16,16v304c0,8.844 7.164,16 16,16h48c0,8.836 7.163,16 16,16h32c8.837,0 16-7.164 16-16h256c0,8.836 7.163,16 16,16h32c8.837,0 16-7.164 16-16h48c8.836,0 16-7.156 16-16v-304c0-8.844-7.164-16-16-16zm-320-32c0-8.828 7.18-16 16-16h128c8.82,0 16,7.172 16,16v16c-8.836,0-16,7.156-16,16h-128c0-8.844-7.164-16-16-16v-16zm304,336h-448v-272h448v272z"/>
									<path d="m128,376c8.836,0 16-7.156 16-16v-144c0-8.844-7.164-16-16-16s-16,7.156-16,16v144c0,8.844 7.164,16 16,16z"/>
									<path d="m384,376c8.836,0 16-7.156 16-16v-144c0-8.844-7.164-16-16-16s-16,7.156-16,16v144c0,8.844 7.164,16 16,16z"/>
								</g>
							</svg>
							<h3>Work experience</h3>
						</div>
						<div className="history__content">
							{allData.workExperience.map((historyBlock: IWorkItem, index: number) => {
								return(
									<History key={index} historyBlock={historyBlock} tilesContent={{challenges: historyBlock.challenges, solutions: historyBlock.solutions}}/>
								);
							})}
						</div>
					</div>
					<div className='history__section'>
						<div className="history__header">
							<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style={{transform: "scale(1.5)"}}>
								<path d="M895.1808 395.3664L521.728 194.8672c-6.0416-3.2768-13.312-3.2768-19.3536 0L128.8192 395.3664c-14.2336 7.68-14.4384 27.9552-0.3072 35.9424L264.192 507.5968v194.4576c0 7.8848 4.608 15.1552 11.6736 18.5344l230.1952 109.056c5.632 2.6624 12.0832 2.6624 17.7152-0.1024l224.4608-108.8512c7.0656-3.3792 11.5712-10.5472 11.5712-18.432V507.5968l73.9328-41.5744v310.6816c0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48V442.9824l20.7872-11.6736c14.1312-7.9872 13.9264-28.2624-0.3072-35.9424zM718.848 686.1824L514.8672 790.3232 305.152 685.9776V530.6368l196.8128 110.592c6.2464 3.4816 13.824 3.4816 20.0704 0l196.8128-110.592v155.5456z m-206.848-86.3232L181.0432 413.7984 512 236.1344l330.9568 177.664L512 599.8592z"  />
							</svg>
							<h3>Education</h3>
						</div>
						<div className="history__content">
							{allData.education.map((historyBlock: IEducationItem, index: number) => {
								return(
									<History key={index} historyBlock={historyBlock}/>
								);
							})}
						</div>
					</div>
				</section>
				<a className="link_button" href={allData.resumeDoc} target="_blank" rel="noreferrer">Download cv</a>
			</div>
		</div>
	);
};




export default Resume;