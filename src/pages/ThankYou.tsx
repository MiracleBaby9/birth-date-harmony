import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const packageName = searchParams.get("package") || "Planned Delivery Guidance Package";
  const amount = searchParams.get("amount") || "";
  const paymentId = searchParams.get("paymentId") || "";
  const orderId = searchParams.get("orderId") || "";

  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!paymentId && !orderId) {
      navigate("/");
      return;
    }
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentId, orderId, navigate]);

  const formattedAmount = amount
    ? `₹${Number(amount).toLocaleString("en-IN")}`
    : "";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header />

      <main className="flex-1 pt-28 sm:pt-32 pb-16 px-4">
        <div className="container max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-rose hover:underline mb-6 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-border bg-white/70 shadow-xl backdrop-blur-md">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-sage via-brand-rose to-brand-gold" />

            <div className="bg-brand-heading px-6 py-10 text-center text-white">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 ring-2 ring-emerald-400/40">
                <CheckCircle className="h-8 w-8 text-emerald-300" strokeWidth={2.5} />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Payment Successful
              </h1>
              <p className="mt-2 text-sm md:text-base text-white/80">
                Your booking is confirmed. Thank you for choosing Ankshaastra.
              </p>
            </div>

            <div className="px-6 py-8 sm:px-10 sm:py-10 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Payment Confirmed
              </div>

              <p className="text-sm leading-relaxed text-brand-body">
                Thank you for booking <strong className="text-brand-heading">{packageName}</strong>.
                Confirmation details have been sent to your registered email.
                Ankshaastra's team will review your details and share the guidance shortly.
              </p>

              <div className="rounded-2xl border border-brand-border bg-brand-surface/50 p-5 space-y-3">
                <div className="flex items-center justify-between gap-4 border-b border-brand-border pb-3">
                  <span className="text-sm text-brand-muted">Package</span>
                  <span className="text-right font-semibold text-brand-heading">{packageName}</span>
                </div>
                {formattedAmount && (
                  <div className="flex items-center justify-between gap-4 border-b border-brand-border pb-3">
                    <span className="text-sm text-brand-muted">Amount Paid</span>
                    <span className="font-accent text-lg font-semibold text-brand-heading">
                      {formattedAmount}
                    </span>
                  </div>
                )}
                {orderId && (
                  <div className="flex items-center justify-between gap-4 border-b border-brand-border pb-3">
                    <span className="text-sm text-brand-muted">Order ID</span>
                    <div className="flex items-center gap-2">
                      <span className="break-all text-right font-mono text-xs text-brand-heading max-w-[160px] sm:max-w-[220px]">
                        {orderId}
                      </span>
                      <button
                        onClick={() => copyToClipboard(orderId)}
                        className="text-brand-muted hover:text-brand-rose transition-colors"
                        aria-label="Copy order ID"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                {paymentId && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-brand-muted">Payment ID</span>
                    <div className="flex items-center gap-2">
                      <span className="break-all text-right font-mono text-xs text-brand-heading max-w-[160px] sm:max-w-[220px]">
                        {paymentId}
                      </span>
                      <button
                        onClick={() => copyToClipboard(paymentId)}
                        className="text-brand-muted hover:text-brand-rose transition-colors"
                        aria-label="Copy payment ID"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                {copied && (
                  <p className="text-xs text-emerald-600 text-right">Copied to clipboard</p>
                )}
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                <strong>Disclaimer:</strong> Date selection is advisory in nature and does not replace
                medical advice. Final decisions should always be taken in consultation with your doctor.
              </div>

              <div className="grid gap-3 pt-2">
                <Button
                  asChild
                  className="w-full rounded-full bg-brand-rose hover:bg-brand-rose-dark text-white font-semibold py-3 h-auto"
                >
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>

              <p className="text-xs text-brand-muted text-center">
                Page will auto-redirect to home in {countdown} second{countdown !== 1 ? "s" : ""}.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
