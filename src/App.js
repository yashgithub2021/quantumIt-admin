import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLoginScreen from "./pages/AdminLoginScreen";
import { AdminProtectedRoute, UnprotectedRoute } from "./routes";
import { Header, Footer, SideNavBar, NotFound } from "./components";
import { Dashboard, } from "./pages";
import { ToastContainer } from 'react-toastify';
import Contributor from "./pages/AddContributor";
import Prescription from "./pages/Prescription";
import Evaluation from "./pages/Evaluation";
import { useSelector } from "react-redux";
import AddProject from "./pages/AddProject";
import Slots from "./pages/Slots";
import Plans from "./pages/Plans";
import Profile from "./pages/profile";
import Transactions from "./pages/Transactions";
function App() {
  const { token } = useSelector(state => state.auth);
  const pageLocation = useLocation();

  const [isExpanded, setExpandState] = useState(window.innerWidth > 768);
  const sidebarHandler = () => setExpandState((prev) => !prev);

  const routeList = [
    { path: "/admin/dashboard", comp: <Dashboard /> },
    { path: "/admin/add-contributor", comp: <Contributor /> },
    { path: "/admin/pres-form", comp: <Prescription /> },
    { path: "/admin/eval-form", comp: <Evaluation /> },
    { path: "/admin/add-project", comp: <AddProject /> },
    { path: "/admin/slots", comp: <Slots /> },
    { path: "/admin/plans", comp: <Plans /> },
    { path: "/admin/view-profile", comp: <Profile /> },
    { path: "/admin/transactions", comp: <Transactions /> },
  ];
  return (
    <div className="main-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {isExpanded && token && (
        <div className="sidebar-overlay" onClick={sidebarHandler}></div>
      )}
      <div className="sidebar-wrapper">
        <SideNavBar isExpanded={isExpanded} />
      </div>
      <div
        className={`body-wrapper ${isExpanded ? "mini-body" : "full-body"} 
        ${token ? "" : "m-0"} d-flex flex-column`}
      >
        {token && (
          <Header sidebarHandler={sidebarHandler} />
        )}

        <Routes location={pageLocation} key={pageLocation.pathname}>
          <Route
            path="/"
            element={
              <UnprotectedRoute>
                <AdminLoginScreen />
              </UnprotectedRoute>
            }
          />

          {routeList.map(({ path, comp }) => (
            <Route
              key={path}
              path={path}
              element={<AdminProtectedRoute>{comp}</AdminProtectedRoute>}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
