
// ZeeWeeReact examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function ViewProduct() {
    const navigate = useNavigate()

    const [userData ,setUserData ] = useState([])

    useEffect(()=> {
      if(localStorage.getItem('viewProductData')){
        var userData = JSON.parse(localStorage.getItem('viewProductData'))
        console.log(userData)
        setUserData(userData)
      }
    }, [])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Users Details  {userData && userData.title ? (<>({userData.title})</>) : ""}
                
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
                {userData && userData.title ? (
                 <SoftBox py={2} px={5}>
                     <div className="g-row">
                        {userData.imageArray && userData.imageArray.map((img,i) => (
                            <img style={{marginRight:"10px"}} key={i} src={img.imageUrl} alt={userData.title || ""} width={80} />
                        ))}
                    
                </div>
                <br />
                 <div className="g-row">
                   <div className="g-col-4">Title</div>
                   <div className="g-col-8">{userData.title || ""}</div>
                </div>
                <div className="g-row">
                   <div className="g-col-4">Description</div>
                   <div className="g-col-8">{userData.description || ""}</div>
                </div>
                <div className="g-row">
                   <div className="g-col-4">Price</div>
                   <div className="g-col-8">₹ {userData.price || ""}</div>
                </div>
                <div className="g-row">
                   <div className="g-col-4">Quantity</div>
                   <div className="g-col-8">{userData.quantity || ""}</div>
                </div>

                 </SoftBox>
                 ) : ""}
          
              
               
            </SoftBox>
            <SoftBox ml={2} py={2}>
            <SoftButton variant="gradient" color="info" size="small"
                onClick={()=>{
                    localStorage.setItem('editProductData', JSON.stringify(userData))
                  navigate('/products/update')
                }}
              >Edit</SoftButton>
            <SoftButton style={{marginLeft: "20px"}} variant="primary"  color="info" size="small"
                onClick={()=>{
                  navigate('/products')
                }}
              >Back To Product List</SoftButton>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewProduct;
