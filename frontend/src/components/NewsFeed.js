import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "./assets/twitter-logo.png";

import {
  RiNewspaperLine,
  RiBaseStationLine,
  RiFolderUserLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

import styles from "./styles/NewsFeed.module.css";

function NewsFeed() {
  let navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem("id") == null || undefined){
      navigate("/signin")
    }
  })

  function handleSignOut(e) {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    navigate("/");
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col md={4}>
          <Row className="justify-content-center align-items-center">
            <Col md="auto" className="text-sm-start text-center mb-sm-0 mb-3">
              <img src={logo} width="125" alt="logo" />
            </Col>
            <Col className="text-sm-start text-center text-success mb-sm-0 mb-3">
              <h1>Twitter</h1>
            </Col>
          </Row>
        </Col>
        {/* <Col md={8}>
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Button variant="success">
              Find All User Accounts
            </Button>
          </div>
        </Col> */}
      </Row>
      <Row>
        <Col md={4}>
          <Navbar bg="light" expand="lg" className="mb-3 mb-sm-0">
            <Container className={styles.navbarContainer}>
                <ul className="list-group">
                <Nav.Link as={Link} to="home" className="text-decoration-none">
                  {/* <Link to="home" className="text-decoration-none"> */}
                    <li className="list-group-item fs-5 py-3 text-success shadow">
                      <span>
                        <RiNewspaperLine /> Newsfeed
                      </span>
                    </li>
                  {/* </Link> */}
                </Nav.Link>
                {/* <Nav.Link>
                  <Link to="" className="text-decoration-none">
                    <li className="list-group-item fs-5 py-3 text-success shadow">
                      <span>
                        <RiRadarLine /> Following
                      </span>
                    </li>
                  </Link>
                </Nav.Link> */}
                <Nav.Link as={Link} to="allposts" className="text-decoration-none">
                  {/* <Link to="allposts" className="text-decoration-none"> */}
                    <li className="list-group-item fs-5 py-3 text-success shadow">
                      <span>
                        <RiBaseStationLine /> All posts
                      </span>
                    </li>
                  {/* </Link> */}
                </Nav.Link>
                <Nav.Link as={Link} to="myprofile" className="text-decoration-none">
                  {/* <Link to="myprofile" className="text-decoration-none"> */}
                    <li className="list-group-item fs-5 py-3 text-success shadow">
                      <span>
                        <RiFolderUserLine /> My Posts
                      </span>
                    </li>
                  {/* </Link> */}
                </Nav.Link>
                <Nav.Link>
                  <li
                    className={`list-group-item fs-5 py-3 text-success shadow ${styles.signOutButton}`}
                    onClick={handleSignOut}
                  >
                    <span>
                      <RiLogoutBoxLine /> Sign Out
                    </span>
                  </li>
                </Nav.Link>
                </ul>
            </Container>
          </Navbar>
        </Col>
        <Col md={8}>
          <Outlet />{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsFeed;