import { NavLink } from "react-router-dom";
import "./page404.scss";

function Page404(): JSX.Element  {
	return (
		<div className="page-404">
			<h1>Page <em>{ window.location.pathname.slice(1) }</em> was not found</h1>
			<span>Click <NavLink to="/home">here</NavLink> to return to the Home page</span>
			<span>or <NavLink to="/contact">here</NavLink> to send a message</span>
		</div>
	);
}

export default Page404;

