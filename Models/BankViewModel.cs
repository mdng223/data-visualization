using System;
using System.Collections.Generic;
using Networth.Entities.Bank;
namespace Networth.Models
{
    public class BankViewModel
    {
        public int BankId { get; set; }
        public string BankName { get; set; }
        public decimal Balance { get; set; }
        public decimal InterestRate { get; set;}
        public int BankType { get; set; }

    }
}