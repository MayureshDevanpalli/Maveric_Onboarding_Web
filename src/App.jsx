import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import ResumeEditor from "./components/ResumeEditor";
import "./App.css";
import SkillsCard from "./components/SkillsCard";
import FullPageSpinner from "./components/FullPageSpinner";

// severity?: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'

const navStyle = {
  display: "flex",
  alignItems: "center",
  marginTop: "1rem",
};

function App() {
  const requiredSkills = [
    "JavaScript",
    "React",
    "AWS",
    "Docker",
    "GoLang",
    "Java",
    "Python",
    "NodeJS",
    "C++",
    "HTML",
    "CSS",
    "angular",
  ];
  const candidateSkills = [
    "React",
    "AWS",
    "Docker",
    "GoLang",
    "Java",
    "Python",
    "NodeJS",
    "C++",
    "HTML",
    "CSS",
    "angular",
  ];

  const toast = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [schemaStructured, setSchemaStructured] = useState(null);
  const editorRef = useRef();

  const handleSave = () => {
    const content = editorRef.current.innerText;
    console.log("Edited Content:", content);
    // Save to backend or further processing
  };

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 5 * 1024 * 1024;

  const onFileSelect = async (event) => {
    const file = event.files[0];
    if (!allowedTypes.includes(file.type)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid file type. Please upload a PDF or Word document.",
      });
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "File size exceeds 5 MB.",
      });
      return;
    }

    // If valid, proceed with logic
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Extracting data from " + file.name + ".\n Please wait...",
    });

    // set file name and size
    setFile(file);
    setSchemaStructured(null);

    // Extract data from the file
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/resume/parse", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const mappedSchema = {
        headers: data.headers || {},
        professionalSummary: data.professionalSummary || "",
        professionalExperience: data.professionalExperience || [],
        awards: data.awards || [],
        certifications: data.certifications || [],
        education: data.education || [],
        credits: data.credits || [],
        projectExperience: data.projectExperience || [],
      };

      setSchemaStructured(mappedSchema);
      setLoading(false);
      console.log("Success:", mappedSchema);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const refreshInsights = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Refresh insights coming soon",
    });
  };

  return (
    <>
      {loading && <FullPageSpinner />}
      <Toast ref={toast}></Toast>
      <div style={{ marginBottom: "1rem" }}>
        <nav style={navStyle}>
          <Image
            src="src/assets/Maveric_Systems_Logo.jpg"
            alt="Image"
            width="250"
            className="col-md-5"
            style={{ marginLeft: "2rem" }}
          />
          <div style={{ margin: 0, textAlign: "center", fontSize: "2rem" }}>
            <span style={{ color: "#1a4879" }}>Resume </span>
            <span style={{ color: "#c2257c" }}>Standardizer</span>
          </div>
        </nav>
      </div>
      <div style={{ margin: "0 2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Card
            title="Upload Resume"
            style={{ backgroundColor: "#f1f1f1", color: "#1a4879" }}
          >
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FileUpload
                mode="basic"
                name="demo[]"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onSelect={onFileSelect}
                auto
                chooseLabel="Browse"
                style={{
                  marginRight: "2rem",
                }}
              />
              <div>
                <p style={{ marginTop: "1rem" }}>
                  <span style={{ marginRight: "1rem" }}>File Name:</span>
                  {file ? file.name : "No file selected"}
                  <br />
                  <span style={{ marginRight: "1.5rem" }}>File Size:</span>
                  {file ? file.size / 1024 : 0} KB
                </p>
              </div>
            </div>
            {schemaStructured && (
              <Button
                label="Remove file"
                outlined
                onClick={() => {
                  setFile(null);
                  setSchemaStructured(null);
                  toast.current.show({
                    severity: "warn",
                    summary: "Success",
                    detail: "File removed successfully",
                  });
                }}
                style={{
                  width: "140px",
                  borderRadius: "5px",
                  borderColor: "#c2257c",
                  color: "#c2257c",
                }}
              />
            )}
          </Card>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Card
            title="Preview Resume"
            style={{ backgroundColor: "#f1f1f1", color: "#1a4879" }}
          >
            {schemaStructured && <ResumeEditor data={schemaStructured} />}
            {!schemaStructured && (
              <div style={{ textAlign: "center" }}>no file selected</div>
            )}
          </Card>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Card
            title="Skill Match Insights"
            style={{ backgroundColor: "#f1f1f1", color: "#1a4879" }}
          >
            {schemaStructured && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SkillsCard
                  requiredSkills={requiredSkills}
                  candidateSkills={candidateSkills}
                />
                <Button
                  onClick={refreshInsights}
                  label="Refresh Insights"
                  outlined
                  style={{
                    marginTop: "1rem",
                    width: "200px",
                    height: "50px",
                    marginLeft: "1rem",
                    borderRadius: "5px",
                    borderColor: "#1a4879",
                    color: "#1a4879",
                    alignSelf: "center",
                  }}
                />
              </div>
            )}
            {!schemaStructured && (
              <div style={{ textAlign: "center" }}>no file selected</div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
