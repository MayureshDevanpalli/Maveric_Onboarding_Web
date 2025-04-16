import { useState } from "react";
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

const EducationAndQualifications = () => {
  const [education, setEducation] = useState([
    "2014: B.Tech | LPU, Punjab",
    "2019: PGDM | MIT, Pune",
  ]);
  const [hoveredItem, setHoveredItem] = useState(false);


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
          {/* <div>
            <ul>
              {education.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div> */}

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
                {education.map((skill, index) => (
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
