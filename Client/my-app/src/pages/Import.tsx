import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ImportExcel from "../components/ImportExcel";
import { GET_USERS } from "../components/Queries";
import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from "../components/Mutations";

const Import = () => {
  
  const { data } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [importResult, setImportResult] = useState<string | null>(null);
  const [excel_data, set_excel_data] = useState<any[]>([]);
  const [header, set_header] = useState<any[]>([]);
  const [errors , set_errors] = useState<any[]>([]);
  let my_errors: string[] = [];
  let missing_headers = "";
  let valied_entries_count = 0;
  let valid_headers: string[] = [
    "first_name",
    "last_name",
    "username",
    "email_address"
  ]
  
  async function importProccess(): Promise<string>{
    const check1 = headerCheck()
    if(check1 === "Import proccess is successful!!!"){
      for(let i = 0;i < excel_data.length;i++){
        my_errors.push("(line " + i + "):");
        for (let j = 0;j < valid_headers.length;j ++){
          if(excel_data[i][valid_headers[j]] === null || excel_data[i][valid_headers[j]] === undefined){
            my_errors[my_errors.length - 1] = my_errors[my_errors.length - 1] + " no information on fields " + valid_headers[j] + ",";
          }
        }
        if(my_errors[my_errors.length - 1] === "(line " + i + "):"){
          valied_entries_count++;
          my_errors.splice(my_errors.length - 1, 1);
          const user = data.users.find((user: any) => user.email_address === excel_data[i].email_address);
          const inputData = {
            first_name: excel_data[i].first_name,
            last_name: excel_data[i].last_name,
            username: excel_data[i].username,
            email_address: excel_data[i].email_address
          };
          if (user) {
            await updateUser({ variables: { input: inputData, id: user.id }});
          } else {
            await createUser({ variables: { input: inputData }});
          }
        }
      }
    }else{
      set_errors([])
      return(check1)
    }
    if(check1 === "Import proccess is successful!!!"){
      set_errors(my_errors)
    }
    if(my_errors){
      return(check1 + " " + valied_entries_count + "/" + excel_data.length);
    }else{
      return(check1 + valied_entries_count + "/" + excel_data.length);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (excel_data.length > 0) {
        const result = await importProccess();
        setImportResult(result);
      }
    }
    fetchData();
  }, [excel_data]);

  function headerCheck(){
    for (let i = 0;i < valid_headers.length;i ++){
      if (!header.includes(valid_headers[i])){
        missing_headers = missing_headers + valid_headers[i] + ",";
      }
    }
    if(missing_headers !== ""){
      return("Import Proccess failed! Headers " + missing_headers + " are missing!!!");
    }else{
      return("Import proccess is successful!!!");
    }
  }
  
  return (
    <div className="Import">
      <ImportExcel
        set_excel_data={set_excel_data}
        set_header={set_header}
      />
      {excel_data.length !== 0 ? (
        <ul className="list-group">
          {importResult && <li className="list-group-item a">{importResult}</li>}
          {errors.map(error => (
          <li className="list-group-item">
            {error}
          </li>
        ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Import;