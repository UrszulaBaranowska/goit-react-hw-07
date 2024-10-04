import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contactsSlice";
import Contact from "./Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const {
    items: contacts,
    loading,
    error
  } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name);

  // Fetch contacts on component mount
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Debugging - Log the fetched contacts
  console.log("Contacts in the component:", contacts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Apply filter to the contacts
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.contactList}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onDelete={() => dispatch(deleteContact(contact.id))}
          />
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default ContactList;
