import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Zap, Database, Gauge } from "lucide-react";
import { ASSETS } from "@/lib/constants";

export default function Intelligence() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">AG</div>
            <span className="font-bold text-lg">AgroGuardAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Contact</Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-primary-500 bg-opacity-20 px-4 py-2 rounded-full border border-primary-400">
              <Brain className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-semibold text-primary-300">Foundation Model</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">AgroGuard Intelligence</h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              The specialized Large Language Model powering the entire AgroGuardAI ecosystem. Trained on massive agricultural datasets, satellite imagery, and decades of crop science research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary-700">
                Get API Access <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">Capabilities</span>
            <h2 className="text-4xl font-bold mb-4">Foundation Model Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Database, title: "Multi-Modal Processing", desc: "Processes satellite imagery, drone data, weather feeds, soil sensors, and farmer inputs simultaneously." },
              { icon: Gauge, title: "Real-Time Analysis", desc: "Analyzes field data in real-time with <100ms latency for immediate actionable insights." },
              { icon: Brain, title: "Advanced NLP", desc: "Understands context, local idioms, and farming terminology in 50+ languages." },
              { icon: Zap, title: "High Accuracy", desc: "94% accuracy on disease detection, <8% error on yield forecasts 90 days out." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build with AgroGuard Intelligence?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Get API access and start integrating agricultural AI into your applications today.</p>
          <Button size="lg" variant="secondary">Get Started</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-16">
        <div className="container text-center">
          <p className="text-sm">&copy; 2026 AgroGuardAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
