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
    public class StavkaPorudzbineController : ApiController
    {
        private DBModel db = new DBModel();

        [Authorize]
        // GET: api/StavkaPorudzbine
        public IQueryable<StavkaPorudzbine> GetStavkaPorudzbines()
        {
            return db.StavkaPorudzbines;
        }

        [Authorize]
        // GET: api/StavkaPorudzbine/5
        [ResponseType(typeof(StavkaPorudzbine))]
        public IHttpActionResult GetStavkaPorudzbine(int id)
        {
            StavkaPorudzbine stavkaPorudzbine = db.StavkaPorudzbines.Find(id);
            if (stavkaPorudzbine == null)
            {
                return NotFound();
            }

            return Ok(stavkaPorudzbine);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/StavkaPorudzbine/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStavkaPorudzbine(int id, StavkaPorudzbine stavkaPorudzbine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stavkaPorudzbine.StavkaPorudzbineID)
            {
                return BadRequest();
            }

            db.Entry(stavkaPorudzbine).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(stavkaPorudzbine);
        }

        [HttpPost]
        [Route("api/StavkePorudzbine")]
        [Authorize(Roles = "Administrator, Kupac")]
        public IHttpActionResult PostStavkePorudzbine(StavkaPorudzbine[] stavkePorudzbine)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                foreach (var s in stavkePorudzbine)
                {
                    db.StavkaPorudzbines.Add(s);
                    db.SaveChanges();
                }

                return Ok("Dodate su stavke porudzbine");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        // POST: api/StavkaPorudzbine
        [ResponseType(typeof(StavkaPorudzbine))]
        public IHttpActionResult PostStavkaPorudzbine(StavkaPorudzbine stavkaPorudzbine)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.StavkaPorudzbines.Add(stavkaPorudzbine);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = stavkaPorudzbine.StavkaPorudzbineID }, stavkaPorudzbine);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/StavkaPorudzbine/5
        [ResponseType(typeof(StavkaPorudzbine))]
        public IHttpActionResult DeleteStavkaPorudzbine(int id)
        {
            StavkaPorudzbine stavkaPorudzbine = db.StavkaPorudzbines.Find(id);
            if (stavkaPorudzbine == null)
            {
                return NotFound();
            }

            db.StavkaPorudzbines.Remove(stavkaPorudzbine);
            db.SaveChanges();

            return Ok(stavkaPorudzbine);
        }

        [HttpDelete]
        [Route("api/StavkaPorudzbine/deleteByPorudzbina/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByPorudzbina(int id)
        {
            try
            {
                foreach (var sp in db.StavkaPorudzbines)
                {
                    if (sp.PorudzbinaID == id)
                    {
                        db.StavkaPorudzbines.Remove(sp);
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
        [Route("api/StavkaPorudzbine/deleteByProizvod/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByProizvod(int id)
        {
            try
            {
                foreach (var sp in db.StavkaPorudzbines)
                {
                    if (sp.ProizvodID == id)
                    {
                        db.StavkaPorudzbines.Remove(sp);
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

        private bool StavkaPorudzbineExists(int id)
        {
            return db.StavkaPorudzbines.Count(e => e.StavkaPorudzbineID == id) > 0;
        }
    }
}