import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Cpu, Gauge } from "lucide-react";

export default function AgroRobotics() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">AG</div>
            <span className="font-bold text-lg">AgroGuardAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Contact</Button>
            <Button size="sm">Request Demo</Button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-accent-50 to-accent-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-accent-100 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Hardware & Robotics</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">AgroRobotics</h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Autonomous drones and rovers for precision field operations. From targeted crop spraying to soil analysis, with centimeter-level accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent-600">
                Request Demo <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">View Specs</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hardware Lineup</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Scout Drone", specs: "45 min flight time, 100 hectares/hour" },
              { title: "Spray Drone", specs: "30 min flight time, 50 hectares/hour" },
              { title: "Soil Rover", specs: "10km range, 12 soil sensors" },
            ].map((hw, idx) => (
              <div key={idx} className="p-8 border border-neutral-200 rounded-lg">
                <Cpu className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3">{hw.title}</h3>
                <p className="text-neutral-600">{hw.specs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-accent to-accent-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Autonomous Field Operations?</h2>
          <Button size="lg" variant="secondary">Request Demo</Button>
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
