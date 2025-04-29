import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

const SeeOriginal = ({ data, title, width }) => {
  const op = useRef(null);
  const buttonRef = useRef(null);

  const UnorderedList = (
    <ul>
      {(Array.isArray(data) ? data : []).map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  const HeaderDiv = (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div>
        <div style={{ fontWeight: "bold" }}>Candidate Name:</div>
        <div>{data.candidateName}</div>
      </div>
      <div>
        <div style={{ fontWeight: "bold" }}>Candidate Position:</div>
        <div>{data.candidatePosition}</div>
      </div>
    </div>
  );

  const CreditsTable = (
    <table className="table table-bordered" style={{ borderColor: "black" }}>
      <tbody>
        {(Array.isArray(data) ? data : []).map((credit, index) => (
          <tr key={index}>
            <td scope="row" style={{ backgroundColor: "#ebeae8" }} width="30%">
              <div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{credit.category}</span>
                </div>
              </div>
            </td>
            <td style={{ backgroundColor: "#ebeae8" }}>
              <div>{credit.items?.join(", ")}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const ProjectsExperience = (
    <div style={{ height: "70vh", overflowY: "auto" }}>
      <table
        className="table table-bordered"
        style={{ borderColor: "black", fontSize: "13px" }}
      >
        <tbody>
          {(Array.isArray(data) ? data : []).map((exp, index) => (
            <tr key={index}>
              <td scope="row" style={{ backgroundColor: "#ebeae8" }}>
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
                    <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                    {exp.location}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Role:</span> {exp.role}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
                    {exp.duration}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Tools:</span>{" "}
                    {exp.tools?.join(", ")}
                  </div>
                </div>
              </td>
              <td style={{ backgroundColor: "#ebeae8" }}>
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
                  <div style={{ fontWeight: "bold" }}>Responsibilities:</div>
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
  );

  const onShow = () => {
    document.body.style.overflow = "hidden";
  };

  const onHide = () => {
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>{title}</span>
        <Button
          label="See Original"
          outlined
          style={{
            width: "70px",
            padding: "1px",
            borderRadius: "5px",
            borderColor: "#c2257c",
            color: "#c2257c",
            fontSize: "10px",
          }}
          onClick={(e) => op.current.toggle(e)}
          ref={buttonRef}
        ></Button>
        <OverlayPanel
          ref={op}
          style={{
            width: width,
            backgroundColor: "#ebeae8",
          }}
          onShow={onShow}
          onHide={onHide}
        >
          {(() => {
            switch (title) {
              case "Headers":
                return HeaderDiv;
              case "Professional Summary":
                return <div>{data}</div>;
              case "Awards & Recognitions":
                return UnorderedList;
              case "Certifications and Courses":
                return UnorderedList;
              case "Professional Experience":
                return UnorderedList;
              case "Educational Qualification":
                return UnorderedList;
              case "Credits":
                return CreditsTable;
              case "Project Experience":
                return ProjectsExperience;
              default:
                return <div>{JSON.stringify(data)}</div>;
            }
          })()}
        </OverlayPanel>
      </div>
    </>
  );
};

export default SeeOriginal;
