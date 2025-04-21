import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import "primeicons/primeicons.css";

const Credits = ({ creditMap }) => {
  const [hoveredItem, setHoveredItem] = useState(false);
  const [credits, setCredits] = useState(creditMap);
  const [visible, setVisible] = useState(false);
  const [editedValues, setEditedValues] = useState(
    creditMap.map((credit) => credit.items.join(", "))
  );

  const handleEditClick = () => {
    setVisible(true);
    setEditedValues(credits.map((credit) => credit.items.join(", ")));
  };
  const handleSave = () => {
    const updatedCredits = credits.map((credit, index) => ({
      ...credit,
      items: editedValues[index].split(",").map((item) => item.trim()),
    }));
    setCredits(updatedCredits);
    setVisible(false);
  };

  const handleChange = (value, index) => {
    const updatedValues = [...editedValues];
    updatedValues[index] = value;
    setEditedValues(updatedValues);
  };

  const handleReset = () => {    
    setEditedValues(credits.map((credit) => credit.items.join(", ")))
  };
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
                              {credit.category}
                            </span>
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
          header="Credits"
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
            }}
          >
            <div>
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
                        <span style={{ fontWeight: "bold" }}>
                          {credit.category}
                        </span>
                      </td>
                      <td>
                        <InputTextarea
                          key={index}
                          rows={2}
                          cols={80}
                          name={index}
                          autoResize="false"
                          type="text"
                          value={editedValues[index]}
                          onChange={(e) =>
                            handleChange(e.target.value, index)
                          }
                          style={{ resize: "none", width: "100%", padding: 0, border: "none", borderRadius: 0 }}

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
