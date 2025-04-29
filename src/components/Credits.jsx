import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import "primeicons/primeicons.css";
import SeeOriginal from "./SeeOriginal";
import { InputText } from "primereact/inputtext";
import "../App.css";

const Credits = ({ creditMap, creditEmitter, originalCredits }) => {
  const [hoveredItem, setHoveredItem] = useState(false);
  const [visible, setVisible] = useState(false);
  const normalizeCredits = (credits) =>
    credits.map((credit) => ({
      ...credit,
      items: Array.isArray(credit.items)
        ? credit.items.join(", ")
        : credit.items,
    }));
  const [initialCredits, setInitialCredits] = useState(() =>
    normalizeCredits(creditMap)
  );
  const [credits, setCredits] = useState(() => normalizeCredits(creditMap));

  const handleEditClick = () => {
    setVisible(true);
  };

  const handleSave = () => {
    const transformed = credits.map((credit) => ({
      ...credit,
      items:
        typeof credit.items === "string"
          ? credit.items
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : credit.items, // fallback if already array
    }));
    setInitialCredits(transformed);
    creditEmitter(transformed);
    setVisible(false);
  };

  const handleReset = () => {
    setCredits([...initialCredits]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...credits];
    updated[index] = { ...updated[index], [field]: value };
    setCredits(updated);
  };

  const headerElement = (
    <SeeOriginal
      data={originalCredits}
      title="Credits"
      width="60vw"
    ></SeeOriginal>
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "white",
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
                  {initialCredits.map((credit, index) => (
                    <tr key={index}>
                      <td
                        scope="row"
                        style={{ backgroundColor: "lightGrey" }}
                        width="30%"
                      >
                        <div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>
                              {credit.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          {Array.isArray(credit.items)
                            ? credit.items.join(", ")
                            : credit.items}
                        </div>
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
                  onClick={handleEditClick}
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
        <Dialog
          draggable={false}
          header={headerElement}
          visible={visible}
          style={{ width: "60vw", height: "80vh" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div
            style={{
              padding: "1rem",
              paddingTop: "0",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "99%",
            }}
          >
            <div style={{ width: "98%", height: "650px", overflowY: "auto" }}>
              <table
                className="table table-bordered"
                style={{ borderColor: "black" }}
              >
                <tbody>
                  {credits.map((credit, index) => (
                    <tr key={index}>
                      <td
                        scope="row"
                        style={{
                          backgroundColor: "lightGrey",
                        }}
                        width="30%"
                      >
                        <span style={{ fontWeight: "bold" }}>
                          <InputText
                            style={{ width: "100%" }}
                            value={credit.category}
                            onChange={(e) =>
                              handleChange(index, "category", e.target.value)
                            }
                          />
                        </span>
                      </td>
                      <td
                        style={{
                          display: "flex",
                          borderLeft: "none",
                          padding: "10px",
                        }}
                      >
                        <InputTextarea
                          key={index}
                          name={index}
                          autoResize="false"
                          value={credit.items}
                          onChange={(e) =>
                            handleChange(index, "items", e.target.value)
                          }
                          style={{
                            resize: "none",
                            padding: 0,
                            border: "none",
                            borderRadius: 0,
                            width: "100%",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Button
                label="Save"
                outlined
                style={{
                  width: "122px",
                  borderRadius: "5px",
                  borderColor: "#c2257c",
                  color: "#c2257c",
                }}
                onClick={handleSave}
              />
              <Button
                label="Reset"
                outlined
                style={{
                  width: "122px",
                  borderRadius: "5px",
                  borderColor: "#1a4879",
                  color: "#1a4879",
                  marginLeft: "1rem",
                }}
                onClick={handleReset}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Credits;
