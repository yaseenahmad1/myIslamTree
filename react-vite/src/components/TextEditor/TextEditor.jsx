// src/components/TextEditor/TextEditor.jsx
import "react-quill/dist/quill.snow.css";
import React from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "./TextEditor.css"; // optional styling file

const modules = {
  toolbar: [
    [{ font: [] }], // default fonts
    [ "italic", "underline", "bold"],
    [{ header: [1, 2, 3, false] }],
    ["link", "image"],
  ],
};

// Tell Quill which formats are allowed
const formats = [
    "font",
    "bold",
    "italic",
    "underline",
    "header",
    "link",
    "image",
  ];

export default function TextEditor({ value, onChange, label, placeholder }) {
  const handleChange = (content, delta, source, editor) => {
    // Convert empty editor to empty string
    const html = editor.getHTML(); 
    const sanitized = DOMPurify.sanitize(html);
    const isEmpty = sanitized === "<p><br></p>" || sanitized.trim() === "";
    onChange(isEmpty ? "" : sanitized);
  };

  return (
    <div className="text-editor-container">
      {label && <label className="text-editor-label">{label}</label>}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || ""}
        modules={modules}
        formats={formats}  

      />
    </div>
  );
}


