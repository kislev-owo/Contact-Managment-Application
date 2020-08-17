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
						console.log("output", data);
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
						getActions().cargarContactos();
						alert("contacto eliminado");
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
						alert("se ha editado el contacto", JSON.stringify(data));
						getActions().cargarContactos();
					})
					.catch(error => console.log("Error:", error));
			}
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
/*


const createUser = async username => {
		const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/kislev-owo`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		});
		try {
			if (response.ok) {
				getTodos(userName);
			} else {
				console.log(
					`response: ${response.status} ${response.statusText}`
				);
			}
		} catch (error) {
			console.log(`error: ${error}`);
		}
	};
*/
