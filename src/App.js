import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepo(){
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    loadRepo();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: 'Desafio ReactJS',
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"],
    };
    const { data, status } = await api.post('/repositories', repository);
    if(status === 201){
      setRepositories([...repositories, data]);
    }    
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`);
    if(status === 204){
      setRepositories(repositories.filter(item => item.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
