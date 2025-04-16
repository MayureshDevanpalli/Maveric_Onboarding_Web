import { Tag } from "primereact/tag";
import { Knob } from "primereact/knob";
import { Divider } from "primereact/divider";

const SkillsCard = ({ requiredSkills, candidateSkills }) => {
  const matchedSkills = requiredSkills.filter((skill) =>
    candidateSkills.includes(skill)
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !candidateSkills.includes(skill)
  );

  const totalMatch = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  const getKnobColor = (percent) => {
    switch (true) {
      case percent <= 33:
        return "#ef4444";
      case percent <= 66:
        return "#f0a646";
      default:
        return "#22c55e";
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <h6
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            Match Percentage
          </h6>
          <Knob
            value={totalMatch}
            style={{ alignSelf: "center" }}
            valueColor={getKnobColor(totalMatch)}
          />
        </div>
        <Divider layout="vertical" />
        <div
          style={{
            width: "20vw",
          }}
        >
          <h6
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            Required Skills
          </h6>
          {requiredSkills.length > 0 ? (
            requiredSkills.map((skill) => (
              <Tag key={skill} value={skill} className="mr-2 mb-2" />
            ))
          ) : (
            <p>No required skills</p>
          )}
        </div>
        <Divider layout="vertical" />
        <div style={{ width: "20vw" }}>
          <h6
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            Matched Skills
          </h6>
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill) => (
              <Tag
                key={skill}
                value={skill}
                severity="success"
                className="mr-2 mb-2"
              />
            ))
          ) : (
            <p>No matched skills</p>
          )}
        </div>
        <Divider layout="vertical" />
        <div style={{ width: "20vw" }}>
          <h6 style={{ display: "flex", justifyContent: "center" }}>
            Missing Skills
          </h6>
          {missingSkills.length > 0 ? (
            missingSkills.map((skill) => (
              <Tag
                key={skill}
                value={skill}
                severity="danger"
                className="mr-2 mb-2"
              />
            ))
          ) : (
            <p>No missing skills</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SkillsCard;
