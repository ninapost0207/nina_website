import { Suspense, lazy, StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import store from "./assets/redux/store";
import { Provider } from "react-redux";
import Preloader from "./components/preloader/Preloader";
import * as sw from './serviceWorkerRegistration';

const LazyApp = lazy(() => import("./app"));

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<StrictMode>
		<HashRouter>
			<Provider store={store}>
				<Suspense fallback={<Preloader />}>
					<LazyApp />
				</Suspense>
			</Provider>
		</HashRouter>
	</StrictMode>
);


sw.register({scope: '/'}) //registring sw, change scope if url changed
