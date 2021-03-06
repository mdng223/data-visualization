using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System;

namespace Networth.Entities.Mbti
{ 
    public class Mbti
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required, MinLength(4), MaxLength(20)]
        public string Name { get; set; }

        [Required, MinLength(4), MaxLength(4)]
        public string Symbol { get; set; }

        [Required]
        public string TemperamentName { get; set; }

        [Required]
        public string TemperamentSymbol { get; set; }
    }
}