import { Button } from "primereact/button";
import React, { useState, useRef } from "react";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import SeeOriginal from "./SeeOriginal";

const ProjectExperience = ({ projects, projectEmitter, originalProjects }) => {
  const [hoveredItem, setHoveredItem] = useState(false);
  const [hoveredDialogItem, setHoveredDialogItem] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [projectExperience, setProjectExperience] = useState(projects);
  const projectExperienceListRef = useRef(null);
  const [projectResponsibility, setProjectResponsibility] = useState(null);
  const [selectedResponsibility, setSelectedResponsibility] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [savedProjectExperience, setSavedProjectExperience] = useState(
    projects.map((p) => ({
      ...p,
      responsibilities: [...(p.responsibilities || [])],
    }))
  );

  const handleEditClick = () => {
    setVisible(true);
  };

  const handleDialogEditClick = (index) => {
    setSelectedProjectIndex(index);
    setProjectResponsibility([...projectExperience[index].responsibilities]);
    setDialogVisible(true);
  };

  const handleReset = () => {
    const reset = savedProjectExperience.map((p) => ({
      ...p,
      responsibilities: [...p.responsibilities],
    }));
    setProjectExperience(reset);
  };

  const handleSave = () => {
    const updatedProjects = projectExperience.map((p) => ({
      ...p,
      responsibilities: [...p.responsibilities],
    }));
    setSavedProjectExperience(updatedProjects);

    setProjectExperience(projectExperience);
    projectEmitter(projectExperience);
    setVisible(false);
  };

  const handleChange = (value, field, index) => {
    const updated = [...projectExperience];
    updated[index][field] = value;
    setProjectExperience(updated);
  };

  const onResponsibilityChanges = (e) => {
    const index = parseInt(e.target.name, 10);
    const updatedExperience = [...projectResponsibility];
    updatedExperience[index] = e.target.value;
    setProjectResponsibility(updatedExperience);
  };

  const toggleCheckbox = (index) => {
    const updatedSelections = [...selectedResponsibility];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedResponsibility(updatedSelections);
  };

  const handleDialogSave = () => {
    const filteredExperience = projectResponsibility?.filter(
      (exp) => exp.trim() !== ""
    );

    const updatedProjectExperience = [...projectExperience];
    updatedProjectExperience[selectedProjectIndex] = {
      ...updatedProjectExperience[selectedProjectIndex],
      responsibilities: filteredExperience,
    };
    setProjectExperience(updatedProjectExperience);
    projectEmitter(updatedProjectExperience);
    setDialogVisible(false);
  };

  const handleDialogReset = () => {
    setProjectResponsibility([
      ...projectExperience[selectedProjectIndex].responsibilities,
    ]);
  };

  const handleAddProjectResponsibility = () => {
    setProjectResponsibility([...projectResponsibility, ""]);
    setTimeout(() => {
      if (projectExperienceListRef.current) {
        projectExperienceListRef.current.scrollTop =
          projectExperienceListRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleDeleteSelected = () => {
    const newResponsibilities = projectResponsibility.filter(
      (_, index) => !selectedResponsibility[index]
    );
    const newSelections = selectedResponsibility.filter(
      (selected) => !selected
    );
    setProjectResponsibility(newResponsibilities);
    setSelectedResponsibility(newSelections);
  };

  const headerElement = (
    <SeeOriginal
      data={originalProjects}
      title="Project Experience"
      width="85vw"
    ></SeeOriginal>
  );

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
                            Responsibilities:
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
          style={{ width: "85vw", height: "90vh" }}
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
            <div style={{ overflowY: "auto" }}>
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
                        width="35%"
                      >
                        <table width={"100%"}>
                          <tbody>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bold" }}>
                                  Client:
                                </span>
                              </td>
                              <td>
                                <InputText
                                  value={exp.client}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      "client",
                                      index
                                    )
                                  }
                                  style={{
                                    height: 30,
                                    width: "100%",
                                    borderRadius: 0,
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bold" }}>
                                  Project:
                                </span>
                              </td>
                              <td>
                                <InputText
                                  value={exp.project}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      "project",
                                      index
                                    )
                                  }
                                  style={{
                                    height: 30,
                                    width: "100%",
                                    borderRadius: 0,
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bold" }}>
                                  Location:
                                </span>
                              </td>
                              <td>
                                <InputText
                                  value={exp.location}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      "location",
                                      index
                                    )
                                  }
                                  style={{
                                    height: 30,
                                    width: "100%",
                                    borderRadius: 0,
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bold" }}>
                                  Role:
                                </span>{" "}
                              </td>
                              <td>
                                <InputText
                                  value={exp.role}
                                  onChange={(e) =>
                                    handleChange(e.target.value, "role", index)
                                  }
                                  style={{
                                    height: 30,
                                    width: "100%",
                                    borderRadius: 0,
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bold" }}>
                                  Duration:
                                </span>
                              </td>
                              <td>
                                <InputText
                                  value={exp.duration}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      "duration",
                                      index
                                    )
                                  }
                                  style={{
                                    height: 30,
                                    width: "100%",
                                    borderRadius: 0,
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bold" }}>
                                  Tools:
                                </span>
                              </td>
                              <td>
                                <InputText
                                  value={exp.tools}
                                  onChange={(e) =>
                                    handleChange(e.target.value, "tools", index)
                                  }
                                  style={{
                                    height: 30,
                                    width: "100%",
                                    borderRadius: 0,
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                            <InputTextarea
                              key={index}
                              name={index}
                              autoResize="false"
                              value={exp.description}
                              onChange={(e) =>
                                handleChange(
                                  e.target.value,
                                  "description",
                                  index
                                )
                              }
                              style={{
                                resize: "none",
                                padding: 0,
                                borderRadius: 0,
                                width: "100%",
                                maxHeight: "5rem",
                                overflowY: "auto",
                              }}
                            />
                          </div>
                          <div
                            onMouseEnter={() => setHoveredDialogItem(true)}
                            onMouseLeave={() => setHoveredDialogItem(false)}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                width: "100%",
                              }}
                            >
                              <div style={{ fontWeight: "bold" }}>
                                Responsibilities:
                              </div>
                              {hoveredDialogItem && (
                                <i
                                  className="pi pi-pencil"
                                  onClick={() => handleDialogEditClick(index)}
                                  style={{
                                    fontSize: "1.05rem",
                                    color: "gray",
                                    cursor: "pointer",
                                    alignSelf: "flex-start",
                                    paddingLeft: 10,
                                  }}
                                ></i>
                              )}
                            </div>
                            <ul>
                              {exp.responsibilities?.map(
                                (skill, skillIndex) => (
                                  <li key={skillIndex}>{skill}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
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

        <Dialog
          header="Responsibility"
          visible={dialogVisible}
          style={{ width: "60vw", height: "80vh" }}
          onHide={() => {
            if (!dialogVisible) return;
            handleDialogReset();
            setDialogVisible(false);
          }}
        >
          <div
            style={{
              padding: "1rem",
              paddingTop: "0",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              height: "95%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                overflowY: "auto",
                marginBottom: "1rem",
              }}
              ref={projectExperienceListRef}
            >
              {projectResponsibility?.map((skill, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                  key={index}
                >
                  <Checkbox
                    style={{ marginRight: "1rem" }}
                    checked={selectedResponsibility[index] || false}
                    onChange={() => toggleCheckbox(index)}
                  />
                  <InputTextarea
                    key={index}
                    rows={2}
                    cols={107}
                    name={index}
                    autoResize="false"
                    value={skill}
                    onChange={onResponsibilityChanges}
                    style={{ resize: "none" }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Button
                  label="Save"
                  outlined
                  style={{
                    width: "122px",
                    borderRadius: "5px",
                    borderColor: "#c2257c",
                    color: "#c2257c",
                    marginRight: "1rem",
                  }}
                  onClick={handleDialogSave}
                />
                <Button
                  label="Reset"
                  outlined
                  style={{
                    width: "122px",
                    borderRadius: "5px",
                    borderColor: "#1a4879",
                    color: "#1a4879",
                    marginRight: "1rem",
                  }}
                  onClick={handleDialogReset}
                />
              </div>
              <div>
                <Button
                  label="Add Responsibility"
                  outlined
                  style={{
                    width: "200px",
                    borderRadius: "5px",
                    borderColor: "#4ade80",
                    background: "#4ade80",
                    color: "white",
                    marginRight: "1rem",
                  }}
                  onClick={() => handleAddProjectResponsibility()}
                />
                <Button
                  disabled={selectedResponsibility.length === 0}
                  label="Delete Selected"
                  style={{
                    width: "180px",
                    borderRadius: "5px",
                    borderColor: "#f55442",
                    background: "#f55442",
                    color: "white",
                  }}
                  onClick={handleDeleteSelected}
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ProjectExperience;
