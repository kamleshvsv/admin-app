
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
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';


function UpdateUser() {

  const navigate = useNavigate();
  const [updateUser, setUserList] = useState([])

  useEffect(()=> {
    if(localStorage.getItem('editData')){
        var edit = JSON.parse(localStorage.getItem('editData'))
       
        setUserList(edit)
        console.log(updateUser, "value")
    }
  }, [])
  const schema = Yup.object().shape({
    firstName: Yup.string()
    .required("First name is a required"),
    lastName: Yup.string()
    .required("Last name is a required"),
    email: Yup.string()
      .required("Email is a required")
      .email("Invalid email format"),
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
              <SoftTypography variant="h6">Update User {updateUser  && updateUser.email ? (<span>({updateUser.email}) </span> ) : ""}
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
            {updateUser  && updateUser.email && updateUser.password ? (

         
        <Formik 
        validationSchema={schema}
        initialValues={
            {firstName: updateUser && updateUser.firstName || "", 
            lastName:updateUser && updateUser.lastName || "", 
            email: updateUser && updateUser.email || "",
            gender : updateUser && updateUser.gender || "" }}
        onSubmit={(values) => {
            let finalReq = {
                "id" : updateUser && updateUser.id || "",
                "firstName" : values.firstName,
                "lastName" : values.lastName,
                "email" : values.email,
                "password" : updateUser && updateUser.password || ""  ,
                "gender" : values.gender
            }

            if(localStorage.getItem('users')){
                var storeData = JSON.parse(localStorage.getItem('users'))
                const getIndex = storeData.findIndex(
                    (usr) => usr.email === values.email
                  )
                  if (getIndex !== -1){
                    storeData[getIndex] = finalReq
                    } 
                    console.log(storeData)
                    localStorage.setItem('users', JSON.stringify(storeData))
                    toast.success('User Updated Successfully !', {
                              position: "top-right",
                              autoClose: 5000
                              });

                    navigate('/users')
                    
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
                      readOnly 
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
                          Gender
                        </SoftTypography>
                      </SoftBox>
                      <select name="gender" onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender} placeholder="Gender">
                        <option defaultValue="" hidden >Select Gender</option>
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
                  Update
                </SoftButton>
              </SoftBox>
              </SoftBox>
            </form>
          </div>
        )}
      </Formik>
         ) : ""}
      </Card>
      </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UpdateUser;
