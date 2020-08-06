import React from "react";
import { Flex, Textarea, Heading, Divider, Button, Box } from "@chakra-ui/core";

import { v4 as uuidv4 } from "uuid";
import { DB } from "./firebase";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
    };
  }

  getMessages() {
    DB.collection("messages")
      .doc("userA-userB")
      .get()
      .then((doc) => {
        let getMessages = doc.data();
        this.setState({ messages: getMessages.messages });
      });
  }

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate() {
    this.getMessages();
  }

  render() {
    let vm = this;
    function submitMesssage(e) {
      e.preventDefault();
      if (vm.state.message) {
        let data = {
          id: uuidv4(),
          message: vm.state.message,
          sender: vm.props.user,
        };
        let updatedMessages = vm.state.messages;
        updatedMessages.push(data);
        DB.collection("messages").doc("userA-userB").update({
          messages: updatedMessages,
        });
        vm.setState({ message: "" });
      }
    }

    return (
      <Flex w="50%" direction="column" justify="space-between" h="100vh">
        <Box h="5%">
          <Heading p="2" size="lg">
            {this.props.user}
          </Heading>
        </Box>
        <Divider m="0" borderColor="gray.500" />
        <Box bg="gray.200" h="80%" w="100%" p="3">
          {this.state.messages && (
            <div
              className="MessageList"
              style={{
                maxHeight: "900px",
                height: "100%",
                overflowY: "scroll",
              }}
            >
              {this.state.messages.map((message) => {
                if (message.sender === this.props.user) {
                  return (
                    <Flex key={message.id} justify="flex-end" py="1">
                      <span
                        style={{
                          maxWidth: "60%",
                          background: "green",
                          color: "white",
                          borderRadius: "10px",
                          padding: "10px 15px",
                          borderBottomRightRadius: 0,
                        }}
                      >
                        {message.message}
                      </span>
                    </Flex>
                  );
                } else {
                  return (
                    <Flex key={message.id} justify="flex-start" py="1">
                      <span
                        style={{
                          maxWidth: "60%",
                          background: "#333",
                          color: "white",
                          borderRadius: "10px",
                          padding: "10px 15px",
                          borderBottomLeftRadius: 0,
                        }}
                      >
                        {message.message}
                      </span>
                    </Flex>
                  );
                }
              })}
            </div>
          )}
        </Box>
        <Flex direction="column" align="center" justify="center" h="15%" p="3">
          <form onSubmit={(e) => submitMesssage(e)} style={{ width: "100%" }}>
            <Flex justify="space-between">
              <Textarea
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
                w="90%"
                placeholder="Here is a sample placeholder"
                size="sm"
              />
              <Button type="submit" variantColor="green">
                Send
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    );
  }
}

export default ChatBox;
