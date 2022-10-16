
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
import SoftAvatar from "components/SoftAvatar";
import team4 from "assets/images/team-4.jpg";
function OrderList() {
    const navigate = useNavigate()

    const [orderList, setOrderList ] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(()=> {
      if(localStorage.getItem('orderhistory')){
        var userData = JSON.parse(localStorage.getItem('orderhistory'))
        setOrderList(userData)
        console.log(userData)
      }
    }, [])



  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
   return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Orders 
                
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
               <label htmlFor="search">
              
        <input className="search-input" value={searchTerm} placeholder="Search Order by Date and Email Address" name="searchTerm" onChange={handleSearch}  />
      </label>
               <table className="table-size">
	                <thead>
	                    <tr>
	                    	<th>
                                <SoftTypography variant="caption" color="text" alignItems="center" fontWeight="medium">
                                    #
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" alignItems="center" fontWeight="medium">
                                    Order Date
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" alignText="center" fontWeight="medium">
                                    Product
                                </SoftTypography>
                            </th>
                            <th>
                                <SoftTypography variant="caption" color="text" alignText="center" fontWeight="medium">
                                    Customer 
                                </SoftTypography>
                            </th>

                            <th>
                                <SoftTypography variant="caption" color="text" alignText="center" fontWeight="medium">
                                Qty / Price
                                </SoftTypography>
                            </th>

                            <th>
                                <SoftTypography variant="caption" color="text" alignText="center" fontWeight="medium">
                                Total Amount
                                </SoftTypography>
                            </th>
                            {/* <th>
                                <SoftTypography variant="caption" color="text" fontWeight="medium">
                                    Action
                                </SoftTypography>
                            </th> */}
	                    	
	                    </tr>
	                </thead>
                  {orderList.orderDetails && orderList.orderDetails.length > 0 ? ( 
	                <tbody>
                    {orderList.orderDetails
                    .filter(items => items.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ) 
                    .map((cat, idx) => (
	                    <tr key={idx}>
              
    	                  <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {idx + 1}
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                     {cat.orderDate.toString().split('T')[0]|| ""}
                                </SoftTypography>
                            </td>
	                    	<td>
                          <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
                            <SoftBox mr={2}>
                              <SoftAvatar src={cat.imageArray && cat.imageArray[0].imageUrl} alt="product" size="sm" variant="rounded" />
                            </SoftBox>
                            <SoftBox display="flex" flexDirection="column">
                                    <SoftTypography variant="button" fontWeight="medium">
                                      {cat.title}
                                    </SoftTypography>
                                    <SoftTypography variant="caption" color="secondary">
                                      {cat.description}
                                    </SoftTypography>
                            </SoftBox>
                            </SoftBox>
                            </td>

                            <td>
                            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                <SoftBox display="flex" flexDirection="column">
                                    <SoftTypography variant="button" fontWeight="medium">
                                      {cat.customerName}
                                    </SoftTypography>
                                    <SoftTypography variant="caption" color="secondary">
                                    {cat.customerEmail}
                                    </SoftTypography>
                                  </SoftBox>
                                </SoftTypography>
                            </td>
                           
	                   
                           
                            <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                {cat.totalPrice / cat.price} / ₹ {cat.price || ""}
                                </SoftTypography>
                            </td>
                            <td>
                                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                                ₹ {cat.totalPrice || ""}
                                </SoftTypography>
                            </td>
                            {/* <td>
                                <SoftTypography variant="caption" color="secondary" className="cursor-pointer" fontWeight="medium"
                                  onClick={() => { 
                                    localStorage.setItem('editProductData', JSON.stringify(cat))
                                    navigate('/products/update')
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
                                        orderList.splice(idx, 1);
                                         setOrderList(orderList)
                                        localStorage.setItem('orderhistory', JSON.stringify(orderList))
                                       
                                        Swal.fire(
                                          'Deleted!',
                                          'Your file has been deleted.',
                                          'success'
                                        )
                                      }
                                    })
                                  }}
                                >
                                     <i className="fa fa-trash"></i>
                                </SoftTypography>
                                <SoftTypography ml={1} variant="caption" color="secondary" className="cursor-pointer" fontWeight="medium"
                                  onClick={() => { 
                                    localStorage.setItem('viewProductData', JSON.stringify(cat))
                                    navigate('/products/details')
                                  }}
                                >
                                     <i className="fa fa-info-circle"></i>
                                </SoftTypography>
                            </td> */}
	                    </tr>
                    ))}
                     
	                </tbody>
                  ) : ""}
                </table> 
                {orderList.orderDetails && orderList.orderDetails.length == 0 ? ( <div className='text-center'><h5 className="g-padding-10">Record Not Found</h5></div> ) : ""}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;
