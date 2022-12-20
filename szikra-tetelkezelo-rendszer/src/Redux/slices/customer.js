import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

const initialState = {
  status: "idle",
  error: null,
  customers: [],
};

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await api.get("/customers");
    return response.data;
  }
);

export const fetchCustomersOfUser = createAsyncThunk(
  "customers/fetchCustomersOfUser",
  async () => {
    const response = await api.get(`/customers/user`);
    return response.data;
  }
);

export const addNewCustomer = createAsyncThunk(
  "customers/addNewCustomer",
  async (customerData) => {
    try {
      await api.post("/customer", customerData);
      const response = await api.get(`/customers/user`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId) => {
    try {
      await api.delete(`/customer/${customerId}`);
      const response = await api.get(`/customers/user`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchCustomersOfUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustomersOfUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomersOfUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(addNewCustomer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(addNewCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(deleteCustomer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;
