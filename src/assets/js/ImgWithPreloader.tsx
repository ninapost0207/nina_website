import { useRef, useState } from "react";
import Preloader from "../../../src/components/preloader/Preloader";

const ImgWithPreloader = ({link, alt}: {link: string, alt: string}) => {

	const [loaded, setLoaded] = useState(false);
	const img = useRef<HTMLImageElement | null>(null);


	return (
		<>
			{loaded || <Preloader />}
			<img ref={img} src={link} alt={alt} onLoad={() => setLoaded(true)} style={{display: loaded ? "block" : "none"}} />
		</>
	);
};


export default ImgWithPreloader;