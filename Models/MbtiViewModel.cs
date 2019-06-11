using System;
using System.Collections.Generic;
using Networth.Entities.Mbti;
namespace Networth.Models
{
    public class MbtiViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Type { get; set; }
        public string Gender { get; set;}
        public string Temperament { get; set; }
        public bool Hidden { get; set; }
    }
}