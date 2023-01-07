import React, { useState, useEffect } from "react";
import Axios from "axios";

import Row from "./Row";
import Info from "./Info";
import Add from "./Add";
// import MarkA from "../functions/MarkA";

const MarkA = () => {
	//make array of current student info(current view)
	let list = [];
	let s_roll = document.querySelectorAll(".roll");
	let s_status = document.querySelectorAll(".status");
	let s_checkin = document.querySelectorAll(".checkin");
	let s_out_status = document.querySelectorAll(".out_status");
	let s_checkout = document.querySelectorAll(".checkout");
	let n = s_status.length;
	let temp = [];
	for (let i = 0; i < n; i++) {
		temp = [];
		if (s_status[i].innerText == "present") {
			temp.push(1);
		} else {
			temp.push(0);
		}
		temp.push(s_checkin[i].innerText);
		if (s_checkout[i].innerText == "--") {
			temp.push(0);
		} else {
			temp.push(1);
		}
		temp.push(s_checkout[i].innerText);
		temp.push(s_roll[i].innerText);

		list.push(temp);
	}
	//extra last row is secret roll no. row

	console.log("MarkA " + list);

	//UPDATE DB
	const updateStudent = async () => {
		const response = await Axios.post(
			"http://localhost:5000/student/update",
			list
		);
	};

	updateStudent();
};

//date is js object for some reason
const Container = ({ date, student, datepicked, pickerFn, add }) => {
	var visit = 0,
		found = 0;
	Object.keys(date).forEach((index) => {
		var temp = date[index];
		if (temp["date"] == datepicked) {
			visit = temp["status"];
			found = 1;
		}
	});
	if (found == 0) {
		console.log("not found");
	}

	const updateDate = async (t) => {
		const response = await Axios.post(
			"http://localhost:5000/calendar/mark",
			{
				date: t,
			}
		);
	};

	//if it is first visit add to DB and mark it
	let statusText = "Attendance pending for today";
	if (visit == 1) {
		statusText = "";
	} else {
		updateDate(datepicked);
	}

	const findTotalP = () => {
		var p = document.querySelectorAll(".status .btn-success");
		return p.length;
	};

	useEffect(() => {
		setTotal(findTotalP());
	});

	const [total, setTotal] = useState(0);
	return (
		<div className="container">
			<Info loc="top" text={statusText} picker={pickerFn} />
			<div id="student_box">
				{Object.keys(student).map((i) => {
					return (
						<Row
							i={student[i]["roll"]}
							name={student[i]["name"]}
							status={student[i]["status"]}
							checkin={student[i]["checkin"]}
							out_status={student[i]["out_status"]}
							checkout={student[i]["checkout"]}
							total={() => {
								setTotal(total + 1);
							}}
						/>
					);
				})}
			</div>
			<Info loc="bottom" totalp={total} mark={MarkA} />
			<Add addFn={add} />
		</div>
	);
};

export default Container;
