import Table from "react-bootstrap/Table";
import React, { useEffect } from "react";
import styles from "../../styles/Property.module.css";
import Container from "react-bootstrap/Container";
import { BsSearch } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";

import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";

function Property({ oldProperties, property }) {
  // console.log(oldProperties);
  // console.log(property)
  const [shopModal, setshopModal] = useState(false);
  //   const [dropdownValue, setDropDownValue] = useState("All");
  //   console.log(dropdownValue);

  const handleShopModal = () => {
    setshopModal(!shopModal);
  };

  const allNames = oldProperties.roomDtos;
  // console.log(roomsName);
  // const arr = [];
  // const naming = Object.values(roomsName).map((val, i) => {
  //   // console.log(val.name);
  //   if (val.name) {
  //     arr.push(val.name);
  //   }
  // });

  // console.log(arr);

  // const filtered = Object.keys(arr)
  //   .filter((key) => key.includes("name"))
  //   .reduce((obj, key) => {
  //     return Object.assign(obj, {
  //       [key]: roomsName[key],
  //     });
  // }, {});
  // console.log(filtered);
  const [dropDrown, setDropDown] = useState(allNames);
  const [currentDrop, setCurrentCard] = useState("All");

  const handleBtns = (e) => {
    let word = e.target.value;
    setCurrentCard(word);
  };

  useEffect(() => {
    if (currentDrop === "All") {
      setDropDown(allNames);
    } else {
      const filtered = allNames.filter((plan) => {
        // you have categories as strings and array of strings
        return plan.name === currentDrop || plan.name.includes(currentDrop);
      });
      setDropDown(filtered);
    }
  }, [currentDrop]);

  // console.log(dropDownValue);

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ paddingLeft: "35px", paddingRight: "35px" }}
      >
        <Navbar.Brand href="#" className={styles.navBrand}>
          <b>Channel Manager</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {oldProperties.propertiesOnlineTravelAgencies.map((val, i) => {
              return (
                <Nav.Link
                  key={i}
                  href={`${property}`}
                  style={{ fontSize: "12px", marginTop: "5px" }}
                >
                  {val.onlineTravelAgencyName}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Table bordered className={styles.container}>
          <thead className={styles.heading}>
            <tr className={styles.heading}>
              <th>Channel Manager Room Type</th>
              <th>Channel Manager Room Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.heading}>
              <td>
                <button onClick={handleShopModal} className={styles.button}>
                  All Room Types <AiFillCaretDown />
                  {shopModal? 
                  <div
                    onMouseLeave={handleShopModal}
                    className={styles.shopModal}
                    style={
                      shopModal ? { display: "block" } : { display: "none" }
                    }
                  >
                    <li>
                      <button value={"All"} type="button" onClick={handleBtns}>
                        All
                      </button>
                    </li>
                    {allNames.map((val, i) => {
                      return (
                        // <div key={i}>
                          <li key={i}>
                            <button
                              value={val.name}
                              type="button"
                              onClick={handleBtns}
                            >
                              {val.name}
                            </button>
                          </li>
                        // </div>
                      );
                    })}
                  </div>:''}
                </button>
              </td>
              <td>
                <div className={styles.inputContainer}>
                  <i className={styles.icon}>
                    <BsSearch className={styles.searchIcon} />
                  </i>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                    name="usrnm"
                  />
                </div>
              </td>
            </tr>
            {dropDrown.map((val, i) => {
              return (
                <tr key={i}>
                  <td>{val.name}</td>
                  <td>Plan Rooms</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Property;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { property: "237" } },
      { params: { property: "368" } },
      { params: { property: "495" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { property } = context.params;
  const propertiesResponse = await fetch(
    `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${property}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib29rb25ldGVzdGJ1c2luZXNzQGdtYWlsLmNvbSIsInNjb3BlcyI6IlJPTEVfUFJPUF9BRE1JTiIsImlhdCI6MTY1ODg5Njk5OCwiZXhwIjoxNjU5MzI4OTk4fQ.yJpc1N9tn_q345k3hZHLapQaeXVO23xlWkbQwhPx7XI",
        "Content-Type": "application/x-www-form-urlencoded",
        APP_ID: "BOOKONE_WEB_APP",
      },
    }
  );
  const oldProperties = await propertiesResponse.json();

  return { props: { oldProperties, property } };
}
