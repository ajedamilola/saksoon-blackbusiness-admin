import { utils, writeFile } from "xlsx";


function arrayToExcel(arrayOfObjects, fileName) {
    // Create a new workbook
    const workbook = utils.book_new();

    // Convert array of objects to worksheet
    const worksheet = utils.json_to_sheet(arrayOfObjects);

    // Add the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a file
    writeFile(workbook, fileName);
}

export default arrayToExcel