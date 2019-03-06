using System;
using System.Collections.Generic;
using Networth.Entities.Loan;
using Networth.Entities.User;
namespace Networth.Models
{
    public class LoanViewModel
    {
        public int LoanId  {get; set; }
        public string LoanName { get; set; }
        public string LoanType { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public ICollection<Loan> LoanEntries;
    }
}