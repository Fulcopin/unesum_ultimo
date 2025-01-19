import React, { useState } from 'react';
import ProjectSelection from './components/ProjectSelection';
import ScoringForm from './components/ScoringForm';

// ...existing code...

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    { id: '1', name: 'Project 1' },
    { id: '2', name: 'Project 2' },
    // ...other projects...
  ]);

  const handleProjectSelect = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
  };

  const handleScoreSubmit = (project, score) => {
    console.log(`Project: ${project.name}, Score: ${score}`);
    // Handle score submission logic here
  };

  return (
    <div>
      <h1>Project Selection</h1>
      <ProjectSelection projects={projects} onSelect={handleProjectSelect} />
      {selectedProject && (
        <div>
          <h2>Selected Project: {selectedProject.name}</h2>
          {/* Render project details or grading component here */}
        </div>
      )}
      <h1>Project Scoring</h1>
      <ScoringForm projects={projects} onScoreSubmit={handleScoreSubmit} />
    </div>
  );
};

export default App;
