using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System;

namespace Networth.Entities.MbtiUser
{ 
    public class MbtiUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required, MinLength(4), MaxLength(20)]
        public string FirstName { get; set; }

        [Required, MinLength(4), MaxLength(20)]
        public string LastName { get; set; }

        [ForeignKey("GenderId")]
        public int GenderId { get; set; }
        public virtual Gender.Gender Gender { get; set; }

        [ForeignKey("MbtiId")]
        public int MbtiId { get; set; }
        public virtual Mbti.Mbti Mbti { get; set; }

        [Required]
        public bool Hidden { get; set; }
    }
}   