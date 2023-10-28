import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeProps {
  onChange: (code: string, value: string) => void;
  language: string;
  code: string;
  theme: string;
}

const CodeEditorWindow = ({ onChange, language, code, theme }: CodeProps) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: any) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <>
      <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl"></div>
      <MonacoEditor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={"vs-dark"}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </>
  );
};

export default CodeEditorWindow;
