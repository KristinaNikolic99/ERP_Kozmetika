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
    public class SlikeBrendaController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/SlikeBrenda
        public IQueryable<SlikeBrenda> GetSlikeBrendas()
        {
            return db.SlikeBrendas;
        }

        // GET: api/SlikeBrenda/5
        [ResponseType(typeof(SlikeBrenda))]
        public IHttpActionResult GetSlikeBrenda(int id)
        {
            SlikeBrenda slikeBrenda = db.SlikeBrendas.Find(id);
            if (slikeBrenda == null)
            {
                return NotFound();
            }

            return Ok(slikeBrenda);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/SlikeBrenda/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSlikeBrenda(int id, SlikeBrenda slikeBrenda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != slikeBrenda.SlikeBrendaID)
            {
                return BadRequest();
            }

            db.Entry(slikeBrenda).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(slikeBrenda);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/SlikeBrenda
        [ResponseType(typeof(SlikeBrenda))]
        public IHttpActionResult PostSlikeBrenda(SlikeBrenda slikeBrenda)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.SlikeBrendas.Add(slikeBrenda);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = slikeBrenda.SlikeBrendaID }, slikeBrenda);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/SlikeBrenda/5
        [ResponseType(typeof(SlikeBrenda))]
        public IHttpActionResult DeleteSlikeBrenda(int id)
        {
            SlikeBrenda slikeBrenda = db.SlikeBrendas.Find(id);
            if (slikeBrenda == null)
            {
                return NotFound();
            }

            db.SlikeBrendas.Remove(slikeBrenda);
            db.SaveChanges();

            return Ok(slikeBrenda);
        }

        [HttpDelete]
        [Route("api/SlikeBrenda/deleteByBrend/{id}")]
        [Authorize(Roles = "Administrator")]
        public IHttpActionResult DeleteByBrend(int id)
        {
            try
            {
                foreach (var sl in db.SlikeBrendas)
                {
                    if (sl.BrendID == id)
                    {
                        db.SlikeBrendas.Remove(sl);
                    }
                }
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message});
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

        private bool SlikeBrendaExists(int id)
        {
            return db.SlikeBrendas.Count(e => e.SlikeBrendaID == id) > 0;
        }
    }
}