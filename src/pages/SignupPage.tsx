import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { signup } from "../shared/signup";
import { Link } from "react-router-dom";

const formScheme = yup.object().shape({
  email: yup
    .string()
    .email("Check if email value is correct")
    .required("Email is required"),
  name: yup
    .string()
    .min(1, "Name must be between 1-256 chars")
    .max(512, "Name must be between 1-512 chars")
    .required("Name is required"),
  password: yup
    .string()
    .min(8, "Password should be between 8 and 256 chars")
    .max(256, "Password should be between 8 and 256 chars")
    .required("Password is required"),
  confirm: yup
    .string()
    // @ts-ignore
    .oneOf([yup.ref("password"), null], "Password must match"),
});

export function SignupPage() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirm: "",
    },
    validationSchema: formScheme,
    onSubmit: async (value) => {
      setError(false);
      const response = await signup(value.email, value.name);

      if (response.status === 201) {
        resetForm();
        setSuccessScreen(true);
      } else {
        setError(true);
      }
    },
  });

  const [hasError, setError] = useState(false);
  const [isSuccessScreen, setSuccessScreen] = useState(false);

  return (
    <div>
      {isSuccessScreen && (
        <div>
          <h3 className="text-4xl py-3">Registration completed!</h3>
          <p className="text-l py-5">
            Please{" "}
            <Link to="/login" className="hover:underline text-sky-700">
              {" "}
              login{" "}
            </Link>
          </p>
        </div>
      )}
      {!isSuccessScreen && (
        <div className=" shadow-xl rounded-lg px-4 py-4 bg-white w-[450px]">
          <h1 className="text-[26px] pb-4">Sign Up!</h1>
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
              <FormControl
                variant="outlined"
                className="w-max"
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput
                  value={values.name}
                  name="name"
                  id="id-email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.name && touched.name}
                />
                {touched.name && errors.name && (
                  <p className="text-sm text-red-900">{errors.name}</p>
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

            <div className="pb-6">
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel htmlFor="id-confirm">Confirm password</InputLabel>
                <OutlinedInput
                  value={values.confirm}
                  name="confirm"
                  type="password"
                  id="id-confirm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!errors.confirm && touched.confirm}
                />
                {touched.confirm && errors.confirm && (
                  <p className="text-sm text-red-900">{errors.confirm}</p>
                )}
              </FormControl>
            </div>

            <div className="py-3 flex">
              <Button variant="contained" type="submit" disabled={!isValid}>
                Sign up!
              </Button>
            </div>
          </form>
          {hasError && (
            <p className="text-sm text-red-900">
              Something went wrong, please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
