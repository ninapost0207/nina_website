import { IState, TActionListKeys, TTheme } from "../../../src/models";
import { actionList } from "../../models";
import initialState from "./initialState";


const reducer = function(state: IState = initialState, action: {type: TActionListKeys, payload: unknown}): IState {
	switch (action.type) {
		case actionList.SET_THEME as "SET_THEME":
			return {
				...state,
				theme: action.payload as TTheme
			};
		case actionList.SET_NAV_OPEN as "SET_NAV_OPEN":
			return {
				...state,
				nav_ham: "nav_opened"
			};
		case actionList.SET_NAV_CLOSE as "SET_NAV_CLOSE":
			return {
				...state,
				nav_ham: ""
			};
		case actionList.SET_CONTACT_NAME as "SET_CONTACT_NAME":
			return { 
				...state,
				contact: {
					...state.contact,
					name: action.payload as string
				}
			};
		case actionList.SET_CONTACT_EMAIL as "SET_CONTACT_EMAIL":
			return {
				...state,
				contact: {
					...state.contact,
					email : action.payload as string
				}
			};
		case actionList.SET_CONTACT_SUBJECT as "SET_CONTACT_SUBJECT":
			return {
				...state,
				contact: {
					...state.contact,
					subject : action.payload as string
				}
			};
		case actionList.SET_CONTACT_MESSAGE as "SET_CONTACT_MESSAGE":
			return {
				...state,
				contact: {
					...state.contact,
					message : action.payload as string
				}
			};
		case actionList.SET_MODAL_IMAGE as "SET_MODAL_IMAGE":
			return {
				...state,
				modalImage: {
					...state.modalImage,
					show: action.payload as boolean
				}
			};
		case actionList.SET_MODAL_SPLIDE as "SET_MODAL_SPLIDE":
			return {
				...state,
				modalSplide: {
					...state.modalSplide,
					show: action.payload as boolean
				}
			};

		case actionList.SET_MODALMSG as "SET_MODALMSG":
			return {
				...state,
				modalMsg: {
					...state.modalMsg,
					active: action.payload as boolean
				}
			};
		case actionList.SET_MODALMSG_HEADER as "SET_MODALMSG_HEADER":
			return {
				...state,
				modalMsg: {
					...state.modalMsg,
					header: action.payload as string
				}
			};
		case actionList.SET_MODALMSG_TEXT as "SET_MODALMSG_TEXT":
			return {
				...state,
				modalMsg: {
					...state.modalMsg,
					text: action.payload as string
				}
			};
		case actionList.SET_MODALMSG_BTNTEXT as "SET_MODALMSG_BTNTEXT":
			return {
				...state,
				modalMsg: {
					...state.modalMsg,
					btnText: action.payload as string
				}
			};
		case actionList.SET_SELECTED_PORTFOLIO as "SET_SELECTED_PORTFOLIO":
			return {
				...state,
				selectedPortfolio: action.payload as number
			};
		case actionList.SET_SELECTED_PORTFOLIO_IMAGE as "SET_SELECTED_PORTFOLIO_IMAGE":
			return {
				...state,
				selectedPortfolioImage: action.payload as number
			};
		default: {
			const missedSomeActions:never = action.type;
			return {
				...state   
			};
		}
	}
};

export default reducer;