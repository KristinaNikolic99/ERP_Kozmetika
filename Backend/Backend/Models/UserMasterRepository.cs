using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class UserMasterRepository : IDisposable
    {
        DBModel context = new DBModel();

        public Korisnik ValidateUser(string username, string password)
        {
            return context.Korisniks.FirstOrDefault(user =>
            user.Username.Equals(username, StringComparison.OrdinalIgnoreCase)
            && user.Password == password);
        }
        public void Dispose()
        {
            context.Dispose();
        }
    }
}