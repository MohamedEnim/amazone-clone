import "./Login.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useHistory } from "react-router";

function Login() {
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (formData) => {
    try {
      await auth.signInWithEmailAndPassword(formData.email, formData.password);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const registerUser = async () => {
    try {
      await auth.createUserWithEmailAndPassword(emailUser, passwordUser);

      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="login">
      <Link to="/">
        <div className="login__logo">
          <img
            src="https://logos-marques.com/wp-content/uploads/2021/03/Amazon-logo.png"
            alt=""
          />
        </div>
      </Link>

      <div className="login___container">
        <h2>Sign-in</h2>
        <form onSubmit={handleSubmit(login)}>
          <div className="login__groupItem">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              className="login__item"
              {...register("email", { required: true })}
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
            />
            {errors.email && <p className="login__error">Email is required</p>}
          </div>
          <div className="login__groupItem">
            <span>Password</span>
            <input
              type="password"
              name="password"
              className="login__item"
              {...register("password", { required: true })}
              value={passwordUser}
              onChange={(e) => setPasswordUser(e.target.value)}
            />
            {errors.password && (
              <p className="login__error">Password is required</p>
            )}
          </div>
          <button className="login__formButton" type="submit">
            Sign In
          </button>
          <p>
            By signing-in you agree to AMAZONE FAKE clone conditions of the USE
            & SALE. Please see our privacy Notice, our Cookies notice and our
            interest-Based Ads Notice{" "}
          </p>
        </form>
        <button
          className="login__register"
          type="button"
          onClick={registerUser}
        >
          Create your Amazone Account
        </button>
      </div>
    </div>
  );
}

export default Login;
