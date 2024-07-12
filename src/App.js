
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([])


  return (
    <div>
      <form>
        <input type="text" />
        <input type="number" />
        <div className="btns">
          <button >Создать</button>
          <button >Получить</button>
        </div>
      </form>
      <div>
        {users.map(user =>
          <div className="user">{user.id}. {user.username} {user.age}</div>
        )}
      </div>
    </div>
  );
}

export default App;
