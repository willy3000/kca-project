import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {  },
  reducers: {
    setCurrentProject: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;