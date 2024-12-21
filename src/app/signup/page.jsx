import { signup } from "../login/actions";
import Header from "../../../components/Header/Header";
import '../login/page.css'
import Button from "./submitButton";
import { headers } from "next/headers";



export default function SignUp({}) {
   const headerList = headers();
    const pathname = headerList.get("x-current-path");
    console.log(pathname);
  return (
    <div className='page'>
      <Header />

      <div className="bigBox">
        <div className="login">
          <div className="hader">
            <span>Join us today!</span>
            <p>Sing up now to become a member.</p>
          </div>
          <form action={signup} className="form">
            <input type="text" placeholder="Enter Name" name="name" required />
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
            <Button pathname={pathname}/>
            <span className="memberLine signupMemberLine">
                Already a member?
                <a
                  className="loginSignUp"
                  href="/login"
                >
                  Log in
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

