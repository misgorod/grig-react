import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToggleButtonGroup, ToggleButton, Table } from 'react-bootstrap';

function JournalTable(props) {
  //console.log(props.groupId)
  const [journals, setJournals] = useState([])
  useEffect(() => {
    fetch(`http://localhost:8080/api/journals?group_id=${props.groupId}`)
    .then(res => res.json())
    .then(res => setJournals(res))
    .catch(err => console.log(err))
  }, [props.groupId])
  return <Table bordered>
  <thead>
  <tr>
    <th>#</th>
    <th>ФИО</th>
    <th>Предмет</th>
    <th>Тип</th>
    <th>Оценка</th>
  </tr>
  </thead>
  <tbody>
    {journals.map((journal, index) => {
      return <tr>
      <td>{index + 1}</td>
      <td>{journal.studentSurname + ' ' + journal.studentName + ' ' + journal.studentSecondName}</td>
      <td>{journal.subjectName}</td>
      <td>{journal.examType}</td>
      <td>{journal.markName}</td>
      </tr>
    })}
  </tbody>
  </Table>
}

function GroupTable() {
  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState(1)
  useEffect(() => {
    fetch("http://localhost:8080/api/groups")
    .then(res => res.json())
    .then(res => setGroups(res))
  }, [groupId])
  const listGroups = groups.map((group) => {
    return <ToggleButton key={group.groupId} value={group.groupId}>{group.groupName}</ToggleButton>
  });
  return (
    <div>
      <ToggleButtonGroup type="radio" name="group" value={groupId} onChange={setGroupId}>
        {listGroups}
      </ToggleButtonGroup>
      <JournalTable groupId={groupId}/>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <GroupTable/>
    </div>
  );
}

export default App;
