
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
import SoftBadge from "components/SoftBadge";


function ViewSubCategory() {
    const navigate = useNavigate()

    const [viewData ,setViewData ] = useState([])

    useEffect(()=> {
      if(localStorage.getItem('viewSubCategory')){
        var view = JSON.parse(localStorage.getItem('viewSubCategory'))
        setViewData(view)
      }
    }, [])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Sub Category Details  {viewData && viewData.title ? (<>({viewData.title})</>) : ""}
                
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
                {viewData && viewData.title ? (
                 <SoftBox py={2} px={5}>
                 <div className="g-row">
                   <div className="g-col-4">Title</div>
                   <div className="g-col-8">{viewData.title || ""}</div>
                </div>

                <div className="g-row">
                   <div className="g-col-4">Category</div>
                   <div className="g-col-8">{viewData.category || ""}</div>
                </div>
              
                <div className="g-row">
                   <div className="g-col-4">Status</div>
                   <div className="g-col-8">
                   {viewData.status === "Active" ? (
                                        <SoftBadge variant="gradient" badgeContent={viewData.status} color="success" size="xs" container />
                                     ) : (
                                        <SoftBadge variant="gradient" badgeContent={viewData.status} color="error" size="xs" container />
                                     )}</div>
                </div>

                 </SoftBox>
                 ) : ""}
          
              
               
            </SoftBox>
            <SoftBox ml={2} py={2}>
            <SoftButton variant="gradient" color="info" size="small"
                onClick={()=>{
                    localStorage.setItem('editSubCategory', JSON.stringify(viewData))
                  navigate('/sub-category/update')
                }}
              >Edit</SoftButton>
            <SoftButton style={{marginLeft: "20px"}} variant="primary"  color="info" size="small"
                onClick={()=>{
                  navigate('/sub-category')
                }}
              >Back To Sub Category List</SoftButton>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewSubCategory;
