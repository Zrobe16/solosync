import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', deadline: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects') // Update this URL later
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/projects', newProject) // Update this URL later
      .then(res => setProjects([...projects, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name} - {project.description}</li>
        ))}
      </ul>
      <h3>Add New Project</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={e => setNewProject({ ...newProject, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProject.description}
          onChange={e => setNewProject({ ...newProject, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Deadline"
          value={newProject.deadline}
          onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default ProjectManager;
