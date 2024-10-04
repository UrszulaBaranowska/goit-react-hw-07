import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../contactsSlice";
import Contact from "./Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div className={styles.contactList}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </div>
  );
};

export default ContactList;
