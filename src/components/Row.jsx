import React, { useState } from "react";

const showStatus = (status) => {
	if (status == 1) {
		return <div className="btn btn-success">present</div>;
	} else {
		return <div className="btn btn-warning">absent</div>;
	}
};

const showOutStatus = (out_status) => {
	if (out_status == 1) {
		return <div className="btn btn-warning">checkout</div>;
	} else {
		return <div className="btn btn-warning">checkout</div>;
	}
};

const Row = ({ i, name, status, checkin, out_status, checkout, total }) => {
	const [curr_status, setCurr_status] = useState(status);
	const [curr_out_status, setCurr_out_status] = useState(out_status);

	return (
		<div className="row1" key={i}>
			<div className="rowele roll">{i}</div>
			<div className="rowele name">{name}</div>
			<div
				className="rowele status"
				onClick={(e) => {
					if (curr_status == 0) {
						setCurr_status(1);
						total();
					}
					// find time
					//this is click based changing and not prop or state based changing
					var time = new Date().toLocaleTimeString(); //inline creation of variable
					let check =
						e.target.parentNode.parentNode.getElementsByClassName(
							"checkin"
						);
					check[0].innerText = time;
				}}
			>
				{showStatus(curr_status)}
			</div>
			<div className="rowele btn checkin">{checkin}</div>
			<div
				className="rowele  out_status"
				onClick={(e) => {
					if (curr_status == 0) {
						setCurr_out_status(1);
						total();
					}
					// find time
					//this is click based changing and not prop or state based changing
					var time = new Date().toLocaleTimeString(); //inline creation of variable
					let check =
						e.target.parentNode.parentNode.getElementsByClassName(
							"checkout"
						);
					check[0].innerText = time;
				}}
			>
				{showOutStatus(curr_out_status)}
			</div>
			<div className="rowele btn checkout">{checkout}</div>
		</div>
	);
};

export default Row;
