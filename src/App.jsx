import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import { useTheme } from "next-themes";

function App() {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "gray.900" : "gray.100";

  return (
    <Box minH={"100vh"} bg={bgColor}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
