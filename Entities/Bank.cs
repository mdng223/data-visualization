using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;


namespace Networth.Entities.Bank
{

    public class Bank {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BankId { get; set; }
        [Required]
        public string BankName { get; set; }
        [Required]
        public decimal Balance { get; set; }
        public decimal InterestRate { get; set;}
        public bool Hidden { get; set; }
        public int UserId { get; set; }
        public int BankTypeId { get; set; }
    }
}