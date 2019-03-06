using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Entities.Position;
using Networth.Models;

namespace Networth.Controllers
{
    [ApiController]
    public class PositionController : Controller
    {
        private NetworthDbContext _context;
        public PositionController(NetworthDbContext context) {
            _context = context;
        }
        [Route("[controller]")]
        public ActionResult Index() {
            return View();
        }

        [HttpGet("api/[controller]")]
        public ActionResult GetUsers() {
            List<PositionViewModel> positionList = new List<PositionViewModel> {};
            foreach (Position position in _context.Positions) {
                if (position.Hidden == false) {
                    PositionViewModel positionData = new PositionViewModel();
                    positionData.PositionId = position.PositionId;
                    positionData.PositionName = position.PositionName;
                    positionData.Symbol = position.Symbol;
                    positionData.UserId = position.UserId;
                    positionData.Username = _context.Users.Find(position.UserId).Username;
                    positionList.Add(positionData);
                }
            }
            return Json(positionList);
        }


        [HttpGet("api/[controller]/{id}")]
        public IActionResult GetPositionId(int id) {
            return Ok(_context.Positions.Find(id));
        }
    }
}