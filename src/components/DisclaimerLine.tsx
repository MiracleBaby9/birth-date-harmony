const DisclaimerLine = ({ light = false }: { light?: boolean }) => (
  <p
    className={`text-center font-body text-[11px] italic max-w-xl mx-auto leading-relaxed ${
      light ? "text-white/60" : "text-brand-muted"
    }`}
  >
    Date selection is advisory in nature and does not replace medical advice.
    Final decisions should always be taken in consultation with your doctor.
  </p>
);

export default DisclaimerLine;
