import userApi from "api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageKeys from "constants/storage-keys";

export const register = createAsyncThunk(
  "users/register",
  async (payload, thunkAPI) => {
    //Call API để đăng ký
    const data = await userApi.register(payload);
    //Lưu data vào local stogare
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    //Vì data.user là object nên phải sử dụng json.stringify
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    // return userdata
    return data.user;
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    //Call API để dang nhap
    const data = await userApi.login(payload);
    //Lưu data vào local stogare
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    //Vì data.user là object nên phải sử dụng json.stringify
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    // return userdata
    return data.user;
  }
);

const useSlice = createSlice({
  name: StorageKeys.USER,
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      //Clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
    },
  },
  extraReducers: {
    // "user/register/fulfilled": () => {}, Same ở dưới
    [register.fulfilled]: (state, action) => {
      state.current = action.payload; //action.payload là chỗ return ở hàm register
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload; //action.payload là chỗ return ở hàm register
    },
  },
});

const { actions, reducer } = useSlice;
export const { logout } = actions;
export default reducer;
