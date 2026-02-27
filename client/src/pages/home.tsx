import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Heart, Stethoscope, Baby, Thermometer, Shield, Activity,
  ClipboardCheck, Phone, MapPin, Clock, Star,
  Sun, Moon, Menu, X, Award,
  Users, Target, HeartHandshake, Syringe, AlertCircle, CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";
import { appointmentSchema, type AppointmentRequest } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  { icon: Heart, title: "Family Medicine", desc: "Comprehensive healthcare for patients of all ages, from preventive care to chronic disease management." },
  { icon: Baby, title: "Pediatric Care", desc: "Specialized care for infants, children, and adolescents with gentle, child-friendly approach." },
  { icon: Thermometer, title: "Fever & Infection Treatment", desc: "Accurate diagnosis and effective treatment for fevers, viral and bacterial infections." },
  { icon: Shield, title: "COVID Consultation & Recovery", desc: "Complete COVID care including consultation, monitoring, recovery management and follow-up." },
  { icon: Activity, title: "Diabetes & Hypertension", desc: "Long-term management of diabetes, hypertension, and other lifestyle-related conditions." },
  { icon: ClipboardCheck, title: "General Health Checkups", desc: "Routine health screenings and preventive checkups to maintain your overall wellbeing." },
  { icon: AlertCircle, title: "Emergency Consultation", desc: "Urgent medical consultation available during clinic hours for immediate health concerns." },
];

const reviews = [
  { rating: 5, text: "Dr. Arafath is an angel for kids. Very calm, humble and accurate in diagnosis.", author: "Parent of Patient" },
  { rating: 5, text: "Saved my family during COVID. Extremely compassionate and available whenever needed.", author: "Grateful Family" },
  { rating: 5, text: "Best family doctor for over 15 years. We trust him completely.", author: "Long-time Patient" },
  { rating: 5, text: "Precise diagnosis and very professional treatment approach.", author: "Satisfied Patient" },
  { rating: 4, text: "Doctor is excellent, but waiting time can be long.", author: "Regular Visitor" },
];

const whyChoose = [
  { icon: Award, title: "15+ Years Experience", desc: "Over a decade of dedicated medical practice" },
  { icon: Users, title: "Trusted by Generations", desc: "Families rely on Dr. Khan across generations" },
  { icon: Target, title: "Accurate Diagnosis", desc: "Known for precise and reliable diagnoses" },
  { icon: HeartHandshake, title: "Compassionate Care", desc: "Ethical, patient-centered approach always" },
  { icon: Baby, title: "Pediatric Expertise", desc: "Specialized care for children's health needs" },
  { icon: Syringe, title: "COVID Frontline", desc: "Experienced COVID care and recovery support" },
];

const clinicHours = [
  { day: "Monday", hours: "11:00 AM - 2:00 PM, 6:00 - 8:00 PM" },
  { day: "Tuesday", hours: "11:00 AM - 2:00 PM, 6:00 - 8:00 PM" },
  { day: "Wednesday", hours: "11:00 AM - 2:00 PM, 6:00 - 8:00 PM" },
  { day: "Thursday", hours: "11:00 AM - 2:00 PM, 6:00 - 8:00 PM" },
  { day: "Friday", hours: "11:00 AM - 12:30 PM, 6:00 - 8:00 PM" },
  { day: "Saturday", hours: "11:00 AM - 3:30 PM" },
  { day: "Sunday", hours: "Closed" },
];

