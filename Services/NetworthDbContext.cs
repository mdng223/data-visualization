using Microsoft.EntityFrameworkCore;
using Networth.Entities;

namespace Networth.Services
{
     public class NetworthDbContext : DbContext
     {
          public DbSet<Networth.Entities.User.User> Users { get; set; }
          public DbSet<Networth.Entities.Position.Position> Positions { get; set; }
          public DbSet<Networth.Entities.Loan.Loan> Loans { get; set; }
          public DbSet<Networth.Entities.Role.Role> Roles { get; set; }
          public NetworthDbContext(
               DbContextOptions<NetworthDbContext> options)
               : base(options)
          {
               Database.EnsureCreated();
          }
     }
}