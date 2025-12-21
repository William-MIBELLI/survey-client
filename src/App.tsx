import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./layouts/auth/AuthLayout";
import HomeLayout from "./layouts/home/HomeLayout";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import AskResetPassword from "./routes/AskResetPassword";
import NewPassword from "./routes/NewPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup/:step?" element={<Signup />} />
          <Route path="resetPassword" element={<AskResetPassword />} />
          <Route path="newPassword/:token" element={<NewPassword/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
