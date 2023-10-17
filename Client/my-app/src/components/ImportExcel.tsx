import { Input } from 'antd';
import { useState } from 'react';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';


interface Props{
  set_excel_data:(excel_data:any[])=>void;
  set_header:(head: string[])=> void;
}

const ImportExcel = ({set_excel_data , set_header}:Props) => {

  const [fileName, set_file_name] = useState("");
  const handleFileName = (value: any) => {
    const file = value.target.files[0];
    set_file_name(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target?.result;
      if (binaryData) {
        const workBook: WorkBook = read(binaryData, {type:'binary'});
        const workSheetName = workBook.SheetNames[0];
        const workSheet: WorkSheet = workBook.Sheets[workSheetName];
        const dataInJson: any[] = utils.sheet_to_json(workSheet, { defval: null });
        set_excel_data(dataInJson);
        set_header(Object.keys(dataInJson[0]))
      }
    };
    reader.readAsBinaryString(file);
  };
  return (
    <div>
      <span className='Upload'>Upload .xlsx file:</span>
      <Input className='Input' type='file' name='file' accept='.xlsx' onChange={handleFileName} ></Input>
      {fileName !== "" ? <div className='Chosen_file' style={{ marginLeft: '0.8%' }}>Chosen file: {fileName}</div>:null}
    </div>
  )
}

export default ImportExcel;