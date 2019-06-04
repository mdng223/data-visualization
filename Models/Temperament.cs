using System;
using System.Collections.Generic;
using Networth.Models;

namespace Networth.Models
{
    public class Temperament
    {
        public int maleCount { get; set; }
        public int femaleCount { get; set; }
        public string name { get; set; }
        public int total { get; set; }
        public double totalPercentage { get; set; }
        public List<MbtiType> mbtiTypes { get; set; }
    }
}