import { useEffect, useLayoutEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/razorpay";
import { CREATE_ORDER_URL, VERIFY_PAYMENT_URL } from "@/lib/payment-config";

interface BookingFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  packagePrice: number;
}

const QUALITIES = ["Success", "Wealth", "Leadership", "Spirituality", "Health", "All"];

const ADDON_NAME = "Delivery Date Change Protection";
const ADDON_PRICE = 737;

type PaymentStatus = "idle" | "creating" | "paying" | "verifying" | "success" | "error";

const getValidPackagePrice = (price: number) =>
  Number.isFinite(price) && price >= 1 ? Math.round(price * 100) / 100 : null;

const todayISO = new Date().toISOString().split("T")[0];

const MAX_WINDOW_DAYS = 7;

const addDaysISO = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const BookingFormModal = ({ open, onOpenChange, packageName, packagePrice }: BookingFormModalProps) => {
  
  const [form, setForm] = useState({
    motherName: "",
    fatherName: "",
    motherDob: "",
    fatherDob: "",
    expectedDeliveryFrom: "",
    expectedDeliveryTo: "",
    city: "",
    state: "",
    email: "",
    whatsapp: "",
    pinCode: "",
    avoidOrPreferNumbers: "",
    preferredDeity: "",
    hospitalName: "",
    lastCheckupDate: "",
    qualities: "",
    notes: "",
  });

  const [addonSelected, setAddonSelected] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [pinLookup, setPinLookup] = useState<"idle" | "loading" | "found" | "notfound">("idle");

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handlePinChange = async (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setForm((p) => ({ ...p, pinCode: digits }));
    if (digits.length !== 6) {
      setPinLookup("idle");
      return;
    }
    setPinLookup("loading");
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${digits}`);
      const data = await res.json();
      const office = data?.[0]?.PostOffice?.[0];
      if (office) {
        setForm((p) => ({
          ...p,
          city: office.District || office.Block || office.Name || p.city,
          state: office.State || p.state,
        }));
        setPinLookup("found");
      } else {
        setPinLookup("notfound");
      }
    } catch {
      setPinLookup("notfound");
    }
  };

  const isProcessing = ["creating", "paying", "verifying"].includes(paymentStatus);
  const isPaying = paymentStatus === "paying" || paymentStatus === "verifying";

  // While the Razorpay checkout overlay is open, release Radix's focus trap /
  // scroll lock so the payment sheet stays interactive (esp. on mobile Safari).
  useEffect(() => {
    if (!isPaying) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPointer = body.style.pointerEvents;
    body.style.overflow = "";
    body.style.pointerEvents = "";
    body.removeAttribute("data-scroll-locked");
    return () => {
      body.style.overflow = prevOverflow;
      body.style.pointerEvents = prevPointer;
    };
  }, [isPaying]);
  const validPackagePrice = getValidPackagePrice(packagePrice);
  const addonAmount = addonSelected ? ADDON_PRICE : 0;
  const totalPrice = validPackagePrice === null ? null : validPackagePrice + addonAmount;

  // Redirect to the dedicated thank-you page the instant payment is verified.
  useLayoutEffect(() => {
    if (paymentStatus !== "success") return;
    const params = new URLSearchParams();
    params.set("package", addonSelected ? `${packageName} + ${ADDON_NAME}` : packageName);
    if (totalPrice) params.set("amount", String(totalPrice));
    if (paymentId) params.set("paymentId", paymentId);
    if (orderId) params.set("orderId", orderId);
    window.location.replace(`/thank-you?${params.toString()}`);
  }, [paymentStatus, packageName, totalPrice, addonSelected, paymentId, orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const from = form.expectedDeliveryFrom;
      const to = form.expectedDeliveryTo;
      if (from && to) {
        const diff =
          (new Date(`${to}T00:00:00`).getTime() - new Date(`${from}T00:00:00`).getTime()) / 86400000;
        if (diff < 0) throw new Error("Delivery window 'To' date cannot be before the 'From' date.");
        if (diff > MAX_WINDOW_DAYS - 1)
          throw new Error(`Delivery window cannot exceed ${MAX_WINDOW_DAYS} days. Please choose near-to-near dates.`);
      }

      if (validPackagePrice === null || totalPrice === null) {
        throw new Error("Invalid package price. Please check the package price environment variable.");
      }

      setPaymentStatus("creating");
      await loadRazorpayScript();

      const orderRes = await fetch(CREATE_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          currency: "INR",
          receipt: `pkg_${packageName.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}`,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json().catch(() => ({}));
        throw new Error(err.error || "Could not create payment order. Please try again.");
      }

      const order = await orderRes.json();
      setOrderId(order.id || "");

      setPaymentStatus("paying");

      const razorpayKey =
        (order.key_id as string | undefined) ||
        (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined);

      if (!razorpayKey) {
        throw new Error("Razorpay Key ID is missing from the payment order response.");
      }

      if (!order.id || !Number.isFinite(order.amount) || order.amount <= 0) {
        throw new Error("Invalid payment order received. Please try again.");
      }

      await new Promise<void>((resolve, reject) => {
        openRazorpayCheckout({
          key: razorpayKey,
          amount: order.amount,
          currency: order.currency,
          name: "Ankshaastra Occult Experts LLP",
          description: packageName,
          order_id: order.id,
          prefill: {
            name: form.motherName || form.fatherName,
            email: form.email,
            contact: form.whatsapp.replace(/\D/g, ""),
          },
          theme: { color: "#E8637F" },
          handler: async (response) => {
            setPaymentStatus("verifying");
            try {
              const verifyRes = await fetch(VERIFY_PAYMENT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  booking: form,
                  packageName,
                  addon: addonSelected ? { name: ADDON_NAME, price: ADDON_PRICE } : null,
                  packageAmount: validPackagePrice,
                  amount: totalPrice,
                }),
                
              });

              if (!verifyRes.ok) {
                const err = await verifyRes.json().catch(() => ({}));
                throw new Error(err.error || "Payment verification failed.");
              }

              setPaymentId(response.razorpay_payment_id);
              setOrderId(response.razorpay_order_id);
              setPaymentStatus("success");

              resolve();
            } catch (err) {
              reject(err);
            }
          },
          modal: {
            ondismiss: () => {
              setPaymentStatus("idle");
              resolve();
            },
          },
          onPaymentFailed: (error) => {
            reject(new Error(error.description || error.reason || "Payment failed. Please try again."));
          },
        });
      });
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setPaymentStatus("error");
    }
  };

  if (paymentStatus === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm w-[96vw] bg-brand-surface border-brand-border p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-rose/10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-rose border-t-transparent" />
          </div>
          <h2 className="font-display text-lg text-brand-heading">Payment Successful</h2>
          <p className="mt-1 text-sm text-brand-muted">Redirecting you to the confirmation page…</p>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} modal={!isPaying} onOpenChange={(o) => { if (!isProcessing) onOpenChange(o); }}>
      <DialogContent
        onInteractOutside={(e) => { if (isProcessing) e.preventDefault(); }}
        onEscapeKeyDown={(e) => { if (isProcessing) e.preventDefault(); }}
        onOpenAutoFocus={(e) => { if (isPaying) e.preventDefault(); }}
        className={`max-w-lg w-[96vw] max-h-[90vh] overflow-y-auto bg-brand-surface border-brand-border p-0 ${isPaying ? "pointer-events-none opacity-60" : ""}`}
      >
        <DialogHeader className="sticky top-0 z-10 bg-brand-surface px-5 pt-5 pb-3 border-b border-brand-border">
          <DialogTitle className="font-display text-lg text-brand-heading text-center">
            {packageName} — ₹{(validPackagePrice ?? packagePrice).toLocaleString("en-IN")}
          </DialogTitle>
          <p className="text-xs text-brand-muted text-center mt-1">Fill in your details to proceed to payment</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-5 pb-5 pt-3 space-y-4">
          {/* Parents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Mother's Full Name *</Label>
              <Input required value={form.motherName} onChange={(e) => update("motherName", e.target.value)} placeholder="Full name" className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Father's Full Name *</Label>
              <Input required value={form.fatherName} onChange={(e) => update("fatherName", e.target.value)} placeholder="Full name" className="h-9 text-sm" />
            </div>
          </div>

          {/* Parent DOBs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Mother's Date of Birth *</Label>
              <Input required type="date" max={todayISO} value={form.motherDob} onChange={(e) => update("motherDob", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Father's Date of Birth *</Label>
              <Input required type="date" max={todayISO} value={form.fatherDob} onChange={(e) => update("fatherDob", e.target.value)} className="h-9 text-sm" />
            </div>
          </div>

          {/* Delivery date + Pin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Expected Delivery — From *</Label>
              <Input required type="date" min={todayISO} value={form.expectedDeliveryFrom} onChange={(e) => update("expectedDeliveryFrom", e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Expected Delivery — To *</Label>
              <Input
                required
                type="date"
                min={form.expectedDeliveryFrom || todayISO}
                max={form.expectedDeliveryFrom ? addDaysISO(form.expectedDeliveryFrom, MAX_WINDOW_DAYS - 1) : undefined}
                value={form.expectedDeliveryTo}
                onChange={(e) => update("expectedDeliveryTo", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          <div className="rounded-lg border border-brand-gold/40 bg-brand-gold/10 px-3 py-2 space-y-1">
            <p className="text-[11.5px] font-semibold text-brand-gold leading-snug">
              A maximum window of {MAX_WINDOW_DAYS} days is allowed (near-to-near dates) — this keeps the muhurat calculation
              precise. Windows longer than {MAX_WINDOW_DAYS} days can't be selected.
            </p>
            <p className="text-[11.5px] text-brand-body leading-snug">
              Booking in advance, or window not decided yet / awaiting sonography? Just pick any tentative dates and write
              “advance booking — dates awaited” in the Notes box below. We'll finalise once your sonography report is ready.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Delivery Pin Code *</Label>
              <Input
                required
                inputMode="numeric"
                maxLength={6}
                value={form.pinCode}
                onChange={(e) => handlePinChange(e.target.value)}
                placeholder="110001"
                className="h-9 text-sm"
              />
              {pinLookup === "loading" && <p className="text-[10px] text-brand-muted">Looking up city & state…</p>}
              {pinLookup === "found" && <p className="text-[10px] text-emerald-600">✓ City & state auto-filled</p>}
              {pinLookup === "notfound" && <p className="text-[10px] text-amber-600">Couldn't auto-detect — please enter city & state manually.</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">State *</Label>
              <Input required value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="State" className="h-9 text-sm" />
            </div>
          </div>

          {/* Location & Hospital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">City of Delivery *</Label>
              <Input required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Hospital Name *</Label>
              <Input required value={form.hospitalName} onChange={(e) => update("hospitalName", e.target.value)} placeholder="Hospital name" className="h-9 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Last Doctor Visit / Sonography Date *</Label>
              <Input
                required
                type="date"
                max={todayISO}
                value={form.lastCheckupDate}
                onChange={(e) => update("lastCheckupDate", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>


          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">Email Address *</Label>
              <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className="h-9 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-brand-body">WhatsApp Number *</Label>
              <Input required type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="+91 98765 43210" className="h-9 text-sm" />
            </div>
          </div>

          {/* Optional */}
          <div className="border-t border-brand-border pt-3 mt-2">
            <p className="text-xs text-brand-gold font-semibold mb-2">Optional but Helpful</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-brand-body">Numbers to Avoid / Prefer</Label>
                <Input value={form.avoidOrPreferNumbers} onChange={(e) => update("avoidOrPreferNumbers", e.target.value)} placeholder="e.g. Avoid 4, Prefer 1" className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-brand-body">Preferred Deity</Label>
                <Input value={form.preferredDeity} onChange={(e) => update("preferredDeity", e.target.value)} placeholder="e.g. Lord Ganesha" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="space-y-1">
                <Label className="text-xs text-brand-body">Qualities to Manifest</Label>
                <Select value={form.qualities} onValueChange={(v) => update("qualities", v)}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUALITIES.map((q) => (
                      <SelectItem key={q} value={q}>{q}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1 mt-3">
              <Label className="text-xs text-brand-body">Notes / Special Requests</Label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                placeholder="e.g. Advance booking — delivery window not decided yet, awaiting sonography report."
                className="w-full rounded-md border border-brand-border bg-background px-3 py-2 text-sm text-brand-body placeholder:text-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Add-on */}
          <button
            type="button"
            onClick={() => setAddonSelected((v) => !v)}
            aria-pressed={addonSelected}
            className={`w-full text-left rounded-card border-2 p-4 transition-colors ${
              addonSelected ? "border-brand-rose bg-brand-rose/5" : "border-brand-border bg-brand-card"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-[11px] font-bold ${
                  addonSelected ? "border-brand-rose bg-brand-rose text-white" : "border-brand-border text-transparent"
                }`}
              >
                ✓
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-sm font-semibold text-brand-heading">{ADDON_NAME}</span>
                  <span className="rounded-full bg-brand-gold/15 px-2 py-0.5 text-[10px] font-semibold text-brand-gold">
                    ★ Highly Recommended
                  </span>
                </div>
                <p className="mt-1 text-xs text-brand-body">
                  If your delivery gets preponed (or rescheduled) by your doctor, we recalculate and give you a fresh
                  set of auspicious dates & muhurat — for just ₹{ADDON_PRICE.toLocaleString("en-IN")}.
                </p>
                <p className="font-accent mt-1 text-lg font-bold text-brand-rose">
                  + ₹{ADDON_PRICE.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </button>

          {/* Order summary */}
          <div className="rounded-lg border border-brand-border bg-brand-card px-4 py-3 text-sm">
            <div className="flex justify-between text-brand-body">
              <span>{packageName}</span>
              <span className="font-accent">₹{(validPackagePrice ?? packagePrice).toLocaleString("en-IN")}</span>
            </div>
            {addonSelected && (
              <div className="mt-1 flex justify-between text-brand-body">
                <span>{ADDON_NAME}</span>
                <span className="font-accent">₹{ADDON_PRICE.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="mt-2 flex justify-between border-t border-brand-border pt-2 font-semibold text-brand-heading">
              <span>Total</span>
              <span className="font-accent text-lg">
                ₹{(totalPrice ?? packagePrice + addonAmount).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Error */}
          {paymentStatus === "error" && errorMessage && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Processing status */}
          {isProcessing && (
            <div className="rounded-lg bg-brand-card border border-brand-border px-4 py-3 text-sm text-brand-body text-center">
              {paymentStatus === "creating" && "⏳ Preparing your payment…"}
              {paymentStatus === "paying" && "💳 Complete payment in the Razorpay window…"}
              {paymentStatus === "verifying" && "🔐 Verifying your payment…"}
            </div>
          )}

          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-brand-rose hover:bg-brand-rose-dark text-white font-semibold py-3 rounded-full transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isProcessing
              ? paymentStatus === "creating"
                ? "Preparing…"
                : paymentStatus === "verifying"
                ? "Verifying…"
                : "Awaiting Payment…"
              : `Pay Securely — ₹${(totalPrice ?? packagePrice + addonAmount).toLocaleString("en-IN")}`}
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-brand-muted">
            <span>🔒 Secured by Razorpay</span>
            <span>·</span>
            <span>Your details are handled with complete confidentiality.</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormModal;
