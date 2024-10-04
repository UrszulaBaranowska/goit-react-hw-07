import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../contactsSlice";
import styles from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^[0-9-]+$/, "Only numbers and dashes are allowed")
    .required("Number is required")
});

const ContactForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Adding contact:", values);
        dispatch(addContact(values));
        resetForm();
      }}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="number">Number</label>
            <Field name="number" type="text" className={styles.input} />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </div>

          <button type="submit" className={styles.button}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
