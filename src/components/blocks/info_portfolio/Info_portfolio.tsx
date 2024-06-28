import { connect } from "react-redux";
import "./info_portfolio.scss";
import { IState } from "../../../../src/models"; 
import allData from "../../../assets/js/data";


interface IInfoPortfolio {
	selected: number
}

const InfoPortfolio: React.FC<IInfoPortfolio> = (props): JSX.Element => {
	return(
		<div className="info_portfolio__container">
			<p>{allData.portfolios.list[props.selected].descr}</p>
		</div>
	);
};

const mapStateToProps = (state: IState)  => {
	return {
		selected: state.selectedPortfolio
	};
};


export default connect(mapStateToProps)(InfoPortfolio);