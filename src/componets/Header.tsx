import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../models/app-state.interface";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { authActions } from "../store/auth";
import { AvatarIcon } from "./AvatarIcon";

export function Header() {
  const authState = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav
      className="size-full inline-flex justify-between px-2 py-2 shadow-md bg-gray-50 sticky top-0 h-14"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="main-nav-right flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-sky-700" : ""} pl-1 hover:text-sky-700`
          }
        >
          Home
        </NavLink>
      </div>

      <div className="main-nav-left inline-flex justify-end flex-wrap items-center">
        {!authState.isAuth && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${isActive ? "text-sky-700" : ""} pl-1 hover:text-sky-700`
            }
          >
            Login
          </NavLink>
        )}
        {authState.isAuth && (
          <div className="flex flex-nowrap items-center gap-4">
            <div>{authState.user?.name}</div>
            <AvatarIcon username={authState.user?.id} />
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(authActions.logout());
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
