import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSideBar: false,
  refersh: true,
  token: false,
  editTask: localStorage.getItem("editTask")
    ? JSON.parse(localStorage.getItem("editTask"))
    : [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    setEditTask: (state, value) => {
      state.editTask = value.payload;
    },
    setRefersh: (state, value) => {
      state.refersh = value.payload;
    },
    setToken: (state, value) => {
      state.token = value.payload;
    },
    setSideBar: (state, value) => {
      state.openSideBar = value.payload;
    },
  },
});

export const { setEditTask, setRefersh, setToken, setSideBar } = taskSlice.actions;
export default taskSlice.reducer;
