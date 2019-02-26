using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using Networth.Entities.PositionEntry;

namespace Networth.Entities.Position
{
    public class Position {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PositionId { get; set; }
        [Required]
        [MaxLength(50), MinLength(1)]
        public string PositionName { get; set; }
        [MaxLength(10), MinLength(1)]
        public string Symbol { get; set; }
        public DateTime DateAdded { get; set; }
        public int AccountTypeId { get; set; }
        public bool Hidden { get; set; }
        public ICollection<PositionEntry.PositionEntry> PositionEntries;
    }
}