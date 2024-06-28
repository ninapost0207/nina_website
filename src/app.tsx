import  { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/preloader/Preloader";
import { INoPropsJSX } from "./models";
import "./assets/css/_base.scss";
const LazyThemeSwitcher = lazy(() => import("./components/ThemeSwitcher/ThemeSwitcher"));
const LazyModalSplide = lazy(() => import("./components/modals/ModalSplide"));
const LazySidePanel = lazy(() => import("./components/side_panel/SidePanel"));
const LazyHomepage = lazy(() => import("./pages/home/Home"));
const LazyAboutpage = lazy(() => import("./pages/about/About"));
const LazyResume = lazy(() => import("./pages/resume/Resume"));
const LazyPortfolio = lazy(() => import("./pages/portfolio/Portfolio"));
const LazyContact = lazy(() => import("./pages/contact/Contact"));
const LazyPage404 = lazy(() => import("./pages/page404/page404"));

const App: INoPropsJSX = () => {
	return (
		<>
			<Suspense fallback={<Preloader />}>
				<LazyThemeSwitcher />
			</Suspense>			
			<Suspense fallback={<Preloader />}>
				<LazyModalSplide />
			</Suspense>
			<Suspense fallback={<Preloader />}>
				<LazySidePanel />
			</Suspense>
			<Routes>
				<Route index element={<Suspense fallback={<Preloader />}><LazyHomepage /></Suspense>} />
				<Route path="/home" element={<Suspense fallback={<Preloader />}><LazyHomepage /></Suspense>} />
				<Route path="/" element={<Suspense fallback={<Preloader />}><LazyHomepage /></Suspense>} />
				<Route path="/index" element={<Suspense fallback={<Preloader />}><LazyHomepage /></Suspense>} />
				<Route path="/about" element={<Suspense fallback={<Preloader />}><LazyAboutpage /></Suspense>} />
				<Route path="/resume" element={<Suspense fallback={<Preloader />}><LazyResume /></Suspense>} />
				<Route path="/portfolio" element={<Suspense fallback={<Preloader />}><LazyPortfolio /></Suspense>} />
				<Route path="/contact" element={<Suspense fallback={<Preloader />}><LazyContact /></Suspense>} />
				<Route path="*" element={<Suspense fallback={<Preloader />}><LazyPage404 /></Suspense>} />
			</Routes>
		</>
	);
};

export default App;