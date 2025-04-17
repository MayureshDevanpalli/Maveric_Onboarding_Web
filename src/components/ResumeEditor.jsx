import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import data from "../data/resumeData.json";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import Header from "./Header";
import ProfessionalSummary from "./ProfessionalSummary";
import ProfessionalExperience from "./ProfessionalExperience";
import CertificationsAndCourses from "./CertificationsAndCourses";
import EducationAndQualifications from "./EducationAndQualifications";
import Credits from "./Credits";
import ProjectExperience from "./ProjectExperience";

const ResumeEditor = ({ data }) => {
  const [schemaStructured, setSchemaStructured] = useState(data);
  const sectionRef = useRef();

  const handleExport = async () => {
    const text = sectionRef.current?.innerText;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(text)],
            }),
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "section.docx");
  };

  const onHeaderChanges = (updatedHeaders) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      headers: updatedHeaders, // Only update the 'user' key
    }));
  };

  const onSummaryChanges = (updatedSummary) => {
    setSchemaStructured((prevData) => ({
      ...prevData,
      professionalSummary: updatedSummary, // Only update the 'user' key
    }));
  };

  console.log("schemaStructured", schemaStructured);

  return (
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
      <ProfessionalExperience></ProfessionalExperience>
      <CertificationsAndCourses></CertificationsAndCourses>
      <EducationAndQualifications></EducationAndQualifications>
      <Credits></Credits>
      <ProjectExperience></ProjectExperience>
      <Button
        onClick={handleExport}
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
  );
};

export default ResumeEditor;
