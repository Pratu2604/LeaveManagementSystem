import "./App.css";
import { colors, createTheme, ThemeProvider } from "@mui/material";
import Display from "./components/Main/Display";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Main/LoginPage";
import {  useState } from "react";
import ForgetPasswordPage from "./components/Main/forgetPasswordPage";
import ResetPasswordPage from "./components/Main/ResetPasswordPage";
import "swagger-ui-react/swagger-ui.css";

const myTheme = createTheme({
  palette: {
    primary: {
      main: colors.blue[800],
    },
    secondary: {
      main: colors.green[600],
    },
  },
});

function App() {
  const [forgetRouteStatus, setForgetRouteStatus] = useState(false);
  const [resetRouteStatus, setResetRouteStatus] = useState(false);

  function onSubmitClick(flag) {
    setForgetRouteStatus(flag);
  }

  function onResetClick(flag) {
    setResetRouteStatus(flag);
  }

  return (
    <ThemeProvider theme={myTheme}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                onSubmitClick={onSubmitClick} 
              />
            }
          />
          {forgetRouteStatus && (
            <Route
              path="/ForgetPassword"
              element={
                <ForgetPasswordPage
                  onResetClick={onResetClick}
                />
              }
            />
          )}
          {resetRouteStatus && (
            <Route path="/ResetPassword" element={<ResetPasswordPage />} />
          )}
         
            <Route
              path="/Employee/*"
              element={<Display />}
            />
          
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
