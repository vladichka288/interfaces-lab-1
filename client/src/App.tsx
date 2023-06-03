import React, { memo } from "react";

import { History } from "history";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SigninPage } from "./pages/auth/signin/sign-in.page";

import { AppBLoC } from "./App.bloc";
import ioc from "./ioc";
import { Observer } from "mobx-react-lite";
import { MainRoutes } from "./routes/main";
import { AuthRoutes } from "./routes/auth";
import { Navbar } from "./components/navbar/navbar.component";
import { HomePage } from "./pages/home/home.page";
import { ContactsPage } from "./pages/contacts/contacts.page";
import { SignupPage } from "./pages/auth/signup/sign-up.page";

export type AppProps = {
  history: History;
};

export const App = memo(() => {
  const bloc = ioc.useBLoC2(AppBLoC, {});

  return (
    <Observer>
      {() =>
        bloc.isInitalized ? (
          <BrowserRouter>
            <Routes>
              {bloc.isSignedIn && (
                <Route element={<Navbar />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                </Route>
              )}

              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="*"
                element={
                  <Navigate
                    to={bloc.isSignedIn ? "/home" : "/signin"}
                    replace
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <>loading...</>
        )
      }
    </Observer>
  );
});
