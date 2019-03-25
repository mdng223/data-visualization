using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Networth.Entities.Position;
using System.Collections.Generic;
using System;

namespace Networth.Entities.PositionType
{
    public enum PositionEnum {
        HSA, Roth, Company401k, Brokerage
    }
    public class PositionType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int PositionTypeId { get; set; }
        [Required, MaxLength(20), MinLength(4)]
        public string PositionTypeName { get; set; }
    }
}