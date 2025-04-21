export const ProjectExperience = {
  client: "",
  project: "",
  role: "",
  location: "",
  duration: "",
  description: "",
  responsibilities: [],
  tools: [],
};

export const Headers = {
  candidateName: "",
  candidatePosition: "",
};

export const Credits = [
  {
    category: "",
    items: [],
  },
];

export const SchemaStructured = {
  headers: Headers,
  professionalSummary: "",
  professionalExperience: [],
  awards: [],
  certifications: [],
  education: [],
  credits: [Credits],
  workExperience: [],
  projectExperience: [ProjectExperience],
};

const SkillRequest = {
  resumeData: SchemaStructured,
  jobDescription: "",
};

const SkillResponse = {
  requiredSills: [],
  matchedSills: [],
};
