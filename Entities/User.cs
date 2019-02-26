using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Networth.Entities.Position;
using Networth.Entities.Role;
using System.Collections.Generic;
using System;

namespace Networth.Entities.User
{
 
     public class User
     {
          [Key]
          [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
          public int Id { get; set; }
          [Required, MaxLength(20), MinLength(4)]
          public string Username { get; set; }
          [Required, MaxLength(50), MinLength(8)]
          public string Password { get; set; }
          [Required, MaxLength(50), MinLength(6)]
          public string Email { get; set; }

          public int LoanId { get; set; }
          public DateTime DateAdded { get; set; } 
          public bool Hidden {get; set; }
          public virtual ICollection<Position.Position> Positions { get; set; }
          
          [ForeignKey("RoleId")]
          public int RoleId { get; set; }
          public virtual Role.Role Role { get; set; }
     }
}