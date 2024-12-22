// import React, { useRef, useState, useEffect } from "react";
// import { Box } from "@chakra-ui/react";
// import { Editor } from "@monaco-editor/react";

// const CodeEditor = ({ language, initialCode }) => {
//   const editorRef = useRef();
//   const [value, setValue] = useState("");
//   const [editorHeight, setEditorHeight] = useState(200); // Initial height in px

//   useEffect(() => {
//     if (initialCode) {
//       setValue(initialCode);
//       const lineCount = initialCode.split("\n").length;
//       const lineHeight = 20; // Approximate line height in px
//       const minHeight = 100; // Minimum height in px
//       const height = Math.max(lineCount * lineHeight, minHeight); // Adjust height based on line count
//       setEditorHeight(height);
//     }
//   }, [initialCode]);

//   const onMount = (editor) => {
//     editorRef.current = editor;
//     editor.updateOptions({
//       readOnly: false,
//       scrollBeyondLastLine: false, // Disable scrolling beyond the last line
//     });

//     // Get the Monaco Editor container element
//     const containerElement = editor.getDomNode();

//     // Disable scrolling on the container element
//     // containerElement.style.overflowX = "hidden";
//     // containerElement.style.overflowY = "hidden";
//   };

//   return (
//     <Box>
//       <Editor
//         options={{
//           minimap: {
//             enabled: false,
//           },
//         }}
//         height={`${editorHeight}px`} 
//         theme="vs-dark"
//         language={language}
//         defaultValue={initialCode || ""}
//         onMount={onMount}
//         value={value}
//         onChange={(value) => setValue(value)}
//       />
//     </Box>
//   );
// };

// export default CodeEditor;

import React, { useRef, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ language, initialCode }) => {
  const editorRef = useRef(null); // Initialize editorRef with null
  const [value, setValue] = useState(initialCode || ""); // Initialize value with initialCode
  const [editorHeight, setEditorHeight] = useState(200); // Initial height in px

  useEffect(() => {
    if (initialCode) {
      setValue(initialCode);
      const lineCount = initialCode.split("\n").length;
      const lineHeight = 20; // Approximate line height in px
      const minHeight = 100; // Minimum height in px
      const height = Math.max(lineCount * lineHeight, minHeight); // Adjust height based on line count
      setEditorHeight(height);
    }
  }, [initialCode]);

  const onMount = (editor) => {
    editorRef.current = editor; // Set the editor instance to the ref
    editor.updateOptions({
      readOnly: true, // Set the editor to read-only mode
      scrollBeyondLastLine: false, // Disable scrolling beyond the last line
    });
  };

  return (
    <Box>
      <Editor
        options={{
          readOnly: true, // Ensure editor is in read-only mode
          minimap: {
            enabled: false,
          },
        }}
        height={`${editorHeight}px`} // Set the height in pixels
        theme="vs-dark" // Dark theme for Monaco Editor
        language={language} // Set the language prop
        value={value} // Use value instead of defaultValue for controlled input
        onMount={onMount} // Handle onMount event
        onChange={(newValue) => setValue(newValue)} // Handle change event
      />
    </Box>
  );
};

export default CodeEditor;
