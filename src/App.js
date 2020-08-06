import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Flex, Divider } from "@chakra-ui/core";
import ChatBox from "./chatBox";

function App({ children }) {
  return (
    <ThemeProvider>
      <CSSReset />
      {children}
      <Flex justify="space-between">
        <ChatBox user="userA" />
        <Divider
          orientation="vertical"
          m="0"
          borderColor="gray.500"
          h="100vh"
        />
        <ChatBox user="userB" />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
