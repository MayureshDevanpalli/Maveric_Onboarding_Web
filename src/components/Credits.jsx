import { useState } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

const Credits = ({ creditMap }) => {
  const [hoveredItem, setHoveredItem] = useState(false);
  const [credits, setCredits] = useState(creditMap);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "white",
            paddingBottom: "1rem",
            paddingLeft: "5rem",
            paddingRight: "5rem",
            width: "85vw",
            paddingTop: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "lightGrey",
              marginBottom: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              fontWeight: "bold",
            }}
          >
            Credits
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
            }}
            onMouseEnter={() => setHoveredItem(true)}
            onMouseLeave={() => setHoveredItem(false)}
          >
            <div style={{ width: "98%" }}>
              <table
                className="table table-bordered"
                style={{ borderColor: "black" }}
              >
                <tbody>
                  {credits.map((credit, index) => (
                    <tr key={index}>
                      <td
                        scope="row"
                        style={{ backgroundColor: "lightGrey" }}
                        width="30%"
                      >
                        <div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>
                              {credit.category}:
                            </span>{" "}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{credit.items?.join(", ")}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                width: "2%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {hoveredItem && (
                <i
                  className="pi pi-pencil"
                  onClick={() => setVisible(true)}
                  style={{
                    fontSize: "1.1rem",
                    color: "gray",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                  }}
                ></i>
              )}
            </div>
          </div>
        </div>
        {/*<Button
          label="Edit Credits"
          outlined
          style={{
            marginTop: "1rem",
            width: "165px",
            height: "50px",
            marginLeft: "2rem",
            borderRadius: "5px",
            borderColor: "#1a4879",
            color: "#1a4879",
          }}
        />*/}
      </div>
    </>
  );
};

export default Credits;
