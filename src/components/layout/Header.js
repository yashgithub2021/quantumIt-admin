import React from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

export default function Header({ sidebarHandler }) {
  const { userInfo } = useSelector(state => state.auth);
  return (
    <>
      {userInfo ? (
        <Navbar className="header">
          <Container fluid className="ps-0">
            <GiHamburgerMenu
              style={{
                fontSize: "1.5rem",
                color: "#fff",
                marginLeft: "1.75rem",
                cursor: "pointer",
              }}
              onClick={() => sidebarHandler()}
            />

            <Nav className="ms-auto">
              <Dropdown align="end">
                <Dropdown.Toggle
                  id="user_profile"
                  className="right-profile-logo"
                >
                  <FaUserCircle size={"25px"} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>
                    Signed in as
                    <br />
                    <b>{userInfo.name}</b>
                  </Dropdown.Header>

                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Link to="/admin/view-profile" className="dropdown-item">
                      <FaUser className="me-2" style={{ color: 'black' }} /> Profile
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
      ) : (
        <></>
      )}
    </>
  );
}
