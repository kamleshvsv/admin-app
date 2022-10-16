
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

function UpdateCategory() {

  const navigate = useNavigate();
  const [udpateData, setUpdateData] = useState([])

  useEffect(()=> {
    if(localStorage.getItem('editCategory')){
        var edit = JSON.parse(localStorage.getItem('editCategory'))
       
        setUpdateData(edit)
        console.log(udpateData, "value")
    }
  }, [])
  const schema = Yup.object().shape({
    title: Yup.string()
    .required("Title is a required"),
    status: Yup.string()
    .required("Status is a required")
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={1}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Update Category {udpateData  && udpateData.title ? (<span>({udpateData.title}) </span> ) : ""}
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
            {udpateData  && udpateData.title && udpateData.status ? (

         
        <Formik 
        validationSchema={schema}
        initialValues={
            {title: udpateData && udpateData.title || "", 
            status:udpateData && udpateData.status || ""
        }}
        onSubmit={(values) => {
            let finalReq = {
                "id" : udpateData && udpateData.id || "",
                "title" : values.title,
                "status" : values.status
            }

            if(localStorage.getItem('categories')){
                var storeData = JSON.parse(localStorage.getItem('categories'))

               
                const getIndex = storeData.findIndex(
                    (usr) => usr.id === udpateData.id
                  )
                  if (getIndex == -1){
                    storeData[getIndex] = finalReq
                    } 
                    console.log(storeData)
                    localStorage.setItem('categories', JSON.stringify(storeData))
                    toast.success('Category Updated Successfully !', {
                              position: "top-right",
                              autoClose: 5000
                              });

                    navigate('/categories')
                    
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
                          Title    
                                              </SoftTypography>
                      </SoftBox>
                      <SoftInput type="text"  
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title} placeholder="Last Name" />
                        <small className="error">
                            {errors.title && touched.title && errors.title}
                        </small>
                    </SoftBox>
                </div>
              
                <div className="g-col-6">
                    <SoftBox >
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Status
                        </SoftTypography>
                      </SoftBox>
                      <select name="status" onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.status}>
                        <option defaultValue="" hidden >Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select><small className="error">
                            {errors.status && touched.status && errors.status}
                        </small>
                    </SoftBox>
                </div>
              </div>
             
              <SoftBox mt={4} mb={1} ml={2}>
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

export default UpdateCategory;
