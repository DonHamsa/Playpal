"use client";

import { signup } from "./actions";
import "./page.css";
import SignIn from "./SignIn";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../../../components/Header/Header";
import { Suspense } from "react";

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("message");

  const [wantsSigningUp, setWantsSigningUp] = useState(false);

  useEffect(() => {
    if (search) {
      router.replace("./login");
    }
  }, [wantsSigningUp]);

 console.log(VERCEL_URL)

  return (
    <>
      <Header />
      {!wantsSigningUp && (
        <SignIn setWantsSigningUp={setWantsSigningUp} errorMessage={search} />
      )}

      {wantsSigningUp && (
        <div className="bigBox">
          <div className="login">
            <div className="hader">
              <span>Join us today!</span>
              <p>Sing up now to become a member.</p>
            </div>
            <form action="#" className="form">
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Choose A Password"
                required
              />
              {search && <p className="errorMessage">{search}</p>}
              <button
                type="submit"
                formAction={signup}
                defaultValue="Signup"
                className="button"
              >
                Sign Up
              </button>
              <span className="memberLine">
                Already a member?
                <p
                  className="loginSignUp"
                  onClick={() => setWantsSigningUp(false)}
                >
                  Log in
                </p>
              </span>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default function logIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form />
    </Suspense>
  );
}

// export default Form;
