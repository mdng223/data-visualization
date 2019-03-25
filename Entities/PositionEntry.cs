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
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }


        public DateTime DateAdded {get; set; }
        public bool Hidden { get; set; }
        public int PositionId { get; set; }
    }
}