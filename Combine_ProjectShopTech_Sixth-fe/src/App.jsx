import "./App.css";
import AppRouter from "./router/AppRouter";
import { Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div>
      <UserProvider>
        <Provider store={store}>
          <AppRouter />
          <ChatBox />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Provider>
      </UserProvider>
    </div>
  );
}

export default App;

