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
    public class AlergijaController : ApiController
    {
        private DBModel db = new DBModel();

        [Authorize]
        // GET: api/Alergija
        public IQueryable<Alergija> GetAlergijas()
        {
            return db.Alergijas;
        }

        [Authorize]
        // GET: api/Alergija/5
        [ResponseType(typeof(Alergija))]
        public IHttpActionResult GetAlergija(int id)
        {
            Alergija alergija = db.Alergijas.Find(id);
            if (alergija == null)
            {
                return NotFound();
            }

            return Ok(alergija);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/Alergija/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAlergija(int id, Alergija alergija)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != alergija.AlergijaID)
            {
                return BadRequest();
            }

            db.Entry(alergija).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(alergija);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/Alergija
        [ResponseType(typeof(Alergija))]
        public IHttpActionResult PostAlergija(Alergija alergija)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Alergijas.Add(alergija);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = alergija.AlergijaID }, alergija);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/Alergija/5
        [ResponseType(typeof(Alergija))]
        public IHttpActionResult DeleteAlergija(int id)
        {
            try
            {
                Alergija alergija = db.Alergijas.Find(id);
                if (alergija == null)
                {
                    return NotFound();
                }

                db.Alergijas.Remove(alergija);
                db.SaveChanges();

                return Ok(alergija);
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

        private bool AlergijaExists(int id)
        {
            return db.Alergijas.Count(e => e.AlergijaID == id) > 0;
        }
    }
}