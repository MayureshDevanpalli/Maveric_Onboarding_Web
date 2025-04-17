import { Button } from "primereact/button";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import 'primeicons/primeicons.css';

const ProfessionalExperience = () => {
  const [visible, setVisible] = useState(false);
  const [professionalExperience, setProfessionalExperience] = useState([
    "Developed and implemented a pricing module in Finacle Core for Standard Bank, Tanzania, decommissioning their legacy TBMS application for charge collection.",
    "Integrated Finacle with Clari5 (fraud and anti-money laundering application) at CustomerXPs Software, preventing and monitoring fraudulent transactions.",
    "Customized CRM for BankOne Bank, Mauritius, handling requirement analysis, solution development, and client interaction.",
    "Worked in Agile methodology at Deutsche Bank, developing PL/SQL packages, procedures, and functions for various backend programs.",
    "Performed Finacle 10x Core Customization Development, applet menu customization, and report development for UCO Bank, creating custom menus for data capturing and optimizing PL/SQL programs",
  ]);
  const [hoveredItem, setHoveredItem] = useState(false);

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
          {/* <div>
            <ul>
              {professionalExperience.map((skill, index) => (
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
                {professionalExperience.map((skill, index) => (
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
          label="Edit Experience"
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
          onClick={() => setVisible(true)}
        />*/}
        <Dialog
          header="Professional Experience"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div className="p-1">
            {professionalExperience.map((skill, index) => (
              <InputTextarea
                key={index}
                rows={2}
                cols={77}
                autoResize="false"
                value={skill}
                style={{ resize: "none" }}
              />
            ))}
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ProfessionalExperience;
