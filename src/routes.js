
// ZeeWeeReact layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";

// ZeeWeeReact icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Users from "layouts/users";
import CreateUser from "./layouts/users/create";
import UpdateUser from "layouts/users/update";
import UserDetails from "layouts/users/view";
import Categories from "layouts/category";
import CreateCategory from "layouts/category/create";
import UpdateCategory from "layouts/category/update";
import CategoryDetails from "layouts/category/view";
import CreateSubCategory from "layouts/sub-category/create";
import UpdateSubCategory from "layouts/sub-category/update";
import ViewSubCategory from "layouts/sub-category/view";
import SubCategories from "layouts/sub-category";
import ProductList from "layouts/products";
import CreateProduct from "layouts/products/create";
import UpdateProduct from "layouts/products/update";
import ViewProduct from "layouts/products/view";
import OrderList from "layouts/orders";
import UserSite from "layouts/user-layout";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <CustomerSupport size="12px" />,
    component: <Users />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Category",
    key: "categories",
    route: "/categories",
    icon: <CustomerSupport size="12px" />,
    component: <Categories />,
    noCollapse: false,
  },



  {
    type: "collapse",
    name: "Sub Category",
    key: "sub-category",
    route: "/sub-category",
    icon: <CustomerSupport size="12px" />,
    component: <SubCategories />,
    noCollapse: false,
  },

  {
    type: "collapse",
    name: "Products",
    key: "products",
    route: "/products",
    icon: <CustomerSupport size="12px" />,
    component: <ProductList />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    route: "/orders",
    icon: <CustomerSupport size="12px" />,
    component: <OrderList />,
    noCollapse: false,
  },
  
  {
    type: "other",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },

  {
    type: "other",
    name: "Create User",
    key: "users",
    route: "/users/create",
    icon: <Document size="12px" />,
    component: <CreateUser />,
    noCollapse: true,
  },
  {
    type: "other",
    name: "Update User",
    key: "users",
    route: "/users/update",
    icon: <Document size="12px" />,
    component: <UpdateUser />,
    noCollapse: true,
  },

  {
    type: "other",
    name: "Update Details",
    key: "users",
    route: "/users/user-details",
    icon: <Document size="12px" />,
    component: <UserDetails />,
    noCollapse: true,
  },
//Cateogry
  {
    type: "other",
    name: "Create Category",
    key: "categories",
    route: "/categories/create",
    icon: <Document size="12px" />,
    component: <CreateCategory />,
    noCollapse: true,
  },
  {
    type: "other",
    name: "Update Category",
    key: "categories",
    route: "/categories/update",
    icon: <Document size="12px" />,
    component: <UpdateCategory />,
    noCollapse: true,
  },
  {
    type: "other",
    name: "View Details",
    key: "categories",
    route: "/categories/category-details",
    icon: <Document size="12px" />,
    component: <CategoryDetails />,
    noCollapse: true,
  },

  {
    type: "other",
    name: "Create Sub-Category",
    key: "sub-category",
    route: "/sub-category/create",
    icon: <Document size="12px" />,
    component: <CreateSubCategory />,
    noCollapse: true,
  },
  {
    type: "other",
    name: "Update Sub-Category",
    key: "sub-category",
    route: "/sub-category/update",
    icon: <Document size="12px" />,
    component: <UpdateSubCategory />,
    noCollapse: true,
  },
  {
    type: "other",
    name: "View Sub-Category Details",
    key: "sub-category",
    route: "/sub-category/details",
    icon: <Document size="12px" />,
    component: <ViewSubCategory />,
    noCollapse: true,
  },


  {
    type: "other",
    name: "Create Product",
    key: "products",
    route: "/products/create",
    icon: <Document size="12px" />,
    component: <CreateProduct />,
    noCollapse: true,
  },
  {
    type: "other",
    name: "Update Product",
    key: "products",
    route: "/products/update",
    icon: <Document size="12px" />,
    component: <UpdateProduct />,
    noCollapse: true,
  },
  {
    type: "other",
    name: "View Product Details",
    key: "products",
    route: "/products/details",
    icon: <Document size="12px" />,
    component: <ViewProduct />,
    noCollapse: true,
  },


  

  
  
  {
    type: "other",
    name: "Website",
    key: "website",
    route: "/website",
    icon: <SpaceShip size="12px" />,
    component: <UserSite />,
    noCollapse: true,
  },
];

export default routes;
