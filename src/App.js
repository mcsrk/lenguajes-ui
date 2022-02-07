import React, { useState } from "react";
import "./App.css";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
const { TextArea } = Input;
const { Option } = Select;

function App() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const onChange = (e) => {
    console.log("Change:", e.target.value);
    setInputText(e.target.value);
  };

  const translateText = () => {
    setInputText(inputText);

    let config = {
      method: "post",
      url: "localhost:3001/traductor/cadena",
      headers: { "Content-Type": "text/plain" },
      data: inputText,
    };
    if (inputText !== "") {
      axios(config)
        .then((response) => {
          setResultText(response.data.translatedText);
        })
        .catch((error) => {
          console.log({ error });
          setResultText(error.message);
        });
    } else {
      setResultText("Ingrese un comando para traducir");
    }
  };
  return (
    <div>
      <div className="app-header">
        <h2 className="header">Traductor de Bash a WindowsPowerShell</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <TextArea
              showCount
              value={inputText}
              placeholder="Comando(s) a traducir ..."
              onChange={onChange}
            />

            <Select
              className="language-select"
              style={{ width: "50%", marginTop: "8px " }}
              defaultValue="win"
              disabled
            >
              <Option value={"win"}>Bash - Power Shell</Option>
            </Select>

            <TextArea
              disabled
              value={resultText}
              placeholder="Comando(s) traducidos a PowerShell ..."
            />

            <Button
              type="primary"
              block
              style={{ marginTop: "16px" }}
              onClick={translateText}
            >
              Traducir
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
