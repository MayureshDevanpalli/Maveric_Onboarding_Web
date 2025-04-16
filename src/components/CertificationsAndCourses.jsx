import { useState } from "react";
import { Button } from "primereact/button";

const CertificationsAndCourses = () => {
  const [certificates, setCertificates] = useState([
    "PSPO Advanced",
    "PSM",
    "Google Agile Project Manager",
    "Infosys Agile Practitioner",
    "Tricentis Tosca Automation",
    "Tricentis RPA",
    "SAP",
    "Salesforce",
    "Azure Cloud",
  ]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "white",
            paddingBottom: "1rem",
            paddingTop: "1rem",
            paddingLeft: "5rem",
            paddingRight: "5rem",
            width: "85vw",
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
            Certifications and Courses
          </div>
          <div>
            <ul>
              {certificates.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        {/*<Button
          label="Edit Courses"
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

export default CertificationsAndCourses;
