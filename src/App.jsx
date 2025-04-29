import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import ResumeEditor from "./components/ResumeEditor";
import "./App.css";
import SkillsCard from "./components/SkillsCard";
import FullPageSpinner from "./components/FullPageSpinner";

const navStyle = {
  display: "flex",
  alignItems: "center",
  marginTop: "1rem",
};

function App() {
  const toast = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [schemaStructured, setSchemaStructured] = useState(null);
  const [rawStructured, setRawStructured] = useState(null);
  const [requiredSkills, setRequiredSkills] = useState(null);
  const [matchedSills, setMatchedSills] = useState(null);

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 5 * 1024 * 1024;

  const onFileSelect = async (event) => {
    const file = event.files[0];
    if (!allowedTypes.includes(file.type)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid file type. Please upload a PDF or Word document.",
      });
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "File size exceeds 5 MB.",
      });
      return;
    }

    // If valid, proceed with logic
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Extracting data from " + file.name + ".\n Please wait...",
    });

    // set file name and size
    setFile(file);
    setSchemaStructured(null);
    setMatchedSills(null);
    setRequiredSkills(null);

    // Extract data from the file
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    Promise.all([
      fetch("http://localhost:8080/api/resume/parse", {
        method: "POST",
        body: formData,
      }),
      fetch("http://localhost:8080/api/resume/parse-raw-resume", {
        method: "POST",
        body: formData,
      }),
    ])
      .then(async ([response1, response2]) => {
        const data = await response1?.json();
        const rawData = await response2?.json();

        if (response1 && data) {
          const mappedSchema = {
            headers: data.headers || {},
            professionalSummary: data.professionalSummary || "",
            professionalExperience: data.professionalExperience || [],
            awards: data.awards || [],
            certifications: data.certifications || [],
            education: data.education || [],
            credits: data.credits || [],
            projectExperience: data.projectExperience || [],
          };
          setSchemaStructured(mappedSchema);
        }

        if (response2 && rawData) {
          const rawMappedSchema = {
            headers: rawData.headers || {},
            professionalSummary: rawData.professionalSummary || "",
            professionalExperience: rawData.professionalExperience || [],
            awards: rawData.awards || [],
            certifications: rawData.certifications || [],
            education: rawData.education || [],
            credits: rawData.credits || [],
            projectExperience: rawData.projectExperience || [],
          };
          setRawStructured(rawMappedSchema);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error during API calls:", error);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          matchSkills();
        }, 0);
      });
  };

  const matchSkills = async () => {
    const resumeDataTemp = schemaStructured;
    const jobDescription = `Job Title: Senior Software Developer
Experience: 5 to 9 Years
Location: [Your Location or "Remote"]
Employment Type: Full-time

Job Summary:
We are looking for a passionate and skilled Senior Software Developer with 5–9 years of experience to join our dynamic team. The ideal candidate will have strong expertise in Spring Boot, React, and Angular, along with a solid understanding of software design patterns, unit and integration testing, and experience working with cloud technologies (AWS, Azure, or GCP).

You will play a key role in designing and developing scalable applications, collaborating with cross-functional teams, and contributing to the overall architecture and engineering best practices.

Key Responsibilities:
Design, develop, and maintain backend services using Spring Boot

Develop responsive and dynamic frontend applications using React and Angular

Collaborate with product owners, architects, and QA to understand requirements and deliver high-quality features

Apply design patterns and best practices to build robust and maintainable code

Write and maintain unit, integration, and end-to-end tests

Participate in code reviews, design discussions, and sprint planning

Deploy and maintain applications on cloud platforms (AWS/Azure/GCP)

Ensure performance, security, and scalability of applications

Mentor junior developers and contribute to team growth

Required Skills:
5 to 9 years of hands-on experience in software development

Strong proficiency in Java, Spring Boot, and RESTful API development

Experience with React and Angular (must be comfortable with both frameworks)

Solid understanding of object-oriented design and design patterns

Experience with unit testing frameworks (e.g., JUnit, Mockito) and frontend testing (e.g., Jest, Cypress)

Experience with CI/CD pipelines and DevOps practices

Good knowledge of cloud services (AWS, Azure, or GCP)

Familiarity with containerization technologies (e.g., Docker, Kubernetes) is a plus

Excellent problem-solving skills and a proactive attitude

Nice to Have:
Experience in microservices architecture

Exposure to monitoring and logging tools (e.g., Prometheus, Grafana, ELK)

Knowledge of Agile/Scrum methodologies

Familiarity with GraphQL or WebSocket-based communication

Education:
Bachelor’s or Master’s degree in Computer Science, Engineering, or a related field`;

    // setLoading(true);
    // await fetch("http://localhost:8080/api/resume/extract-skills", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     resumeData: resumeDataTemp,
    //     jobDescription: jobDescription,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     toast.current.show({
    //       severity: "success",
    //       summary: "Success",
    //       detail: "Refresh skills match insights successfully",
    //     });
    //     setLoading(false);
    //     const requiredSkills = data.requiredSkills;
    //     const matchedSkills = data.matchedSkills;
    //     setRequiredSkills(requiredSkills);
    //     setMatchedSills(matchedSkills);
    //   })
    //   .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {loading && <FullPageSpinner />}
      <Toast ref={toast}></Toast>
      <div style={{ marginBottom: "1rem" }}>
        <nav style={navStyle}>
          <Image
            src="src/assets/Maveric_Systems_Logo.jpg"
            alt="Image"
            width="250"
            className="col-md-5"
            style={{ marginLeft: "2rem" }}
          />
          <div style={{ margin: 0, textAlign: "center", fontSize: "2rem" }}>
            <span style={{ color: "#1a4879" }}>Resume </span>
            <span style={{ color: "#c2257c" }}>Standardizer</span>
          </div>
        </nav>
      </div>
      <div style={{ margin: "0 2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Card
            title="Upload Resume"
            style={{ backgroundColor: "#f1f1f1", color: "#1a4879" }}
          >
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FileUpload
                mode="basic"
                name="demo[]"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onSelect={onFileSelect}
                auto
                chooseLabel="Browse"
                style={{
                  marginRight: "2rem",
                  backgroundColor: "#f1f1f1",
                  borderRadius: "5px",
                  borderColor: "#1a4879",
                  color: "red",
                }}
              />
              <div>
                <p style={{ marginTop: "1rem" }}>
                  <span style={{ marginRight: "1rem" }}>File Name:</span>
                  {file ? file.name : "No file selected"}
                  <br />
                  <span style={{ marginRight: "1.5rem" }}>File Size:</span>
                  {file ? file.size / 1024 : 0} KB
                </p>
              </div>
            </div>
            {schemaStructured && (
              <Button
                label="Remove file"
                outlined
                onClick={() => {
                  setFile(null);
                  setMatchedSills(null);
                  setRequiredSkills(null);
                  setSchemaStructured(null);
                  toast.current.show({
                    severity: "warn",
                    summary: "Success",
                    detail: "File removed successfully",
                  });
                }}
                style={{
                  width: "140px",
                  borderRadius: "5px",
                  borderColor: "#c2257c",
                  color: "#c2257c",
                }}
              />
            )}
          </Card>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Card
            title="Preview Resume"
            style={{ backgroundColor: "#f1f1f1", color: "#1a4879" }}
          >
            {schemaStructured && (
              <ResumeEditor data={schemaStructured} rawData={rawStructured} />
            )}
            {!schemaStructured && (
              <div style={{ textAlign: "center" }}>no file selected</div>
            )}
          </Card>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Card
            title="Skill Match Insights"
            style={{ backgroundColor: "#f1f1f1", color: "#1a4879" }}
          >
            {requiredSkills && matchedSills && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4rem",
                }}
              >
                <SkillsCard
                  requiredSkills={requiredSkills}
                  matchedSkills={matchedSills}
                />
                <Button
                  onClick={matchSkills}
                  label="Refresh Insights"
                  outlined
                  style={{
                    marginTop: "1rem",
                    width: "200px",
                    height: "50px",
                    marginLeft: "1rem",
                    borderRadius: "5px",
                    borderColor: "#1a4879",
                    color: "#1a4879",
                    alignSelf: "center",
                  }}
                />
              </div>
            )}
            {!schemaStructured && (
              <div style={{ textAlign: "center" }}>no file selected</div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
