import { TTheme } from "../../../src/models";
import { Action } from "../../../src/models";
import { actionList } from "../../../src/models";


export const setTheme = <T extends TTheme>(theme: T): Action<T> => ({
	type: actionList.SET_THEME, 
	payload: theme,
});


export const setNavOpen = <T>(): Action<T> => ({
	type: actionList.SET_NAV_OPEN,
});

export const setNavClose = <T>(): Action<T> => ({
	type: actionList.SET_NAV_CLOSE,
});

export const setContactName = <T extends string>(email: T): Action<T> => ({
	type: actionList.SET_CONTACT_NAME,
	payload: email
});


export const setContactEmail = <T extends string>(text: T): Action<T> => ({
	type: actionList.SET_CONTACT_EMAIL,
	payload: text
});

export const setContactSubject = <T extends string>(text: T): Action<T> => ({
	type: actionList.SET_CONTACT_SUBJECT,
	payload: text
});

export const setContactMessage = <T extends string>(text: T): Action<T> => ({
	type: actionList.SET_CONTACT_MESSAGE,
	payload: text
});


export const setModalImage = <T extends boolean>(status: T): Action<T> => ({
	type: actionList.SET_MODAL_IMAGE,
	payload: status
});

export const setModalSplide = <T extends boolean>(status: T): Action<T> => ({
	type: actionList.SET_MODAL_SPLIDE,
	payload: status
});

export const setModalMsgVisible = <T extends boolean>(visible: T): Action<T> => ({
	type: actionList.SET_MODALMSG,
	payload: visible
});

export const setModalMsgHeader = <T extends string>(text: T): Action<T> => ({
	type: actionList.SET_MODALMSG_HEADER,
	payload: text
});

export const setModalMsgText = <T extends string>(text: T): Action<T> => ({
	type: actionList.SET_MODALMSG_TEXT,
	payload: text
});

export const setModalMsgBtnText = <T extends string>(text: T): Action<T> => ({
	type: actionList.SET_MODALMSG_BTNTEXT,
	payload: text
});

export const setSelectedPortfolio = <T extends number>(number: T): Action<T> => ({
	type: actionList.SET_SELECTED_PORTFOLIO,
	payload: number
});

export const setSelectedPortfolioImage = <T extends number>(number: T): Action<T> => ({
	type: actionList.SET_SELECTED_PORTFOLIO_IMAGE,
	payload: number
});

/*
export const setImgLoaded = <T extends boolean>(isLoaded: T): Action<T> => ({
	type: actionList.SET_IMG_LOADED,
	payload: isLoaded
});
*/
/*
export const setTest = () => ({
    type: actionList.SET_IMG_LOADED,
    payload: 'hgf'
})*/

