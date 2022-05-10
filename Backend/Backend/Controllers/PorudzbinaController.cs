using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;

namespace Backend.Controllers
{
    public class PorudzbinaController : ApiController
    {
        private DBModel db = new DBModel();

        [Authorize]
        // GET: api/Porudzbina
        public IQueryable<Porudzbina> GetPorudzbinas()
        {
            return db.Porudzbinas;
        }

        [Authorize]
        // GET: api/Porudzbina/5
        [ResponseType(typeof(Porudzbina))]
        public IHttpActionResult GetPorudzbina(int id)
        {
            Porudzbina porudzbina = db.Porudzbinas.Find(id);
            if (porudzbina == null)
            {
                return NotFound();
            }

            return Ok(porudzbina);
        }

        [Authorize]
        [HttpGet]
        [Route("api/Porudzbina/last")]
        public int GetPorudzbinaLast()
        {
            int i = 0;
            int count = db.Porudzbinas.Count();
            Porudzbina porudzbina = new Porudzbina();
            foreach (var p in db.Porudzbinas)
            {
                if (++i == count)
                {
                    porudzbina = p;
                }
            }
            return porudzbina.PorudzbinaID;
        }

        [Authorize]
        [HttpGet]
        [Route("api/Porudzbina/zahtevTrue/{KorisnikID}")]
        public IHttpActionResult GetPorudzbinaZahtevTrue(int KorisnikID)
        {
            List<Porudzbina> porudzbina = new List<Porudzbina>();
            foreach (var p in db.Porudzbinas)
            {
                if (p.KorisnikID == KorisnikID && p.Zahtev == true)
                {
                    porudzbina.Add(p);
                }
            }
            if (porudzbina == null)
            {
                return BadRequest();
            }
            return Ok(porudzbina);
        }

        [Authorize]
        [HttpGet]
        [Route("api/Porudzbina/zahtevFalse/{KorisnikID}")]
        public IHttpActionResult GetPorudzbinaZahtevFalse(int KorisnikID)
        {
            List<Porudzbina> porudzbina = new List<Porudzbina>();
            foreach (var p in db.Porudzbinas)
            {
                if (p.KorisnikID == KorisnikID && p.Zahtev == false)
                {
                    porudzbina.Add(p);
                }
            }
            if (porudzbina == null)
            {
                return BadRequest();
            }
            return Ok(porudzbina);
        }

        // PUT: api/Porudzbina/5
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPorudzbina(int id, Porudzbina porudzbina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != porudzbina.PorudzbinaID)
            {
                return BadRequest();
            }

            db.Entry(porudzbina).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(porudzbina);
        }

        // POST: api/Porudzbina
        [Authorize(Roles = "Administrator, Kupac")]
        [ResponseType(typeof(Porudzbina))]
        public IHttpActionResult PostPorudzbina(Porudzbina porudzbina)
        {
            try
            {
                if (porudzbina.Datum.Year == 1)
                {
                    porudzbina.Datum = DateTime.Now;
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Porudzbinas.Add(porudzbina);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = porudzbina.PorudzbinaID }, porudzbina);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        // DELETE: api/Porudzbina/5
        [Authorize(Roles = "Administrator")]
        [ResponseType(typeof(Porudzbina))]
        public IHttpActionResult DeletePorudzbina(int id)
        {
            try
            {
                Porudzbina porudzbina = db.Porudzbinas.Find(id);
                if (porudzbina == null)
                {
                    return NotFound();
                }

                db.Porudzbinas.Remove(porudzbina);
                db.SaveChanges();

                return Ok(porudzbina);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError,
                    new { message = "Nije moguce obrisati porudzbinu sve dok se ne izvrse dodatna brisanja" });
            }
            
        }

        [HttpDelete]
        [Route("api/Porudzbina/deleteByKorisnik/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByKorisnik(int id)
        {
            try
            {
                foreach (var k in db.Porudzbinas)
                {
                    if (k.KorisnikID == id)
                    {
                        db.Porudzbinas.Remove(k);
                    }
                }
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
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

        private bool PorudzbinaExists(int id)
        {
            return db.Porudzbinas.Count(e => e.PorudzbinaID == id) > 0;
        }
    }
}