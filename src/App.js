import React, { useState, useEffect } from "react";
import api from './services/api.js';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
                                "title": "Front-end ReactJs",
                                "url": "http://github.com/teste.git",
                                "techs": [
                                  "node.js",
                                  "reactjs"
                                ]
                              }
            ).then(response =>
              setRepositories([...repositories, response.data])
            );
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response =>
      setRepositories(repositories.filter(repo => repo.id !== id))
    );    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo =>
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
