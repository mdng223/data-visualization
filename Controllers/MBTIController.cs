using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Models;
using Networth.Entities.MBTI;

/*
    * Create a temperament table
    * Create a mbti table with name and symbol
    * Create a person table: email, first name, last name (optional), gender, birthday (optional)
    * Create a gender table
    * Add strings to constants page
 */
namespace Networth.Controllers
{
    [ApiController]
    public class MBTIController : Controller
    {
        private NetworthDbContext _context;
        public MBTIController(NetworthDbContext context) {
            _context = context;
        }

        [HttpPost("api/[controller]")]
        public JsonResult AddMbti(MBTI mbti) {
            // NEED SERVER SIDE VALIDATION
            bool status = false;
            string message = "";
            try {
                message = ValidateMbti(mbti);
                if (message.Count() == 0) {
                    status = true;
                    _context.MBTI.Add(mbti);
                    _context.SaveChanges();
                }
            } catch (Exception e) {
                message += $"Error: Could not add new MBTI. Exception: '{e}'";
            }
            return Json(new {
                status = status,
                message = $"'{mbti.FirstName}' '{mbti.LastName}' ('{mbti.Type}') successfully saved. "
            });
        }

        [HttpPut("api/[controller]/hide")]
        public JsonResult Hide(HideModel hideModel) {
            bool Status = true;
            try {
                MBTI person =_context.MBTI.FirstOrDefault(a => a.Id == hideModel.Id);
                if(person == null) {
                    Status = false;
                }
                person.Hidden = true;
                _context.SaveChanges();
            } catch (Exception e) {
                Console.WriteLine($"ERROR: Could not hide. Exception: '{e}'");
                return Json( new {
                    status = Status,
                    message = "ERROR: Could not delete. Exception: " + e
                    });
            }
            return Json(hideModel.Id);
        }

        [HttpGet("api/[controller]")]
        public JsonResult GetMbtis() {
            List<MbtiModel> mbtis = new List<MbtiModel>();
            bool success = true;
            string message = "";

            try {
                foreach (MBTI mbti in _context.MBTI) {  
                    if (mbti.Hidden == false) {
                        MbtiModel mm = new MbtiModel();
                        mm.Id = mbti.Id;
                        mm.FirstName = mbti.FirstName;
                        mm.LastName = mbti.LastName;
                        mm.Type = mbti.Type;
                        mm.Temperament = mbti.Temperament;
                        mm.Mind = mbti.Mind;
                        mm.Energy = mbti.Energy;
                        mm.Nature = mbti.Nature;
                        mm.Tactic = mbti.Tactic;
                        mm.Gender = mbti.Gender;
                        mbtis.Add(mm);
                    }
                }
            } catch (Exception e) {
                success = false;
                message += $"Exception: '{e}'. ";
            }
            
            return Json(
                new { 
                    status = success,
                    mbtiList = mbtis
                    }
                );
        }

        [HttpGet("api/[controller]/getMbtiTypes")]
        public JsonResult getMbtiTypes() {
            return Json( new {

            });
        }

        [HttpGet("api/[controller]/getNF")]
        public JsonResult getNF() {            
            List<MBTI> nfList = _context.MBTI.Where(mbti => mbti.Type.Substring(1, 2) == "NF").ToList();
            Temperament temperament = new Temperament();

            temperament = getTemperament(nfList, "Diplomat");
            temperament.mbtiTypes = new List<MbtiType>() {
                getMbtiType("Advocate", "INFJ", nfList),
                getMbtiType("Campaigner", "ENFP", nfList),
                getMbtiType("Mediator", "INFP", nfList),
                getMbtiType("Protagonist", "ENFJ", nfList),
            };
            return Json(temperament);
        }

        [HttpGet("api/[controller]/getNT")]
        public JsonResult getNT() {
            List<MBTI> ntList = _context.MBTI.Where(mbti => mbti.Type.Substring(1, 2) == "NT").ToList();
            Temperament temperament = new Temperament();

            temperament = getTemperament(ntList, "Analyst");
            temperament.mbtiTypes = new List<MbtiType>() {
                getMbtiType("Analyst", "INTP", ntList),
                getMbtiType("Architect", "INTJ", ntList),
                getMbtiType("Commander", "ENTJ", ntList),
                getMbtiType("Debater", "ENTP", ntList),
            };
            return Json(temperament);
        }

