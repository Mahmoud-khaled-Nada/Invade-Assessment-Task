import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../utils/types";
import { getTasks, searchTasks } from "../utils/api";

export const fetchTasksThunk = createAsyncThunk("fetch/tasks", async (page: number = 1) => {
  return getTasks(page); // should return full pagination object
});

export const searchTasksThunk = createAsyncThunk("search/tasks", async (query: string) => {
  return searchTasks(query); // should return full pagination object
});

export interface TaskState {
  data: Task[];
  loading: boolean;
  currentPage: number;
  lastPage: number;
}

const initialState: TaskState = {
  data: [],
  loading: false,
  currentPage: 1,
  lastPage: 1,
};

export const taskSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addTask: (state, action): void => {
      state.data.unshift(action.payload);
    },
    updateTask: (state, action): void => {
      const { id, label } = action.payload;
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
        state.data = action.payload.data;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
        state.loading = false;
      })
      .addCase(fetchTasksThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchTasksThunk.fulfilled, (state, action) => {
        state.data = action.payload
      });
  },
});

export const { addTask, updateTask, deleteTask, changeCompleted } = taskSlice.actions;
export default taskSlice.reducer;
