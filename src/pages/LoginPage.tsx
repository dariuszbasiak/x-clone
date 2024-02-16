import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { Loader } from "../componets/Loader";
import { User } from "../models/user.interface";
import { useFormik } from "formik";
import * as yup from "yup";

const formScheme = yup.object().shape({
  email: yup
    .string()
    .email("This not look like email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be between 8-256 chars")
    .max(256, "Password must be between 8-256 chars")
    .required(),
});

export function LoginPage() {
  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    handleBlur,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formScheme,
    onSubmit: (values): any => {
      return handleSubmit1(values);
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [isLoading, setLoading] = useState(false);
  let [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit1 = async (values: { email: string; password: string }) => {
    setLoginFailed(false);
    setLoading(true);
    let userData: User;
    let authData;
    try {
      authData = await getLogin(values);
      userData = await authData.json();
    } catch (e) {
      setLoginFailed(true);
      setLoading(false);
    }

    if (authData?.ok && authData?.status === 200) {
      setLoading(false);
      dispatch(authActions.login(userData!));
      return navigate("/");
    } else {
      setLoginFailed(true);
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <div className="shadow-xl rounded-lg px-4 py-4 bg-white w-[450px]">
          <h1 className="text-[26px] pb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="pb-6">
              <FormControl
                variant="outlined"
                className="w-max"
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <OutlinedInput
                  value={values.email}
                  name="email"
                  id="id-email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.email && touched.email}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-900">{errors.email}</p>
                )}
              </FormControl>
            </div>

            <div className="pb-6">
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel htmlFor="id-password">Password</InputLabel>
                <OutlinedInput
                  value={values.password}
                  name="password"
                  type="password"
                  id="id-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.password && touched.password}
                />
                {touched.password && errors.password && (
                  <p className="text-sm text-red-900">{errors.password}</p>
                )}
              </FormControl>
            </div>

            {loginFailed && (
              <p className="text-sm text-red-900">
                Something went wrong, please try again!
              </p>
            )}

            <div className="py-2">
              <Button variant="contained" disabled={!isValid} type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
        <p className="py-4">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:underline text-sky-700">
            Sign up!
          </Link>
        </p>
      </div>
    </>
  );
}

export async function getLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return fetch("http://localhost:3001/auth", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
