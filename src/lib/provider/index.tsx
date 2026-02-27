import { Provider } from "react-redux";
import { store } from "../../redux/store";
import type { TCommonProps } from "../../types/common.type";
import { ConfigProvider } from "antd";
import { mainTheme } from "../antTheme";
import ContextProvider from "./ContextProvider";
import AuthProvider from "./AuthProvider";

const MainProvider = ({ children }: TCommonProps) => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <AuthProvider>
        <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
        </AuthProvider>
      </ContextProvider>
    </Provider>
  );
};

export default MainProvider;
