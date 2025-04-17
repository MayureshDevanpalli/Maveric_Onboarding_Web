import { useState } from "react";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

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
  const [hoveredItem, setHoveredItem] = useState(false);

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
            }}
            onMouseEnter={() => setHoveredItem(true)}
            onMouseLeave={() => setHoveredItem(false)}
          >
            <div style={{ width: '98%', opacity: 0.8, fontSize: '1rem' }}>
              <ul>
                {certificates.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div style={{ width: '2%', display: 'flex', justifyContent: 'flex-end' }}>
              {hoveredItem && (
                <i
                  className="pi pi-pencil"
                  onClick={() => setVisible(true)}
                  style={{
                    fontSize: "1.1rem",
                    color: "gray",
                    cursor: "pointer",
                    alignSelf: 'flex-start'
                  }}
                ></i>
              )}
            </div>
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
