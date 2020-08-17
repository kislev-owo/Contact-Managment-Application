import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditInfo = props => {
	const { store, actions } = useContext(Context);

	const [iname, setName] = useState(store.contacts[props.match.params.elid].full_name);
	const [iemail, setEmail] = useState(store.contacts[props.match.params.elid].email);
	const [iphone, setPhone] = useState(store.contacts[props.match.params.elid].phone);
	const [iaddress, setAddress] = useState(store.contacts[props.match.params.elid].address);

	const [objContact, setObjContact] = useState();

	useEffect(
		() => {
			console.log("page editinfo.js", store.contacts);
			setObjContact({
				agenda_slug: "ipince",
				full_name: iname,
				email: iemail,
				phone: iphone,
				address: iaddress
			});
		},
		[iname, iemail, iphone, iaddress]
	);

	return (
		<>
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Edit contact</h1>
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Full Name"
								value={iname}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter email"
								value={iemail}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								className="form-control"
								placeholder="Enter phone"
								value={iphone}
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter address"
								value={iaddress}
								onChange={e => setAddress(e.target.value)}
							/>
						</div>
						<button
							type="button"
							className="btn btn-primary form-control"
							onClick={() => {
								//edit----
								actions.EditContact(objContact, store.contacts[props.match.params.elid].id);
							}}>
							save
						</button>
						<Link
							className="mt-3 w-100 text-center"
							to="/Contacts"
							onClick={() => {
								//state.actions.LoadContacts();
							}}>
							or get back to contacts
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

EditInfo.propTypes = {
	match: PropTypes.object
};
