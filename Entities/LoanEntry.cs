using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using Networth.Entities.Loan;

namespace Networth.Entities.LoanEntry
{
    public class LoanEntry {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LoanEntryId { get; set; }


        public int LoanId { get; set; }
        public decimal Debt { get; set; }
        public DateTime DateAdded { get; set; }
        public bool Hidden { get; set; }
    }
}