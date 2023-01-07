import React from "react";

const Add = ({ addFn }) => {
	return (
		<div className="row1 add_row">
			<div className="">Add student</div>
			<div>
				<input id="new_roll" type="text" placeholder="roll no" />
			</div>
			<div>
				<input id="new_name" type="text" placeholder="name" />
			</div>
			<div id="add" className="btn btn-primary" onClick={addFn}>
				ADD
			</div>
		</div>
	);
};

export default Add;
