"use client";
import { useFormStatus } from "react-dom";

export default function Button({ pathname }) {
  const { pending } = useFormStatus();
  return (
    <>
      <button type="submit" className="submit" disabled={pending}>
        Sign In
      </button>
      {(pathname && !pending) && <p className="errorMessage">Error logging in </p>}
    </>
  );
}
