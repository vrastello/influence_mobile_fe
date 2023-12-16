import { useState } from "react";

export default function UseToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    console.log(`get userToken: ${userToken?.token}`);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    console.log(`save userToken: ${userToken?.token}`);
    sessionStorage.setItem("token", JSON.stringify(userToken));
    console.log(`after save userToken: ${userToken?.token}`);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
