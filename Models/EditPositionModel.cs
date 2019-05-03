using System;

namespace Networth.Models
{
    public class EditPositionModel
    {
        public int Id  {get; set; }
        public string positionName { get; set; }
        public string symbol { get; set; }
        public int userId { get; set; }
    }
}