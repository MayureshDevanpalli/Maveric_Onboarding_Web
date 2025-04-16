import { Button } from "primereact/button";
import { use, useState } from "react";
import React, { forwardRef } from "react";
import 'primeicons/primeicons.css';

const ProjectExperience = forwardRef((props, ref) => {
  const [hoveredItem, setHoveredItem] = useState(false);
  const [projectExperience, setProjectExperience] = useState([
    {
      client: "CustomerXPs Software Pvt Lmt",
      Project: "Finacle core Customization",
      role: "Software Engineer",
      location: "Bangalore - Offshore",
      duration: "Aug-2024 to Present",
      tools: ["Finacle", "Clari5"],
      description:
        "Working on Finacle core Customization where bank required any transaction or process to be prevented or monitored from Fraud and Ani-Money laundry.Requirement gathering, analysis, Solution Development, communication between other teams to bank and vice versa.Building solution to integrate Finacle with Clari5(Fraud and Anti-money laundry monitoring and prevention) application.Working on project implementation and managements.",
      responsibilities: [
        "Requirement gathering",
        "Analysis",
        "Solution Development",
        "Integration with Clari5",
        "Project implementation and management",
      ],
    },
    {
      client: "Infosys",
      Project: "Finacle Product and Core customization",
      role: "Software Engineer",
      location: "Bangalore (Standard Bank, Tanzania) - Offshore",
      duration: "Jan 24– Aug 24",
      tools: ["Finacle"],
      description:
        "Worked on Finacle Product and Core customization to collect the charges for both financial and non-financial services provided by bank as bank wanted to decommission TBMS application which has been used for charges collection for all servicesDeveloped and implemented pricing module in Finacle Core.Requirement Analysis, Solution Development, Co-ordination and Client Interaction with respect to clearing module and giving walkthrough and demos of built solutions.Supported UAT testing with Testing team, Production deployment.",
      responsibilities: [
        "Requirement Analysis",
        "Solution Development",
        "Coordination",
        "Client Interaction",
        "UAT testing support",
        "Production deployment",
      ],
    },
    {
      client: "BankOne Bank",
      Project: "CRM Customization",
      role: "Software Engineer",
      location: "Mauritius - Offshore",
      duration: "Nov 23 - Jan 24",
      tools: ["Finacle CRM"],
      description:
        "Worked on CRM Customization. Requirement Analysis, Solution Development, Co-ordination and Client Interaction with respect to clearing module.Supported in UAT testing with Testing team and production deployment.",
      responsibilities: [
        "Requirement Analysis",
        "Solution Development",
        "Coordination",
        "Client Interaction",
        "UAT testing support",
        "Production deployment",
      ],
    },
    {
      client: "Deusche Bank",
      Project: "Various FI and Core/CRM Customizations",
      role: "Software Engineer",
      location: "Mumbai",
      duration: "Mar 21 – Nov 23",
      tools: ["PL/SQL", "Finacle"],
      description:
        "Worked in the Agile Methodology to deliver requirements.Developed several Packages, Procedures and Functions using PL/SQL as per requirement to use in multiple series of other backend programs using PL/SQL.Requirement Analysis, Solution Development, Co-ordination and Client Interaction with respect to clearing module.Done various FI Customization to integrate other application with Finacle.Done various Core and CRM Customization as per the client’s requirements.Enhancement of the existing customizations to meet the end user expectations and query optimization.Developed Custom menus, Custom batch jobs, product customizations for various modules and report development using MRT.Worked on analyzing, debugging and fixing production issues.",
      responsibilities: [
        "Requirement Analysis",
        "Solution Development",
        "PL/SQL Development",
        "FI Customization",
        "Core and CRM Customization",
        "Issue Resolution",
      ],
    },
    {
      client: "UCO Bank",
      Project: "Finacle 10x Core Customization",
      role: "Software Engineer",
      location: "Offshore",
      duration: "Jul 20 – Feb 21",
      tools: ["Finacle 10x", "JavaScript", "JSP", "i-report", "PL/SQL", "SQL"],
      description:
        "Finacle 10x Core Customization DevelopmentApplet Menu customization and development using Finacle scripting, JavaScript and JSPCreation of new custom menu for data capturing.Report development using i-report toolCoded PL/SQL sub-programs and modified the existing PL/SQL programWritten SQL scripts to create database objects like tables and viewsCreation, Compilation, Execution of shell scripts",
      responsibilities: [
        "Finacle Customization",
        "Applet Menu Development",
        "Report Development",
        "PL/SQL Programming",
        "SQL Scripting",
        "Shell Scripting",
      ],
    },
    {
      client: "BOI",
      Project: "Custom Menu Development and Finacle Customization",
      role: "Software Engineer",
      location: "Mumbai, India",
      duration: "Apr 20 – Jun 20",
      tools: ["Finacle", "PL/SQL", "Shell Scripting"],
      description:
        "Development of Custom Menus.Worked on Finacle scripting and ONS Customization.Worked on PL/SQL, Shell Scripting and Finacle Scripting.Debugging the issues in developed custom menus.Done Unit testing for the customizations developed.Worked on product services, MTT and MRT.",
      responsibilities: [
        "Custom Menu Development",
        "Finacle Scripting",
        "PL/SQL Development",
        "Shell Scripting",
        "Debugging",
        "Unit Testing",
      ],
    },
  ]);

  return (
    <>
      <div style={{ display: "flex" }} ref={ref}>
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
            Project Experience
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
          <div style={{ width: '98%'}}>
            <table
              className="table table-bordered"
              style={{ borderColor: "black" }}
            >
              <tbody>
                {projectExperience.map((exp, index) => (
                  <tr key={index}>
                    <td
                      scope="row"
                      style={{ backgroundColor: "lightGrey" }}
                      width="30%"
                    >
                      <div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Client:</span>{" "}
                          {exp.client}
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Project:</span>{" "}
                          {exp.project}
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                          {exp.location}
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Role:</span>{" "}
                          {exp.role}
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Duration:</span>{" "}
                          {exp.duration}
                        </div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>Tools:</span>{" "}
                          {exp.tools.join(", ")}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: "bold" }}>Description:</div>
                        <div
                          style={{
                            marginBottom: "1rem",
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                            textAlign: "justify",
                          }}
                        >
                          {exp.description}
                        </div>
                        <div style={{ fontWeight: "bold" }}>
                          Responsibilities:{" "}
                        </div>
                        <ul>
                          {exp.responsibilities.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        />*/}
      </div>
    </>
  );
});

export default ProjectExperience;
