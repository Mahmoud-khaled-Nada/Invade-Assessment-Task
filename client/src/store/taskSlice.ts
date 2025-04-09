import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../utils/types";
import { getTasks } from "../utils/api";

export interface TaskState {
  data: Task[];
  loading: boolean;
}

export const fetchTasksThunk = createAsyncThunk("fetch/tasks", async () => {
  return getTasks();
});

const initialState: TaskState = {
  data: [],
  loading: false,
};

export const taskSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addTask: (state, action): void => {
      state.data.unshift(action.payload);
    },
    updateTask: (state, action): void => {
      const { id , label } = action.payload;
      const findTask = state.data.find((task) => task.id === id);
      if (findTask) {
        findTask.task = label;
      }
    },
    deleteTask: (state, action): void => {
      state.data = state.data.filter((task) => task.id !== action.payload);
    },
    changeCompleted: (state, action): void => {
      console.log(action.payload);
      const { id } = action.payload;
      const findTask = state.data.find((task) => task.id === id);
      if (findTask) {
        findTask.completed = !findTask.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.data = data;
        state.loading = false;
      })
      .addCase(fetchTasksThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addTask, updateTask, deleteTask, changeCompleted } = taskSlice.actions;
export default taskSlice.reducer;
