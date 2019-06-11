using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Models;
using Networth.Entities.Mbti;
using Networth.Entities.MbtiUser;
using Networth.Entities.Gender;

/*
    
    * Add strings to constants page
 */
namespace Networth.Controllers
{
    [ApiController]
    public class MbtiController : Controller
    {
        private NetworthDbContext _context;
        public MbtiController(NetworthDbContext context) {
            _context = context;
        }

        [HttpPost("api/[controller]")]
        public JsonResult AddMbti(MbtiUser mbtiUser) {
            bool status = false;
            string message = "";
            string firstName = "";
            string lastName = "";
            string type = "";
            try {
                type = _context.Mbti.FirstOrDefault(mbti => mbti.Id == mbtiUser.Id).Symbol;
                message = ValidateMbti(mbtiUser);
                if (message.Count() == 0) {
                    status = true;
                    firstName = mbtiUser.FirstName;
                    lastName = mbtiUser.LastName;
                    type = _context.Mbti.FirstOrDefault(mbti => mbti.Id == mbtiUser.Id).Symbol;
                    _context.MbtiUser.Add(mbtiUser);
                    _context.SaveChanges();
                }
            } catch (Exception e) {
                message += $"Error: Could not add new MBTI. Exception: '{e}'";
                firstName = "Uknown";
                lastName = "Unknown";
                type = "Unknown";
            }

            
            return Json(new {
                status = status,
                message = $"'{firstName}' '{lastName}' ('{type}') successfully saved. "
            });
        }

        [HttpPut("api/[controller]/hide")]
        public JsonResult Hide(HideModel hideModel) {
            bool status = false;
            try {
                MbtiUser person =_context.MbtiUser.FirstOrDefault(a => a.Id == hideModel.Id);
                status = (person == null) ? true : false;
                person.Hidden = true;
                _context.SaveChanges();
            } catch (Exception e) {
                Console.WriteLine($"ERROR: Could not hide. Exception: '{e}'");
                return Json( new {
                    status,
                    message = "ERROR: Could not delete. Exception: " + e
                    });
            }
            return Json(hideModel.Id);
        }

        [HttpGet("api/[controller]/getGenders")]
        public JsonResult GetGenders(){
            List<Gender> genders = new List<Gender>();
            bool status = true;
            string message = "";

            try {
                foreach (Gender gender in _context.Gender) {
                    genders.Add(gender);
                }
            } catch (Exception e) {
                status = false;
                message += $"Exception: '{e}'. ";
            }
            
            return Json(new {
                genders,
                message,
                status,
            });
        }

        [HttpGet("api/[controller]getMbtis")]
        public JsonResult getMbtis() {
            List<MbtiUser> mbtis = new List<MbtiUser>();
            bool status = true;
            string message = "";

            try {
                foreach (MbtiUser mbtiUser in _context.MbtiUser) {  
                    if (mbtiUser.Hidden == false) {
                        mbtis.Add(mbtiUser);
                    }
                }
            } catch (Exception e) {
                status = false;
                message += $"Exception: '{e}'. ";
            }
            
            return Json(
                new { 
                    status,
                    mbtis,
                    message
                    }
                );
        }

        [HttpGet("api/[controller]/getMbtiTypes")]
        public JsonResult getMbtiTypes() {
            List<Mbti> mbtis = new List<Mbti>();
            bool status = true;
            string message = "";

            try {
                foreach (Mbti mbti in _context.Mbti) {
                    mbtis.Add(mbti);
                }
            } catch (Exception e) {
                status = false;
                message += $"Exception: '{e}'. ";
            }
            
            return Json(new {
                mbtis,
                message,
                status,
            });
        }

