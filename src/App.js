import { useEffect, useState } from 'react';
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
    const addStudent = async () => {
      let roll = document.getElementById("new_roll").value
      let name = document.getElementById("new_name").value
      const response = await Axios.post(
        "https://tn0h6hingg.execute-api.eu-north-1.amazonaws.com/prod/student",
        {
          "roll": roll,
          "name": name
        }
      )
    }
    addStudent().then(() => {
      setAdded(added + 1)
    })
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

  // settign dummy for static site 
  let dummy_student = [{ "roll": 1, "name": "Denzil", "status": 1, "checkin": "22:49:49", "out_status": 1, "checkout": "00:20:33" }, { "roll": 2, "name": "Naman", "status": 1, "checkin": "00:40:30", "out_status": 1, "checkout": "00:40:31" }, { "roll": 3, "name": "Sera", "status": 0, "checkin": "--", "out_status": 0, "checkout": "--" }, { "roll": 4, "name": "Manas", "status": 0, "checkin": "--", "out_status": 0, "checkout": "--" }, { "roll": 5, "name": "Sofia", "status": 0, "checkin": "--", "out_status": 0, "checkout": "--" }, { "roll": 6, "name": "Bhargav", "status": 0, "checkin": "--", "out_status": 0, "checkout": "--" }]
  let dummy_date = [{ "date": "2023-01-08", "status": 1 }, { "date": "2023-01-09", "status": 1 }, { "date": "2023-01-10", "status": 1 }]
  dummy_student = []
  dummy_date = []
  const [date, setDate] = useState(dummy_date);
  const [student, setStudent] = useState(dummy_student);

  const getDate = async () => {
    const response = await Axios.get('https://tn0h6hingg.execute-api.eu-north-1.amazonaws.com/prod/fetch')
    setDate(response.data)
  }
  const getStudent = async () => {
    const response = await Axios.get('https://tn0h6hingg.execute-api.eu-north-1.amazonaws.com/prod/students', {})
    setStudent(response.data.students)
    console.log(response.data)
  }

  useEffect(() => {
    // getDate()
    getStudent()
  }
    , [datepicked, added])

  //dummy csv

  return (
    <Container date={date} student={student} datepicked={datepicked} pickerFn={CheckDate} add={AddStudent} />
  );
}

export default App;
