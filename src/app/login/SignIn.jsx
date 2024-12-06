import "./SignIn.css";
import Link from "next/link";
import { login } from "./actions";

export default function SignIn({ setWantsSigningUp, errorMessage }) {
  return (
    <div className="bigBox">
      <form className="formSignIn">
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
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <button type="submit" formAction={login} className="submit" >
          Sign in
        </button>
        <p className="signup-link">
          No account?
          <span
            className="loginSignUp"
            onClick={() => {
              setWantsSigningUp(true);
            }}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
