// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import Index from "./pages/Index.tsx";
// import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
// import RefundPolicy from "./pages/RefundPolicy.tsx";
// import TermsOfService from "./pages/TermsOfService.tsx";
// import NotFound from "./pages/NotFound.tsx";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Suspense fallback={<div className="min-h-screen bg-brand-bg" />}>
        <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
//           <Route path="/terms-of-service" element={<TermsOfService />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
        </Suspense>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";
const Reviews = lazy(() => import("./pages/Reviews.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const Media = lazy(() => import("./pages/Media.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
import ExternalRedirect from "@/components/ExternalRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-brand-bg" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/media" element={<Media />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/admin" element={<ExternalRedirect url="https://ankshaastra.com/admin" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;