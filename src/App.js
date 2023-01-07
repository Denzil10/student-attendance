import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import Container from './components/Container';
import { Alert } from 'bootstrap';

const findTodayDate = () => {
  var d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return year + "-" + month + "-" + day;
};

function App() {
  const [added, setAdded] = useState(0);
  // ADD STUDENT FN
  const AddStudent = () => {
    console.log("callback")
    // window.alert("Student added");

    const addStudent = async (t) => {
      let roll = document.getElementById("new_roll").value
      let name = document.getElementById("new_name").value
      const response = await Axios.post(
        "http://localhost:5000/student/add",
        {
          "roll": roll,
          "name": name
        }
      )
      response.then(
        setAdded(1)
      )

    }

  };

  const [datepicked, setPicked] = useState(findTodayDate());
  //HANDLE PICKER DATE
  const iniDate = () => {
    var today = document.getElementById("date_picker");
    today.value = findTodayDate();
  };

  useEffect(() => {
    iniDate();
  }, []);

  // update container picker date on change
  const CheckDate = () => {
    var today = document.getElementById("date_picker");
    setPicked(today.value);
  };


  //FETCH API
  const [date, setDate] = useState("");
  const [student, setStudent] = useState("");
  const getDate = async () => {
    const response = await Axios.get('http://localhost:5000/calendar/fetch')
    setDate(response.data)
  }
  const getStudent = async () => {
    const response = await Axios.get('http://localhost:5000/student/fetch', {})
    setStudent(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getDate()
    getStudent()
  }
    , [datepicked, added])


  return (
    <Container date={date} student={student} datepicked={datepicked} pickerFn={CheckDate} add={AddStudent} />
  );
}

export default App;
