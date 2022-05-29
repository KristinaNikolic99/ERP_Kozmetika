using Backend.Controllers;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Backend.Models
{
    public class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using (UserMasterRepository _repo = new UserMasterRepository())
            {
                KorisnikController korisnikController = new KorisnikController();
                string encryptPassword = korisnikController.EncryptPassword(context.Password);
                var user = _repo.ValidateUser(context.UserName, encryptPassword);
                if (user == null)
                {
                    context.SetError("invalid_grant", "Provided username and password is incorrect");
                    return;
                }
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("KorisnikID", user.KorisnikID.ToString()));
                identity.AddClaim(new Claim(ClaimTypes.Role, user.TipKorisnika));
                identity.AddClaim(new Claim("Ime", user.Ime));
                identity.AddClaim(new Claim("Prezime", user.Prezime));
                identity.AddClaim(new Claim("Email", user.Email));
                identity.AddClaim(new Claim("Kontakt", user.Kontakt));
                identity.AddClaim(new Claim("Adresa", user.Adresa));
                identity.AddClaim(new Claim("Username", user.Username));
                identity.AddClaim(new Claim("Password", user.Password));
                identity.AddClaim(new Claim("BrojStana", user.BrojStana.ToString()));
                identity.AddClaim(new Claim("UkupnoStanjeBodova", user.UkupnoStanjeBodova.ToString()));
                context.Validated(identity);
            }
        }
    }
}