        [HttpGet("api/[controller]/getNF")]
        public JsonResult getNF() {
            List<MbtiUser> nfList = _context.MbtiUser.Where(
                user => user.Mbti.TemperamentSymbol.Substring(1, 2) == "NF").ToList();
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
            List<MbtiUser> ntList = _context.MbtiUser.Where(
                user => user.Mbti.TemperamentSymbol.Substring(1, 2) == "NT").ToList();
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
            List<MbtiUser> sjList = _context.MbtiUser.Where(
                user => user.Mbti.TemperamentSymbol[1] == 'S'
                        && user.Mbti.TemperamentSymbol[3] == 'J'
                ).ToList();

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
            List<MbtiUser> spList = _context.MbtiUser.Where(
                user => user.Mbti.TemperamentSymbol[1] == 'S'
                        && user.Mbti.TemperamentSymbol[3] == 'P'
                ).ToList();
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

        private MbtiType getMbtiType(string mbtiName, string mbtiType, List<MbtiUser> subTemperamentList) {
            // make sure mbtiName and mbtiType exist
            // if not return uknown for all the objects
            MbtiType MbtiType = new MbtiType();
            double total = _context.Mbti.Count();
            int mbtiId = _context.Mbti.FirstOrDefault(mbti => mbti.Symbol == mbtiType).Id;

            MbtiType.name = mbtiName;
            MbtiType.total = subTemperamentList.Where(mbti => mbti.MbtiId == mbtiId).Count();
            MbtiType.totalPercentage = (double)MbtiType.total / total * 100;
            return MbtiType;
        }

        private Temperament getTemperament(List<MbtiUser> subTemperamentList, string temperamentName) {
            Temperament temperament = new Temperament();
            double total = _context.MbtiUser.Count();
            int maleId = _context.Gender.FirstOrDefault(g => g.Type == "Male").Id;
            int femaleId = _context.Gender.FirstOrDefault(g => g.Type =="Female").Id;
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
            temperament.maleCount = subTemperamentList.Where(mbti => mbti.GenderId == maleId).Count();
            temperament.femaleCount = subTemperamentList.Where(mbti => mbti.GenderId == femaleId).Count();
            temperament.total = subTemperamentList.Count();
            temperament.totalPercentage = (double)subTemperamentList.Count() / total * 100;

            return temperament;
        }

        [HttpGet("api/[controller]/getTemperaments")]
        public JsonResult getTemperaments() {
             List<Mbti> mbtis = new List<Mbti>();
            bool status = true;
            string message = "";

            try {
                foreach (Mbti mbti in _context.Mbti) {
                    mbtis.Add(mbti);
                }
            } catch (Exception e) {
                status = false;
                message += $"Exception: '{e}'. ";
            }
            
            return Json(new {
                mbtis,
                message,
                status,
            });
        }

        private string ValidateMbti(MbtiUser mbtiUser){
            string message = "";
            int errorCount = 0;

            // CHCEK LENGTH OF FIRST NAME
            if (mbtiUser.FirstName.Count() > 50) {
                errorCount += 1;
                message += $"'{errorCount}'. First name ('{mbtiUser.FirstName.Count()}') cannot be greater than 50 chars in length. ";
            } else if (mbtiUser.FirstName.Count() == 0) {
                errorCount += 1;
                message += $"'{errorCount}'. First name ('{mbtiUser.FirstName.Count()}') needs to be atleast 1 char long in length. ";
            }
            // CHECK LENGTH OF LAST NAME
            if (mbtiUser.LastName.Count() > 50) {
                errorCount +=1;
                message += $"'{errorCount}'. Last name ('{mbtiUser.FirstName.Count()}') cannot be greater than 50 chars in length. ";
            } else if (mbtiUser.LastName.Count() == 0) {
                errorCount += 1;
                message += $"'{errorCount}'. Last name ('{mbtiUser.FirstName.Count()}') needs to be atleast 1 char long in length. ";
            }
            // CHECK IF TYPE EXISTS in db
            if (!_context.Mbti.Any(mbti => mbti.Id == mbtiUser.MbtiId)) {
                errorCount += 1;
                message += $"'{errorCount}'. Type does not exist in database. ";
            }
            // CHECK IF GENDER EXISTS in db
            if (!_context.Gender.Any(gender => gender.Id == mbtiUser.GenderId)) {
                errorCount += 1;
                message += $"'{errorCount}'. Gender ('{mbtiUser.Gender}') does not exist in database. ";
            }
            return message;
        }
    }
}