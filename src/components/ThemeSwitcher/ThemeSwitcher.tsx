import { useEffect, useRef,useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cloud from "./theme_day__cloud.svg";
import star from "./theme_nigth__star.svg";
import "./themeSwitcher.scss";
import { IMapdispatchToProps, ISetStore, IState } from "../../models";
import * as actions from "../../assets/redux/actions";

type TTheme = 'dark' | 'light'

type ICloud = {
    width: number
    gap: number
    top: number
    speed: number
    opacity: number
}

interface IPropsState {
	theme: TTheme
}

interface IPropsActions {
	setStore: ISetStore
}

interface IProps extends IPropsState, IPropsActions {}


interface IParams {
	width: number
	height: number
	circleSize: number
	duration: number
	numberOfStars: number
	clouds: ICloud[]
	isChanging: boolean
	saveState: string
	typesOfBlink: number
}

const ThemeSwitcher: React.FC<IProps> = ({theme, setStore}): JSX.Element => {

	const _themeSwitcherCont = useRef<HTMLDivElement>(null);
	const _contentSwitcher = useRef<HTMLDivElement>(null);
	const _switcher = useRef<HTMLInputElement>(null);
	const themeRef = useRef<TTheme>('dark');
	const [hidden, setHidden] = useState<boolean>(false)

	const state = useRef({
		isChanging: false,
	}) 

	const params: IParams = useMemo(() => (
		{
			width: 70,
			height: 40,
			circleSize: 14,
			duration: 2000,
			numberOfStars: 30,
			saveState: "theme",
			typesOfBlink: 6,
			isChanging: false,
			clouds: [ //default styles for clouds
				{
					width: 30, //px
					gap: 15, //px
					top: 0, //in percent of height
					speed: 7, //sec for 1 cycle, less -> faster
					opacity: 1, //transparent for line
				},
				{
					width: 25,
					gap: 20,
					top: 25,
					speed: 4,
					opacity: 0.85,
				},
				{
					width: 20,
					gap: 20,
					top: 40,
					speed: 5,
					opacity: 0.7,
				},
			]
		}
	), [])



	useEffect(() => {
		themeRef.current = (localStorage.getItem(params.saveState) as TTheme) === 'dark' ? 'dark' : 'light'
		applyTheme()
		if (!_themeSwitcherCont.current) return
	},[])





	const classSwitcher = (classRemove: string, classAdd: string, delay: number): Promise<void> => { //class +/- for _contentSwitcher using delay
		return new Promise((res) => {
			setTimeout((): void => {
				classRemove && _contentSwitcher.current?.classList.remove(classRemove);
				classAdd && _contentSwitcher.current?.classList.add(classAdd);
				res();
			}, delay);
		});
	};

	
	
	const applyTheme = () => { //main switcher	
		if (!state.current || state.current.isChanging) return
		setStore.setTheme(themeRef.current)
		document.body.classList.toggle("dark", themeRef.current === "dark")
		params.saveState && localStorage.setItem(params.saveState, themeRef.current as TTheme);
		state.current.isChanging = true;
		if (themeRef.current === "light") {
			classSwitcher("", "theme_light_1", 0)
			.then(() => classSwitcher("theme_light_1", "theme_light_2", (params.duration || 1)/ 4))
			.then(() => {classSwitcher("theme_light_2", "theme_light", 30); state.current.isChanging = false;});
		} 
		if (themeRef.current === 'dark') {
			classSwitcher("theme_light", "theme_light_back_1", 0)
			.then(() => classSwitcher("theme_light_back_1", "theme_light_back_2", (params.duration || 1) / 4))
			.then(() => {classSwitcher("theme_light_back_2", "", 30); state.current.isChanging = false;});
		}
	};

	
	const onThemeClick = () => {	
		themeRef.current = themeRef.current  === 'dark' ? 'light' : 'dark'
		applyTheme()
	};
 

	const stars = useMemo(() => {
		return new Array(params.numberOfStars).fill('').map((item,index)=> {
			let size = Math.floor(Math.random()*20 + 1);
			size = size > 13 ? Math.floor(size / 3) : size; //to create more small stars than big
			const x = Math.floor(Math.random() * (params.width as number))
			const y = Math.floor(Math.random() * (params.height as number))
			const typeOfBlink = Math.floor(Math.random() * (params.typesOfBlink as number))//different duration of blinking
			return (
				<img 
					className={`theme_dark__star-${typeOfBlink}`} 
					key={index}
					alt="" 
					src={star}
					style={{
						left: `${x}px`, 
						top: `${y}px`, 
						width: `${size}px`, 
					}}/>
			)
		})
	}, [])
	



	const clouds = useMemo(() => {
		const listOfClouds: string[] = new Array(Math.ceil((params.width) / (params.clouds[params.clouds.length - 1].width + params.clouds[params.clouds.length - 1].gap) + 2)).fill(""); //list of clouds in a cloud-raw, depends on the cloud size and gap between clouds + some reserve
		return params.clouds?.map((line, index: number) => (
			<div className={`clouds-${index}`} key={index}>
				{listOfClouds.map((item,index) => <img className="cloud" src={cloud} alt="" key={index}/>)}
			</div>
		))
	}, [])
	



	const themeSwitcherMemo = useMemo(() => {
		return (
			<label htmlFor="">
				<div className="theme-switcher">
					<div className={`content-switcher ${theme !== "dark" ? "theme_light" : ""}`} ref={_contentSwitcher}>
						<div className="dark">{stars}</div>
						<div className="light">{clouds}</div>
					</div>
				</div>
				<input type="checkbox" name="" id="" aria-label="Change the site theme" onChange={onThemeClick} ref={_switcher}/>
			</label>
		)
	}, [])



	const hideSwitcher = () => {
		setHidden(window.scrollY > 50 ? true : false)
	}

	useEffect(() => {
		window.addEventListener('scroll', hideSwitcher as EventListener)
		return () => window.removeEventListener('scroll', hideSwitcher as EventListener)
	},[])



	return (
		<div className={`theme-switcher__container ${hidden ? "hidden" : ''}`} ref={_themeSwitcherCont}>
			{themeSwitcherMemo}
		</div>
	);
};



const mapStateToProps = (state: IState) => {
	return {
		theme: state.theme
	};
};

  
const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher)

