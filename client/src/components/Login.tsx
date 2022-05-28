import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "..";
import { CURRENT_USER, LOGIN, LOGOUT } from "../lib/query";
import "./Login.css";

export default function Login() {
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [currentUser, { data: userData }] = useLazyQuery(CURRENT_USER);

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: () => {
      const info = {
        email: input.email,
        expiry: new Date().getTime() + 600000,
      };
      window.localStorage.setItem("user", JSON.stringify(info));
      currentUser({ variables: { email: input.email } });
    },
  });

  const [logout, { loading: logoutLoading, error: logoutError }] = useMutation(LOGOUT, {
    onCompleted: () => {
      window.localStorage.removeItem("user");
      client.resetStore();
    },
  });

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    const info = window.localStorage.getItem("user");
    if (info) {
      const authInfo: { email: string; expiry: number } = JSON.parse(info);
      const now = new Date().getTime();
      if (authInfo.expiry < now) {
        logout({
          variables: {
            email: authInfo.email,
          },
        });
      } else {
        setCurrentUserEmail(authInfo.email);
        currentUser({ variables: { email: authInfo.email } });
      }
    }
  }, [currentUser, logout]);

  return (
    <div className="container">
      {userData?.currentUser ? (
        ""
      ) : (
        <div className="form-wrapper">
          <form
            id="login"
            onSubmit={(e) => {
              e.preventDefault();
              login({ variables: { ...input } });
            }}
          >
            <input name={"email"} type={"email"} placeholder="email" onChange={onChangeInput} />
            <input name={"password"} type={"password"} placeholder="password" onChange={onChangeInput} />
          </form>
          <div>
            <Link to="/signup">Sign up</Link>
            <button type="submit" form="login" className="login-btn">
              Login
            </button>
          </div>
        </div>
      )}
      {loading && <p>{`Login...`}</p>}
      {error && <p>{`Login error! ${error.message}`}</p>}
      {!!userData?.currentUser && (
        <button
          onClick={() =>
            logout({
              variables: {
                email: currentUserEmail || userData.currentUser.email,
              },
            })
          }
        >
          Logout
        </button>
      )}
      {logoutLoading && <p>{`Logout...`}</p>}
      {logoutError && <p>{`Logout error! ${logoutError.message}`}</p>}
      <div>
        <p>{userData?.currentUser?.name}</p>
        <p>{userData?.currentUser?.email}</p>
        <p>{userData?.currentUser?.password}</p>
      </div>
    </div>
  );
}
