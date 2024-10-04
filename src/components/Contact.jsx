import React from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = ({ contact, onDelete }) => {
  return (
    <div className={styles.contactCard}>
      <div className={styles.contactDetails}>
        <p className={styles.name}>
          <FaUser className={styles.icon} /> {contact.name}
        </p>
        <p className={styles.number}>
          <FaPhone className={styles.icon} /> {contact.number}
        </p>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(contact.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
