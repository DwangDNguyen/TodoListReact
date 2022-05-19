import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  return list ? JSON.parse(list) : [];
};

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, mess: "", type: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  function handleAdd(e) {
    e.preventDefault();
    if (!item) {
      showAlert(true, "danger", "Please enter an item");
    } else if (item && isEdit) {
      showAlert(true, "success", "Item Edited");
      setItem("");
      setList(
        list.map((items) => {
          if (items.id === editId) {
            return { ...items, title: item };
          }
          return items;
        })
      );
      setEditId(null);
      setIsEdit(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItem]);
      setItem("");
      showAlert(true, "success", "Item Added To The List");
    }

    setIsEdit(false);
  }
  const showAlert = (show = false, type = "", mess = "") => {
    setAlert({ show, type, mess });
  };

  //Clear list
  function clearList() {
    if (list.length === 0) {
      showAlert(true, "danger", "The list is empty");
    } else {
      setList([]);
      showAlert(true, "success", "List Cleared");
    }
  }

  //Delete item
  function deleteItem(id) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "success", "Item Deleted");
  }

  //Edit item
  function editItem(id) {
    const itemEdit = list.find((item) => item.id === id);

    setItem(itemEdit.title);
    setIsEdit(true);
    setEditId(id);
  }

  //local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="Todo-form">
        {alert.show && (
          <Alert
            type={alert.type}
            mess={alert.mess}
            show={alert.show}
            removeAlert={showAlert}
          />
        )}
        <h3>Todo List</h3>
        <div className="form-control">
          <input
            type="text"
            className="Todo"
            placeholder="Enter Todo"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleAdd}>
            {isEdit ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="Todo-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
