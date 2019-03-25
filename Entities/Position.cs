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
        public bool Hidden { get; set; }
        public int UserId { get; set; }
        public int PositionTypeId { get; set; }
        public virtual ICollection<PositionEntry.PositionEntry> PositionEntries { get; set; }
    }
}