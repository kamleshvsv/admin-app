
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

function CreateCategory() {
  const navigate = useNavigate();
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
              <SoftTypography variant="h6">Create Category
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
        initialValues={{title:"", status:""}}
        onSubmit={(values) => {

          if(localStorage.getItem('categories')){
            let req = {
              id : uuid(),
              title : values.title,
              status : values.status
            }
            console.log(req)
            var storeData = JSON.parse(localStorage.getItem('categories'))
            storeData.push(req) 
            localStorage.setItem('categories', JSON.stringify(storeData))
            toast.success('Category Created Successfully !', {
              position: "top-right",
              autoClose: 5000
              });
              navigate('/categories')
          

          }else{
            let req = {
              id : uuid(),
              title : values.title,
              status: values.status
            }
            var usersArr = [];
            usersArr.push(req)
            console.log(usersArr)
            localStorage.setItem('categories', JSON.stringify(usersArr))
            toast.success('Category Created Successfully !', {
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
                      value={values.title} placeholder="Enter title (Category Name)" />
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
                      value={values.status} >
                          <option defaultValue=""  hidden >Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                        <small className="error">
                            {errors.status && touched.status && errors.status}
                        </small>
                    </SoftBox>
                </div>
               
              </div>
             
              <SoftBox mt={4} mb={1} ml={2}>
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

export default CreateCategory;
