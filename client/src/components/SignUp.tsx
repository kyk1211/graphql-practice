import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNUP } from "../lib/query";
import "./SignUp.css";

export default function SignUp() {
  const [input, setInput] = useState({ name: "", password: "", email: "" });
  const [addUser, { data, error }] = useMutation(SIGNUP);

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <form
          id="signup"
          onSubmit={(e) => {
            e.preventDefault();
            addUser({ variables: { input: input } });
          }}
        >
          <input name={"name"} type={"text"} placeholder="name" onChange={onChangeInput} />
          <input name={"email"} type={"email"} placeholder="email" onChange={onChangeInput} />
          <input name={"password"} type={"password"} placeholder="password" onChange={onChangeInput} />
        </form>
        <button form="signup" type="submit" className="signup-btn">
          Sign Up
        </button>
      </div>
      {error && <p>{`sign up error! ${error.message}`}</p>}
      <div>
        <p>{data?.addUser.name}</p>
        <p>{data?.addUser.password}</p>
        <p>{data?.addUser.email}</p>
      </div>
    </div>
  );
}
