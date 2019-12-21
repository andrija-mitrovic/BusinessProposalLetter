namespace Letter.API.Models
{
    public class Customer
    {
        public int Id {get;set;}
        public int Pib {get;set;}
        public string DateOfEstablish {get;set;}
        public string CompanyName {get;set;}
        public string Form {get;set;}
        public string CrpsStatus {get;set;}
        public string CbcgStatus {get;set;}
        public string Address {get;set;}
        public int ActivityCode {get;set;}
        public string Activity {get;set;}
        public int EmployeeNumber {get;set;}
        public string MenagerName {get;set;}
        public string Phone {get;set;}
        public string Email {get;set;}
    }
}