import preloader from "./preloader_template";
import "./preloader.scss";
import { INoPropsJSX } from "../../../src/models";


const Preloader: INoPropsJSX = () => { 
	return <div dangerouslySetInnerHTML={{__html: preloader()}} ></div>; 
};

export default Preloader;