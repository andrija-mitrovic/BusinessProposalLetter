using System.IO;
using System.Threading.Tasks;
using Letter.API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Letter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IExcelDoc _exelDoc;
        private readonly IHostingEnvironment _hostingEnvironment;

         public CustomersController(IExcelDoc excelDoc, IHostingEnvironment hostingEnvironment)
         {
            _exelDoc=excelDoc; 
            _hostingEnvironment=hostingEnvironment;
         }

        [HttpGet]
        public IActionResult GetCustomers([FromQuery] string fileName)
        {
            string file = fileName + ".xlsx";
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var filePath = Path.Combine(uploads, file);

            if (!System.IO.File.Exists(filePath))
                return NotFound();
                
            var customers = _exelDoc.ReadExcel(filePath);
            return Ok(customers);
        }
    }
}