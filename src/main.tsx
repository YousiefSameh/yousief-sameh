import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { Provider } from "react-redux";
import AppRouter from "./routes/app.routes.tsx";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</StrictMode>
);
