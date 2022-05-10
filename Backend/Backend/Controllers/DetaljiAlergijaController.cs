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
    public class DetaljiAlergijaController : ApiController
    {
        private DBModel db = new DBModel();

        [Authorize]
        // GET: api/DetaljiAlergija
        public IQueryable<DetaljiAlergija> GetDetaljiAlergijas()
        {
            return db.DetaljiAlergijas;
        }

        [Authorize]
        // GET: api/DetaljiAlergija/5
        [ResponseType(typeof(DetaljiAlergija))]
        public IHttpActionResult GetDetaljiAlergija(int id)
        {
            DetaljiAlergija detaljiAlergija = db.DetaljiAlergijas.Find(id);
            if (detaljiAlergija == null)
            {
                return NotFound();
            }

            return Ok(detaljiAlergija);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/DetaljiAlergija/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDetaljiAlergija(int id, DetaljiAlergija detaljiAlergija)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != detaljiAlergija.DetaljiAlergijaID)
            {
                return BadRequest();
            }

            db.Entry(detaljiAlergija).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(detaljiAlergija);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/DetaljiAlergija
        [ResponseType(typeof(DetaljiAlergija))]
        public IHttpActionResult PostDetaljiAlergija(DetaljiAlergija detaljiAlergija)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.DetaljiAlergijas.Add(detaljiAlergija);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = detaljiAlergija.DetaljiAlergijaID }, detaljiAlergija);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/DetaljiAlergija/5
        [ResponseType(typeof(DetaljiAlergija))]
        public IHttpActionResult DeleteDetaljiAlergija(int id)
        {
            DetaljiAlergija detaljiAlergija = db.DetaljiAlergijas.Find(id);
            if (detaljiAlergija == null)
            {
                return NotFound();
            }

            db.DetaljiAlergijas.Remove(detaljiAlergija);
            db.SaveChanges();

            return Ok(detaljiAlergija);
        }

        [HttpDelete]
        [Route("api/DetaljiAlergija/deleteByAlergija/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByAlergija(int id)
        {
            try
            {
                foreach (var a in db.DetaljiAlergijas)
                {
                    if (a.AlergijaID == id)
                    {
                        db.DetaljiAlergijas.Remove(a);
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

        [HttpDelete]
        [Route("api/DetaljiAlergije/deleteByKorisnik/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByKorisnik(int id)
        {
            try
            {
                foreach (var k in db.DetaljiAlergijas)
                {
                    if (k.KorisnikID == id)
                    {
                        db.DetaljiAlergijas.Remove(k);
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

        private bool DetaljiAlergijaExists(int id)
        {
            return db.DetaljiAlergijas.Count(e => e.DetaljiAlergijaID == id) > 0;
        }
    }
}