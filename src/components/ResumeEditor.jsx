import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import Header from "./Header";
import { Toast } from "primereact/toast";
import ProfessionalSummary from "./ProfessionalSummary";
import ProfessionalExperience from "./ProfessionalExperience";
import CertificationsAndCourses from "./CertificationsAndCourses";
import EducationAndQualifications from "./EducationAndQualifications";
import Credits from "./Credits";
import Awards from "./Awards";
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

  const onCertsChanges = (updatedCerts) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      certifications: updatedCerts,
    }));
  };

  const onEduListChanges = (updatedEduList) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      education: updatedEduList,
    }));
  };

  const onCreditsChanges = (updatedCredits) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      credits: updatedCredits,
    }));
  };

  const onProjectChanges = (updatedProjects) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      projectExperience: updatedProjects,
    }));
  };

  const onAwardsChanges = (updatedAwards) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      awards: updatedAwards,
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
        {schemaStructured.headers && <Header
          headers={schemaStructured.headers}
          originalHeaders={data.headers}
          headersEmitter={onHeaderChanges}>
        </Header>}
        {schemaStructured.professionalSummary && <ProfessionalSummary
          summary={schemaStructured.professionalSummary}
          originalSummary={data.professionalSummary}
          summaryEmitter={onSummaryChanges}>
        </ProfessionalSummary>}
        {schemaStructured.professionalExperience && schemaStructured.professionalExperience.length !== 0 &&
        <ProfessionalExperience
          experience={schemaStructured.professionalExperience}
          originalExperience={data.professionalExperience}
          experienceEmitter={onExperienceChanges}>
        </ProfessionalExperience>}
        {schemaStructured.awards && schemaStructured.awards.length !== 0 &&
        <Awards
          awards={schemaStructured.awards}
          originalAwards={data.awards}
          awardsEmitter={onAwardsChanges}>
        </Awards>}
        {schemaStructured.certifications && schemaStructured.certifications.length !== 0 && 
        <CertificationsAndCourses
          certs={schemaStructured.certifications}
          originalCertifications={data.certifications}
          certEmitter={onCertsChanges}>
        </CertificationsAndCourses>}
        {schemaStructured.education && schemaStructured.education.length !== 0 &&
        <EducationAndQualifications
          eduList={schemaStructured.education}
          eduListEmitter={onEduListChanges}
          originalEduList={data.education}>
        </EducationAndQualifications>}
        {schemaStructured.credits && schemaStructured.credits.length !== 0 &&
        <Credits
          creditMap={schemaStructured.credits}
          creditEmitter={onCreditsChanges}
          originalCredits={data.credits}>
        </Credits>}
        {schemaStructured.projectExperience && schemaStructured.projectExperience.length !== 0 &&
        <ProjectExperience
          projects={schemaStructured.projectExperience}
          originalProjects={data.projectExperience}
          projectEmitter={onProjectChanges}>
        </ProjectExperience>}
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
