using Microsoft.EntityFrameworkCore;
using Networth.Entities;

namespace Networth.Services
{
     public class NetworthDbContext : DbContext
     {
          public DbSet<Networth.Entities.User.User> Users { get; set; }
          public DbSet<Networth.Entities.Position.Position> Positions { get; set; }
          public DbSet<Networth.Entities.PositionType.PositionType> PositionTypes { get; set; }
           public DbSet<Networth.Entities.PositionEntry.PositionEntry> PositionEntries { get; set; }
          public DbSet<Networth.Entities.Loan.Loan> Loans { get; set; }
          public DbSet<Networth.Entities.LoanEntry.LoanEntry> LoanEntries { get; set; }        
          public DbSet<Networth.Entities.LoanType.LoanType> LoanTypes { get; set; }
          public DbSet<Networth.Entities.Role.Role> Roles { get; set; }
          public DbSet<Networth.Entities.Bank.Bank> Banks { get; set; }
          public DbSet<Networth.Entities.BankType.BankType> BankTypes { get; set; }
          public DbSet<Networth.Entities.Mbti.Mbti> Mbti { get; set; }
          public DbSet<Networth.Entities.MbtiUser.MbtiUser> MbtiUser { get; set; }
          public DbSet<Networth.Entities.Gender.Gender> Gender { get; set; }
          public NetworthDbContext(
               DbContextOptions<NetworthDbContext> options)
               : base(options)
          {
               Database.EnsureCreated();
          }
          
     }         
}