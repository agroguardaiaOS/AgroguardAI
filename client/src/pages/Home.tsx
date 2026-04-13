import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Zap } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Home Page - AgroGuardAI Landing
 * 
 * Design System: Light theme with primary green, secondary cyan, accent gold
 * Sections:
 * 1. Hero with gradient background
 * 2. ROI/Impact Banner
 * 3. Ecosystem Overview (3 product cards)
 * 4. How It Works (4-step workflow)
 * 5. Statistics/Metrics
 * 6. CTA Section
 * 7. Footer
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AG
            </div>
            <span className="font-bold text-lg">AgroGuardAI</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
              Intelligence
            </a>
            <a href="#" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
              AgroMind
            </a>
            <a href="#" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
              AgroRobotics
            </a>
            <a href="#" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
              API
            </a>
            <a href="#" className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Contact
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50 relative overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-primary-100 px-4 py-2 rounded-full">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">African Impact Challenge 2026 Cohort</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              The <span className="text-primary">Intelligence Layer</span>
              <br />
              for Global Agriculture
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              AgroGuardAI is a specialized Large Language Model built for global agriculture. We provide the foundational intelligence powering everything from localized farmer advisory to autonomous field robotics. One unified brain for a more resilient, data-driven food system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Start Building <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore the Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Banner */}
      <section className="bg-white border-y border-neutral-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">20–35%</div>
              <p className="text-neutral-600">reduction in input costs with precision AI</p>
            </div>
            <div className="hidden md:block border-l border-r border-neutral-200"></div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">40%</div>
              <p className="text-neutral-600">of harvests lost to preventable disease — we catch it early</p>
            </div>
            <div className="hidden md:block border-l border-r border-neutral-200"></div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">&lt;8%</div>
              <p className="text-neutral-600">mean error on yield forecasts 90 days out</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-24 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              The AgroGuardAI Ecosystem
            </span>
            <h2 className="text-4xl font-bold mb-4">Three Products. One Unified Intelligence.</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              From foundation model to field robot, every component shares the same agricultural intelligence core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AgroGuard Intelligence Card */}
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                <Zap className="w-16 h-16 text-primary opacity-20" />
              </div>
              <div className="p-8">
                <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3 bg-primary-50 px-3 py-1 rounded">
                  Software / LLM
                </span>
                <h3 className="text-2xl font-bold mb-3">AgroGuard Intelligence</h3>
                <p className="text-neutral-600 mb-4">
                  The foundational intelligence layer. A specialized LLM trained on massive agricultural datasets, satellite imagery, and crop science.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Satellite-based crop health mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Multi-modal data processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Global agricultural knowledge base</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  Explore the Model <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* AgroMind Card */}
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-secondary-50 to-secondary-100 flex items-center justify-center">
                <Zap className="w-16 h-16 text-secondary opacity-20" />
              </div>
              <div className="p-8">
                <span className="inline-block text-xs font-semibold text-secondary uppercase tracking-widest mb-3 bg-secondary-50 px-3 py-1 rounded">
                  Software / App
                </span>
                <h3 className="text-2xl font-bold mb-3">AgroMind</h3>
                <p className="text-neutral-600 mb-4">
                  A voice-first, multilingual AI chatbot designed for the field. Brings AgroGuard Intelligence to every farmer's pocket.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Voice-activated field assistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Real-time multilingual support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Offline-capable diagnostic tools</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all">
                  Meet AgroMind <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* AgroRobotics Card */}
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent-50 to-accent-100 flex items-center justify-center">
                <Zap className="w-16 h-16 text-accent opacity-20" />
              </div>
              <div className="p-8">
                <span className="inline-block text-xs font-semibold text-accent uppercase tracking-widest mb-3 bg-accent-50 px-3 py-1 rounded">
                  Hardware / Robotics
                </span>
                <h3 className="text-2xl font-bold mb-3">AgroRobotics</h3>
                <p className="text-neutral-600 mb-4">
                  Autonomous hardware for physical field operations. From precision-spraying drones to soil-analyzing rovers.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Autonomous scout & spray drones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Precision agricultural rovers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Real-time hardware-AI integration</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                  See the Hardware <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Workflow
            </span>
            <h2 className="text-4xl font-bold mb-4">From Observation to Action</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A closed-loop system where AI drives every decision from scouting to treatment execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Monitor", desc: "Satellite imagery and drones continuously survey fields, capturing high-resolution multispectral data." },
              { number: "02", title: "Analyze", desc: "AgroGuard Intelligence processes imagery in real time, identifying disease hotspots and yield risks." },
              { number: "03", title: "Recommend", desc: "AI generates actionable treatment plans with precise coordinates, dosages, and ROI projections." },
              { number: "04", title: "Execute", desc: "Autonomous hardware executes treatments with centimeter-level precision and real-time feedback." },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-black text-primary mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Agriculture?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join the African Impact Challenge cohort and build the future of precision farming with AgroGuardAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Building
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  AG
                </div>
                <span className="font-bold text-white">AgroGuardAI</span>
              </div>
              <p className="text-sm">The intelligence layer for global agriculture. One AI ecosystem powering every farm, everywhere.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Intelligence</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AgroMind</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AgroRobotics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">&copy; 2026 AgroGuardAI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
