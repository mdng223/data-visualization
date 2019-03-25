using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Networth.Entities.Bank;
using System.Collections.Generic;
using System;

namespace Networth.Entities.BankType
{
    public enum BankEnum {
        Checking, Savings
    }
    public class BankType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int BankTypeId { get; set; }
        [Required, MaxLength(20), MinLength(4)]
        public string BankTypeName { get; set; }
    }
}