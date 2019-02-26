using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Networth.Entities.User;
using System.Collections.Generic;
using System;

namespace Networth.Entities.Role
{
    public enum RoleEnum {
        Administrator= 1, Manager = 2, User = 3
    }
     public class Role
    {
         
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required, MaxLength(20), MinLength(4)]
        public string RoleName { get; set; }

        public virtual ICollection<User.User> Users { get; set; }
    }

}