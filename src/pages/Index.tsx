
import { useState, useEffect } from 'react';
import { Mail, MapPin, Calendar, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [activeSection, setActiveSection] = useState('hero');
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: language === 'en' ? "Message sent!" : "Nachricht gesendet!",
      description: language === 'en' ? "Thank you for your inquiry. I'll respond within 24 hours." : "Vielen Dank für Ihre Anfrage. Ich antworte innerhalb von 24 Stunden.",
    });
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        contact: 'Contact'
      },
      hero: {
        tagline: 'Precision juggling, charismatic delivery',
        subtitle: 'Fresh graduate of Berlin\'s Artist School, now on stages across Germany, combining fluid frisbee flight with high-energy ball patterns.',
        cta: 'Book a show'
      },
      about: {
        title: 'About',
        bio1: 'Born in Bochum, shaped by Berlin. After three years of intensive training at the renowned Artist School Berlin, I fuse classic ball patterns with the unexpected flight of frisbees. The result is a charismatic performance that feels both playful and precise.',
        bio2: 'Highlights so far include street-theatre festivals in the Ruhr area, pop-up shows in Berlin parks, and a feature in the school\'s annual gala. Offstage I refine catches to the millimetre or sketch new disc-ball combinations in a notebook. Always curious, always moving, always ready to share the thrill of objects in orbit.',
        cta: 'Let\'s collaborate. Your audience will look up, lean in, and leave smiling.'
      },
      contact: {
        title: 'Get in Touch',
        subtitle: 'Let\'s talk possibilities. Tell me about your event, I reply within 24 hours.',
        form: {
          name: 'Name',
          email: 'Email',
          date: 'Event Date',
          city: 'Venue City',
          message: 'Message',
          submit: 'Send Message'
        },
        direct: 'Or email directly: booking@juggler.com'
      }
    },
    de: {
      nav: {
        home: 'Start',
        about: 'Über mich',
        contact: 'Kontakt'
      },
      hero: {
        tagline: 'Präzise Jonglage, charismatische Präsentation',
        subtitle: 'Frisch aus der Artistenschule Berlin, jetzt auf Bühnen in ganz Deutschland. Elegante Flugbahnen von Frisbees treffen auf dynamische Ballmuster.',
        cta: 'Auftritt anfragen'
      },
      about: {
        title: 'Über mich',
        bio1: 'Geboren in Bochum, gereift in Berlin. Nach drei Jahren Ausbildung an der renommierten Artistenschule Berlin verbinde ich klassische Ballmuster mit der unerwarteten Flugbahn von Frisbees. Es entsteht eine charismatische Show, zugleich verspielt und präzise.',
        bio2: 'Zu den bisherigen Höhepunkten zählen Straßentheater-Festivals im Ruhrgebiet, Pop-up-Shows in Berliner Parks und ein Solo im Galaprogramm der Schule. Abseits der Bühne feile ich an millimetergenauen Fängen oder entwerfe neue Scheiben-Ball-Kombinationen im Skizzenbuch.',
        cta: 'Lassen Sie uns zusammenarbeiten. Ihr Publikum wird staunen, sich hineinlehnen und mit einem Lächeln gehen.'
      },
      contact: {
        title: 'Kontakt',
        subtitle: 'Lass uns Ideen austauschen. Erzähl mir von deiner Veranstaltung, ich antworte innerhalb von 24 Stunden.',
        form: {
          name: 'Name',
          email: 'E-Mail',
          date: 'Event-Datum',
          city: 'Veranstaltungsort',
          message: 'Nachricht',
          submit: 'Nachricht senden'
        },
        direct: 'Oder direkt per E-Mail: booking@juggler.com'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Logo placeholder */}
              <div className="w-10 h-10 rounded-full border-2 border-[#D60000] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#D60000] opacity-20"></div>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-6">
                {[
                  { id: 'hero', label: t.nav.home },
                  { id: 'about', label: t.nav.about },
                  { id: 'contact', label: t.nav.contact }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-[#D60000] ${
                      activeSection === item.id ? 'text-[#D60000]' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  language === 'en' ? 'bg-[#D60000] text-white' : 'text-gray-600 hover:text-[#D60000]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  language === 'de' ? 'bg-[#D60000] text-white' : 'text-gray-600 hover:text-[#D60000]'
                }`}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/5d4113d6-6ce0-44b1-8d93-e91287004ffe.png"
            alt="Professional juggler performing with frisbees and balls"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            {t.hero.tagline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
            {t.hero.subtitle}
          </p>
          <Button
            onClick={() => scrollToSection('contact')}
            size="lg"
            className="bg-[#D60000] hover:bg-[#B50000] text-white text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {t.hero.cta}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
                {t.about.title}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{t.about.bio1}</p>
                <p>{t.about.bio2}</p>
                <p className="text-xl font-semibold text-[#D60000] italic">
                  {t.about.cta}
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/lovable-uploads/6ae18cc9-80f8-4219-9d26-1f9135085cc9.png"
                    alt="Portrait of professional juggler"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D60000] rounded-full opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/lovable-uploads/998bb478-64a3-463f-bd4b-e8bda774920b.png"
              alt="Dynamic juggling performance with multiple objects"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {t.contact.form.name}
                    </label>
                    <Input
                      type="text"
                      required
                      className="border-gray-300 focus:border-[#D60000] focus:ring-[#D60000]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {t.contact.form.email}
                    </label>
                    <Input
                      type="email"
                      required
                      className="border-gray-300 focus:border-[#D60000] focus:ring-[#D60000]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t.contact.form.date}
                    </label>
                    <Input
                      type="date"
                      className="border-gray-300 focus:border-[#D60000] focus:ring-[#D60000]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {t.contact.form.city}
                    </label>
                    <Input
                      type="text"
                      className="border-gray-300 focus:border-[#D60000] focus:ring-[#D60000]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {t.contact.form.message}
                  </label>
                  <Textarea
                    rows={4}
                    required
                    className="border-gray-300 focus:border-[#D60000] focus:ring-[#D60000]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#D60000] hover:bg-[#B50000] text-white py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  {t.contact.form.submit}
                </Button>
              </form>
            </div>

            {/* Direct Contact */}
            <div className="space-y-8">
              <div className="p-8 bg-gray-50 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'en' ? 'Direct Contact' : 'Direkter Kontakt'}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.contact.direct}
                </p>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D60000]" />
                    Berlin, Deutschland
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {language === 'en' ? 'Response Time:' : 'Antwortzeit:'}
                    </p>
                    <p>
                      {language === 'en' ? 'Within 24 hours' : 'Innerhalb von 24 Stunden'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'en' ? 'Performance Types' : 'Art der Auftritte'}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {language === 'en' ? 'Corporate Events' : 'Firmenveranstaltungen'}</li>
                  <li>• {language === 'en' ? 'Street Festivals' : 'Straßenfestivals'}</li>
                  <li>• {language === 'en' ? 'Private Parties' : 'Private Feiern'}</li>
                  <li>• {language === 'en' ? 'Theatre Shows' : 'Theateraufführungen'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#D60000] flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 rounded-full bg-[#D60000] opacity-30"></div>
          </div>
          <p className="text-gray-400">
            © 2024 Professional Juggler. {language === 'en' ? 'All rights reserved.' : 'Alle Rechte vorbehalten.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
