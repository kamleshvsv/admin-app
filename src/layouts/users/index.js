
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

function Users() {
    const navigate = useNavigate()

    const [userList, setUserList ] = useState([])

    useEffect(()=> {
      if(localStorage.getItem('users')){
        var userData = JSON.parse(localStorage.getItem('users'))
        setUserList(userData)
      }
    }, [])

    // useEffect(()=> {
    //   if(localStorage.getItem('users')){
    //     var userData = JSON.parse(localStorage.getItem('users'))
    //     setUserList(userData)
    //   }
    // },[userList])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Users
                
              </SoftTypography>
              <SoftButton variant="gradient" color="info" size="small"
                onClick={()=>{
                  console.log("event")
                  navigate('/product/create')
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
                                    First Name
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" fontWeight="medium">
                                    Last Name
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" fontWeight="medium">
                                    Email
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" fontWeight="medium">
                                    Gender
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" fontWeight="medium">
                                    Action
                                </SoftTypography>
                            </th>
	                    	
	                    </tr>
	                </thead>
                  {userList && userList.length > 0 ? ( 
	                <tbody>
                    {userList.map((user, idx) => (
	                    <tr key={idx}>
	                    	<td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {idx + 1}
                                </SoftTypography>
                            </td>
	                    	<td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {user.firstName || ""}
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                    {user.lastName || ""}
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                {user.email || ""}
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {user.gender || ""}
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" className="cursor-pointer" fontWeight="medium"
                                  onClick={() => { 
                                    localStorage.setItem('editData', JSON.stringify(user))
                                    navigate('/users/update')
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
                                        userList.splice(idx, 1);
                                         setUserList(userList)
                                        localStorage.setItem('users', JSON.stringify(userList))
                                       
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
                                    localStorage.setItem('viewData', JSON.stringify(user))
                                    navigate('/users/user-details')
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
                {userList && userList.length == 0 ? ( <div className='text-center'><h5 className="g-padding-10">Record Not Found</h5></div> ) : ""}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
