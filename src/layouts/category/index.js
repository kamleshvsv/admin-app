
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
import Swal from 'sweetalert2'
import SoftBadge from "components/SoftBadge";

function Categories() {
    const navigate = useNavigate()

    const [categoryList, setcategoryList ] = useState([])

    useEffect(()=> {
      if(localStorage.getItem('categories')){
        var userData = JSON.parse(localStorage.getItem('categories'))
        setcategoryList(userData)
      }
    }, [])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Category List
                
              </SoftTypography>
              <SoftButton variant="gradient" color="info" size="small"
                onClick={()=>{
                  console.log("event")
                  navigate('/categories/create')
                }}
              >Create</SoftButton>
             
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
                <table className="table-size">
	                <thead>
	                    <tr>
	                    	<th>
                                <SoftTypography variant="caption" color="text" alignItems="center" fontWeight="medium">
                                    #
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" alignText="center" fontWeight="medium">
                                    Title
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" fontWeight="medium">
                                    Status
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" fontWeight="medium">
                                    Action
                                </SoftTypography>
                            </th>
	                    	
	                    </tr>
	                </thead>
                  {categoryList && categoryList.length > 0 ? ( 
	                <tbody>
                    {categoryList.map((cat, idx) => (
	                    <tr key={idx}>
	                    	<td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {idx + 1}
                                </SoftTypography>
                            </td>
	                    	<td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {cat.title || ""}
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {cat.status === "Active" ? (
                                        <SoftBadge variant="gradient" badgeContent={cat.status} color="success" size="xs" container />
                                     ) : (
                                        <SoftBadge variant="gradient" badgeContent={cat.status} color="error" size="xs" container />
                                     )}
                                     
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" className="cursor-pointer" fontWeight="medium"
                                  onClick={() => { 
                                    localStorage.setItem('editCategory', JSON.stringify(cat))
                                    navigate('/categories/update')
                                  }}
                                >
                                     <i className="fa fa-pencil"></i>
                                </SoftTypography>
                                <SoftTypography ml={1} variant="caption" color="secondary" className="cursor-pointer" fontWeight="medium"
                                  onClick={() => { 
                                    Swal.fire({
                                      title: 'Are you sure?',
                                      text: "Are you sure you want to delete ?",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes, delete it!'
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        categoryList.splice(idx, 1);
                                         setcategoryList(categoryList)
                                        localStorage.setItem('categories', JSON.stringify(categoryList))
                                       
                                        Swal.fire(
                                          'Deleted!',
                                          'Your file has been deleted.',
                                          'success'
                                        )
                                        window.location.reload()
                                      }
                                    })
                                  }}
                                >
                                     <i className="fa fa-trash"></i>
                                </SoftTypography>
                                <SoftTypography ml={1} variant="caption" color="secondary" className="cursor-pointer" fontWeight="medium"
                                  onClick={() => { 
                                    localStorage.setItem('viewCategory', JSON.stringify(cat))
                                    navigate('/categories/category-details')
                                  }}
                                >
                                     <i className="fa fa-info-circle"></i>
                                </SoftTypography>
                            </td>
	                    </tr>
                    ))}
                     
	                </tbody>
                  ) : ""}
                </table>
                {categoryList && categoryList.length == 0 ? ( <div className='text-center'><h5 className="g-padding-10">Record Not Found</h5></div> ) : ""}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Categories;
