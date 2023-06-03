import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar.component";
import { SigninPage } from "../pages/auth/signin/sign-in.page";
import { SignupPage } from "../pages/auth/signup/sign-up.page";

export const AuthRoutes = memo(() => {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
});
