
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
import { useEffect, useState } from "react";

function CreateSubCategory() {
const [categoryList, setcategoryList ] = useState([])
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    title: Yup.string()
    .required("Title is a required"),
    category: Yup.string()
    .required("Category is a required"),
    status: Yup.string()
    .required("Status is a required")
  });

 

  useEffect(()=> {
    if(localStorage.getItem('categories')){
      var data = JSON.parse(localStorage.getItem('categories'))
      setcategoryList(data)
    }
  }, [])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={1}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Create Sub-Category
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
        initialValues={{title:"",category: "", status:""}}
        onSubmit={(values) => {

          if(localStorage.getItem('subcategory')){
            let subcategory = {
                id : uuid(),
                title : values.title,
                status : values.status
              }
            let finalReq = {
                id : uuid(),
                title : values.title,
                category : "",
                category_id : values.category,
                status : values.status
              } 
            const getIndex = categoryList.findIndex(
                (category) => category.id === values.category
              )
              console.log("getIndex",getIndex)
              if (getIndex !== -1){
                let arr = []
                arr.push(subcategory)
                categoryList[getIndex].subcategory = arr;
                localStorage.setItem('categories', JSON.stringify(categoryList))
                finalReq.category = categoryList[getIndex].title
                } 

                console.log(finalReq)

               

            var storeData = JSON.parse(localStorage.getItem('subcategory'))
            storeData.push(finalReq) 
            localStorage.setItem('subcategory', JSON.stringify(storeData))
            toast.success('Sub-Category Created Successfully !', {
              position: "top-right",
              autoClose: 5000
              });
              navigate('/sub-category')
          

          }else{
            let subcategory = {
                id : uuid(),
                title : values.title,
                status : values.status,
                
              }
            let finalReq = {
                id : uuid(),
                title : values.title,
                category : "",
                category_id : values.category,
                status : values.status
              } 
            const getIndex2 = categoryList.findIndex(
                (category) => category.id === values.category
              )
              if (getIndex2 !== -1){
                let arr = []
                arr.push(subcategory)
                categoryList[getIndex2].subcategory = arr;
                localStorage.setItem('categories', JSON.stringify(categoryList))
                finalReq.category = categoryList[getIndex2].title
                } 

            
            var usersArr = [];
            usersArr.push(finalReq)
            console.log(usersArr)
        
              
            localStorage.setItem('subcategory', JSON.stringify(usersArr))
            toast.success('Sub-Category Created Successfully !', {
              position: "top-right",
              autoClose: 5000
              });
              navigate('/sub-category')
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
                          Category
                        </SoftTypography>
                      </SoftBox>
                      {categoryList && categoryList.length > 0 ? (
                      <select name="category" onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category} >
                          <option defaultValue=""  hidden >Select Category</option>
                          
                        
                        {categoryList.map((cat, index) => (
                            <option key={index} value={cat.id}>{cat.title}</option>
                        ))}
                      </select>
                      ) : " "}
                        <small className="error">
                            {errors.category && touched.category && errors.category}
                        </small>
                    </SoftBox>
                </div>
                {categoryList && categoryList.length > 0 ? (
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
                ) : ""}
               
               
              </div>
              {categoryList && categoryList.length > 0 ? (
              <div className="g-row">
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
                          <option defaultValue=""  hidden >Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                        <small className="error">
                            {errors.status && touched.status && errors.status}
                        </small>
                    </SoftBox>
                </div>
              </div>
               ) : ""}
             
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

export default CreateSubCategory;
