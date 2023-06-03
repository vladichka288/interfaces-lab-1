import { Observer } from "mobx-react-lite";
import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ioc from "../../ioc";
import Logo from "./../../assets/logo192.png";
import "../../styles/navbar.css";
import { NavbarBLoC } from "./navbar.bloc";
export const Navbar = memo((props: any) => {
  const bloc = ioc.useBLoC2(NavbarBLoC, {});
  return (
    <Observer>
      {() => (
        <>
          <div className="navbar-wrapper">
            <div className="first-part">
              <img src={Logo} className="logo-image nav-link"></img>
              {bloc.links.map((link) => (
                <div
                  onClick={() => bloc.linkClicked(link.navigateTo)}
                  className={`nav-link ${
                    (bloc.navigationLink ? bloc.navigationLink : bloc.url) ==
                    link.navigateTo
                      ? "selected-link"
                      : ""
                  }`}
                >
                  {link.label}
                </div>
              ))}
            </div>
            <div className="second-part">
              <div onClick={bloc.onSignOutClicked} className="nav-link">
                Sign Out
              </div>
            </div>
            {bloc.navigationLink && <Navigate to={bloc.navigationLink} />}
          </div>
          <Outlet />
        </>
      )}
    </Observer>
  );
});

export type LinkProps = {
  label: string;
  navigateTo: string;
  selected: boolean;
};

export const Link = (props: LinkProps) => {};
