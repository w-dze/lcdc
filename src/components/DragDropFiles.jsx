import { useState, useRef } from "react";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [output, setOutput] = useState("");
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const processLegalText = (text) => {
    let cleaned = text.replace(/[^NSEW\d.]|(?<!\d)\.|\.{1}(?!\d)|(?<=[a-zA-Z])[NSEW]|[NSEW](?=[a-zA-Z])/g, ' ');
    cleaned = cleaned.replace(/(?<!\w)([NSEW]{2,})(?!\w)/g, ' ');

    const regex = /([NS])\s{0,5}(\d{2})\s{0,5}(\d{2})\s{0,5}(\d{2})\s{0,5}([EW])\s{0,5}([\d.]+)/g;
    let formatted = [];
    for (const match of cleaned.matchAll(regex)) {
      const [, dir1, deg, min, sec, dir2, dist] = match;
      formatted.push(`${dir1} ${deg}:${min}:${sec} ${dir2} ${dist}`);
    }
    return formatted.join('\n');
  };

  const handleUpload = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const result = processLegalText(text);
      setOutput(result);
    };
    reader.readAsText(files[0]);
  };

  if (files) return (
    <div className="uploads">
      <ul>
        {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
      </ul>
      <div className="actions">
        <button onClick={() => { setFiles(null); setOutput(""); }}>Cancel</button>
        <button onClick={handleUpload}>Process</button>
      </div>
      {output && (
        <div className="output">
          <h3>Processed Output:</h3>
          <pre>{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)}>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div 
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1>Drag and Drop Files to Upload</h1>
        <h1>Or</h1>
        <input 
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          hidden
          accept=".txt"
          ref={inputRef}
        />
        <button onClick={() => inputRef.current.click()}>Select Files</button>
      </div>
    </>
  );
};

export default DragDropFiles;
