import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { TProfile } from "../../../types/profile.type";
import { is_production } from "../../../config";
import { accessToken, refreshToken } from "../../../constants";

type AuthState = {
  user: TProfile | null;
  [accessToken]?: string;
  // [refreshToken]?: string;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  [accessToken]: Cookies.get(accessToken),
  // [refreshToken]: Cookies.get(refreshToken),
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: TProfile }>) {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    setToken(
      state,
      action: PayloadAction<{ [accessToken]: string; }>,
    ) {
      state[accessToken] = action.payload[accessToken];
    },
    setLogin(
      state,
      action: PayloadAction<{
        user: TProfile;
        [accessToken]: string;
        [refreshToken]: string;
        remember: boolean;
      }>,
    ) {
      state.user = action.payload.user ?? null;
      state.isLoading = false;
      state[accessToken] = action.payload[accessToken];
      Cookies.set(accessToken, action.payload[accessToken], {
        expires: action.payload.remember ? 1 : undefined,
        secure: is_production,
        sameSite: "strict",
      });
      Cookies.set(refreshToken, action.payload[refreshToken], {
        expires: action.payload.remember ? 365 : undefined,
        secure: is_production,
        sameSite: "strict",
      });
    },
    logout(state) {
      state.user = null;
      state[accessToken] = undefined;
      // state[refreshToken] = undefined;
      state.isLoading = false;
      Cookies.remove(accessToken);
      Cookies.remove(refreshToken);
    },
  },
});

export const { setLogin, setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
