

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Models;
using Networth.Entities.MbtiUser;
using Networth.Entities.Gender;

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

        [HttpPost("api/[controller]/add")]
        public JsonResult AddMbti(MbtiUser mbti) {
            bool status = false;
            string message = "";
            try {
                message = ValidateMbti(mbti);
                if (message.Count() == 0) {
                    status = true;
                    _context.MbtiUser.Add(mbti);
                    _context.SaveChanges();
                }
            } catch (Exception e) {
                message += $"Error: Could not add new MBTI. Exception: '{e}'";
            }

            // No errors
            if (message.Count() == 0) {
                status = true;
                message = $"'{mbti.FirstName}' '{mbti.LastName}' ('{mbti.Type}') successfully saved. ";
            }

            return Json(new { status, message });
        }

        [HttpPut("api/[controller]/edit")]
        public JsonResult EditMbti(MbtiViewModel mbti) {
            bool status = false;
            string message = "";
            try {
                MbtiUser mu =_context.MbtiUser.FirstOrDefault(m => m.Id == mbti.Id);
                if(mu == null) {
                    message += "User could not be found for updating.";
                } else {
                    mu.FirstName = mbti.FirstName;
                    mu.LastName = mbti.LastName;
                    mu.MbtiId = 
                    mu.GenderId = 
                    _context.SaveChanges();
                }                
            } catch (Exception e) {
                message += $"Error: Could not edit. Exception: '{e}'";
            }

            // No errors
            if (message.Count() == 0) {
                status = true;
                message = $"'{mbti.FirstName}' '{mbti.LastName}' ('{mbti.Type}') successfully edited. ";
            }

            return Json(new { status, message });
        }

        [HttpPut("api/[controller]/hide")]
        public JsonResult Hide(int mbtiId) {
            bool status = false;
            string message = "";
            try {
                MbtiUser mbtiUser =_context.MbtiUser.FirstOrDefault(a => a.Id == mbtiId);
                if(mbtiUser == null) {
                    status = false;
                } else {
                    message = $"'{mbtiUser.FirstName}' '{mbtiUser.LastName}' ('{mbtiUser.Type}') successfully deleted. ";
                    mbtiUser.Hidden = true;
                    _context.SaveChanges();
                }                
            } catch (Exception e) {
                message += $"Error: Could not delete. Exception: '{e}'";
            }

            // no errors
            if(message.Count() == 0) {
                status = true;
            }

            return Json(new { status, message});
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
            List<MbtiViewModel> mbtis = new List<MbtiViewModel>();
            bool status = true;
            string message = "";

            try {
                foreach (MbtiUser mbtiUser in _context.MbtiUser) {  
                    if (mbtiUser.Hidden == false) {
                        MbtiUser currentUser = _context.Mbti.FirstOrDefault(mbti => mbti.Id = mbtiUser.MbtiId);
                        mbtis.Add(new MbtiViewModel(
                            FirstName = mbtiUser.FirstName,
                            LastName = mbtiUser.LastName,
                            Gender = mbtiUser.Gender,
                            Email = mbtiUser.Email,
                            TypeName = currentUser.TypeName,
                            Type = currentUser.TypeName,
                        ));
                        mbtiUsers.Add(mbtiUser);
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

        private string ValidateMbti(MBTI mbti){
            string message = "";
            int errorCount = 0;

            // CHCEK LENGTH OF FIRST NAME
            if (mbti.FirstName.Count() > 50) {
                errorCount += 1;
                message += $"'{errorCount}'. First name ('{mbti.FirstName.Count()}') cannot be greater than 50 chars in length. ";
            } else if (mbti.FirstName.Count() == 0) {
                errorCount += 1;
                message += $"'{errorCount}'. First name ('{mbti.FirstName.Count()}') needs to be atleast 1 char long in length. ";
            }
            // CHECK LENGTH OF LAST NAME
            if (mbti.LastName.Count() > 50) {
                errorCount +=1;
                message += $"'{errorCount}'. Last name ('{mbti.FirstName.Count()}') cannot be greater than 50 chars in length. ";
            } else if (mbti.LastName.Count() == 0) {
                errorCount += 1;
                message += $"'{errorCount}'. Last name ('{mbti.FirstName.Count()}') needs to be atleast 1 char long in length. ";
            }
            // CHECK IF TYPE EXISTS in db
            if (!_context.Mbti.Any(mbti => mbti.Name == mbti.Type)) {
                errorCount += 1;
                message += $"'{errorCount}'. Type ('{mbti.Type}') does not exist in database. ";
            }
            // CHECK IF TEMPERAMENT EXISTS in db
            if (!_context.Mbti.Any(mbti => mbti.Temperament == mbti.Temperament)){
                errorCount += 1;
                message += $"'{errorCount}'. Temperament ('{mbti.Temperament}') does not exist in database. ";
            }
            // CHECK IF GENDER EXISTS in db
            if (!_context.Gender.Any(gender => gender.Type == mbti.Gender)) {
                errorCount += 1;
                message += $"'{errorCount}'. Gender ('{mbti.Gender}') does not exist in database. ";
            }
            return message;
        }
    }
}