import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

let api = axios.create({ baseURL: "http://localhost:3000" });

function App() {
  const [contacts, setContacts] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "",
    telp: "",
  });

  useEffect(() => {
    // fetch data dsini dan set contact

    api.get("/contacts").then((res) => {
      setContacts(res.data);
    });
  }, []);

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...contacts];

    if (formData.name === "") {
      return false;
    }
    if (formData.telp === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.telp = formData.telp;
        }
      });
      api
        .put("/contacts/" + isUpdate.id, {
          id: isUpdate.id,
          name: formData.name,
          telp: formData.telp,
        })
        .then(() => {
          alert("Data berhasil di update");
        });
      // update berdasarkan id
    } else {
      let toSave = {
        id: uid(),
        name: formData.name,
        telp: formData.telp,
      };
      data.push(toSave);

      // menambahkan data
      api.post("/contacts", toSave).then(() => {
        alert("Data berhasil ditambah");
      });
    }
    setContacts(data);
    setIsUpdate(false);
    setFormData({ name: "", telp: "" });
  }

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData({ name: foundData.name, telp: foundData.telp });
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filteredData = data.filter((contact) => contact.id !== id);

    // menghapus data
    api.delete("/contacts/" + id).then(() => alert("Data berhasil dihapus"));
    setContacts(filteredData);
  }

  return (
    <div className="App">
      <div className="fixed-top bg-white pb-3 mx-auto" style={{ width: 400 }}>
        <h1 className="px-3 py-3 font-weight-bold">My Contact List</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">No. Telp</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.telp}
              className="form-control"
              name="telp"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 350 }}>
        <List
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={contacts}
        />
      </div>
    </div>
  );
}

export default App;
