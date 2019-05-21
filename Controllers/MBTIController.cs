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
    }
}