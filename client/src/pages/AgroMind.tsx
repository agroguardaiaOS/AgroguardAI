import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mic, Globe, Smartphone } from "lucide-react";

export default function AgroMind() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">AG</div>
            <span className="font-bold text-lg">AgroGuardAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Contact</Button>
            <Button size="sm">Launch App</Button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-br from-secondary-50 to-secondary-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-secondary-100 px-4 py-2 rounded-full">
              <Mic className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Mobile Application</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">AgroMind</h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              A voice-first, multilingual AI chatbot designed for farmers in the field. Get instant crop health advice, treatment recommendations, and offline support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 bg-secondary hover:bg-secondary-600">
                Launch AgroMind <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">Download iOS/Android</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Mic, title: "Voice-First", desc: "Ask questions by voice in your local language" },
              { icon: Globe, title: "Multilingual", desc: "Support for 50+ languages and dialects" },
              { icon: Smartphone, title: "Offline", desc: "Works without internet connection" },
              { icon: MessageCircle, title: "Real-Time", desc: "Instant responses to crop health questions" },
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-neutral-200 rounded-lg">
                <item.icon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-secondary to-secondary-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Start Using AgroMind Today</h2>
          <Button size="lg" variant="secondary">Launch Now</Button>
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
