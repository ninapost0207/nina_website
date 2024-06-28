import * as actions from "../../assets/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./modal.scss";
import { Action, IMapdispatchToProps, ISetStore, IState } from "../../../src/models";
import { ReactNode } from "react";

interface IModal {
	active: boolean
	setStore: ISetStore
	children: ReactNode
}

const Modal: React.FC<IModal> = (props): JSX.Element => {
	return (
		<>
			<div 
				className={`modal_common ${props.active ? "active" : ""}`}
				onClick={(): Action<boolean> => props.setStore.setModalMsgVisible(false)}
			>
				{props.children}
			</div>
		</>
	);
};


const mapStateToProps = (state: IState)  => {
	return {
		active: state.modalMsg.active
	};
};


const mapDispatchToProps: IMapdispatchToProps = (dispatch) => ({
	setStore: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);



