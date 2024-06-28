import { ProjectItemImageItem } from "../../../src/models";
import preloader from "../../components/preloader/preloader_template";

export const setImagePortfolio = (_target: HTMLElement, _widthBlock: HTMLElement, images: ProjectItemImageItem[] = [], callback: (obj: HTMLElement) => void): void => {
	const _image: HTMLImageElement = document.createElement("img"); //create new <img>
	_target.innerHTML = preloader();

	_image.onload = (): void => { //add only this image to container
		_target?.replaceChildren(_image);
		callback(_target?.querySelector("img") as HTMLImageElement); //return <img> after completely loaded. For preloader
		//return _target?.querySelector('img')
	};
   
	_image.src = images.find((image: ProjectItemImageItem) => {
		return ((image.width >= _widthBlock?.offsetWidth) || (image.height >= _widthBlock?.offsetHeight));//find first image with 'width' more than 'container width'
	})?.image as string; //set this image as src for created <img>
};
