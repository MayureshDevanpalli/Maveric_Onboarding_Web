import { Button } from "primereact/button";
import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import "primeicons/primeicons.css";
import { Checkbox } from "primereact/checkbox";

const ProfessionalExperience = ({ experience, experienceEmitter }) => {
  const [visible, setVisible] = useState(false);
  const [professionalExperience, setProfessionalExperience] =
    useState(experience);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(false);
  const experienceListRef = useRef(null);

  const handleSave = () => {
    setVisible(false);
    const filteredExperience = professionalExperience.filter(
      (exp) => exp.trim() !== ""
    );
    setProfessionalExperience(filteredExperience);
    experienceEmitter(professionalExperience);
  };

  const onExperienceChanges = (e) => {
    const index = parseInt(e.target.name, 10);
    const updatedExperience = [...professionalExperience];
    updatedExperience[index] = e.target.value;
    setProfessionalExperience(updatedExperience);
  };

  const handleReset = () => {
    setProfessionalExperience(experience);
  };

  const handleAddExperience = () => {
    setProfessionalExperience([...professionalExperience, ""]);
    setTimeout(() => {
      if (experienceListRef.current) {
        experienceListRef.current.scrollTop =
          experienceListRef.current.scrollHeight;
      }
    }, 0);
  };

  const toggleCheckbox = (index) => {
    const updatedSelections = [...selectedExperiences];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedExperiences(updatedSelections);
  };

  const handleDeleteSelected = () => {
    const newExperiences = professionalExperience.filter(
      (_, index) => !selectedExperiences[index]
    );
    const newSelections = selectedExperiences.filter((selected) => !selected);
    setProfessionalExperience(newExperiences);
    setSelectedExperiences(newSelections);
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
            Professional Experience
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
            <div style={{ width: "98%", opacity: 0.8, fontSize: "1rem" }}>
              <ul>
                {professionalExperience.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
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
        <Dialog
          header="Professional Experience"
          visible={visible}
          style={{ width: "60vw", height: "80vh" }}
          onHide={() => {
            if (!visible) return;
            handleReset();
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
              height: "95%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                overflowY: "auto",
                marginBottom: "1rem",
              }}
              ref={experienceListRef}
            >
              {professionalExperience.map((skill, index) => (
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
                    checked={selectedExperiences[index] || false}
                    onChange={() => toggleCheckbox(index)}
                  ></Checkbox>
                  <InputTextarea
                    key={index}
                    rows={2}
                    cols={107}
                    name={index}
                    autoResize="false"
                    value={skill}
                    onChange={onExperienceChanges}
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
                    marginRight: "1rem",
                  }}
                  onClick={handleReset}
                />
              </div>
              <div>
                <Button
                  label="Add Experience"
                  outlined
                  style={{
                    width: "200px",
                    borderRadius: "5px",
                    borderColor: "#4ade80",
                    background: "#4ade80",
                    color: "white",
                    marginRight: "1rem",
                  }}
                  onClick={handleAddExperience}
                />
                <Button
                  disabled={selectedExperiences.length === 0}
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

export default ProfessionalExperience;
