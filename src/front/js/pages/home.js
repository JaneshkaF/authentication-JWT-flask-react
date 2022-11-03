import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    actions.getVerified();
  }, [store.token]);

  useEffect(() => {
    if (store.verifiedUser) {
      navigate("/single");
    }
  }, [store.verifiedUser]);

  return (
    <div className="d-flex" style={{ height: "80vh" }}>
      <div className="mx-auto mt-5">
        <h1>Authentication</h1>
      </div>
      <div className="container w-25 mt-5">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              actions.getToken(userEmail, userPassword);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
