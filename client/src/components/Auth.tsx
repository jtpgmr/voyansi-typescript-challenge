import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "../styles/global";
// import { signIn, signUp } from "../../actions/auth"
// import Input from "./Input";

export interface IAuth {}

export interface IInitialState {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Auth: React.FC<IAuth> = () => {
  const initialState: IInitialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(true);
  const [formData, setFormData] = useState<IInitialState>(initialState);

  // const dispatch = useDispatch();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if(isSignedUp) {
    //   dispatch(signUp(formData))
    // } else {
    //   dispatch(signIn(formData))
    // }
  };

  const switchAuthScreen = () => {
    setFormData(initialState);
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    setShowPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-4/12 border-solid border-blue-700 border-2 p-4">
      <h3 className="text-center my-1">
        {isSignedUp ? "Register" : "Welcome Back"}
      </h3>
      <div className="p-3">
        <form className="" onSubmit={handleSubmit}>
          <div>
            {isSignedUp && (
              <>
                <input
                  className={`${styles.authInput}`}
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter your full name."
                  type="text"
                  autoComplete="name"
                />
              </>
            )}
            <input
              className={`${styles.authInput}`}
              name="email"
              onChange={handleChange}
              placeholder="Enter an email."
              type="email"
              autoComplete="email"
            />
            <div className="flex justify-between">
              <div>
                <input
                  className={`${styles.authInput}`}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter a password."
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                />
                {isSignedUp && (
                  <input
                    className={`${styles.authInput}`}
                    name="confirmPassword"
                    aria-label="confirmPassword"
                    autoComplete="new-password"
                    onChange={handleChange}
                    placeholder="Confirm your password."
                    type={showPassword ? "text" : "password"}
                  />
                )}
              </div>
              <button onClick={handleShowPassword}>Show</button>
            </div>
          </div>
          <button type="submit" color="primary" className="">
            {isSignedUp ? "Sign Up" : "Sign In"}
          </button>

          <div>
            <div>
              <button onClick={switchAuthScreen}>
                {isSignedUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
