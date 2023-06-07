import { checkCookie } from "../utils/Cookie";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { getStorage } from "../utils/LocalStorage";

const GuestLayout: Component<{ children: any[], onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();

  createEffect(async () => {
    const user = getStorage("user");
    const isUserLoggedIn = checkCookie("auth_jwt_secret");

    if (isUserLoggedIn || user) {
      navigate("/");
      return;
    } else {
      await props.onFinish()
    }
  });

  return (
    <>
      {props.children}
    </>
  )
}

export default GuestLayout;