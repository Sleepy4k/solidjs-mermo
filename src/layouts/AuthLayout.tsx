import { checkCookie } from "../utils/Cookie";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { getStorage } from "../utils/LocalStorage";

const AuthLayout: Component<{ children: any[] }> = (props: any) => {
  const navigate = useNavigate();

  createEffect(() => {
    const user = getStorage("user");
    const isUserLoggedIn = checkCookie("auth_jwt_secret");

    if (!isUserLoggedIn || !user) {
      navigate("/login");
      return;
    }
  });

  return (
    <>
      {props.children}
    </>
  )
}

export default AuthLayout;