using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using Networth.Entities.LoanEntry;

namespace Networth.Entities.Loan
{
    public enum LoanEnum {
        Subsidized, Unsubsidized
    }
    public class Loan {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LoanId { get; set; }
        [Required]
        [MaxLength(50), MinLength(1)]
        public string LoanName { get; set; }
        public DateTime DateAdded { get; set; }
        public string LoanType { get; set; }
        public bool Hidden { get; set; }
        public ICollection<LoanEntry.LoanEntry> LoanEntries;
    }
}