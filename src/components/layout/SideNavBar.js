import "./SideNavBar.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdCreateNewFolder, MdFormatListBulletedAdd, MdLogout, MdDashboard, MdOutlineMiscellaneousServices, MdContentPasteGo, MdOutlineSwipeRight, MdOutlineLocalHospital } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/Slices/AuthSlice";
import logo from "../../logo-white.png"
import logo2 from "../../web_icon.png"
const linkList = [
  {
    icon: <MdDashboard className="icon-md" />,
    text: "Dashboard",
    url: "/admin/dashboard"
  },
  {
    icon: <MdOutlineLocalHospital className="icon-md" />,
    text: "Projects",
    url: "/admin/add-project"
  },
  {
    icon: <MdContentPasteGo className="icon-md" />,
    text: "F.A.Q.",
    url: "/admin/pres-form"
  },
  {
    icon: <MdFormatListBulletedAdd className="icon-md" />,
    text: "Blogs",
    url: "/admin/eval-form"
  },
  // {
  //   icon: <MdFormatListBulletedAdd className="icon-md" />,
  //   text: "Contributors",
  //   url: "/admin/add-contributor"
  // },
  {
    icon: <MdOutlineSwipeRight className="icon-md" />,
    text: "Contact us",
    url: "/admin/slots"
  },
  {
    icon: <MdOutlineMiscellaneousServices className="icon-md" />,
    text: "Feedback ",
    url: "/admin/plans"
  },
];

const active_text = {
  Dashboard: "dashboard",
  Doctors: "add-doctor",
  'Prescription-Form': "pres-form",
  'Evaluation-Form': "eval-form",
  'Slot Management': "slots",
  'Clinics': "add-clinic",
  'Service\'s Management': "plans",
  Orders: "order",
  Contents: "content",
};

export default function SideNavbar({ isExpanded }) {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  // eslint-disable-next-line no-unused-vars
  const [activeLink, setActiveLink] = useState('Dashboard');
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { userInfo } = state;
  const navigate = useNavigate();
  const signoutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };

  const activeLinkHandler = (text) => {
    return pathname.includes(active_text[text]);
  };

  const cls = `nav-item has-treeview ${isExpanded ? "menu-item" : "menu-item menu-item-NX"}`;
  return (
    <>
      {userInfo ? (
        <div
          className={
            isExpanded
              ? "side-nav-container"
              : "side-nav-container side-nav-container-NX"
          }
        >
          <div className="brand-link">
            {
              isExpanded
                ? <img src={logo} alt="" width={"150px"} height="auto" />
                : <img src={logo2} alt="" width={"50px"} height="auto" />
            }
          </div>

          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="info">
                <Link className="d-block">
                  {userInfo.avatar && (
                    <img
                      src={userInfo.avatar}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "0.5rem",
                      }}
                    />
                  )}
                  <span className="info-text">
                    Welcome Back
                  </span>
                </Link>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav-pills nav-sidebar px-0 d-flex flex-column flex-wrap"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {linkList.map(({ icon, text, url }) => (
                  <li
                    key={url}
                    className={`${cls} ${activeLinkHandler(text) && "active-item"
                      }`}
                    onClick={() => setActiveLink(text)}
                  >
                    <Link to={url} className="nav-link">
                      {icon}
                      <p className="ms-2">{text}</p>
                    </Link>
                  </li>
                ))}

                <li className={cls}>
                  <Link onClick={signoutHandler} to="/" className="nav-link">
                    <MdLogout className="icon-md" />
                    <p className="ms-2">Log Out</p>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
