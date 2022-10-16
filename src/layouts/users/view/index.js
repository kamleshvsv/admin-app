
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


function UserDetails() {
    const navigate = useNavigate()

    const [userData ,setUserData ] = useState([])

    useEffect(()=> {
      if(localStorage.getItem('viewData')){
        var userData = JSON.parse(localStorage.getItem('viewData'))
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
              <SoftTypography variant="h6">Users Details  {userData && userData.email ? (<>({userData.email})</>) : ""}
                
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
                {userData && userData.email ? (
                 <SoftBox py={2} px={5}>
                 <div className="g-row">
                   <div className="g-col-4">First Name</div>
                   <div className="g-col-8">{userData.firstName || ""}</div>
                </div>
                <div className="g-row">
                   <div className="g-col-4">Last Name</div>
                   <div className="g-col-8">{userData.lastName || ""}</div>
                </div>
                <div className="g-row">
                   <div className="g-col-4">Email</div>
                   <div className="g-col-8">{userData.email || ""}</div>
                </div>
                <div className="g-row">
                   <div className="g-col-4">Gender</div>
                   <div className="g-col-8">{userData.gender || ""}</div>
                </div>

                 </SoftBox>
                 ) : ""}
          
              
               
            </SoftBox>
            <SoftBox ml={2} py={2}>
            <SoftButton variant="gradient" color="info" size="small"
                onClick={()=>{
                    localStorage.setItem('editData', JSON.stringify(userData))
                  navigate('/users/update')
                }}
              >Edit</SoftButton>
            <SoftButton style={{marginLeft: "20px"}} variant="primary"  color="info" size="small"
                onClick={()=>{
                  navigate('/users')
                }}
              >Back To Users List</SoftButton>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserDetails;
