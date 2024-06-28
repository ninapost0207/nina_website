import { IInputCheck } from "../../../src/models";

export const checkInput:IInputCheck = ({text, type, minLength, maxLength}) => {
	const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const textFormat = /[a-zA-Z]$/;
	const textNumbersFormat = /[a-zA-Z0-9]$/;
	const numbersFormat = /[0-9]$/;
	const errorsList:string[] = [];
	if (text.length < minLength) { 
		errorsList.push(`should be at least ${minLength} symbols`);
	}
	if (text.length > maxLength) { 
		errorsList.push(`should be no more than ${maxLength} symbols`);
	}
	if (type ==="email" && !text.match(emailFormat)) { 
		errorsList.push("format is incorrect");
	}
	if (type ==="text" && !text.match(textFormat)) { 
		errorsList.push("only english letters are allowed");
	}
	if (type ==="textNumbers" && !text.match(textNumbersFormat)) { 
		errorsList.push("only english letters and numbers are allowed");
	}
	if (type ==="numbers" && !text.match(numbersFormat)) { 
		errorsList.push("only numbers are allowed");
	}
	if (type === "all") {
		return errorsList;
	}
	return errorsList;
};

