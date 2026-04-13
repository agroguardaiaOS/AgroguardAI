import { Button } from "@/components/ui/button";
import { Users, Target, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
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

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">About AgroGuardAI</h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
              We're building the intelligence layer for global agriculture. Our mission is to empower farmers, enterprises, and developers with AI-driven precision farming tools.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Our Mission", desc: "Empower every farmer with world-class agricultural intelligence" },
              { icon: Users, title: "Our Team", desc: "Experts in AI, agriculture, robotics, and software engineering" },
              { icon: Zap, title: "Our Impact", desc: "Reducing crop losses, optimizing yields, and building a resilient food system" },
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-neutral-200 rounded-lg text-center">
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Why AgroGuardAI?</h2>
          <div className="space-y-6 text-neutral-600">
            <p>
              Agriculture feeds the world, but it faces unprecedented challenges. Climate change, population growth, and resource scarcity demand smarter farming practices. Traditional approaches are no longer sufficient.
            </p>
            <p>
              AgroGuardAI was founded to bridge this gap. We built a specialized AI model trained on decades of agricultural research, satellite data, and real-world farming insights. Our platform brings precision agriculture to every farm, everywhere.
            </p>
            <p>
              From smallholder farmers in Africa to large-scale operations in Asia, AgroGuardAI is democratizing access to world-class agricultural intelligence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Join Us in Transforming Agriculture</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">Be part of the future of farming. Build with us, invest with us, or partner with us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">Get Started</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">Contact Us</Button>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-900 text-neutral-300 py-16">
        <div className="container text-center">
          <p className="text-sm">&copy; 2026 AgroGuardAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
