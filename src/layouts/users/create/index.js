
// ZeeWeeReact examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';



function CreateUser() {
  // const unique_id = uuid();
  // const small_id = unique_id.slice(0,8)
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    firstName: Yup.string()
    .required("First name is a required"),
    lastName: Yup.string()
    .required("Last name is a required"),
    email: Yup.string()
      .required("Email is a required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required"),
    gender: Yup.string()
    .required("Gender is a required")
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={1}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Create New User
              </SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
            </SoftBox>
          </Card>
        </SoftBox>
        <SoftBox >
        <Card >
        <Formik 
        validationSchema={schema}
        initialValues={{firstName:"", lastName:"", email: "", password: "", gender : "" }}
        onSubmit={(values) => {

          if(localStorage.getItem('users')){
            let req = {
              id : uuid(),
              firstName : values.firstName,
              lastName: values.lastName,
              email : values.email,
              password : values.password,
              gender : values.gender
            }
            const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

            console.log(req)
            var storeData = JSON.parse(localStorage.getItem('users'))
            storeData.push(req) 
            localStorage.setItem('users', JSON.stringify(storeData))
            toast.success('User Created Successfully !', {
              position: "top-right",
              autoClose: 5000
              });
              navigate('/users')
            // for (var i = 0; i < storeData.length; i++) {
            //   var isEmail = storeData[i].email;
            //   if (isEmail == values.email) {
            //       console.log("exist")
            //       break;
            //   }else{
            //     var usersArr = [];
            //     usersArr.push(values)
            //     console.log(values)
            //   }
            // }
          

          }else{
            let req = {
              id : uuid(),
              firstName : values.firstName,
              lastName: values.lastName,
              email : values.email,
              password : values.password,
              gender : values.gender
            }
            console.log(req)
            var usersArr = [];
            usersArr.push(req)
            console.log(usersArr)
            localStorage.setItem('users', JSON.stringify(usersArr))
            toast.success('User Created Successfully !', {
              position: "top-right",
              autoClose: 5000
              });
              navigate('/users')
          }


          // if(values.email === "admin@zeeweesoft.com" && values.password === "123456") {
          //   console.log(values)
          //   localStorage.setItem('', JSON.stringify(values))
          //   console.log(navigate)
          //   toast.success('Login Successfull !', {
          //     position: "top-right",
          //     autoClose: 5000
          //     });
          // }else{
          //   toast.error('User Already Exist !', {
          //     position: "top-right",
          //     autoClose: 5000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     });
          // }
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
              <div className="g-row">
                <div className="g-col-6">
                    <SoftBox >
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Fist Name
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput type="text"  
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName} placeholder="Fist Name" />
                        <small className="error">
                            {errors.firstName && touched.firstName && errors.firstName}
                        </small>
                    </SoftBox>
                </div>
                <div className="g-col-6">
                  <SoftBox >
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Last Name
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput type="text"  
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName} placeholder="Last Name" />
                        <small className="error">
                            {errors.lastName && touched.lastName && errors.lastName}
                        </small>
                    </SoftBox>
                </div>
              </div>
              <div className="g-row">
                <div className="g-col-6">
                    <SoftBox >
                      <SoftBox  ml={0.5}>
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
                </div>
                <div className="g-col-6">
                  <SoftBox >
                      <SoftBox  ml={0.5}>
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
                </div>
              </div>
              <div className="g-row">
                <div className="g-col-6">
                    <SoftBox >
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Gender
                        </SoftTypography>
                      </SoftBox>
                      <select name="gender" onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender} placeholder="Gender">
                          <option defaultValue=""  hidden >Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {/* <SoftInput type="text"  
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender} placeholder="Gender" /> */}
                        <small className="error">
                            {errors.gender && touched.gender && errors.gender}
                        </small>
                    </SoftBox>
                </div>
               
              </div>
             
              <SoftBox mt={4} mb={1} ml={2}>
              {/* <button type="submit">Login</button> */}
                <SoftButton type="submit"  variant="gradient" color="info">
                  Create
                </SoftButton>
              </SoftBox>
              </SoftBox>
            </form>
          </div>
        )}
      </Formik>
      </Card>
      </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateUser;
