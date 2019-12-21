using System.Collections.Generic;
using Letter.API.Models;

namespace Letter.API.Data
{
    public interface IExcelDoc
    {
        IEnumerable<Customer> ReadExcel(string path);
    }
}