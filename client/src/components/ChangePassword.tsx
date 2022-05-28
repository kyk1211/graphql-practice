import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CHANGE_PASSWORD, CURRENT_USER } from "../lib/query";

export default function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    email: "",
  });

  const [currentUser, { data, error, loading }] = useLazyQuery(CURRENT_USER);
  const [changePassword, { data: changedData }] = useMutation(CHANGE_PASSWORD);

  useEffect(() => {
    const info = window.localStorage.getItem("user");
    if (info) {
      const authInfo: { email: string; expiry: number } = JSON.parse(info);
      currentUser({ variables: { email: authInfo.email } });
    }
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      setUserInfo({
        ...userInfo,
        name: data?.currentUser?.name,
        email: data?.currentUser?.email,
      });
    }
  }, [data]);

  return (
    <div>
      <form
        id="change"
        onSubmit={(e) => {
          e.preventDefault();
          changePassword({ variables: { input: { ...userInfo }, newPassword: newPass } });
        }}
      >
        <input name={"name"} type={"text"} placeholder="name" defaultValue={userInfo.name} />
        <input name={"email"} type={"email"} placeholder="email" defaultValue={userInfo.email} />
        <input
          name={"password"}
          type={"password"}
          placeholder="current password"
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        <input name={"new"} type={"password"} placeholder="new password" onChange={(e) => setNewPass(e.target.value)} />
      </form>
      <button type="submit" form="change">
        password change
      </button>
      {loading && <span>Loading</span>}
      {error && <span>error</span>}
      {changedData && <span>success</span>}
    </div>
  );
}
