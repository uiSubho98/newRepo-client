import * as XLSX from 'xlsx';
// @ts-ignore
import * as FileSaver from 'file-saver';
import Moment from 'moment';

const getDateTime = () => {
    let nowDate = Moment.unix(Math.round(Date.now()/1000)).format('l_LT');
    nowDate = nowDate.replace(/\s/g, '');
    return nowDate;
}

const exportToXlsx = (excelData: any, fileName: any) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(excelData);
    ws['!cols'] = [];
    if(excelData[0]) {
        Object.keys(excelData[0]).forEach(() => {
            ws['!cols'] && ws['!cols'].push({ width: 20 })
        });
    }
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + getDateTime() + fileExtension);
}

export { exportToXlsx };