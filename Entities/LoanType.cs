using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Networth.Entities.Loan;
using System.Collections.Generic;
using System;

namespace Networth.Entities.LoanType
{
    public enum LoanEnum {
        Subsidized, Unsubsidized
    }
     public class LoanType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int LoanTypeId { get; set; }
        [Required, MaxLength(20), MinLength(4)]
        public string LoanTypeName { get; set; }
    }
}