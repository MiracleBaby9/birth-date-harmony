import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RefundPolicy = () => (
  <div className="min-h-screen bg-brand-bg">
    <div className="container max-w-3xl py-12 px-4">
      <Link to="/" className="inline-flex items-center gap-2 text-brand-rose hover:underline mb-8 font-body text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-display text-brand-heading mb-2">Refund & Cancellation Policy</h1>
      <p className="text-brand-muted text-sm mb-8 font-body">Effective Date: January 2025</p>

      <div className="prose prose-sm max-w-none font-body text-brand-body space-y-6">
        <h2 className="text-xl font-display text-brand-heading">1. No Refund Policy</h2>
        <p>We operate a strict NO REFUND policy for all products and services, including but not limited to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Name Correction Reports (Digital PDF)</li>
          <li>Personalized Numerology Analysis</li>
          <li>Any physical products purchased</li>
          <li>Name Check packages</li>
        </ul>

        <h2 className="text-xl font-display text-brand-heading">2. Reason for No Refund Policy</h2>
        <p>Our services involve:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Personalized consultation and analysis specific to your details (name, date of birth)</li>
          <li>Hand-crafted reports prepared individually by our expert numerologist</li>
          <li>Intellectual property and expertise that cannot be "returned" once delivered</li>
          <li>Time and effort invested in creating customized solutions</li>
        </ul>
        <p>Once a report is generated or service is rendered, it cannot be reversed, returned, or resold. Therefore, no refunds will be issued under any circumstances.</p>

        <h2 className="text-xl font-display text-brand-heading">3. Cancellation Policy</h2>

        <h3 className="text-lg font-display text-brand-heading">Before Report Generation:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>If you wish to cancel your order, you must do so within 2 hours of payment</li>
          <li>Contact us immediately at 966 730 5577 with your order details</li>
          <li>Cancellation is subject to verification that work has not yet begun</li>
          <li>If work has already commenced, cancellation will not be possible</li>
        </ul>

        <h3 className="text-lg font-display text-brand-heading">After Report Generation/Delivery:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Once the report is prepared or delivered, cancellation is not possible</li>
          <li>No refunds will be issued after the report is sent to your email</li>
        </ul>

        <h2 className="text-xl font-display text-brand-heading">4. Wrong Information Provided</h2>
        <p>If you provide incorrect details (name, date of birth, email, etc.), we are not responsible for inaccurate reports. No refunds or revisions will be provided for errors made by the customer. Please double-check all information before submitting your order.</p>

        <h2 className="text-xl font-display text-brand-heading">5. Payment Issues</h2>
        <p>In case of payment failure or technical errors where money is debited but order is not confirmed:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Contact us immediately at 9667305577</li>
          <li>Provide transaction details and payment proof</li>
          <li>We will verify with our payment gateway and resolve within 7-10 business days</li>
          <li>Refunds for genuine payment errors will be processed to the original payment method</li>
        </ul>

        <h2 className="text-xl font-display text-brand-heading">6. Disputes</h2>
        <p>All sales are final. By purchasing our services, you acknowledge and agree to this No Refund Policy. Any disputes will be subject to the jurisdiction of courts in India.</p>

        <h2 className="text-xl font-display text-brand-heading">7. Contact for Queries</h2>
        <p>If you have questions about this policy before purchasing:</p>
        <p>Ankshaastra Occult Experts LLP</p>
        <p>Phone: 9667305577</p>
        <p className="text-brand-muted text-xs mt-8">Last Updated: January 2025</p>
      </div>
    </div>
  </div>
);

export default RefundPolicy;
