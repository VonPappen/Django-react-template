import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// context
import { Provider } from "react-redux";
import store from "./store/index";

// components
import MainHeader from "./components/layout/MainHeader";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RegistrationSuccess from "./components/auth/RegistrationSuccess";
import ActivateAccount from "./components/auth/ActivateAccount";
import UserProfile from "./components/auth/UserProfile";
import PasswordReset from "./components/auth/SetPassword";
import ActivateAccountResend from "./components/auth/ActivateAccountResend";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainHeader></MainHeader>
                <section className="flex justify-center items-center h-full bg-slate-100">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/auth/*">
                            <Route path="sign-in/" element={<SignIn />}></Route>
                            <Route path="registration/*">
                                <Route
                                    path="sign-up/"
                                    element={<SignUp />}
                                ></Route>
                                <Route
                                    path="sign-up/"
                                    element={<SignUp />}
                                ></Route>
                                <Route
                                    path="success/"
                                    element={<RegistrationSuccess />}
                                ></Route>
                                <Route
                                    path="activate/:uid/:token/"
                                    element={<ActivateAccount />}
                                ></Route>
                                <Route
                                    path="activate/resend"
                                    element={<ActivateAccountResend />}
                                ></Route>
                            </Route>
                            <Route path="user/*">
                                <Route
                                    path="profile/"
                                    element={<UserProfile />}
                                ></Route>
                                <Route
                                    path="set-password/"
                                    element={<PasswordReset />}
                                ></Route>
                            </Route>
                        </Route>
                    </Routes>
                </section>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
