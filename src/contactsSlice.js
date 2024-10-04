import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: []
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        if (Array.isArray(state.items)) {
          state.items.push(action.payload);
        }
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number
          }
        };
      }
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    }
  }
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
