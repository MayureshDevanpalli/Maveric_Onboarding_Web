import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

const SeeOriginal = ({ data, title, width }) => {
  console.log(data);

  const op = useRef(null);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>{title}</span>
        <Button
          label="See Original"
          outlined
          style={{
            width: "70px",
            padding: "1px",
            borderRadius: "5px",
            borderColor: "#c2257c",
            color: "#c2257c",
            fontSize: "10px",
          }}
          onClick={(e) => op.current.toggle(e)}
        ></Button>
        <OverlayPanel ref={op} style={{ width: width }}>
          {(() => {
            switch (title) {
              case "Professional Summary":
                return <div>{data}</div>;
              case "Awards & Recognition":
                return <div>{data}</div>;
              case "Certifications and Courses":
                return <div>{data}</div>;
              case "Project Experience":
                return <div>{JSON.stringify(data)}</div>;
              case "Professional Experience":
                return (
                  <ul>
                    {data.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                );
              case "Credits":
                return <div>{data}</div>;
              default:
                return <div>{data}</div>;
            }
          })()}
        </OverlayPanel>
      </div>
    </>
  );
};

export default SeeOriginal;
