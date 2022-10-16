
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

function UpdateSubCategory() {

  const navigate = useNavigate();
  const [udpateData, setUpdateData] = useState([])
  const [categoryList, setcategoryList ] = useState([])
  useEffect(()=> {
    if(localStorage.getItem('editSubCategory')){
        var edit = JSON.parse(localStorage.getItem('editSubCategory'))
       
        setUpdateData(edit)
    }
  }, [])

  useEffect(()=> {
    if(localStorage.getItem('categories')){
      var data = JSON.parse(localStorage.getItem('categories'))
      setcategoryList(data)
    }
  }, [])


  const schema = Yup.object().shape({
    category: Yup.string()
    .required("Category is a required"),
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
            {udpateData  && udpateData.category && udpateData.title ? (

         
        <Formik 
        validationSchema={schema}
        initialValues={
            {category: udpateData && udpateData.category_id || "", 
            title: udpateData && udpateData.title || "", 
            status:udpateData && udpateData.status || ""
        }}
        onSubmit={(values) => {

          if(localStorage.getItem('subcategory')){
            let subcategory = {
                id : udpateData.id,
                title : values.title,
                status : values.status
              }
            let finalReq = {
                id : udpateData.id,
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

                var storeData = JSON.parse(localStorage.getItem('subcategory'))
                const subIdx = storeData.findIndex(
                    (usr) => usr.id === udpateData.id
                  )
                  if (subIdx !== -1){
                    storeData[subIdx] = finalReq
                    } 
                    console.log(storeData)
                    localStorage.setItem('subcategory', JSON.stringify(storeData))
                    toast.success('Sub-Category Updated Successfully !', {
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

export default UpdateSubCategory;
