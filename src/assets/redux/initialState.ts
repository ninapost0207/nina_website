import { IState } from "../../../src/models";

let initialState = {} as IState;

initialState = {
	...initialState,
	theme: "dark",
	nav_ham: "",
	modalSplide: {
		show: false,
	},
	modalImage: {
		show: false
	},
	modalMsg: {
		active: false,
		header: "",
		text: "",
		btnText: "",
	},
	selectedPortfolio: 0,
	selectedPortfolioImage: 0, //for changing to 0 to add 1 initial render in SplidePortfolio, should be be <> 0
	contact: {
		name: "",
		email: "",
		subject: "",
		message: ""
	},

};

export default initialState;