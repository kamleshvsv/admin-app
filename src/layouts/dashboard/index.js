/**
=========================================================
* ZeeWeeReact - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// ZeeWeeReact components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// ZeeWeeReact examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// ZeeWeeReact base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate()
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [totalUser, setotalUser] = useState([])
  const [totalCategories, setTotalCategories] = useState([])
  const [totalOrders, setTotalOrders] = useState([])
  const [totalProducts, setTotalProducts] = useState([])

  useEffect(()=> {
    if(localStorage.getItem('users')){
       
      let data = JSON.parse(localStorage.getItem('users')) || []
      setotalUser(data)
    }
    if(localStorage.getItem('products')){
     
      let data = JSON.parse(localStorage.getItem('products')) || []
       setTotalProducts(data)
    }
    if(localStorage.getItem('categories')){
     
      let data = JSON.parse(localStorage.getItem('categories')) || []
      setTotalCategories(data)
    }
    if(localStorage.getItem('orders')){
     
      let data = JSON.parse(localStorage.getItem('orders')) || []
      setTotalOrders(data)
    }
  }, [ ])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid className="cursor-pointer" item xs={12} sm={6} xl={3} onClick={() => {navigate
                navigate('/users')
              }}>
              { totalUser && totalUser.length > 0 ? (
              <MiniStatisticsCard
              
                title={{ text: "Total Users"}}
                count={totalUser.length}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: "paid" }}
              />
              ) : (
                <MiniStatisticsCard
                onClick={() => {
                  navigate('/users')
                }}
                title={{ text: "Total Users"}}
                count="00"
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: "paid" }}
              />
              )}
            </Grid>
            <Grid className="cursor-pointer" item xs={12} sm={6} xl={3} onClick={() => {
                  navigate('/categories')
                }}>
            { totalCategories && totalCategories.length > 0 ? (
              <MiniStatisticsCard
                
                title={{ text: "Total Categories" }}
                count={totalCategories.length}
                percentage={{ color: "success", text: ""}}
                icon={{ color: "info", component: "public" }}
              />
            ) : (
              <MiniStatisticsCard
            
              title={{ text: "Total Categories" }}
              count="00"
              percentage={{ color: "success", text: ""}}
              icon={{ color: "info", component: "public" }}
            />
            )}
            </Grid>
            <Grid className="cursor-pointer"  item xs={12} sm={6} xl={3}   onClick={() => {
                navigate('/products')
              }}>
            { totalProducts && totalProducts.length > 0 ? (
              <MiniStatisticsCard
            
                title={{ text: "Total Products" }}
                count={totalProducts.length}
                percentage={{ color: "error", text: ""}}
                icon={{ color: "info", component: "emoji_events" }}
              />
            ) : (
              <MiniStatisticsCard
              title={{ text: "Total Products" }}
              count="00"
              percentage={{ color: "error", text: ""}}
              icon={{ color: "info", component: "emoji_events" }}
            />
            )}
            </Grid>
            <Grid className="cursor-pointer" item xs={12} sm={6} xl={3}  onClick={() => {
                navigate('/orders')
              }}>
            { totalOrders && totalOrders.length > 0 ? (
              <MiniStatisticsCard
                title={{ text: "Total Order" }}
                count={totalOrders.length}
                percentage={{ color: "success", text: "" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            ) : (
              <MiniStatisticsCard
              title={{ text: "Total Order" }}
              count="00"
              percentage={{ color: "success", text: "" }}
              icon={{
                color: "info",
                component: "shopping_cart",
              }}
            />
            )}
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
