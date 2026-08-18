import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => (
  <div className="min-h-screen bg-brand-bg">
    <div className="container max-w-3xl py-12 px-4">
      <Link to="/" className="inline-flex items-center gap-2 text-brand-rose hover:underline mb-8 font-body text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="heading-lg text-brand-heading mb-2">Terms of Service</h1>
      <p className="text-brand-muted text-sm mb-8 font-body">Effective Date: 1 January 2025</p>

      <div className="prose prose-sm max-w-none font-body text-brand-body space-y-6">
        <h2 className="text-xl font-display text-brand-heading">1. Acceptance of Terms</h2>
        <p>By accessing or using Ankshaastra services, you agree to be bound by these Terms of Service.</p>

        <h2 className="text-xl font-display text-brand-heading">2. Service Description</h2>
        <p>Ankshaastra provides numerology-based name correction reports and related consultation services. Our services are based on traditional numerology principles and are intended for guidance purposes only.</p>

        <h2 className="text-xl font-display text-brand-heading">3. Disclaimer</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Results and outcomes vary based on individual circumstances</li>
          <li>Numerology is a metaphysical practice, not a guaranteed science</li>
          <li>We do not guarantee specific life changes or results</li>
          <li>Our reports are for informational and guidance purposes only</li>
          <li>We are not responsible for decisions made based on our reports</li>
        </ul>

        <h2 className="text-xl font-display text-brand-heading">4. Intellectual Property</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>All reports, content, and materials are the intellectual property of Ankshaastra</li>
          <li>Reports are for personal use only and may not be reproduced, shared, or resold</li>
          <li>Unauthorized distribution may result in legal action</li>
        </ul>

        <h2 className="text-xl font-display text-brand-heading">5. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Provide accurate information (name, date of birth)</li>
          <li>Review all information before submitting orders</li>
          <li>Respect intellectual property rights</li>
          <li>Use services legally and ethically</li>
        </ul>

        <h2 className="text-xl font-display text-brand-heading">6. Limitation of Liability</h2>
        <p>Ankshaastra shall not be liable for:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Any indirect, incidental, or consequential damages</li>
          <li>Decisions made based on our reports</li>
          <li>Technical issues, delivery delays, or service interruptions</li>
          <li>Third-party actions or website issues</li>
        </ul>

        <h2 className="text-xl font-display text-brand-heading">7. Governing Law</h2>
        <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.</p>

        <h2 className="text-xl font-display text-brand-heading">8. Contact Information</h2>
        <p>For questions about these Terms of Service:</p>
        <p>Ankshaastra Occult Experts LLP</p>
        <p>Phone: 9667305577</p>
        <p className="text-brand-muted text-xs mt-8">Last Updated: 1 January 2025</p>
        <p className="text-brand-muted text-xs">Note: These policies are subject to change. Please review them periodically for updates.</p>
      </div>
    </div>
  </div>
);

export default TermsOfService;
