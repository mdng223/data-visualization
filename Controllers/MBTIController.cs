using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Models;
using Networth.Entities.MBTI;

namespace Networth.Controllers
{
    [ApiController]
    public class MBTIController : Controller
    {
        private NetworthDbContext _context;
        public MBTIController(NetworthDbContext context) {
            _context = context;
        }

        [HttpGet("api/[controller]")]
        public JsonResult GetMbtis() {
            List<MbtiModel> mbtiList = new List<MbtiModel> {};
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
                    mbtiList.Add(mm);
                }
            }
            return Json(mbtiList);
        }

        [HttpGet("api/[controller]/getNF")]
        public JsonResult getNF() {
            int total = _context.MBTI.Count();
            List<MBTI> nfList = _context.MBTI.Where(mbti => mbti.Type.Substring(1, 2) == "NF").ToList();
            Temperament temperament = new Temperament();

            temperament.name = "Diplomat";
            temperament.maleCount = nfList.Where(mbti => mbti.Gender == "M").Count();
            temperament.femaleCount = nfList.Where(mbti => mbti.Gender == "F").Count();
            temperament.total = nfList.Count();
            temperament.totalPercentage = (double)temperament.total / (double)total * 100;
            temperament.mbtiTypes = new List<MbtiType>() {
                new MbtiType(){
                    name = "Advocate",
                    total = nfList.Where(mbti => mbti.Type == "INFJ").Count(),
                    totalPercentage = (double)total / (double)temperament.total * 100,
                },
                new MbtiType(){
                    name = "Campaigner",
                    total = nfList.Where(mbti => mbti.Type == "ENFP").Count(),
                    totalPercentage = (double)total / (double)temperament.total * 100,
                },
                new MbtiType(){
                    name = "Mediator",
                    total = nfList.Where(mbti => mbti.Type == "INFP").Count(),
                    totalPercentage = (double)total / (double)temperament.total * 100,
                },
                new MbtiType(){
                    name = "Protagonist",
                    total = nfList.Where(mbti => mbti.Type == "ENFJ").Count(),
                    totalPercentage = (double)total / (double)temperament.total * 100,
                },
            };

            return Json(temperament);
        }

        [HttpGet("api/[controller]/getNT")]
        public JsonResult getNT() {
            var ntList = _context.MBTI.Where(mbti => mbti.Type.Substring(1, 2) == "NT").ToList();

            return Json( new {
                total = ntList.Count(),
                male = ntList.Where(mbti => mbti.Gender == "M").Count(),
                female = ntList.Where(mbti => mbti.Gender == "F").Count(),
                entj = ntList.Where(mbti => mbti.Type == "ENTJ").Count(),
                intj = ntList.Where(mbti => mbti.Type == "INTJ").Count(),
                intp = ntList.Where(mbti => mbti.Type == "INTP").Count(),
                entp = ntList.Where(mbti => mbti.Type == "ENTP").Count(),
            });
        }

        [HttpGet("api/[controller]/getSJ")]
        public JsonResult getSJ() {
            var sjList = _context.MBTI.Where(mbti => mbti.Type[1] == 'S'
                        && mbti.Type[3] == 'J').ToList();
            Console.WriteLine(sjList.Count());
            Console.WriteLine(sjList.Where(mbti => mbti.Type == "ESFJ").Count());
            return Json( new {
                total = sjList.Count(),
                male = sjList.Where(mbti => mbti.Gender == "M").Count(),
                female = sjList.Where(mbti => mbti.Gender == "F").Count(),
                esfj = sjList.Where(mbti => mbti.Type == "ESFJ").Count(),
                isfj = sjList.Where(mbti => mbti.Type == "ISFJ").Count(),
                estj = sjList.Where(mbti => mbti.Type == "ESTJ").Count(),
                istj = sjList.Where(mbti => mbti.Type == "ISTJ").Count(),
            });
        }

        [HttpGet("api/[controller]/getSP")]
        public JsonResult getSP() {
            var spList = _context.MBTI.Where(mbti => mbti.Type[1] == 'S'
                        && mbti.Type[3] == 'P').ToList();
            Console.WriteLine(spList.Count());
            Console.WriteLine(spList.Where(mbti => mbti.Type == "ESFP").Count());
            return Json(new {
                total = spList.Count(),
                male = spList.Where(mbti => mbti.Gender == "M").Count(),
                female = spList.Where(mbti => mbti.Gender == "F").Count(),
                esfp = spList.Where(mbti => mbti.Type == "ESFP").Count(),
                isfp = spList.Where(mbti => mbti.Type == "ISFP").Count(),
                estp = spList.Where(mbti => mbti.Type == "ESTP").Count(),
                istp = spList.Where(mbti => mbti.Type == "ISTP").Count(),
            });
        }

        [HttpPut("api/[controller]/hide")]
        public ActionResult Hide(HideModel hideModel) {
            Console.WriteLine("Hiding ID:\t{0} ::\ttype: {1}", hideModel.Id, hideModel.Id.GetType());
            try {
                MBTI person =_context.MBTI.FirstOrDefault(a => a.Id == hideModel.Id);
                if(person == null) {
                    return BadRequest();
                }
                person.Hidden = true;
                _context.SaveChanges();
            } catch (Exception e) {
                return Json("MBTI hide failed. " + e);
            }
            return Json(hideModel.Id);
        }
    }
}