using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Letter.API.Models;
using Syncfusion.XlsIO;

namespace Letter.API.Data
{
    public class ExcelDoc : IExcelDoc
    {
     /*   private static string excelName = "Customers";
        //   var filePath = Path.Combine(_environment.ContentRootPath, "Uploads", vm.Avatar.FileName);
        private static string path = "\\" + excelName + ".xlsx";
        private static string pathTest = @"D:\Projects\ASP NET Core + Angular\Letter\LETTER.API\wwwroot\uploads\Customers.xlsx ";
        private string conStr = "PROVIDER=Microsoft.ACE.OLEDB.12.0;Data Source=" + pathTest + ";Extended Properties = 'Excel 12.0; HDR=yes'";
        */
        public IEnumerable<Customer> ReadExcel(string path)
        {
            List<Customer> customers = new List<Customer>();

            using (Stream inputStream = File.OpenRead(path))
            {
                using (ExcelEngine excelEngine = new ExcelEngine())
                {
                    IApplication application = excelEngine.Excel;
                    IWorkbook workbook = application.Workbooks.Open(inputStream);
                    IWorksheet worksheet = workbook.Worksheets[0];

                    DataTable dt = worksheet.ExportDataTable(worksheet.UsedRange, ExcelExportDataTableOptions.ColumnNames);
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        customers.Add(new Customer
                        {
                            Id = Convert.ToInt32(dt.Rows[i][0]),
                            Pib = Convert.ToInt32(dt.Rows[i][1]),
                            DateOfEstablish = dt.Rows[i][2].ToString(),
                            CompanyName = dt.Rows[i][3].ToString(),
                            Form = dt.Rows[i][4].ToString(),
                            Address = dt.Rows[i][5].ToString(),
                            MenagerName = dt.Rows[i][6].ToString(),
                            Phone = dt.Rows[i][7].ToString(),
                            Email = dt.Rows[i][8].ToString()
                        });                
                    }               
                }
            }

            return customers;
        }
    }
}