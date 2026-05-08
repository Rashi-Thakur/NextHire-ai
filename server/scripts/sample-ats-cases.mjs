import { analyzeResumeAgainstJD } from "../src/services/ats.service.js";

const cases = [
  {
    name: "High Match Fullstack",
    resume: `John Doe email phone github linkedin
Education B.Tech Computer Science
Skills JavaScript TypeScript React Node.js Express MongoDB SQL Python Git REST API Communication Teamwork Problem Solving
Projects Built and deployed full stack web apps. Developed APIs and optimized performance.`,
    jd: `Looking for Full Stack Developer Intern. Required skills: JavaScript, React, Node.js, Express, MongoDB, REST API, Git, communication, teamwork, problem solving.
Responsibilities include building features, collaborating with team, and shipping production code.`,
  },
  {
    name: "Medium Match Backend",
    resume: `Aman Sharma email phone github linkedin
Education B.Tech IT
Skills Python Java MySQL Git HTML CSS
Projects Developed Flask APIs and database schemas. Built college portal with authentication.`,
    jd: `Backend Intern role requiring Node.js, Express, MongoDB, REST API, Git, Docker, AWS, communication and ownership.
Build scalable APIs and collaborate with cross-functional teams.`,
  },
  {
    name: "Low Match Domain Mismatch",
    resume: `Priya Singh email phone github linkedin
Education B.Tech Computer Science
Skills C C++ JavaScript Python Git DBMS Operating Systems
Projects Developed graph algorithms and Flask API mini projects.`,
    jd: `Hiring Fashion Merchandising Associate.
Required: retail buying, visual merchandising, vendor management, assortment planning, seasonal trend analysis, store operations, customer engagement, inventory planning.`,
  },
];

for (const c of cases) {
  const result = analyzeResumeAgainstJD(c.resume, c.jd);
  console.log(`\n=== ${c.name} ===`);
  console.log(JSON.stringify(result, null, 2));
}
