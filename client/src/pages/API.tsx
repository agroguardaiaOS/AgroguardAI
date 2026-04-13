import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Zap } from "lucide-react";

export default function API() {
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
            <Button size="sm">Get API Key</Button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-primary-500 bg-opacity-20 px-4 py-2 rounded-full">
              <Code2 className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-semibold text-primary-300">Developer Resources</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">API Documentation</h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Comprehensive RESTful API for integrating AgroGuardAI into your applications. SDKs for Python, Node.js, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary-700">
                Get API Key <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Endpoints</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "POST /diagnose", desc: "Analyze crop images for disease and pest issues" },
              { title: "POST /predict", desc: "Forecast crop yields and disease outbreaks" },
              { title: "POST /treatment-plan", desc: "Generate precise treatment plans" },
              { title: "GET /crops", desc: "List all supported crop types" },
            ].map((ep, idx) => (
              <div key={idx} className="p-8 border border-neutral-200 rounded-lg">
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{ep.title}</h3>
                <p className="text-neutral-600">{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
          <Button size="lg" variant="secondary">Get Started</Button>
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
