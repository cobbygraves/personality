import React, { useState, Suspense } from "react";
import "./App.css";
import { Typography } from "@mui/material";
// import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/SignIn/SignIn";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import AddNew from "./containers/AddNew/AddNew";
import EditForm from "./containers/EditForm/EditForm";
import SignUp from "./components/SignUp/SignUp";
const Home = React.lazy(() => import("./containers/Home/Home"));
const Admin = React.lazy(() => import("./components/Admin/Admin"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ userAuth: isLoggedIn, setUserAuth: setIsLoggedIn }}
      >
        <BrowserRouter>
          <Suspense
            fallback={
              <Typography sx={{ textAlign: "center" }}>
                loading please wait...
              </Typography>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {isLoggedIn ? (
                <Route path="/admin" element={<Admin />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="addnew" element={<AddNew />} />
                  <Route path="edit/:id" element={<EditForm />} />
                </Route>
              ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
              )}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
