import { useState } from "react";
import { Button } from "primereact/button";

const EducationAndQualifications = () => {
  const [education, setEducation] = useState([
    "2014: B.Tech | LPU, Punjab",
    "2019: PGDM | MIT, Pune",
  ]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",
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
            Educational Qualification
          </div>
          <div>
            <ul>
              {education.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        {/*<Button
          label="Edit Education"
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
        />>*/}
      </div>
    </>
  );
};

export default EducationAndQualifications;
