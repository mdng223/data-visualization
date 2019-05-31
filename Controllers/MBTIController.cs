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
                    mm.Temperment = mbti.Temperment;
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
            var ntList = _context.MBTI.Where(mbti => mbti.Type.Substring(1, 2) == "NF").ToList();
            return Json( new {
                total = ntList.Count(),
                male = ntList.Where(mbti => mbti.Gender == "M").Count(),
                female = ntList.Where(mbti => mbti.Gender == "F").Count(),
                enfj = ntList.Where(mbti => mbti.Type == "ENFJ").Count(),
                infj = ntList.Where(mbti => mbti.Type == "INFJ").Count(),
                enfp = ntList.Where(mbti => mbti.Type == "ENFP").Count(),
                infp = ntList.Where(mbti => mbti.Type == "INFP").Count(),
            });
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
            var ntList = _context.MBTI.Where(mbti => mbti.Type.Substring(1, 2) == "SJ").ToList();
            return Json( new {
                total = ntList.Count(),
                male = ntList.Where(mbti => mbti.Gender == "M").Count(),
                female = ntList.Where(mbti => mbti.Gender == "F").Count(),
                esfj = ntList.Where(mbti => mbti.Type == "ESFJ").Count(),
                isfj = ntList.Where(mbti => mbti.Type == "ISFJ").Count(),
                estj = ntList.Where(mbti => mbti.Type == "ESTJ").Count(),
                istj = ntList.Where(mbti => mbti.Type == "ISTJ").Count(),
            });
        }

        [HttpGet("api/[controller]/getSP")]
        public JsonResult getSP() {
            var ntList = _context.MBTI.Where(mbti => mbti.Type.Substring(1, 2) == "SP").ToList();
            return Json( new {
                total = ntList.Count(),
                male = ntList.Where(mbti => mbti.Gender == "M").Count(),
                female = ntList.Where(mbti => mbti.Gender == "F").Count(),
                esfp = ntList.Where(mbti => mbti.Type == "ESFP").Count(),
                isfp = ntList.Where(mbti => mbti.Type == "ISFP").Count(),
                estp = ntList.Where(mbti => mbti.Type == "ESTP").Count(),
                istp = ntList.Where(mbti => mbti.Type == "ISTP").Count(),
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