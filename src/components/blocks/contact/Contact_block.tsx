import { ContactItem } from "../../../../src/models";
import "./contact_block.scss";

interface IContactBlock {
    image: JSX.Element
    header: string
    links: ContactItem[]
}

const ContactBlock: React.FC<IContactBlock> = (props): JSX.Element => {
	return (
		<div className="contact-block">
			<div className="img-container">
				{props.image}
			</div>
			<div className="contact-info">
				<span>{props.header}</span>
				{props.links?.map((link: ContactItem) => <a className="decorated" href={link.link} key={link.link} target={link.newWindow ? "_blank" : void 0} rel="noreferrer">{link.text}</a>)}
			</div>
		</div>
	);
};

export default ContactBlock;
