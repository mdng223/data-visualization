using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Networth.Services;
using Networth.Entities.Role;
using Networth.Models;


namespace Networth.Controllers
{

    [ApiController]
    public class RoleController : Controller
    {
        private NetworthDbContext _context;
        public RoleController(NetworthDbContext context) {
            _context = context;
        }
        [HttpGet("api/[controller]")]
        public ActionResult GetRoles() {
            List<RoleModel> roleList = new List<RoleModel> {};
            foreach (Role role in _context.Roles) {
                RoleModel roleData = new RoleModel();
                roleData.RoleId = role.Id;
                roleData.RoleName = role.RoleName;
                Console.WriteLine(roleData.RoleName);
                roleList.Add(roleData);
            }
            return Json(roleList);
        }
    }
}