const faqs = [
  { q: "Do I need an appointment?", a: "Walk-ins are welcome, but we recommend calling ahead to confirm availability. Appointments are confirmed at the reception desk." },
  { q: "What are clinic timings?", a: "We are open Monday to Thursday from 11 AM to 2 PM and 6 PM to 8 PM, Friday 11 AM to 12:30 PM and 6 PM to 8 PM, Saturday 11 AM to 3:30 PM. Closed on Sundays." },
  { q: "Is emergency care available?", a: "Emergency consultations are available during clinic hours only. For after-hours emergencies, please visit the nearest hospital emergency department." },
  { q: "How long is the waiting time?", a: "Waiting time varies depending on patient volume. During peak hours, it may be longer. We continuously work to minimize wait times and improve your experience." },
  { q: "Do you treat children?", a: "Yes! Dr. Khan is a specialist in pediatric care with extensive experience treating infants, children, and adolescents. He is known for his calm, gentle approach with young patients." },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Reviews", id: "reviews" },
    { label: "Clinic Info", id: "clinic" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1 sm:gap-2 h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 min-w-0"
            data-testid="link-logo"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xs sm:text-base text-foreground truncate">
              Park View Clinic
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3 py-2 text-sm text-muted-foreground rounded-md hover-elevate active-elevate-2 transition-colors"
                data-testid={`link-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => scrollTo("appointment")}
              data-testid="button-nav-appointment"
            >
              <CalendarCheck className="w-4 h-4 mr-1.5" />
              Book Appointment
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground rounded-md hover-elevate"
                data-testid={`link-mobile-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              className="w-full mt-2"
              onClick={() => scrollTo("appointment")}
              data-testid="button-mobile-appointment"
            >
              Book Appointment
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-accent/30 dark:from-primary/10 dark:via-background dark:to-accent/20 pt-16"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5 bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                  Google Rated
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight"
            >
              Park View Clinic
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-2 text-lg sm:text-xl text-primary font-semibold"
            >
              Dr. Arafath Ahmed Khan
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-muted-foreground"
            >
              Family Physician &amp; Child Specialist
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base sm:text-lg text-muted-foreground max-w-lg"
            >
              Compassionate Care for Your Entire Family. Over 15 years of trusted medical service in Bangalore.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-appointment"
              >
                <CalendarCheck className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-testid="button-hero-call"
              >
                <a href="tel:08050765999">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Trusted by Families</span>
              </div>
              <div className="flex items-center gap-2">
                <Baby className="w-4 h-4 text-primary" />
                <span>Child Specialist</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 dark:from-primary/15 dark:to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <Stethoscope className="w-24 h-24 text-primary/60 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground">Dr. Arafath Ahmed Khan</p>
                  <p className="text-sm text-muted-foreground mt-1">MBBS, Family Medicine</p>
                  <p className="text-sm text-muted-foreground">Pediatric Specialist</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Mon - Sat</p>
                    <p className="text-sm font-medium text-foreground">Open Today</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-card/50 dark:bg-card/30" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInUp}>
            <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 dark:from-primary/10 dark:to-accent/15 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-primary/50 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Caring for families since 2009</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">About the Doctor</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Dr. Arafath Ahmed Khan
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dr. Arafath Ahmed Khan is a highly experienced family physician and pediatric specialist with over 15+ years of trusted service. Known for precise diagnosis, compassionate care, and strong patient relationships, he has been a trusted family doctor for generations.
              </p>
              <p>
                Many families rely on him for children's health, COVID care, dengue recovery, diabetes management, and general medical consultation. Patients appreciate his calm nature, clear explanations, and accurate treatment approach.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center p-3 sm:p-4 rounded-lg bg-background dark:bg-muted/30">
                <p className="text-xl sm:text-2xl font-bold text-primary" data-testid="text-experience">15+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Years Exp.</p>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-background dark:bg-muted/30">
                <p className="text-xl sm:text-2xl font-bold text-primary" data-testid="text-families">1000+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Families</p>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-background dark:bg-muted/30">
                <div className="flex items-center justify-center gap-0.5" data-testid="text-rating">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl sm:text-2xl font-bold text-primary">4.8</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Rating</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Our Services
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-foreground">
            Comprehensive Healthcare Services
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            From routine check-ups to specialized care, we provide a full range of medical services for your entire family.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="p-6 h-full hover-elevate active-elevate-2 transition-all duration-300 group" data-testid={`card-service-${i}`}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-card/50 dark:bg-card/30" data-testid="section-reviews">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Patient Reviews
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-foreground">
            What Our Patients Say
          </motion.h2>
          <motion.div variants={fadeInUp} className="mt-3 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Based on Google Reviews</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-card/80 dark:from-card/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-card/80 dark:from-card/60 to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee gap-5" style={{ width: "max-content" }}>
            {marqueeItems.map((review, i) => (
              <Card
                key={i}
                className="w-[280px] sm:w-[380px] flex-shrink-0 p-5 sm:p-7"
                data-testid={`card-review-${i % reviews.length}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${
                        j < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-foreground italic leading-relaxed">
                  "{review.text}"
                </p>
                <p className="mt-3 text-xs text-muted-foreground font-medium">
                  — {review.author}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground italic max-w-lg mx-auto bg-muted/50 dark:bg-muted/30 rounded-lg px-4 py-3">
              Some patients have mentioned longer waiting times during peak hours. We continuously work to improve patient experience.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section className="py-16 sm:py-20" data-testid="section-why-choose">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Why Choose Us
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-foreground">
            Your Trusted Healthcare Partner
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyChoose.map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="flex items-start gap-4 p-5 rounded-xl hover-elevate active-elevate-2 transition-all" data-testid={`item-why-${i}`}>
                <div className="w-11 h-11 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ClinicInfoSection() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section id="clinic" className="py-16 sm:py-20 bg-card/50 dark:bg-card/30" data-testid="section-clinic">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Visit Us
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-foreground">
            Clinic Information
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeInUp}>
            <Card className="p-4 sm:p-8 h-full">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Clinic Address</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-address">
                      127, St Johns Church Rd, near Coles Park,
                      <br />
                      Pulikeshi Nagar, Frazer Town,
                      <br />
                      Bengaluru, Karnataka 560005
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a
                      href="tel:08050765999"
                      className="text-sm text-primary font-medium"
                      data-testid="link-phone"
                    >
                      080 507 65999
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Clinic Hours
                  </h3>
                  <div className="space-y-1.5 w-full">
                    {clinicHours.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between text-sm py-2 px-3 rounded-md gap-3 w-full ${
                          item.day === today
                            ? "bg-primary/10 dark:bg-primary/15 font-medium"
                            : ""
                        } ${item.hours === "Closed" ? "text-muted-foreground" : "text-foreground"}`}
                        data-testid={`text-hours-${item.day.toLowerCase()}`}
                      >
                        <span className={`${item.day === today ? "text-primary font-semibold" : ""} whitespace-nowrap`}>
                          {item.day}
                          {item.day === today && (
                            <span className="ml-1 text-[10px] uppercase tracking-wider text-primary">Today</span>
                          )}
                        </span>
                        <span className="text-muted-foreground text-right text-[11px] sm:text-sm whitespace-nowrap">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 dark:bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    Appointments confirmed at reception
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-0 h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5876!2d77.6155!3d13.0012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzA0LjMiTiA3N8KwMzYnNTUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px", borderRadius: "inherit" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
                data-testid="map-embed"
              />
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AppointmentSection() {
  const { toast } = useToast();

  const form = useForm<AppointmentRequest>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      age: "",
      preferredTime: "",
      message: "",
    },
  });

  const timeLabels: Record<string, string> = {
    morning: "Morning (11 AM - 2 PM)",
    evening: "Evening (6 PM - 8 PM)",
    saturday: "Saturday (11 AM - 3:30 PM)",
  };

  const onSubmit = (data: AppointmentRequest) => {
    const lines = [
      `*New Appointment Request*`,
      ``,
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Patient Age:* ${data.age}`,
      `*Preferred Time:* ${timeLabels[data.preferredTime] || data.preferredTime}`,
    ];
    if (data.message) {
      lines.push(`*Message:* ${data.message}`);
    }
    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/919041162603?text=${text}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Please send the pre-filled message to complete your appointment request.",
    });
    form.reset();
  };

  return (
    <section id="appointment" className="py-16 sm:py-20" data-testid="section-appointment">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              Book an Appointment
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Schedule Your Visit
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8 max-w-md">
              Fill out the form and send it directly via WhatsApp for quick confirmation. You can also call us directly for immediate assistance.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card dark:bg-muted/30">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Call us directly</p>
                  <a href="tel:08050765999" className="font-medium text-foreground" data-testid="link-appointment-phone">
                    080 507 65999
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card dark:bg-muted/30">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Visit our clinic</p>
                  <p className="font-medium text-foreground text-sm">127, St Johns Church Rd, Frazer Town</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card dark:bg-muted/30">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Walk-in or appointment</p>
                  <p className="font-medium text-foreground text-sm">Confirmed at reception</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="p-4 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Age</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter patient's age" {...field} data-testid="input-age" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-time">
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning (11 AM - 2 PM)</SelectItem>
                            <SelectItem value="evening">Evening (6 PM - 8 PM)</SelectItem>
                            <SelectItem value="saturday">Saturday (11 AM - 3:30 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific concern or symptoms..."
                            className="resize-none"
                            rows={3}
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    data-testid="button-submit-appointment"
                  >
                    Send via WhatsApp
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-16 sm:py-20 bg-card/50 dark:bg-card/30" data-testid="section-faq">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background dark:bg-muted/20 rounded-lg border px-5"
                data-testid={`accordion-faq-${i}`}
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground/[0.03] dark:bg-card/50 border-t border-border" data-testid="section-footer">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Park View Clinic</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dr. Arafath Ahmed Khan — Trusted Family Physician &amp; Child Specialist providing compassionate healthcare in Bangalore for over 15 years.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["about", "services", "reviews", "clinic", "appointment", "faq"].map((id) => (
                <button
                  key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-sm text-muted-foreground capitalize"
                  data-testid={`link-footer-${id}`}
                >
                  {id === "clinic" ? "Clinic Info" : id}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:08050765999" data-testid="link-footer-phone">080 507 65999</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>127, St Johns Church Rd, Frazer Town, Bengaluru 560005</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Clinic Hours</h4>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p>Mon - Thu: 11 AM - 2 PM, 6 - 8 PM</p>
              <p>Friday: 11 AM - 12:30 PM, 6 - 8 PM</p>
              <p>Saturday: 11 AM - 3:30 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.google.com/maps/place/Dr.+Arafath+Ahmed+Khan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary font-medium"
                data-testid="link-google-reviews"
              >
                View Google Reviews
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Park View Clinic — Dr. Arafath Ahmed Khan. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button data-testid="link-privacy-policy">Privacy Policy</button>
            <button data-testid="link-terms">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <WhyChooseSection />
        <ClinicInfoSection />
        <AppointmentSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}