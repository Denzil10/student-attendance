import React, { useState } from "react";
import { useEffect } from "react";

const Info = ({ loc, totalp, text, mark, picker }) => {
	const findTotalP = () => {
		var p = document.querySelectorAll(".status .btn-success");
		return p.length;
	};

	useEffect(() => {
		var total_box = document.querySelectorAll(".total");
		var t = document.querySelectorAll(".status").length;
		total_box[0].innerHTML = t;
		var absent_box = document.getElementsByClassName("absent");
		absent_box[0].innerText = "A- " + (t - totalp);
	});

	if (loc == "bottom") {
		return (
			<div className="row1">
				<div className="">total</div>
				<div className="total"></div>
				<div>P- {totalp}</div>
				<div className="absent"></div>
				<div className="btn btn-primary" onClick={mark}>
					mark attendance
				</div>
			</div>
		);
	} else {
		return (
			<div className="row1">
				<div>CLASS:D2B</div>
				<div>
					<input id="date_picker" type="date" onInput={picker} />
				</div>
				<div>{text}</div>
			</div>
		);
	}
};

export default Info;
