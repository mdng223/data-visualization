using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using Networth.Entities.Position;

namespace Networth.Entities.PositionEntry
{
    public class PositionEntry {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PositionEntryId { get; set; }

        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public decimal Price { get; set; }

        [Required]

        public DateTime DateAdded {get; set; }
        public bool Hidden { get; set; }
        [Required]
        public Position.Position Position { get; set; }
    }
}