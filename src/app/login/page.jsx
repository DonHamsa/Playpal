"use server";

import "./page.css";
import Header from "../../../components/Header/Header";
import { login } from "./actions";
import Button from "./submitButton";
import { headers } from "next/headers";

const Form = () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  console.log(pathname);
  return (
    <div className="wrapper">
      <Header />

      <div className="bigBox">
        <form className="formSignIn" action={login}>
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <Button pathname={pathname} />
          <span className="memberLine ">
            Not a member?
            <a className="loginSignUp" href="/signup">
              Sign Up
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default async function logIn() {
  return <Form />;
}
