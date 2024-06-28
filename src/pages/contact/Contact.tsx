import * as actions from "../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { checkInput } from "../../assets/js/inputChecker";
import axios, { AxiosError, AxiosResponse } from "axios";
import Input from "../../components/blocks/input/Input";
import ContactBlock from "../../components/blocks/contact/Contact_block";
import Modal from "../../components/modals/Modal";
import Message from "../../components/message/Message";
import "./contact.scss";
import { Action, IContact, IMapdispatchToProps, IModalMSG, ISetStore, IState } from "../../../src/models";
import {  useMemo, useRef } from "react";
import allData from "../../assets/js/data";

interface IContactProps {
	contact: IContact
	modalMsg: IModalMSG
	setStore: ISetStore
}


const Contact: React.FC<IContactProps> = (props): JSX.Element => {
	const inputEmail = useRef<HTMLElement | null>(null);
	const inputSubject = useRef<HTMLInputElement | null>(null);
	const inputMessage = useRef<HTMLTextAreaElement | null>(null);

	const checkInputs = (inputs: NodeListOf<HTMLInputElement>): boolean => {
		const errorMessages: Array<string>= [];
		Array.from(inputs).forEach((input: HTMLInputElement) => {
			const errors: Array<string> = checkInput({text: input.value.trim(), type: input.dataset.type, minLength: Number(input.dataset.min_length), maxLength: Number(input.dataset.max_length)}); 
			if (errors.length && input.required) {
				const inputParent:HTMLElement = input.parentNode as HTMLElement;
				inputParent.classList.add("incorrect");
				errors.forEach(err => {
					errorMessages.push(`${input.name.charAt(0).toUpperCase() + input.name.slice(1)} ${err}`);
				});
			}
		});
		if (errorMessages.length > 0) {
			props.setStore.setModalMsgHeader("The form if filled out incorrectly");
			//props.setStore.setModalMsgText(`Some errors were found: \n` + errorMessage.join(',\n'));
			props.setStore.setModalMsgText("Please check: \n" + errorMessages.join(",\n"));
			props.setStore.setModalMsgBtnText("Close");
			props.setStore.setModalMsgVisible(true);
			return false;
		} else {
			return true;   
		} 
	};


	const sendMessage = (e: React.FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		if (checkInputs(document.querySelectorAll("[data-input='contact']"))) {
			const currentDate: Date = new Date();
			const apiToken: string = process.env.REACT_APP_TG_TOK || "";
			const chatId: string = process.env.REACT_APP_CHT_ID || "";
			const name = (document.querySelector("#contact_name") as HTMLInputElement).value;
			const email = (document.querySelector("#contact_email") as HTMLInputElement).value;
			const subject = (document.querySelector("#contact_subject") as HTMLInputElement).value;
			const message = (document.querySelector("#contact_message") as HTMLInputElement).value;
			const text = `Date: ${currentDate.getDate() + "." + (currentDate.getMonth()+1) + "." + currentDate.getFullYear()}%0ATime: ${currentDate.getHours() + "." + currentDate.getMinutes() + "." + currentDate.getSeconds()}%0AName: ${name}%0AEmail: ${email}%0ATopic: ${subject}%0A%0AMessage: ${message}` ;
			const urlString = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;
    
			
			axios.get(urlString)
				.then(function(response: AxiosResponse): void {
					props.setStore.setContactSubject("");
					props.setStore.setContactMessage("");
					props.setStore.setModalMsgHeader("");
					props.setStore.setModalMsgText("Your message has been sent.");
					props.setStore.setModalMsgBtnText("Close");
					props.setStore.setModalMsgVisible(true);
				})
				.catch(function(error: AxiosError): void {
					props.setStore.setModalMsgHeader("Error");
					props.setStore.setModalMsgBtnText("Close");
					if (error.response) {
						props.setStore.setModalMsgText("Service unavailable. Please, try again later. \nError: " + [error.response.status, error.response.data].join(","));
					} else if (error.request) {
						props.setStore.setModalMsgText("Service unavailable. Please, try again later. \nError: " + [error.request]);
					} else {
						props.setStore.setModalMsgText("Service unavailable. Please, try again later. \nError: "+ error.message);
					}
					props.setStore.setModalMsgVisible(true);
				});
		}
	};



	const changeFocus = (e: React.KeyboardEvent): void => {
		if (e.key === "Enter") {
			if (e.currentTarget.id === "contact_name") {inputEmail.current?.focus();}
			if (e.currentTarget.id === "contact_email") {inputSubject.current?.focus();}
			if (e.currentTarget.id === "contact_subject") {inputMessage.current?.focus();}
		}
	};
	
	const renderMemo = useMemo(() => {
		return <div className="page-container">
			<div className="page_contact">
				<section className='contact-me'> 
					<h2>Contact me<em>Contact me</em></h2>
					<h4>Get In Touch</h4>
					<div className="contact__container">
						<div className="mail-me">
							<Input 
								id= 'contact_name'
								text=  'Your name *'
								value={props.contact.name}
								required={true}
								type= 'text'
								checkType= 'all'
								name= 'name'
								data= 'contact'
								minLength={2}
								maxLength={15}
								onKeyUp={changeFocus}
							/>
							<Input 
								id='contact_email'
								text='Your email *'
								value={props.contact.email}
								required={true}
								type='email'
								checkType='email'
								name='email'
								data='contact'
								minLength={6}
								maxLength={50}
								refLink={inputEmail}
								onKeyUp={changeFocus}
							/>
							<Input 
								id='contact_subject'
								text='Your subject'
								value={props.contact.subject}
								required={false}
								type='text'
								checkType='all'
								name='subject'
								data='contact'
								minLength={6}
								maxLength={50}
								refLink={inputSubject}
								onKeyUp={changeFocus}
							/>
							<Input
								id='contact_message'
								text='Your message *'
								value={props.contact.message}
								required={true}
								checkType='all'
								typeEl = 'textarea'
								name='message'
								data='contact'
								minLength={10}
								maxLength={500}
								refLink={inputMessage}
							/>
							<button type="submit" className="link_button" onClick={sendMessage}>Send message</button>      
						</div>
						<div className="my-info">
							<ContactBlock 
								image={
									<svg className="img-phone" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd" viewBox="0 0 508 512.06"><title></title>
										<path d="M123.43 249.39c15.07,27.16 32.42,53.26 54.98,77.05 22.61,23.95 50.71,45.72 87.14,64.3 2.7,1.32 5.27,1.32 7.55,0.42 3.46,-1.33 6.99,-4.18 10.47,-7.67 2.7,-2.69 6.04,-6.99 9.56,-11.7 13.99,-18.44 31.34,-41.29 55.81,-29.86 0.54,0.25 0.95,0.53 1.49,0.78l81.66 46.96c0.22,0.12 0.53,0.42 0.77,0.53 10.78,7.41 15.2,18.84 15.32,31.76 0,13.18 -4.85,27.98 -11.96,40.5 -9.4,16.5 -23.27,27.43 -39.25,34.69 -15.2,7 -32.13,10.75 -48.4,13.15 -25.55,3.77 -49.47,1.37 -73.94,-6.16 -23.94,-7.42 -48.03,-19.63 -74.37,-35.89l-1.95 -1.25c-12.07,-7.52 -25.12,-15.61 -37.91,-25.13 -46.91,-35.4 -94.65,-86.48 -125.74,-142.71 -26.08,-47.2 -40.32,-98.15 -32.53,-146.73 4.3,-26.63 15.72,-50.84 35.63,-66.82 17.35,-13.98 40.74,-21.64 71.01,-18.96 3.48,0.23 6.58,2.27 8.19,5.24l52.33 88.5c7.67,9.93 8.61,19.75 4.44,29.58 -3.49,8.09 -10.47,15.5 -20.04,22.46 -2.82,2.4 -6.18,4.84 -9.69,7.4 -11.71,8.5 -25,18.3 -20.45,29.85l-0.12 -0.29zm97.51 -42.25c-8.08,-2.08 -12.94,-10.35 -10.85,-18.43 2.09,-8.08 10.35,-12.94 18.43,-10.85 24.51,6.39 47.56,19.66 66.21,37.07 18.76,17.52 33.31,39.41 40.66,62.88 2.48,7.99 -1.98,16.49 -9.96,18.97 -7.98,2.49 -16.49,-1.97 -18.97,-9.95 -5.75,-18.37 -17.33,-35.69 -32.36,-49.73 -15.15,-14.15 -33.68,-24.88 -53.16,-29.96zm2.01 -92.74c-8.25,-1.4 -13.79,-9.24 -12.39,-17.49 1.39,-8.24 9.24,-13.79 17.48,-12.39 46.21,8 90.08,31.46 125.25,64.38 35.19,32.92 61.82,75.41 73.53,121.46 2.06,8.12 -2.85,16.38 -10.97,18.44 -8.12,2.06 -16.38,-2.85 -18.44,-10.97 -10.3,-40.48 -33.75,-77.89 -64.75,-106.89 -30.93,-28.95 -69.38,-49.55 -109.71,-56.54zm9.74 -84.19c-8.31,-0.95 -14.28,-8.47 -13.33,-16.78 0.95,-8.31 8.46,-14.29 16.77,-13.34 64.65,7.57 125.4,37.22 173.49,80.81 48.21,43.69 83.83,101.51 98.02,165.22 1.8,8.14 -3.35,16.22 -11.5,18.02 -8.14,1.8 -16.22,-3.35 -18.02,-11.5 -12.8,-57.45 -45.05,-109.73 -88.77,-149.34 -43.53,-39.45 -98.4,-66.28 -156.66,-73.09z"/>
									</svg>
								}
								header='Phone'
								links={allData.contacts.phone}
							/>
							<ContactBlock 
								image={
									<svg className="img-email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 88.86"><title></title>
										<path d="M7.05,0H115.83a7.07,7.07,0,0,1,7,7.05V81.81a7,7,0,0,1-1.22,4,2.78,2.78,0,0,1-.66,1,2.62,2.62,0,0,1-.66.46,7,7,0,0,1-4.51,1.65H7.05a7.07,7.07,0,0,1-7-7V7.05A7.07,7.07,0,0,1,7.05,0Zm-.3,78.84L43.53,40.62,6.75,9.54v69.3ZM49.07,45.39,9.77,83.45h103L75.22,45.39l-11,9.21h0a2.7,2.7,0,0,1-3.45,0L49.07,45.39Zm31.6-4.84,35.46,38.6V9.2L80.67,40.55ZM10.21,5.41,62.39,47.7,112.27,5.41Z"/>
									</svg>
								}
								header='Email'
								links={allData.contacts.email}
							/>
							<ContactBlock 
								image={
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.26 122.88"><title></title>
										<path d="M47.49,116.85c6.31-4.01,11.98-8.87,16.92-14.29c10.73-11.75,17.97-26.11,20.87-40.2c2.88-13.91,1.52-27.54-4.85-38.06 c-1.81-3.02-4.08-5.78-6.78-8.26c-7.74-7.05-16.6-10.41-25.52-10.5c-9.37-0.07-18.87,3.45-27.27,10.14 c-3.58,2.86-6.53,6.15-8.82,9.78c-5.9,9.28-7.69,20.8-5.74,32.85c1.97,12.23,7.78,25.02,17.04,36.61 c6.44,8.08,14.54,15.58,24.18,21.91L47.49,116.85L47.49,116.85z M46.13,21.16c7.05,0,13.45,2.86,18.06,7.49 c4.63,4.63,7.49,11,7.49,18.06c0,7.05-2.86,13.45-7.49,18.06c-4.63,4.63-11,7.49-18.06,7.49c-7.05,0-13.45-2.86-18.06-7.49 c-4.63-4.63-7.49-11-7.49-18.06c0-7.05,2.86-13.45,7.49-18.06C32.7,24.02,39.07,21.16,46.13,21.16L46.13,21.16z M60.51,32.33 c-3.67-3.67-8.78-5.97-14.38-5.97c-5.63,0-10.71,2.27-14.38,5.97c-3.67,3.67-5.97,8.78-5.97,14.38c0,5.63,2.27,10.71,5.97,14.38 c3.67,3.67,8.78,5.97,14.38,5.97c5.63,0,10.71-2.27,14.38-5.97c3.67-3.67,5.97-8.78,5.97-14.38C66.47,41.08,64.21,36,60.51,32.33 L60.51,32.33z M68.52,106.27c-5.6,6.12-12.09,11.61-19.42,16.06c-0.88,0.66-2.13,0.75-3.13,0.11 c-10.8-6.87-19.85-15.13-26.99-24.09C9.15,86.02,2.94,72.34,0.83,59.16c-2.15-13.36-0.14-26.2,6.51-36.68 c2.63-4.13,5.97-7.89,10.07-11.14C26.78,3.88,37.51-0.07,48.17,0c10.28,0.09,20.42,3.9,29.22,11.93c3.09,2.81,5.67,5.99,7.78,9.48 c7.15,11.77,8.69,26.81,5.56,42.01c-3.11,15.04-10.8,30.33-22.18,42.8L68.52,106.27L68.52,106.27z"/>
									</svg>
								}
								header='Address'
								links={allData.contacts.address}
							/>
						</div>
					</div>
				</section>
			</div>
		</div>;
	},[]);
	

	return (
		<>
			<Modal>
				<Message 
					header={props.modalMsg.header}
					text={props.modalMsg.text}
					buttonText={props.modalMsg.btnText}
					buttonClickAction={(): Action<boolean> => props.setStore.setModalMsgVisible(false)}
				/>
			</Modal>
			{renderMemo}
		</>
	);
};



const mapStateToProps = (state: IState)  => {
	return {
		contact: state.contact,
		modalMsg: state.modalMsg
	};
};

const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Contact);