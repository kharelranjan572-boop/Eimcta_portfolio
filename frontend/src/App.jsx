import './App.css';
import './index.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, useLocation

} from "react-router-dom";
import Home from './assets/component/pages/home.jsx';
import Footer from './assets/component/sections/footer.jsx';
import Navbar from './assets/component/sections/navbar';
import PageTransitionWrapper from './assets/component/utilities/transition_framer';
import ScrollToTopButton from './assets/component/utilities/ScrolllTop';

import NotFound from './assets/component/pages/pagenofound';
import Blog from './assets/component/pages/blog';
import ContentBoosting from './assets/component/pages/content_boosting.jsx';
import Services from './assets/component/pages/service.jsx';
import About from './assets/component/pages/about.jsx';
import Contact from './assets/component/pages/contactus.jsx';
import { AnimatePresence } from "framer-motion";
import Faq from './assets/component/pages/faq.jsx';
import Traning from './assets/component/utilities/traning/traning.jsx';
import EnvironmentalServices from './assets/component/pages/Enviroment.jsx';
import ISOConsultancy from './assets/component/pages/iso_consultancy.jsx';
import SafetySignPPE from './assets/component/pages/safetysignppe.jsx';
import TechnicalBidComponent from './assets/component/pages/Bid_tender';
import ISOAuditGuide from './assets/component/pages/aduit.jsx';
import HealthSafety from './assets/component/utilities/health&safety.jsx';
import HSEAwarenessTraining from './assets/component/utilities/HSE.jsx';
import HSEAudits from './assets/component/utilities/hseaduit.jsx';
import Chat from './assets/component/utilities/chat';
import TopContactBar from './assets/component/utilities/Top_Contact.jsx';
import ISO21001Guide from './assets/component/pages/Iso_21001.jsx';
import ISO9001Certification from './assets/component/pages/ISO_9001.jsx'
import ISO45001Certification from './assets/component/pages/iso_45001.jsx';
import TopHeader from './assets/component/utilities/topheader.jsx';
import ISO_certification from './assets/component/pages/iso_certificate.jsx';
import ISO22000Certification from './assets/component/pages/iso2200.jsx';
import ScrollToTop from './assets/component/utilities/scroltotop.jsx';
import BusinessQuoteForm from './assets/component/pages/form.jsx';
import Admin_Form from './assets/component/utilities/AdminForm.jsx';
import AdminFeature from './assets/component/utilities/AdminFeature.jsx';

// import ISO22000Certification from './assets/component/pages/ISO_2200';

function App() {
  const location = useLocation()
  const hidePaths = [
    "/Blog-Offers/get-quote-and-check-eligibility",
    "/Adminfeature"

  ];

  const shouldHide = hidePaths.some(path =>
    location.pathname.startsWith(path)
  );
  return (
    <div>
      <AnimatePresence mode="wait">
        <ScrollToTop />

        <TopHeader />

        <TopContactBar />
        <Navbar />

        <Routes>
          <Route path="/" element={
            <PageTransitionWrapper> <Home /></PageTransitionWrapper>} />

          <Route path="/Blog-Offers/FB-Titktok-Linkedin-youtube" element={
            <PageTransitionWrapper>  <Blog /></PageTransitionWrapper>} />

          <Route path="/Blog-Offers/Offers-Contents-Latest-Boosting" element={
            <PageTransitionWrapper> <ContentBoosting /></PageTransitionWrapper>} />
          <Route path="/about-us" element={
            <PageTransitionWrapper> <About /></PageTransitionWrapper>} />

          <Route path="/services" element={
            <PageTransitionWrapper> <Services /></PageTransitionWrapper>} />


          <Route path="/contact-us" element={
            <PageTransitionWrapper> <Contact /></PageTransitionWrapper>} />

          <Route path="services/iso-consultancy" element={
            <PageTransitionWrapper> <ISOConsultancy /></PageTransitionWrapper>} />

          <Route path="Blog-Offers/FAQ" element={
            <PageTransitionWrapper> <Faq /></PageTransitionWrapper>} />

          <Route path="services/iso-certification" element={
            <PageTransitionWrapper> <ISO_certification /></PageTransitionWrapper>} />

          <Route path="services/environmental-services-eta-env-monitoring-air-water-soil-etc" element={
            <PageTransitionWrapper> <EnvironmentalServices /></PageTransitionWrapper>} />

          <Route path="services/iso-training/ohs/health-safety-plan-doc" element={
            <PageTransitionWrapper> <HealthSafety /></PageTransitionWrapper>} />

          <Route path="services/iso-training/ohs/implementation" element={
            <PageTransitionWrapper> <HSEAwarenessTraining /></PageTransitionWrapper>} />

          <Route path="services/iso-training/ohs/audits" element={
            <PageTransitionWrapper> <HSEAudits /></PageTransitionWrapper>} />

          <Route path="services/supply-of-sign-quality-safety-env-companies" element={
            <PageTransitionWrapper> <SafetySignPPE /></PageTransitionWrapper>} />
          <Route path="services/tender-technical-bid-preparation" element={
            <PageTransitionWrapper> <TechnicalBidComponent /></PageTransitionWrapper>} />

          <Route path="services/iso-audit" element={
            <PageTransitionWrapper> <ISOAuditGuide /></PageTransitionWrapper>} />

          <Route path="service/iso/2100" element={<PageTransitionWrapper> < ISO21001Guide
          /></PageTransitionWrapper>} />

          <Route path="service/iso/2200" element={<PageTransitionWrapper> <ISO22000Certification />  </PageTransitionWrapper>} />

          <Route path="service/iso/9001" element={<PageTransitionWrapper> < ISO9001Certification /></PageTransitionWrapper>} />

          <Route path="service/iso/45001" element={<PageTransitionWrapper> < ISO45001Certification /></PageTransitionWrapper>} />

          <Route path="Blog-Offers/get-quote-and-check-eligibility" element={<PageTransitionWrapper> < Admin_Form /></PageTransitionWrapper>} />
          <Route path="Adminfeature" element={<PageTransitionWrapper> < AdminFeature /></PageTransitionWrapper>} />

          <Route path="services/iso-training" element={<PageTransitionWrapper><Traning /></PageTransitionWrapper>}>
          </Route>
          <Route path="*" element={<NotFound />} />


        </Routes>

        <Chat />

        {!shouldHide && <BusinessQuoteForm />}
        <ScrollToTopButton />

        <Footer />
      </AnimatePresence>
    </div>

  )
}

export default App;