        [HttpGet("api/[controller]/getSJ")]
        public JsonResult getSJ() {
            List<MBTI> sjList =  _context.MBTI.Where(mbti => mbti.Type[1] == 'S'
                        && mbti.Type[3] == 'J').ToList();

            Temperament temperament = new Temperament();
            temperament = getTemperament(sjList, "Sentinel");
            temperament.mbtiTypes = new List<MbtiType>() {
                getMbtiType("Consul", "ESFJ", sjList),
                getMbtiType("Defender", "ISFJ", sjList),
                getMbtiType("Executive", "ESTJ", sjList),
                getMbtiType("Logistician", "ISTJ", sjList),
            };
            return Json(temperament);
        }

        [HttpGet("api/[controller]/getSP")]
        public JsonResult getSP() {
            List<MBTI> spList =  _context.MBTI.Where(mbti => mbti.Type[1] == 'S'
                        && mbti.Type[3] == 'P').ToList();
            Temperament temperament = new Temperament();

            temperament = getTemperament(spList, "Explorer");
            temperament.mbtiTypes = new List<MbtiType>() {
                getMbtiType("Entertainer", "ESTP", spList),
                getMbtiType("Virtuoso", "ISTP", spList),
                getMbtiType("Entrepreneur", "ESFP", spList),
                getMbtiType("Adventurer", "ISFP", spList),
            };
            return Json(temperament);
        }

        private MbtiType getMbtiType(string mbtiName, string mbtiType, List<MBTI> subTemperamentList) {
            // make sure mbtiName and mbtiType exist
            // if not return uknown for all the objects
            MbtiType MbtiType = new MbtiType();
            double total = _context.MBTI.Count();

            MbtiType.name = mbtiName;
            MbtiType.total = subTemperamentList.Where(mbti => mbti.Type == mbtiType).Count();
            MbtiType.totalPercentage = (double)MbtiType.total / total * 100;
            return MbtiType;
        }

        private Temperament getTemperament(List<MBTI> subTemperamentList, string temperamentName) {
            Temperament temperament = new Temperament();
            double total = _context.MBTI.Count();
            // Check list existence
            if (subTemperamentList.Count < 0 ) {
                Console.WriteLine("ERROR: Sub temperament list is empty.");
                temperament.name = "Uknown";
                temperament.maleCount = 0;
                temperament.femaleCount = 0;
                temperament.total = 0;
                temperament.totalPercentage = 0.0;
            }

            temperament.name = temperamentName;
            temperament.maleCount = subTemperamentList.Where(mbti => mbti.Gender == "M").Count();
            temperament.femaleCount = subTemperamentList.Where(mbti => mbti.Gender == "F").Count();
            temperament.total = subTemperamentList.Count();
            temperament.totalPercentage = (double)subTemperamentList.Count() / total * 100;

            return temperament;
        }

        [HttpGet("api/[controller]/getTemperaments")]
        public JsonResult getTemperaments() {
            return Json( new {
            
            });
        }

        private string ValidateMbti(MBTI mbti){
            string message = "";
            int errorCount = 0;
            if (mbti.FirstName.Count() > 50) {
                errorCount += 1;
                message += $"'{errorCount}'. First name ('{mbti.FirstName.Count()}') cannot be greater than 50 chars in length. ";
            } else if (mbti.FirstName.Count() == 0) {
                errorCount += 1;
                message += $"'{errorCount}'. First name ('{mbti.FirstName.Count()}') needs to be atleast 1 char long in length. ";
            }
            if (mbti.LastName.Count() > 50) {
                errorCount +=1;
                message += $"'{errorCount}'. Last name ('{mbti.FirstName.Count()}') cannot be greater than 50 chars in length. ";
            } else if (mbti.LastName.Count() == 0) {
                errorCount += 1;
                message += $"'{errorCount}'. Last name ('{mbti.FirstName.Count()}') needs to be atleast 1 char long in length. ";
            }
            // CHECK IF TYPE EXISTS in db
            // CHECK IF TEMPERAMENT EXISTS in db
            // CHECK IF GENDER EXISTS in db
            return message;
        }
    }
}