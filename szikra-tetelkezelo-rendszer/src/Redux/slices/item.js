import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

const initialState = {
  status: "idle",
  error: null,
  items: [],
};

export const fetchItemsOfCustomer = createAsyncThunk(
  "items/fetchItemsOfCustomer",
  async (customerId) => {
    const response = await api.get(`/items/${customerId}`);
    return response.data;
  }
);

export const addNewItem = createAsyncThunk(
  "items/addNewItem",
  async (itemData) => {
    try {
      await api.post("/item", itemData);
      const response = await api.get(`/items/${itemData.customerId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async ([itemId, customerId]) => {
    try {
      await api.delete(`/item/${itemId}`);
      const response = await api.get(`/items/${customerId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const editItem = createAsyncThunk("meals/editMeal", async (itemData) => {
  try {
    await api.put(`/item/edit`, itemData);
    const response = await api.get(`/items/${itemData.customerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchItemsOfCustomer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchItemsOfCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItemsOfCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(addNewItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addNewItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(deleteItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(editItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(editItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
