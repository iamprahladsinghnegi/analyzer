import { useRef, useState } from "react";
import { readFile } from "./utils/ExcelHelper";
import ReactJson from "react-json-view";
import "./App.css";

const FileInput = ({ setData }) => {
  const inputRef = useRef();
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const data = await readFile(files[0]);
      setData(data);
    }
  };

  const onClear = () => {
    inputRef.current.value = null;
    setData({});
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        id="file-upload"
        accept={ACCEPTED_FILE_FORMAT}
        onChange={handleFileUpload}
      />
      <button className="clear-btn" onClick={onClear}>
        Clear
      </button>
    </>
  );
};

function App() {
  const [excelData, setExcelData] = useState({});
  const updateExcelData = (data) => {
    setExcelData(data || {});
  };
  return (
    <div className="App">
      <div className="input-area">
        <h2 className="heading">Excel upload Demo</h2>
        <div className="input-container">
          <FileInput setData={updateExcelData} />
        </div>
      </div>
      <div className="separator" />
      <div className="result-area">
        <ReactJson src={excelData} />
      </div>
    </div>
  );
}

export default App;

const ACCEPTED_FILE_FORMAT = ["xlsx", "xlsb", "xlsm", "xls"]
  .map((format) => `.${format}`)
  .join(",");
