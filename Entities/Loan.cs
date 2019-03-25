using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using Networth.Entities.LoanEntry;
using Networth.Entities.LoanType;


namespace Networth.Entities.Loan
{
    public class Loan {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LoanId { get; set; }
        [Required]
        [MaxLength(50), MinLength(1)]
        public string LoanName { get; set; }
        public DateTime LoanDate { get; set; }
        public string Symbol { get; set; }
        public decimal Debt { get; set; }
        public bool Hidden { get; set; }
        public double InterestRate { get; set; }
        public int UserId { get; set; }
        public int LoanTypeId { get; set; }
        public ICollection<LoanEntry.LoanEntry> LoanEntries;
    }
}