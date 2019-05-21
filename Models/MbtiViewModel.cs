using System;
using System.Collections.Generic;
using Networth.Entities.MBTI;
namespace Networth.Models
{
    public class MbtiModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Type { get; set; }
        public string Temperment { get; set; }
        public char Mind { get; set; }
        public char Energy { get; set; }
        public char Nature { get; set; }
        public char Tactic { get; set; }
        public string Gender { get; set;}
    }
}