using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System;

namespace Networth.Entities.MBTI
{
 
    public class MBTI
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required, MaxLength(20), MinLength(2)]
        public string FirstName { get; set; }
        [Required, MaxLength(20), MinLength(2)]
        public string LastName { get; set; }
        [Required, MaxLength(4), MinLength(4)]
        public string Type { get; set; }
        [MaxLength(2), MinLength(2)]
        public string Temperment { get; set; }
        [Required]
        public char Mind { get; set; }
        [Required]
        public char Energy { get; set; }
        [Required]
        public char Nature { get; set; }
        [Required]
        public char Tactic { get; set; }
        [Required]
        public string Gender { get; set;}
        [Required]
        public bool Hidden {get; set; }
     }
    public enum GenderEnum
    {  
        M, F, O  
    }
    public enum TypeEnum
    {
        INTP, INTJ, ENTJ, ENTP,
        INFP, INFJ, ENFJ, ENFP,
        ISFJ, ESFJ, ISTJ, ESTJ,
        ISFP, ESFP, ISTP, ESTP,
    }
    public enum MindEnum
    {
        Extrovert, Introvert
    }
    public enum EnergyEnum
    {
        Intuitive, Sensor
    }
    public enum NatureEnum
    {
        Thinker, Feeler
    }
    public enum TacticEnum
    {
        Judger, Perceriver
    }
    public enum TempermantEnum
    {
        NT, SJ, NF, SP
    }
}