import { useEffect, useState } from "react";
import { Button } from "@/react-app/components/ui/button";
import { Card } from "@/react-app/components/ui/card";
import { Calendar, MapPin, Clock, Users, Trophy, Gift, Phone, ExternalLink, Zap, Code, Lightbulb, Target } from "lucide-react";
const REGISTRATION_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScHfVjSrWo4eeorY4tijX-2R5V1IMBvNpOXSbZnEvzqJi8msw/viewform?usp=publish-editor";
const VENUE_LINK = "https://maps.app.goo.gl/YD6ffcjR44C88ti27";
const COLLEGE_IMAGE = "https://019cc916-4da2-75b5-b094-9d9b34d819e6.mochausercontent.com/WhatsApp-Image-2026-03-07-at-8.55.58-PM.jpeg";

// Target date: April 2, 2026
const TARGET_DATE = new Date("2026-04-02T09:00:00");
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
}
function calculateTimeLeft(targetDate: Date) {
  const difference = targetDate.getTime() - new Date().getTime();
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(difference / (1000 * 60 * 60) % 24),
    minutes: Math.floor(difference / 1000 / 60 % 60),
    seconds: Math.floor(difference / 1000 % 60)
  };
}
function CountdownUnit({
  value,
  label
}: {
  value: number;
  label: string;
}) {
  return <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-secondary border border-primary/30 rounded-lg px-4 py-3 md:px-6 md:py-4 box-glow">
          <span className="text-3xl md:text-5xl font-bold text-primary font-mono">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>;
}
function HeroSection() {
  const timeLeft = useCountdown(TARGET_DATE);
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* IEEE & ECE Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur border border-primary/20 rounded-full px-4 py-2 mb-8">
          <span className="text-sm text-muted-foreground">
            Presented by ECE Department, BGSIT & IEEE
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-8xl font-black mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">CODEWARZ</span>
          <span className="text-foreground"> '26</span>
          <Zap className="inline-block w-10 h-10 md:w-16 md:h-16 text-yellow-400 ml-2 animate-pulse" />
        </h1>

        <p className="text-xl md:text-3xl text-muted-foreground mb-2">
          6-Hour Hackathon
        </p>

        <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-12">
          "Code. Create. Conquer."
        </p>

        {/* Countdown */}
        <div className="mb-12">
          <p className="text-muted-foreground mb-4 text-sm uppercase tracking-widest">
            Event starts in
          </p>
          <div className="flex justify-center gap-3 md:gap-6">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 box-glow animate-pulse-glow" asChild>
            <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
              <Zap className="mr-2 h-5 w-5" />
              Register Now
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6" asChild>
            <a href="#details">Learn More</a>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[{
          icon: Trophy,
          value: "₹10,000",
          label: "Prize Pool"
        }, {
          icon: Clock,
          value: "6 Hours",
          label: "Duration"
        }, {
          icon: Users,
          value: "4 Max",
          label: "Team Size"
        }, {
          icon: Gift,
          value: "Goodies",
          label: "For All"
        }].map((stat, i) => <div key={i} className="bg-secondary/50 backdrop-blur border border-primary/10 rounded-xl p-4">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>)}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>;
}
function AboutSection() {
  return <section id="details" className="py-20 relative">
      <div className="absolute inset-0 bg-circuit opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">What is</span> CODEWARZ?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              CODEWARZ '26 is an exciting 6-hour hackathon designed to bring
              together innovative minds to build creative technological
              solutions. This is your chance to showcase your technical skills,
              creativity, teamwork, and problem-solving abilities in a dynamic
              and competitive environment.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join us to code, innovate, and collaborate while solving
              real-world challenges with your team!
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[{
              icon: Code,
              text: "Build Solutions"
            }, {
              icon: Lightbulb,
              text: "Innovate Ideas"
            }, {
              icon: Users,
              text: "Collaborate"
            }, {
              icon: Target,
              text: "Compete & Win"
            }].map((item, i) => <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{item.text}</span>
                </div>)}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />
            <img src={COLLEGE_IMAGE} alt="BGSIT Campus" className="relative rounded-2xl border border-primary/20 shadow-2xl w-full h-80 object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 border border-primary/20">
              <p className="text-sm font-medium text-foreground">
                BGS Institute of Technology (BGSIT)
              </p>
              <p className="text-xs text-muted-foreground">
                B.G. Nagara, Karnataka
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
function DetailsSection() {
  const details = [{
    icon: Calendar,
    title: "Date",
    value: "2 April 2026",
    subtitle: "Thursday"
  }, {
    icon: Clock,
    title: "Duration",
    value: "6 Hours",
    subtitle: "Non-stop coding"
  }, {
    icon: MapPin,
    title: "Venue",
    value: "Seminar Hall",
    subtitle: "BGSIT Campus"
  }, {
    icon: Users,
    title: "Team Size",
    value: "Max 4 Members",
    subtitle: "Same college only"
  }];
  return <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-primary">Event</span> Details
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Mark your calendars and prepare your team for an unforgettable
          hackathon experience
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((detail, i) => <Card key={i} className="bg-card/50 backdrop-blur border-primary/10 p-6 hover:border-primary/30 transition-all hover:box-glow">
              <detail.icon className="w-10 h-10 text-primary mb-4" />
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                {detail.title}
              </p>
              <p className="text-2xl font-bold text-foreground mb-1">
                {detail.value}
              </p>
              <p className="text-sm text-muted-foreground">{detail.subtitle}</p>
            </Card>)}
        </div>
      </div>
    </section>;
}
function PrizesSection() {
  return <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-primary">Prizes</span> & Rewards
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Compete for a prize pool of{" "}
          <span className="text-yellow-400 font-bold text-xl">₹10,000</span>
        </p>

        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-12">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 w-full md:w-64">
            <Card className="bg-gradient-to-b from-gray-400/20 to-gray-600/10 border-gray-400/30 p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
              <span className="text-6xl mb-2 block">🥈</span>
              <p className="text-xl font-bold text-gray-300">2nd Place</p>
              <p className="text-primary text-2xl font-bold mt-2">
                ₹3,000
              </p>
            </Card>
          </div>

          {/* 1st Place */}
          <div className="order-1 md:order-2 w-full md:w-72">
            <Card className="bg-gradient-to-b from-yellow-500/20 to-yellow-700/10 border-yellow-500/30 p-8 text-center relative overflow-hidden box-glow transform md:scale-110">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
              <span className="text-7xl mb-2 block">🥇</span>
              <p className="text-2xl font-bold text-yellow-400">1st Place</p>
              <p className="text-yellow-400 text-3xl font-bold mt-2">
                ₹5,000
              </p>
            </Card>
          </div>

          {/* 3rd Place */}
          <div className="order-3 w-full md:w-64">
            <Card className="bg-gradient-to-b from-amber-700/20 to-amber-900/10 border-amber-700/30 p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
              <span className="text-6xl mb-2 block">🥉</span>
              <p className="text-xl font-bold text-amber-600">3rd Place</p>
              <p className="text-amber-500 text-2xl font-bold mt-2">
                ₹2,000
              </p>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-secondary/80 border border-primary/20 rounded-full px-6 py-3">
            <Gift className="w-5 h-5 text-accent" />
            <span className="text-foreground">
              Exciting goodies for <strong>all participants!</strong>
            </span>
          </div>
        </div>
      </div>
    </section>;
}
function RegistrationSection() {
  return <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-primary">Registration</span> Fees
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Limited slots available – register your team today!
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          {/* IEEE Members */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              IEEE Members
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black text-primary">₹200</span>
              <span className="text-muted-foreground">/ team</span>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm mb-6">
              <li>✓ Full hackathon access</li>
              <li>✓ Refreshments included</li>
              <li>✓ Certificate of participation</li>
              <li>✓ Goodies for all members</li>
            </ul>
          </Card>

          {/* Non-IEEE Members */}
          <Card className="bg-card border-border p-8">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Non-IEEE Members
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black text-foreground">₹300</span>
              <span className="text-muted-foreground">/ team</span>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm mb-6">
              <li>✓ Full hackathon access</li>
              <li>✓ Refreshments included</li>
              <li>✓ Certificate of participation</li>
              <li>✓ Goodies for all members</li>
            </ul>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 box-glow" asChild>
            <a href={REGISTRATION_LINK} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Register Your Team
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            ⚠️ Registration fee once paid is non-refundable
          </p>
        </div>
      </div>
    </section>;
}
function VenueSection() {
  return <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          <span className="text-primary">Venue</span> Location
        </h2>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-primary/20 overflow-hidden">
            <div className="aspect-video bg-secondary relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.5!2d76.7275756!3d12.9643084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bafeed69801ae53%3A0xa9dd86aab57869ad!2sBGS%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1" className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    BGS Institute of Technology (BGSIT)
                  </h3>
                  <p className="text-muted-foreground">
                    Seminar Hall, Bengaluru – Hassan National Highway (NH-75),
                    Nagamangala Taluk, Mandya District, B.G Nagara, Karnataka
                    571448
                  </p>
                </div>
                <Button variant="outline" className="border-primary/50 text-primary shrink-0" asChild>
                  <a href={VENUE_LINK} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>;
}
function ContactSection() {
  const contacts = [{
    role: "Faculty Coordinator",
    name: "Dr. Manoj Kumar S B",
    phone: "8618710310"
  }, {
    role: "Student Coordinator",
    name: "Akash A P",
    phone: "7795428138"
  }];
  return <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-primary">Contact</span> Us
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Have questions? Reach out to our coordinators
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {contacts.map((contact, i) => <Card key={i} className="bg-card border-primary/10 p-6 hover:border-primary/30 transition-all">
              <p className="text-sm text-primary uppercase tracking-wider mb-2">
                {contact.role}
              </p>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {contact.name}
              </h3>
              <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
            </Card>)}
        </div>
      </div>
    </section>;
}
function Footer() {
  return <footer className="py-8 border-t border-primary/10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-2xl font-bold text-primary mb-2">CODEWARZ '26 ⚡</p>
        <p className="text-muted-foreground text-sm mb-4">
          Department of Electronics and Communication Engineering (ECE) <br />
          BGS Institute of Technology (BGSIT) in association with IEEE
        </p>
        <p className="text-xs text-muted-foreground">
          © 2026 CODEWARZ. All rights reserved.
        </p>
      </div>
    </footer>;
}
export default function HomePage() {
  useEffect(() => {
    // Load Orbitron font for tech aesthetic
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <DetailsSection />
      <PrizesSection />
      <RegistrationSection />
      <VenueSection />
      <ContactSection />
      <Footer />
    </div>;
}