import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./layouts/auth/AuthLayout";
import HomeLayout from "./layouts/home/HomeLayout";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import AskResetPassword from "./routes/AskResetPassword";
import NewPassword from "./routes/NewPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./routes/Dashboard";
import DashboardLayout from "./layouts/dashboard/Dashboard.layout";
import CreateSurvey from "./routes/CreateSurvey";
import Survey from "./routes/Survey";
import MySurveys from "./routes/MySurveys";

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
          <Route path="newPassword/:token" element={<NewPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="createSurvey" element={<CreateSurvey />} />
            <Route path="survey/:surveyId" element={<Survey />} />
            <Route path="mysurveys" element={<MySurveys/>} />
          </Route>
          {/* <Route element={<HomeLayout />}>
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
