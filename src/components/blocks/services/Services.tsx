import { useEffect } from "react";
import { INoPropsJSX } from "../../../../src/models";
import Tile from "../tile/Tile";
import "./services.scss";
import allData from "../../../assets/js/data";


const Services:INoPropsJSX = () => { 

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
			}
		});
	}, {
		threshold: .6
	});

	useEffect(() => {
		document.querySelectorAll(".tiles__container .tile").forEach(el => observer.observe(el));
	}, []);



	return (
		<div className="tiles__container">
			{allData.servicesTiles.map(tile => (
				<Tile logo={tile.logo} header={tile.header} text={tile.text} key={tile.header}/>
			))}
		</div>
	);
};

export default Services;