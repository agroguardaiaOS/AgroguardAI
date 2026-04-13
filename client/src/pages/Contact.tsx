import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">AG</div>
            <span className="font-bold text-lg">AgroGuardAI</span>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black mb-6">Get in Touch</h1>
            <p className="text-lg text-neutral-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea placeholder="Your message..." rows={5} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
                {submitted && <p className="text-center text-primary font-semibold">Thank you! We'll be in touch soon.</p>}
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-neutral-600">hello@agroguardai.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-neutral-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Address</h3>
                  <p className="text-neutral-600">123 Agriculture Way, Silicon Valley, CA 94025</p>
                </div>
              </div>
            </div>
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
