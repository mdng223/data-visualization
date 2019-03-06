using System;
using System.Collections.Generic;
using Networth.Entities.Position;
using Networth.Entities.User;
namespace Networth.Models
{
    public class PositionViewModel
    {
        public int PositionId  {get; set; }
        public string PositionName { get; set; }

        public string Symbol { get; set; }

        public int AccountTypeId { get; set; }

        public int UserId { get; set; }
        public string Username { get; set; }

        public ICollection<Position> PositionEntries;
    }
}