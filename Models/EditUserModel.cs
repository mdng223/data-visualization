using System;

namespace Networth.Models
{
    public class EditUserModel
    {
        public int Id  {get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
    }
}