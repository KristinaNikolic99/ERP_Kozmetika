using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;

namespace Backend.Controllers
{
    /// <summary>
    /// Korisnik Controller pomocu kojeg se vrse sve potrebne funkcionalnosti iz specifikacije vezane za korisnika
    /// </summary>
    public class KorisnikController : ApiController
    {
        private DBModel db = new DBModel();

        /// <summary>
        /// Dobijanje korisnika na osnovu ranije definisanog tokena ostvarenog nakon unosa tacnog username-a i password-a 
        /// </summary>
        [Authorize]
        [HttpGet]
        [Route("api/GetKorisnik")]
        public Korisnik GetKorisnikToken()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            Korisnik model = new Korisnik()
            {
                KorisnikID = Int32.Parse(identityClaims.FindFirst("KorisnikID").Value),
                TipKorisnika = identityClaims.FindFirst(ClaimTypes.Role).Value,
                Ime = identityClaims.FindFirst("Ime").Value,
                Prezime = identityClaims.FindFirst("Prezime").Value,
                Kontakt = identityClaims.FindFirst("Kontakt").Value,
                Adresa = identityClaims.FindFirst("Adresa").Value,
                Email = identityClaims.FindFirst("Email").Value,
                Username = identityClaims.FindFirst("Username").Value,
                Password = identityClaims.FindFirst("Password").Value,
                BrojStana = Int32.Parse(identityClaims.FindFirst("BrojStana").Value),
                UkupnoStanjeBodova = Int32.Parse(identityClaims.FindFirst("UkupnoStanjeBodova").Value)
            };
            return model;
        }

        /// <summary>
        /// Pristup korisniku na osnovu username-a i password-a
        /// </summary>
        /// <param name="username">Primer username-a: Kristinaa</param>
        /// <param name="password">Primer password-a: kristina123</param>
        /// <returns>Vraca korisnika sa zadatim username-om i password-om</returns>
        /// <response code = "200">Pristup korisniku putem username-a i password-a</response>
        /// <response code = "401">Korisnik nije ulogovan</response>
        /// <response code = "404">Ne postoji korisnik sa zadatim username-om ili password-om</response>
        [HttpGet]
        [Route("api/GetKorisnik/{Username}/{Password}")]
        public IHttpActionResult GetKorisnikUP(string username, string password)
        {
            Korisnik korisnik = new Korisnik();
            string encryptPassword = this.EncryptPassword(password);
            foreach (var k in db.Korisniks)
            {
                if (k.Username == username && k.Password == encryptPassword)
                {
                    korisnik = k;
                }
            }
            if (korisnik.Username == null)
            {
                return NotFound();
            }
            return Ok(korisnik);
        }

        /// <summary>
        /// Pristup svim korisnicima, koji je omogucen od strane prethodno ulogovanog korisnika koji ima ulogu Administratora u sistemu
        /// </summary>
        /// <returns>Vraca listu svih korisnika</returns>
        /// <remarks>
        /// <strong>
        /// Potrebno je prethodno ulogovati postojeceg korisnika \
        /// </strong>
        /// </remarks>
        /// <response code = "200">Pristup svim korisnicima</response>
        /// <response code = "401">Korisnik nije ulogovan</response>
        // GET: api/Korisnik
        [Authorize(Roles = "Administrator")]
        public IQueryable<Korisnik> GetKorisniks()
        {
            return db.Korisniks;
        }


        /// <summary>
        /// Pristup korisniku na osnovu zadatog id-a
        /// </summary>
        /// <param name="id">Id korisnika primer: 1</param>
        /// <returns>Vraca korisnika ciji id je zadat u putanji</returns>
        /// <response code = "200">Dobijanje korisnika na osnovu zadatog id-a</response>
        /// <response code = "401">Korisnik nije ulogovan</response>
        /// <response code = "404">Ne postoji korisnik sa zadatim id-em</response>
        // GET: api/Korisnik/5
        [ResponseType(typeof(Korisnik))]
        public IHttpActionResult GetKorisnik(int id)
        {
            Korisnik korisnik = db.Korisniks.Find(id);
            if (korisnik == null)
            {
                return NotFound();
            }

            return Ok(korisnik);
        }

