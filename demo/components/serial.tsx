import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import StackItems from "./stackItems";
const SerialReader = () => {
  const [port, setPort] = useState(null);
  const [receivedData, setReceivedData] = useState("");
  const [baudRate, setBaudRate] = useState(9600); // Default baud rate
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const [connectionLost, setConnectionLost] = useState(false);
  const [found, setFound] = useState(false);
  const [dataFound, setDataFound] = useState(false);
   const messagesEndRef = useRef(null);

  const connectSerial = async () => {
    try {
      const selectedBaudRate = parseInt(baudRate);
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: selectedBaudRate });
      setPort(port);
      const reader = port.readable.getReader();
      setConnectionLost(false);
      const readData = async () => {
        try {
          let buffer = ""; // Initialize an empty buffer to accumulate data
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              console.log("Reader has been disconnected.");
              reader.releaseLock();
              break;
            }
            const decoder = new TextDecoder();
            const decodedData = decoder.decode(value);
            setReceivedData((prevData) => prevData + decodedData);
            buffer += decodedData; // Append the received data to the buffer
            console.log("Received data:", buffer);
            setConnectionLost(false);
            setDataFound(true);
            // Check if the received data ends with '\r\n'
            // if (buffer.endsWith("\r\n")) {
            //   console.log("Received complete message:", buffer);
            //   // Check if the received data contains "Test2\r\n"
            //   if (buffer.includes("Test2\r\n")) {
            //     console.log("Received 'Test2'");
            //     // Update state to indicate success
            //     setConnectionLost(false);
            //     setFound(true);
            //     // Change the background color of the Disconnect button
            //     document.getElementById("successDiv").style.backgroundColor =
            //       "green";
            //   }
            //   // Reset the buffer for the next message
            //   buffer = "";
            // }
          }
        } catch (error) {
          console.error("Error reading data:", error);
          setDataFound(false);
          // setConnectionLost(true);
        }
      };

      readData();
    } catch (error) {
      console.error("Error connecting to serial:", error);
        //  setConnectionLost(true);
    }
  };

  const [open, setOpen] = useState(false);

  const handleConnectClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setConnectionLost(false)
  };

  const handleConnectConfirm = () => {
    connectSerial();
    setConnectionLost(false);
  };

    useEffect(() => {
      scrollToBottom();
    }, [receivedData]);

    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
  };
  
  const disconnectSerial = async () => {
    if (port) {
      try {
        // Check if reading is active and cancel if needed
        if (port.readable && port.readable.locked) {
          const reader = port.readable.getReader();
          reader.cancel(); // Release lock
        }

        // Close the port (potentially after releasing lock)
        await port.close();
        setPort(null);
      } catch (error) {
        console.error("Error disconnecting serial port:", error);
        // Log specific error details here (e.g., which operation failed)
      } finally {
        // ... (if you still need to release locks here)
      }
    }
  };

  const handleBaudRateChange = (event) => {
    setBaudRate(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (port && message) {
      const writer = port.writable.getWriter();
      const encoder = new TextEncoder();
      const messageWithCR = message + "\r"; // Append carriage return to the message
      await writer.write(encoder.encode(messageWithCR));
      await writer.releaseLock();
      setMessage("");
      inputRef.current.focus(); // Focus back on input field after sending message
    }
  };

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    };

  return (
    <div className="border height-[77vh] overflow-auto">
      <h2>Serial Data</h2>
      <StackItems found={found} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <label htmlFor="baudRate">Baud Rate:</label>
          <select
            id="baudRate"
            value={baudRate}
            onChange={handleBaudRateChange}
          >
            <option value="300">300 baud</option>
            <option value="600">600 baud</option>
            <option value="750">750 baud</option>
            <option value="1200">1200 baud</option>
            <option value="2400">2400 baud</option>
            <option value="4800">4800 baud</option>
            <option value="9600">9600 baud</option>
            <option value="19200">19200 baud</option>
            <option value="14400">14400 baud</option>
            <option value="19200">19200 baud</option>
            <option value="38400">38400 baud</option>
            <option value="57600">57600 baud</option>
            <option value="115200">115200 baud</option>
            <option value="128000">128000 baud</option>
            <option value="256000">256000 baud</option>
          </select>
        </div>
        {dataFound ? (
          <span
            style={{
              background: "limegreen",
              color: "white",
              padding: "5px",
              borderRadius: "12px",
            }}
          >
            CONNECTED
          </span>
        ) : (
          <div>
            <button
              style={{
                background: "blue",
                color: "white",
                padding: "5px",
                borderRadius: "12px",
              }}
              onClick={connectSerial}
            >
              Connect
            </button>
            <Dialog open={connectionLost} onClose={handleClose}>
              <DialogTitle>{"Device Connection Lost"}</DialogTitle>
              <DialogContent>
                <h4>Plug in the UART Serial </h4>
                <p>Proceed Connect to Serial Port?</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleConnectConfirm}
                  color="primary"
                  autoFocus
                >
                  Connect
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>

      <div>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          style={{ width: "400px", marginTop: "13px" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div
        ref={messagesEndRef}
        style={{
          border: "1px solid lightgray",
          overflow: "auto",
          height: "51vh",
          fontSize: '18px',
          fontFamily:'Ubuntu',
          background:'white'
        }}
      >
        <pre>{receivedData}</pre>
      </div>
    </div>
  );
};

export default SerialReader;
