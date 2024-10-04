import React from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBox from "./components/SearchBox";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;
