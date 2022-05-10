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
    public class RecenzijaProizvodaController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/RecenzijaProizvoda
        public IQueryable<RecenzijaProizvoda> GetRecenzijaProizvodas()
        {
            return db.RecenzijaProizvodas;
        }

        // GET: api/RecenzijaProizvoda/5
        [ResponseType(typeof(RecenzijaProizvoda))]
        public IHttpActionResult GetRecenzijaProizvoda(int id)
        {
            RecenzijaProizvoda recenzijaProizvoda = db.RecenzijaProizvodas.Find(id);
            if (recenzijaProizvoda == null)
            {
                return NotFound();
            }

            return Ok(recenzijaProizvoda);
        }

        [Authorize]
        // PUT: api/RecenzijaProizvoda/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRecenzijaProizvoda(int id, RecenzijaProizvoda recenzijaProizvoda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recenzijaProizvoda.RecenzijaProizvodaID)
            {
                return BadRequest();
            }

            db.Entry(recenzijaProizvoda).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(recenzijaProizvoda);
        }

        [Authorize]
        // POST: api/RecenzijaProizvoda
        [ResponseType(typeof(RecenzijaProizvoda))]
        public IHttpActionResult PostRecenzijaProizvoda(RecenzijaProizvoda recenzijaProizvoda)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.RecenzijaProizvodas.Add(recenzijaProizvoda);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = recenzijaProizvoda.RecenzijaProizvodaID }, recenzijaProizvoda);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize]
        // DELETE: api/RecenzijaProizvoda/5
        [ResponseType(typeof(RecenzijaProizvoda))]
        public IHttpActionResult DeleteRecenzijaProizvoda(int id)
        {
            RecenzijaProizvoda recenzijaProizvoda = db.RecenzijaProizvodas.Find(id);
            if (recenzijaProizvoda == null)
            {
                return NotFound();
            }

            db.RecenzijaProizvodas.Remove(recenzijaProizvoda);
            db.SaveChanges();

            return Ok(recenzijaProizvoda);
        }

        [HttpDelete]
        [Route("api/RecenzijaProizvoda/deleteByKorisnik/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByKorisnik(int id)
        {
            try
            {
                foreach (var k in db.RecenzijaProizvodas)
                {
                    if (k.KorisnikID == id)
                    {
                        db.RecenzijaProizvodas.Remove(k);
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

        private bool RecenzijaProizvodaExists(int id)
        {
            return db.RecenzijaProizvodas.Count(e => e.RecenzijaProizvodaID == id) > 0;
        }
    }
}