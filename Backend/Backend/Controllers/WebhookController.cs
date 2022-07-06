using Kozmetika.Models;
using Stripe;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Kozmetika.Controllers
{
 
    public class WebhookController : ApiController
    {

        private KozmetikaEntities db = new KozmetikaEntities();

        [HttpPost]
        [Route("api/webhook")]
        public async Task<IHttpActionResult> Index() {
            var json = await new StreamReader(HttpContext.Current.Request.InputStream).ReadToEndAsync();
            //const string endpointSecret = "whsec_262b9d9c220908d3432d4ab4d578f65500665f5d95b84e77a4ed4561f46c6c82";
            try
            {
                var stripeEvent = EventUtility.ParseEvent(json);
                //var signatureHeader = HttpContext.Current.Request.Headers["Stripe-Signature"];

                //var stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, endpointSecret);

                if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    //Console.WriteLine("A successful payment for {0} was made", paymentIntent.Amount);
                }
                else if (stripeEvent.Type == Events.PaymentMethodAttached)
                {
                    var paymentMethod = stripeEvent.Data.Object as PaymentMethod;
                }
                else if (stripeEvent.Type == Events.ChargeSucceeded)
                {
                    var paymentCharge = stripeEvent.Data.Object as Charge;
                    //var tokenId = paymentCharge.Id;
                    //var amount = paymentCharge.Amount / 100;
                    //var currency = paymentCharge.Currency;
                    //var email = paymentCharge.BillingDetails.Name;
                    //var date = DateTime.Now.ToString("dddd, dd MMMM yyyy");
                    //var obj = new { tokenId, amount, currency, email, date };
                    //db.Placanje.Add((Placanje) obj);
                    Placanje placanje = new Placanje();
                    placanje.tokenId = paymentCharge.Id;
                    placanje.amount = (int)(paymentCharge.Amount) / 100;
                    placanje.currency = paymentCharge.Currency;
                    placanje.email = paymentCharge.BillingDetails.Name;
                    placanje.date = DateTime.Now.ToString("dddd, dd MMMM yyyy");

                    db.Placanje.Add(placanje);
                    db.SaveChanges();
                    return Ok(new { placanje });
                }
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok(json);
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }
    }
}
