import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  Admin,
  CategoryItem,
  Cart,
  AllProducts,
  AddProducts,
  MyProducts,
  Product
} from "./pages/index.js";
import store from "./store/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/adminDashboard" element={<Admin />} />
      <Route path="/category/:slug/:id" element={<CategoryItem />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin/productsList" element={<AllProducts />} />
      <Route path="/admin/addproducts" element={<AddProducts />} />
      <Route path="/admin/myproducts" element={<MyProducts />} />
      <Route path="/product/:ID/:category/:pid" element={<Product />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
