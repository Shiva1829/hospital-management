import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel=(data)=>{

const worksheet=XLSX.utils.json_to_sheet(data);

const workbook=XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
workbook,
worksheet,
"Patients"
);

const excelBuffer=XLSX.write(
workbook,
{
bookType:"xlsx",
type:"array"
}
);

const fileData=new Blob(
[excelBuffer],
{
type:
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
}
);

saveAs(fileData,"patients.xlsx");

};