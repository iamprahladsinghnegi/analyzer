import { read, utils } from "xlsx";

const readFile = (file) => {
  const reader = new FileReader();
  const isReaderAsBinaryString = !!reader.readAsBinaryString;
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      // parse data
      const bstr = e.target.result;
      const wb = read(bstr, {
        type: isReaderAsBinaryString ? "binary" : "array",
      });

      // to read only first worksheet
      const firstWorkSheetName = wb.SheetNames[0];
      const ws = wb.Sheets[firstWorkSheetName];

      // convert array of arrays
      const data = utils.sheet_to_json(ws);

      // return result
      resolve(data);
    };

    reader.onerror = (e) => {
      reject("Failed to load file!");
    };

    if (isReaderAsBinaryString) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  });
};

export { readFile };
