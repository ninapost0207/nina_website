import { MouseEventHandler, Reducer } from "react";
import { AnyAction, ActionCreatorsMapObject, Unsubscribe, Observable } from "redux";

export type IPropsJSX = (props: IProps) => JSX.Element
export type INoPropsJSX = () => JSX.Element

export type EmptyVoid = () => void

export interface Action<T> {
    type: string;
    payload?: T; 
}

export type TTheme = "dark" | "light";

export interface ISetStore {
    [key: string]: <T>(payload?: T) => Action<T> //Change any to T
}


export interface IProps {
    store: IState
    setStore: ISetStore
    children?: JSX.Element
}


export interface IStore {
    store: IState
}



export interface IActionList {
    [key:string]: string
}

export interface IDispatch {
    <T extends AnyAction>(action: T): T
}


export interface IMapStateToProps {
    (store: IState): {store: IState}
}


export interface ISetStore2 {
    [key: string]: <T>(payload?: T) => Action<T> //Change any to T
}

export interface IMapdispatchToProps {
    (dispatch: IDispatch): {setStore: ActionCreatorsMapObject}
}


export const actionList = {
	SET_THEME: "SET_THEME",
	SET_NAV_OPEN: "SET_NAV_OPEN",
	SET_NAV_CLOSE: "SET_NAV_CLOSE",
	SET_CONTACT_NAME: "SET_CONTACT_NAME",
	SET_CONTACT_EMAIL: "SET_CONTACT_EMAIL",
	SET_CONTACT_SUBJECT: "SET_CONTACT_SUBJECT",
	SET_CONTACT_MESSAGE: "SET_CONTACT_MESSAGE",
	SET_MODAL_IMAGE: "SET_MODAL_IMAGE",
	SET_MODALMSG: "SET_MODALMSG",
	SET_MODALMSG_HEADER: "SET_MODALMSG_HEADER",
	SET_MODALMSG_TEXT: "SET_MODALMSG_TEXT",
	SET_MODALMSG_BTNTEXT: "SET_MODALMSG_BTNTEXT",
	SET_SELECTED_PORTFOLIO: "SET_SELECTED_PORTFOLIO",
	SET_SELECTED_PORTFOLIO_IMAGE: "SET_SELECTED_PORTFOLIO_IMAGE",
	SET_MODAL_SPLIDE: "SET_MODAL_SPLIDE",
};

export type TActionListKeys = keyof typeof actionList;

export type TActions = typeof actionList[keyof typeof actionList];
export type TActions2 =keyof typeof actionList;

export type MeInfo = {
    descr: string
    value: string
}

export type MySkill = {
    name: string
    percent: number
}

export interface IWorkItem {
    date: string
    header: string
    subHeader: string
    text: string
    link: string
    challenges: string[]
    solutions: string[]
}


export interface IEducationItem {
    date: string
    header: string
    subHeader: string
    text: string
    link: string
}


export type ImageMe = {
    width: number
	height: number
    image: string
}


export type ProjectItemImageItem = {
    width: number
    height: number
    image: string 
}


type ProjectItemImagesImage = {
    descr: string
    link: string
    images: Array<ProjectItemImageItem>
}


export type ProjectItemListItem = {
    name: string
    descr: string
    link: string
    images: Array<ProjectItemImagesImage>
}


export type PageItem = {
    link: string
    text: string
}

export type ReviewItem = {
    text: string
    name: string
    add: string
}

export type ContactItem = {
    link: string
    text:string
    newWindow: boolean
}


export interface IContact {
    name: string
    email: string
    subject: string
    message: string
}

export interface IContacts {
    phone: Array<ContactItem>
    email: Array<ContactItem>
    address: Array<ContactItem>
}

export interface IModalMSG {
    active: boolean
    header: string
    text: string
    btnText: string
}

export interface IModalImage {
    show: boolean
}

export interface IModalSplide {
    show: boolean
}

export interface IPortfolios {
    list: Array<ProjectItemListItem>
}

export interface IMyImage {
    descr: string
    images: Array<ImageMe> 
}

export interface IImagesMe {
    side: string
    day: IMyImage
    night: IMyImage
}

export interface IState extends IProps {
    theme: TTheme
    nav_ham: string
    modalSplide: IModalSplide
    modalImage: IModalImage
    modalMsg: IModalMSG
    contact: IContact
    getState: () => IState
    dispatch: any
    selectedPortfolio: number
    selectedPortfolioImage: number
    subscribe: (listener: () => void) => Unsubscribe
    replaceReducer: (nextReducer: Reducer<IState, AnyAction>) => void
    [Symbol.observable] : () => Observable<IState>
}


export interface IAllData {
    skillFillSpeed: number
    resumeDoc: string
    servicesTiles: IServiceTile[]
    aboutIntro: string[]
    me: Array<MeInfo>
    skills: Array<MySkill>
    workExperience: Array<IWorkItem>
    education: Array<IEducationItem>
    imagesMe: IImagesMe
    portfolios: IPortfolios
    pages: Array<PageItem>
    reviews: Array<ReviewItem>
    contacts: IContacts
}


export interface ISliderOptions {
    lazyLoad?: boolean
    fixedWidth?: string | number
    updateOnMove?: boolean
    type? : string
    perPage?: number
    gap?   : number | string
    breakpoints?: {
        [key:number]: {
            perPage?: number
            gap?   : string
            wheel?: boolean
        },
    },
    perMove?: number
    pagination?: boolean
    arrows?: boolean
    drag?: boolean
    speed?: number
    snap?: boolean
    wheel?: boolean
    wheelSleep?: number
    autoplay?: boolean
    interval?: number
    pauseOnHover?: boolean
    rewind?: boolean
}


type InputCheck = {
    text: string
    type?: string | undefined
    minLength: number
    maxLength: number
}

export interface IInputCheck {
    (props: InputCheck): Array<string>
} 


type message = {
    header: string
    text: string
    buttonText: string
    buttonClickAction: MouseEventHandler
}

export interface IMessage {
    (props: message): JSX.Element
}

export interface IRemoveEventListener {
    (): ReturnType<typeof document.removeEventListener>
}


export interface IResumeTile {
    challenges: string[]
    solutions: string[]
}


export interface IServiceTile {
    logo: JSX.Element,
	header: string
	text: string
}





