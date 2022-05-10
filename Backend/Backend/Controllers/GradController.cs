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
    public class GradController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Grad
        public IQueryable<Grad> GetGrads()
        {
            return db.Grads;
        }

        // GET: api/Grad/5
        [ResponseType(typeof(Grad))]
        public IHttpActionResult GetGrad(int id)
        {
            Grad grad = db.Grads.Find(id);
            if (grad == null)
            {
                return NotFound();
            }

            return Ok(grad);
        }

        [Authorize(Roles = "Administrator")]
        // PUT: api/Grad/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGrad(int id, Grad grad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != grad.GradID)
            {
                return BadRequest();
            }

            db.Entry(grad).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }

            return Ok(grad);
        }

        [Authorize(Roles = "Administrator")]
        // POST: api/Grad
        [ResponseType(typeof(Grad))]
        public IHttpActionResult PostGrad(Grad grad)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Grads.Add(grad);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = grad.GradID }, grad);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, new { message = ex.Message });
            }
            
        }

        [Authorize(Roles = "Administrator")]
        // DELETE: api/Grad/5
        [ResponseType(typeof(Grad))]
        public IHttpActionResult DeleteGrad(int id)
        {
            try
            {
                Grad grad = db.Grads.Find(id);
                if (grad == null)
                {
                    return NotFound();
                }

                db.Grads.Remove(grad);
                db.SaveChanges();

                return Ok(grad);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError,
                    new { message = "Nije moguce obrisati grad, potrebno je obrisati sve prodavnice u kojima se nalazi" });
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

        private bool GradExists(int id)
        {
            return db.Grads.Count(e => e.GradID == id) > 0;
        }
    }
}