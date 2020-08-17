import PropTypes from "prop-types";

const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			agenda: [
				{
					agenda_slug: "kislev-owo",
					name: "",
					email: "",
					phone: "",
					address: ""
				}
			]
			//Your data structures, A.K.A Entities
		},
		actions: {
			cargarContactos: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/kislev-owo")
					.then(response => response.json())
					.then(data => {
						setStore({ contacts: data });
					});
			},
			añadirContactos: arrayContacto => {
				console.log("input", arrayContacto);
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(arrayContacto),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log("output", data);
						alert("nuevo contacto añadido");
						getActions().cargarContactos();
						// props.history.push("/Contacts")
					})
					.catch(error => console.error("Error:", error));
			},
			eliminarContactos: contact_id => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + contact_id, {
					method: "DELETE"
				})
					.then(response => response.json())
					.then(data => {
						console.log("delete", data);
						getActions().añadirContactos();
						alert("Contact Delete, OK!");

						// props.history.push("/Contacts")
					})
					.catch(error => console.error("Error:", error));
			},
			editarContactos: (agenda, contact_id) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + contact_id, {
					method: "PUT",
					body: JSON.stringify(agenda),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						alert("Success:", JSON.stringify(data));
						//1.-para acceder a los metodos primera forma
						//const actions = getActions();
						//actions.loadContacts();
						//2.- segunda forma
						getActions().añadirContactos();
					})
					.catch(error => console.log("Error:", error));
			}
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
