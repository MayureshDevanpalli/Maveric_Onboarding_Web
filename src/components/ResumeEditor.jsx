import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import Header from "./Header";
import { Toast } from "primereact/toast";
import ProfessionalSummary from "./ProfessionalSummary";
import ProfessionalExperience from "./ProfessionalExperience";
import CertificationsAndCourses from "./CertificationsAndCourses";
import EducationAndQualifications from "./EducationAndQualifications";
import Credits from "./Credits";
import ProjectExperience from "./ProjectExperience";
import FullPageSpinner from "./FullPageSpinner";

const ResumeEditor = ({ data }) => {
  const [schemaStructured, setSchemaStructured] = useState(data);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const downloadResume = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/resume/download-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schemaStructured),
    })
      .then((response) => {
        const fileName =
          response.headers.get("X-Filename") || "downloaded-file.docx";
        return response.blob().then((blob) => ({ blob, fileName }));
      })
      .then(({ blob, fileName }) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Downloading Resume .....",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading(false);
      });
  };

  const onHeaderChanges = (updatedHeaders) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      headers: updatedHeaders,
    }));
  };

  const onSummaryChanges = (updatedSummary) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      professionalSummary: updatedSummary,
    }));
  };

  const onExperienceChanges = (updatedExperience) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      professionalExperience: updatedExperience,
    }));
  };

  return (
    <>
      {loading && <FullPageSpinner />}
      <Toast ref={toast}></Toast>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "black",
        }}
      >
        <Header
          headers={schemaStructured.headers}
          headersEmitter={onHeaderChanges}
        ></Header>
        <ProfessionalSummary
          summary={schemaStructured.professionalSummary}
          summaryEmitter={onSummaryChanges}
        ></ProfessionalSummary>
        <ProfessionalExperience
          experience={schemaStructured.professionalExperience}
          experienceEmitter={onExperienceChanges}
        ></ProfessionalExperience>
        <CertificationsAndCourses
          certs={schemaStructured.certifications}
        ></CertificationsAndCourses>
        <EducationAndQualifications
          eduList={schemaStructured.education}
        ></EducationAndQualifications>
        <Credits creditMap={schemaStructured.credits}></Credits>
        <ProjectExperience
          experience={schemaStructured.projectExperience}
        ></ProjectExperience>
        <Button
          onClick={downloadResume}
          label="Download Resume"
          outlined
          style={{
            marginTop: "1rem",
            width: "200px",
            height: "50px",
            marginLeft: "1rem",
            borderRadius: "5px",
            borderColor: "#1a4879",
            color: "#1a4879",
          }}
        />
      </div>
    </>
  );
};

export default ResumeEditor;
