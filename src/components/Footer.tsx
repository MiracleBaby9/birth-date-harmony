import { Link } from "react-router-dom";
import DisclaimerLine from "./DisclaimerLine";

const Footer = () => (
  <footer className="bg-brand-surface border-t border-brand-border py-8">
    <div className="container text-center space-y-4">
      <div className="flex flex-wrap justify-center gap-4 text-sm font-body">
        <Link to="/privacy-policy" className="text-brand-muted hover:text-brand-rose transition-colors">
          Privacy Policy
        </Link>
        <Link to="/refund-policy" className="text-brand-muted hover:text-brand-rose transition-colors">
          Refund & Cancellation Policy
        </Link>
        <Link to="/terms-of-service" className="text-brand-muted hover:text-brand-rose transition-colors">
          Terms of Service
        </Link>
      </div>
      <p className="text-brand-muted text-sm font-body">
        © Ankshaastra Occult Experts LLP. All Rights Reserved 2026.
      </p>
      <DisclaimerLine />
    </div>
  </footer>
);

export default Footer;
