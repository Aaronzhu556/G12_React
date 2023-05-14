import { theme, ConfigProvider } from "antd";
import { useState } from "react";
import "./App.css";
import Router from "./router/router";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0053b3",
          colorInfo: "#0053b3",
          fontSize: 16,
          fontSizeHeading5: 18,
          borderRadius: 8,
          borderRadiusLG: 12,
          wireframe: true,
        },
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="App">
        <Router />
      </div>
    </ConfigProvider>
  );
}

export default App;