        /// <summary>
        /// Pristup korisnicima na osnovu naziva uloge koju imaju, definisanu kroz tip korisnika
        /// </summary>
        /// <param name="tipKorisnika">Primer uloge: Administrator</param>
        /// <returns>Vraca korisnika sa zadatom ulogom</returns>
        /// <response code = "200">Dobijanje korisnika na osnovu zadate uloge koju ima</response>
        /// <response code = "401">Korisnik nije ulogovan</response>
        /// <response code = "404">Ne postoji korisnik sa zadatom ulogom</response>
        [HttpGet]
        [Route("api/GetTip/{tipKorisnika}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult GetByNazivTipaKorisnika(string tipKorisnika)
        {
            List<Korisnik> korisnici = new List<Korisnik>();
            foreach (var k in db.Korisniks)
            {
                if (tipKorisnika == k.TipKorisnika)
                {
                    korisnici.Add(k);
                }
            }

            if (korisnici != null)
            {
                return Ok(korisnici);
            }
            return NotFound();
        }



        /// <summary>
        /// Modifikacija postojeceg korisnika,  od strane korisnika koji imaju ulogu Administrator
        /// </summary>
        /// <param name="id">Parametar na osnovu kojeg se identifikuje korisnik za azuriranje 4</param>
        /// <param name="korisnik">Model novog korisnika</param>
        /// <returns>Vraca modifikovanog korisnika</returns>
        /// <remarks>
        /// <strong>
        /// Primer request-a za modifikovanje korisnika <br />
        /// !!!!!! Ovaj json je potrebno kopirati u request body kako bi uspesno testirali!!!!! <br />
        /// PUT api/Korisnik/4 <br />
        /// </strong>
        ///{ <br />
        ///     "KorisnikID": 4, <br />
        ///     "TipKorisnika": "Kupac", <br />
        ///     "Ime": "Lela", <br />
        ///     "Prezime": "Misic", <br />
        ///     "Email": "lela@gmail.com", <br />
        ///     "Kontakt": "064-555-888" <br />
        ///     "Adresa": "Kosovska 6" <br />
        ///     "Username": "lelaaa" <br />
        ///     "Password": "lela123" <br />
        ///     "BrojStana": 190 <br />
        ///     "UkupnoStanjeBodova": 14 <br />
        ///}
        /// </remarks>
        /// <response code = "200">Dobijanje modifikovanog korisnika</response>
        /// <response code = "400">Nisu dobro prosledjeni podaci</response>
        /// <response code = "401">Korisnik nije ulogovan</response>
        /// <response code = "404">Ne postoji korisnik sa zadatim id-em</response>
        // PUT: api/Korisnik/5
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKorisnik(int id, Korisnik korisnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != korisnik.KorisnikID)
            {
                return BadRequest();
            }

             db.Entry(korisnik).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(korisnik);
        }

        /// <summary>
        /// Kreiranje novog korisnika od strane korisnika koji ima ulogu Administratora
        /// </summary>
        /// <param name="korisnik">Model korisnika</param>
        /// <returns>Vraca novog korisnika</returns>
        /// <remarks>
        /// <strong>
        /// Primer request-a za kreiranje novog korisnika <br />
        /// !!!!!! Ovaj json je potrebno kopirati u request body kako bi uspesno testirali!!!!! <br />
        /// POST api/Korisnik/ <br />
        /// </strong>
        ///{ <br />
        ///     "TipKorisnika": "Kupac", <br />
        ///     "Ime": "Zara", <br />
        ///     "Prezime": "Zaric", <br />
        ///     "Email": "zara@gmail.com", <br />
        ///     "Kontakt": "064-234-456", \n
        ///     "Adresa": "Bul. Oslobodjenja 2", <br />
        ///     "Username": "zaraaa", <br />
        ///     "Password": "zara123", <br />
        ///     "BrojStana": 12, <br />
        ///     "UkupnoStanjeBodova": 0 <br />
        ///}
        /// </remarks>
        /// <response code = "201">Kreiran je novi korisnik</response>
        /// <response code = "401">Korisnik nije ulogovan</response>
        /// <response code = "500">Greska prilikom pokusaja kreiranja korisnika</response>
        // POST: api/Korisnik
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(Korisnik))]
        public IHttpActionResult PostKorisnik(Korisnik korisnik)
        {
            try
            {
                korisnik.Password = this.EncryptPassword(korisnik.Password);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Korisniks.Add(korisnik);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = korisnik.KorisnikID }, korisnik);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        /// <summary>
        /// Brisanje postojeceg korisnika od strane korisnika koji ima ulogu Administratora
        /// </summary>
        /// <param name="id">Parametar id-a korisnika za kojeg se izvrsava brisanje</param>
        /// <returns>Brise zadatog korisnika</returns>
        /// <response code = "200">Obrisan je korisnik</response>
        /// <response code = "401">Korisnik nije ulogovan</response>
        /// <response code = "404">Ne postoji korisnik za kojeg se izvrsava brisanje</response>
        // DELETE: api/Korisnik/5
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(Korisnik))]
        public IHttpActionResult DeleteKorisnik(int id)
        {
            try
            {
                Korisnik korisnik = db.Korisniks.Find(id);
                if (korisnik == null)
                {
                    return NotFound();
                }

                db.Korisniks.Remove(korisnik);
                db.SaveChanges();

                return Ok(korisnik);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError,
                    new { message = "Nije moguce obrisati korisnika sve dok se ne izvrse dodatna brisanja" });
            }
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KorisnikExists(int id)
        {
            return db.Korisniks.Count(e => e.KorisnikID == id) > 0;
        }

        public string EncryptPassword(string password)
        {
            string encryptPassword;
            string hash = "kika";
            byte[] data = UTF8Encoding.UTF8.GetBytes(password);
            using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
            {
                byte[] keys = md5.ComputeHash(UTF32Encoding.UTF8.GetBytes(hash));
                using (TripleDESCryptoServiceProvider tripDes = new TripleDESCryptoServiceProvider() { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
                {
                    ICryptoTransform transform = tripDes.CreateEncryptor();
                    byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                    encryptPassword = Convert.ToBase64String(results, 0, results.Length);
                }
            }
            return encryptPassword;
        }
    }
}