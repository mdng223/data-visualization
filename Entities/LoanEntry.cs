using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

namespace Networth.Entities.LoanEntry
{
    public class LoanEntry {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PositionEntryId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]

        public DateTime DateAdded { get; set; }
        public bool Hidden { get; set; }
        [Required]
        public Position.Position Position { get; set; }
    }
}