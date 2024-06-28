import "./message.scss";
import { IMessage } from "../../../src/models";

const Message: IMessage = ({header, text, buttonText, buttonClickAction}) => {
	return (
		<div className='message__container' onClick={(e: React.FormEvent<HTMLDivElement>) => e.stopPropagation()}>
			<h1 >{header}</h1>
			<p>{text}</p>
			<button className='link_button' onClick={buttonClickAction}>{buttonText}</button>
		</div>
	);
};

export default Message;