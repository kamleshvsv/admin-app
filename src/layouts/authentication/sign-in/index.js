import { useState } from "react";

// react-router-dom components
import { Link , useNavigate} from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// ZeeWeeReact components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required")
  });

  return (
    <CoverLayout
      title="Welcome ZeeWee"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <Formik 
        validationSchema={schema}
        initialValues={{ email: "admin@zeeweesoft.com", password: "123456" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          if(values.email === "admin@zeeweesoft.com" && values.password === "123456") {
            console.log(values)
            localStorage.setItem('admin', JSON.stringify(values))
            console.log(navigate)
            navigate('/dashboard')
            toast.success('Login Successfull !', {
              position: "top-right",
              autoClose: 5000
              });
          }else{
            toast.error('Incorrect email and password !', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
           <form noValidate onSubmit={handleSubmit}>
            <SoftBox >
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email"  
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email} placeholder="Email" />
                    <small className="error">
                  {errors.email && touched.email && errors.email}
                </small>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password} placeholder="Password" />
                  <small className="error">
                  {errors.password && touched.password && errors.password}
                </small>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
        {/* <button type="submit">Login</button> */}
          <SoftButton type="submit"  variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
      </SoftBox>
      </form>
          </div>
        )}
      </Formik>
      
    </CoverLayout>
  );
}

export default SignIn;
