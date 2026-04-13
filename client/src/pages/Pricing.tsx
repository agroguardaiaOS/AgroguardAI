import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
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

      <section className="pt-32 pb-20">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black mb-6">Simple, Transparent Pricing</h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">Choose the plan that fits your farming scale</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "$99", features: ["100 diagnoses/month", "Email support", "Community access"] },
              { name: "Professional", price: "$499", features: ["Unlimited diagnoses", "Priority support", "API access", "Custom integrations"], highlighted: true },
              { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "On-premise deployment"] },
            ].map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-lg border ${plan.highlighted ? 'border-primary bg-primary-50 shadow-lg' : 'border-neutral-200'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-black text-primary mb-6">{plan.price}<span className="text-lg text-neutral-600">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>Get Started</Button>
              </div>
            ))}
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
