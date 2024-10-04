import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL =
  "https://66ffbce64da5bd237551bffe.mockapi.io/api/hw-07/contacts";

// Async actions
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const response = await axios.get(API_URL);

  // Map 'phone' field from API to 'number' for the frontend
  const contactsWithNumber = response.data.map((contact) => ({
    ...contact,
    number: contact.phone // Map 'phone' to 'number'
  }));

  console.log("Contacts from server:", contactsWithNumber); // Sprawdź dane w konsoli
  return contactsWithNumber;
});

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact) => {
    // Ensure that the app sends 'phone' instead of 'number'
    const response = await axios.post(API_URL, {
      ...newContact,
      phone: newContact.number // Send 'number' as 'phone'
    });
    return { ...response.data, number: response.data.phone }; // Map 'phone' back to 'number'
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId) => {
    await axios.delete(`${API_URL}/${contactId}`);
    return contactId;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      });
  }
});

export default contactsSlice.reducer;
