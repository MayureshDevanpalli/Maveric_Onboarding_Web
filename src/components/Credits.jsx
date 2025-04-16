import { useState } from "react";
import { Button } from "primereact/button";

const Credits = () => {
  const [credits, setCredits] = useState([
    {
      category: "Primary Skills",
      items: [
        "Finacle 10x Customization (Finacle scripting and ONS Services)",
        "Jasper Reports",
        "Unix, Shell Script",
        "Oracle SQL,PL/SQL",
        "Java, JavaScript, HTML, CSS",
      ],
    },
    {
      category: "Secondary skills",
      items: [
        "Finacle architecture",
        "Finacle services",
        "Finacle Core and CRM customization",
        "Connect 24",
        "FI",
        "Payments",
        "Tools: SQL Developer, DBvear,Putty,Eclipse, Intellij, VS Code, Git, Bitbucket, Jira, Confluence, SVN, RocketLane",
      ],
    },
    {
      category: "SOFT SKILLS",
      items: [
        "Leadership Qualities",
        "Good listening, presentation and communication skill",
        "Honest towards the task undertaken",
      ],
    },
  ]);

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
            Credits
          </div>
          <div>
            <table
              className="table table-bordered"
              style={{ borderColor: "black" }}
            >
              <tbody>
                {credits.map((credit, index) => (
                  <tr key={index}>
                    <td
                      scope="row"
                      style={{ backgroundColor: "lightGrey" }}
                      width="30%"
                    >
                      <div>
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            {credit.category}:
                          </span>{" "}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{credit.items.join(", ")}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/*<Button
          label="Edit Credits"
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

export default Credits;
