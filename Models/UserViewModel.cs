using System;

namespace Networth.Models
{
    public class UserViewModel
    {
        public int Id  {get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public int LoanId { get; set; }
        public string RoleName { get; set; }
    }
}