import { Observer } from "mobx-react-lite";
import { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar.component";
import { ContactsPage } from "../pages/contacts/contacts.page";
import { HomePage } from "../pages/home/home.page";

export const MainRoutes = memo(() => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
});
