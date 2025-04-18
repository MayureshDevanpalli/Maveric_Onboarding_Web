import { Button } from "primereact/button";
import React, { useState } from "react";
import "primeicons/primeicons.css";

const ProjectExperience = ({ experience }) => {
  const [hoveredItem, setHoveredItem] = useState(false);
  const [projectExperience, setProjectExperience] = useState(experience);

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
            Project Experience
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
                  {projectExperience.map((exp, index) => (
                    <tr key={index}>
                      <td
                        scope="row"
                        style={{ backgroundColor: "lightGrey" }}
                        width="30%"
                      >
                        <div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Client:</span>{" "}
                            {exp.client}
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Project:</span>{" "}
                            {exp.project}
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>
                              Location:
                            </span>{" "}
                            {exp.location}
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Role:</span>{" "}
                            {exp.role}
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>
                              Duration:
                            </span>{" "}
                            {exp.duration}
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>Tools:</span>{" "}
                            {exp.tools?.join(", ")}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: "bold" }}>Description:</div>
                          <div
                            style={{
                              marginBottom: "1rem",
                              paddingLeft: "1rem",
                              paddingRight: "1rem",
                              textAlign: "justify",
                            }}
                          >
                            {exp.description}
                          </div>
                          <div style={{ fontWeight: "bold" }}>
                            Responsibilities:{" "}
                          </div>
                          <ul>
                            {exp.responsibilities?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
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
          label="Edit Experience"
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

export default ProjectExperience;
