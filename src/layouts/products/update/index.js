
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
import { Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function urlPatternValidation (URL) {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
    return regex.test(URL);
  };
function UpdateProduct() {
    const [urlError, setUrlError]=useState("")
    const [udpateData, setUpdateData] = useState([])
    useEffect(()=> {
      if(localStorage.getItem('editProductData')){
          var edit = JSON.parse(localStorage.getItem('editProductData'))
            console.log(edit)
          setUpdateData(edit)
      }
    }, [])
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    title: Yup.string()
    .required("Title is a required"),
    description: Yup.string()
    .required("Description is a required"),
    price: Yup.string()
      .required("Email is a required"),
    quantity: Yup.string()
      .required("Quantity is a required"),
    imageArray: Yup.array()
    .of(Yup.object().shape({
        imageUrl: Yup.string().required("Images Url is a required")
    }))
   
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={1}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Update Product {udpateData && udpateData.title ? (<span> ( {udpateData.title} )</span>) : "" }
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
            {udpateData && udpateData.title ? (
        <Formik 
        validationSchema={schema}
        initialValues={
            {title: udpateData && udpateData.title, 
                description:udpateData && udpateData.description, 
                price: udpateData && udpateData.price, 
                quantity: udpateData && udpateData.quantity, 
                imageArray : udpateData && udpateData.imageArray
            }}
        onSubmit={(values) => {
            var validUrl = []
            setUrlError(" ")
            values.imageArray.forEach((el)=> {
                     const isValidUrl = !el.imageUrl || urlPatternValidation(el.imageUrl);
            console.log(isValidUrl)
            if(isValidUrl){
                validUrl.push(el)
                console.log(validUrl)
            }else{
                console.log
                setUrlError("Please Insert Valid URL")
            }
            })
            let finalReq = {
                "id" : udpateData && udpateData.id || "",
                "title" : values.title,
                "description" : values.description,
                "quantity" : values.quantity,
                "price" : values.price,
                "imageArray" : validUrl
            }

            if(localStorage.getItem('products')){
                var storeData = JSON.parse(localStorage.getItem('products'))
                const getIndex = storeData.findIndex(
                    (usr) => usr.id === udpateData.id
                  )
                  if (getIndex !== -1){
                    storeData[getIndex] = finalReq
                    } 
                    console.log(storeData)
                    localStorage.setItem('products', JSON.stringify(storeData))
                    toast.success('Product Updated Successfully !', {
                              position: "top-right",
                              autoClose: 5000
                              });

                    navigate('/products')
                    
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
                      value={values.title} placeholder="Title" />
                        <small className="error">
                            {errors.title && touched.title && errors.title}
                        </small>
                    </SoftBox>
                </div>
                <div className="g-col-6">
                  <SoftBox >
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Description
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput type="text"  
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description} placeholder="Product Description" />
                        <small className="error">
                            {errors.description && touched.description && errors.description}
                        </small>
                    </SoftBox>
                </div>
              </div>
              <div className="g-row">
                <div className="g-col-6">
                    <SoftBox >
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Price
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput type="number"  
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price} placeholder="price" />
                        <small className="error">
                            {errors.price && touched.price && errors.price}
                        </small>
                    </SoftBox>
                </div>
                <div className="g-col-6">
                  <SoftBox >
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Quantity
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput type="number"  
                      name="quantity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.quantity} placeholder="Quantity" />
                        <small className="error">
                            {errors.quantity && touched.quantity && errors.quantity}
                        </small>
                    </SoftBox>
                </div>
              </div>
              <FieldArray
    name="imageArray"
    render={arrayHelpers => (
        <div>
          { values.imageArray && values.imageArray.length > 0 ? (
            <>
            {values.imageArray.map((amenity, index) => (
                <div key={index}>
                      <SoftBox px={2}>
                      <SoftBox  ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Image Url #{index+1}
                        </SoftTypography>
                      </SoftBox>
                     <SoftInput type="text"  
                      name={`imageArray[${index}].imageUrl`}
                      value={values.imageArray[index].imageUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Image Url" />
                        {/* <small className="error">
                            {errors.imageArray[index].image && touched.imageArray[index].image && errors.imageArray[index].image}
                        </small> */}
                       {values.imageArray.length === 1 ? ( ""
                       ): ( 
                        <>
                        <i className="fa fa-trash array-trash" onClick={() => arrayHelpers.remove(index)}></i>
                        </>
                       )}  
                      
                           </SoftBox>
                
                </div>
        ))}
        </>
        ) :""}
        <i className="fa fa-plus add-array-item" onClick={() => arrayHelpers.push({imageUrl: ''})}></i>
       
        </div>
    )}
/>
{urlError === " " ? "" : (
    <span className="error" style={{marginLeft:"20px"}}>{urlError}</span>
)}
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

export default UpdateProduct;
