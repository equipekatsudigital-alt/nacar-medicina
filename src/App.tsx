import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Instagram, ExternalLink, 
  Brain, Heart, Shield, Sparkles, Microscope, 
  ScrollText, Users, MessageSquare, Mail, Phone, MapPin,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const Navigation = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Sobre Mim' },
    { id: 'philosophy', label: 'Filosofia' },
    { id: 'treatments', label: 'Tratamentos' },
    { id: 'science', label: 'Base Científica' },
    { id: 'ethics', label: 'Ética' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-nacar-bg/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="cursor-pointer group"
          onClick={() => setActiveSection('home')}
        >
          <h1 className="text-2xl font-serif tracking-widest uppercase text-white group-hover:text-nacar-gold transition-colors">
            NÁCAR
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-60 -mt-1">Medicina</p>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-xs uppercase tracking-widest transition-all hover:text-nacar-gold ${activeSection === item.id ? 'text-nacar-gold' : 'text-white/70'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setActiveSection('contact')}
            className="px-6 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-nacar-bg transition-all"
          >
            Agendar Consulta
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-nacar-bg border-b border-white/10 p-6 md:hidden flex flex-col space-y-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-sm uppercase tracking-widest ${activeSection === item.id ? 'text-nacar-gold' : 'text-white/70'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onNext }: { onNext: () => void }) => (
  <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="text-center max-w-4xl"
    >
      <span className="text-nacar-gold text-xs uppercase tracking-[0.4em] mb-6 block">Nácar Medicina</span>
      <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight text-balance">
        Transformar dor em <span className="italic">consciência</span>.
      </h1>
      <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
        Ciência, presença e medicina psicodélica a serviço da sua saúde mental integrativa.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button 
          onClick={() => onNext()}
          className="px-10 py-4 bg-white text-nacar-bg rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-nacar-gold hover:text-white transition-all flex items-center gap-2 group"
        >
          Agendar Avaliação
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={() => onNext()}
          className="px-10 py-4 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
        >
          Conheça a NÁCAR
        </button>
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ delay: 1, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">Scroll para explorar</span>
      <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
    </motion.div>
  </section>
);

const SectionHeading = ({ subtitle, title, description }: { subtitle?: string, title: string, description?: string }) => (
  <div className="mb-16">
    {subtitle && <span className="text-nacar-gold text-[10px] uppercase tracking-[0.4em] mb-4 block">{subtitle}</span>}
    <h2 className="text-4xl md:text-5xl font-serif mb-6">{title}</h2>
    {description && <p className="text-white/60 max-w-2xl leading-relaxed">{description}</p>}
  </div>
);

const AboutDr = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="aspect-[3/4] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
          <img 
            src="https://picsum.photos/seed/doctor/800/1066" 
            alt="Dra Talita Mendonça" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 glass-panel p-8 max-w-xs">
          <p className="text-serif italic text-lg mb-2">"Minha experiência pessoal ampliou minha compreensão sobre o que significa cuidar."</p>
          <p className="text-[10px] uppercase tracking-widest opacity-60">— Dra. Talita Mendonça</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeading 
          subtitle="A Trajetória"
          title="Dra. Talita Sallum de Mendonça"
        />
        <div className="space-y-6 text-white/70 leading-relaxed font-light">
          <p>
            Recifense e mineira de coração, formou-se em medicina na UNIFENAS em 2014. Sua trajetória começou em atendimentos de alta complexidade, com residências em cirurgia geral e endoscopia digestiva.
          </p>
          <p>
            Em 2023, um quadro de depressão, burnout e diagnóstico de vitiligo tornou-se um ponto de virada definitivo. Seu processo de cura envolveu experiências profundas que a reconectaram com sentido e propósito.
          </p>
          <p>
            Especializou-se no Berkeley Center for the Science of Psychedelics (UC Berkeley) e no Instituto Chacruna, trazendo ao Brasil uma abordagem que une o rigor técnico à sensibilidade humana.
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="p-4 border border-white/10 rounded-xl">
            <span className="text-nacar-gold block text-xl font-serif mb-1">UC Berkeley</span>
            <span className="text-[10px] uppercase tracking-wider opacity-50">Facilitação Psicodélica</span>
          </div>
          <div className="p-4 border border-white/10 rounded-xl">
            <span className="text-nacar-gold block text-xl font-serif mb-1">ABMFI</span>
            <span className="text-[10px] uppercase tracking-wider opacity-50">Saúde Mental Funcional</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Philosophy = () => (
  <section className="py-24 bg-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading 
        subtitle="O Conceito"
        title="A Metáfora NÁCAR"
        description="O nome NÁCAR é inspirado no processo de formação da pérola. Quando a concha é ferida, ela não rejeita o que a machuca; ela envolve o incômodo camada por camada, até transformá-lo em algo valioso."
      />
      
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { icon: <Heart size={24} />, title: "A dor como portal", desc: "A dor e o sofrimento, quando acolhidos, podem ser ressignificados em um processo de autoconsciência." },
          { icon: <Microscope size={24} />, title: "Ciência e Consciência", desc: "Psicodélicos são ferramentas neuroplásticas que exigem contexto, preparo e integração." },
          { icon: <Users size={24} />, title: "Autonomia", desc: "Meu papel não é 'curar você', mas criar as condições para que você participe do seu próprio processo." },
          { icon: <Sparkles size={24} />, title: "O tempo da cura", desc: "Respeitamos o ritmo do processo. Sem promessas rápidas, com profundidade e responsabilidade." },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 hover:bg-white/10 transition-all group"
          >
            <div className="text-nacar-gold mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-xl font-serif mb-4">{item.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Treatments = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <SectionHeading 
      subtitle="Cuidado Estruturado"
      title="Tratamentos Oferecidos"
      description="As substâncias psicodélicas não são soluções fáceis, mas ferramentas terapêuticas inseridas em um processo rigoroso de cuidado."
    />
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { 
          title: "Cetamina Assistida", 
          desc: "Ação rápida em depressão resistente e ideação suicida através da modulação glutamatérgica.",
          tags: ["Neuroplasticidade", "Flexibilidade Cognitiva"]
        },
        { 
          title: "Ibogaína Terapêutica", 
          desc: "Potencial em dependência química e quadros traumáticos graves com monitorização clínica rigorosa.",
          tags: ["Revisão Biográfica", "Padrões Compulsivos"]
        },
        { 
          title: "Cannabis Medicinal", 
          desc: "Modulação do sistema endocanabinoide para ansiedade, insônia e dor crônica.",
          tags: ["Homeostase", "Regulação"]
        },
        { 
          title: "Saúde Mental Funcional", 
          desc: "Investigação de sono, inflamação, microbiota e estilo de vida para suporte integral.",
          tags: ["Integrativa", "Metabolismo"]
        }
      ].map((t, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="p-8 border border-white/10 rounded-3xl flex flex-col h-full hover:border-nacar-gold/50 transition-all"
        >
          <h3 className="text-2xl font-serif mb-4 text-nacar-gold">{t.title}</h3>
          <p className="text-sm text-white/60 mb-8 flex-grow leading-relaxed">{t.desc}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {t.tags.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md opacity-60">{tag}</span>
            ))}
          </div>
          <button className="text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:text-nacar-gold transition-colors">
            Saiba Mais <ChevronRight size={12} />
          </button>
        </motion.div>
      ))}
    </div>
  </section>
);

const ScientificBase = () => (
  <section className="py-24 bg-nacar-ink/50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading 
            subtitle="Evidências"
            title="Ciência e Consciência"
            description="A medicina psicodélica contemporânea está sendo estudada por instituições de referência mundial. Nosso trabalho se fundamenta em dados atualizados e prática responsável."
          />
          <div className="space-y-4">
            {[
              "MAPS (Multidisciplinary Association for Psychedelic Studies)",
              "Johns Hopkins Center for Psychedelic Research",
              "Imperial College London – Centre for Psychedelic Research",
              "Berkeley Center for the Science of Psychedelics"
            ].map((inst, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-nacar-gold" />
                {inst}
              </div>
            ))}
          </div>
          <button className="mt-10 px-8 py-3 border border-nacar-gold/30 rounded-full text-[10px] uppercase tracking-widest hover:bg-nacar-gold hover:text-white transition-all">
            Ver Base Científica Completa
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square glass-panel flex flex-col items-center justify-center p-6 text-center">
            <Brain size={32} className="text-nacar-gold mb-4" />
            <span className="text-xs font-serif italic">Neuroplasticidade</span>
          </div>
          <div className="aspect-square glass-panel flex flex-col items-center justify-center p-6 text-center mt-8">
            <Shield size={32} className="text-nacar-gold mb-4" />
            <span className="text-xs font-serif italic">Segurança Clínica</span>
          </div>
          <div className="aspect-square glass-panel flex flex-col items-center justify-center p-6 text-center -mt-8">
            <Microscope size={32} className="text-nacar-gold mb-4" />
            <span className="text-xs font-serif italic">Ensaios Clínicos</span>
          </div>
          <div className="aspect-square glass-panel flex flex-col items-center justify-center p-6 text-center">
            <ScrollText size={32} className="text-nacar-gold mb-4" />
            <span className="text-xs font-serif italic">Ética Rigorosa</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Ethics = () => (
  <section className="py-24 px-6 max-w-5xl mx-auto text-center">
    <SectionHeading 
      subtitle="Compromisso"
      title="Código de Ética NÁCAR"
    />
    <p className="text-white/60 mb-12 leading-relaxed italic font-serif text-xl">
      "Medicina Psicodélica exige integridade, discernimento e responsabilidade. Na NÁCAR, ciência e consciência caminham juntas."
    </p>
    <div className="grid md:grid-cols-3 gap-8 text-left">
      {[
        { title: "Consentimento", desc: "Processo contínuo de informação sobre riscos, benefícios e alternativas." },
        { title: "Segurança", desc: "Avaliação clínica rigorosa e monitoramento constante durante todo o processo." },
        { title: "Respeito", desc: "Honramos as tradições ancestrais sem apropriação, unindo-as à ciência." }
      ].map((item, i) => (
        <div key={i} className="p-6 border-l border-nacar-gold/30">
          <h4 className="text-lg font-serif mb-2">{item.title}</h4>
          <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
    <button className="mt-12 text-[10px] uppercase tracking-[0.3em] text-nacar-gold hover:underline underline-offset-8">
      Ler Código de Ética Completo
    </button>
  </section>
);

const Contact = () => (
  <section className="py-24 bg-white/5">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
      <div>
        <SectionHeading 
          subtitle="Contato"
          title="Inicie sua Jornada"
          description="Você não precisa atravessar isso sozinho(a). Se algo em você sente que é hora de olhar para dentro com mais coragem e suporte, estou aqui para caminhar ao seu lado."
        />
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-full text-nacar-gold"><Mail size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">E-mail</p>
              <p className="text-sm">contato@nacarmedicina.com.br</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-full text-nacar-gold"><Phone size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">WhatsApp</p>
              <p className="text-sm">+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-full text-nacar-gold"><MapPin size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Localização</p>
              <p className="text-sm">São Paulo, SP - Atendimento Presencial e Online</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-10">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-50">Nome</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nacar-gold/50" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-50">E-mail</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nacar-gold/50" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest opacity-50">Assunto</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nacar-gold/50 appearance-none">
              <option>Avaliação Inicial</option>
              <option>Cetamina Assistida</option>
              <option>Ibogaína Terapêutica</option>
              <option>Outros</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest opacity-50">Mensagem</label>
            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-nacar-gold/50 resize-none" />
          </div>
          <button className="w-full py-4 bg-nacar-gold text-white rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-nacar-bg transition-all">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-16 px-6 border-t border-white/10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <h2 className="text-xl font-serif tracking-widest uppercase mb-2">NÁCAR MEDICINA</h2>
        <p className="text-[10px] uppercase tracking-widest opacity-40">© 2025 Nácar Medicina. Todos os direitos reservados.</p>
      </div>
      
      <div className="flex gap-6">
        <a href="#" className="p-3 bg-white/5 rounded-full hover:text-nacar-gold transition-colors"><Instagram size={20} /></a>
        <a href="#" className="p-3 bg-white/5 rounded-full hover:text-nacar-gold transition-colors"><MessageSquare size={20} /></a>
        <a href="#" className="p-3 bg-white/5 rounded-full hover:text-nacar-gold transition-colors"><ExternalLink size={20} /></a>
      </div>
      
      <div className="text-center md:text-right">
        <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Dra. Talita Sallum de Mendonça</p>
        <p className="text-[10px] uppercase tracking-widest opacity-40">CRM-SP 123456 | RQE 78910</p>
      </div>
    </div>
  </footer>
);

const Testimonials = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <SectionHeading 
      subtitle="Relatos"
      title="Experiências de Transformação"
      description="A jornada de cada pessoa é única. Aqui, alguns relatos sobre o processo de ressignificação e cuidado na NÁCAR."
    />
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: "M.S.", text: "O acompanhamento da Dra. Talita foi fundamental para que eu pudesse olhar para traumas antigos com segurança. A integração fez toda a diferença." },
        { name: "R.L.", text: "Encontrei na NÁCAR um cuidado que vai além do sintoma. A visão integrativa sobre sono e nutrição mudou minha disposição diária." },
        { name: "A.P.", text: "A terapia assistida abriu portas que eu achava estarem trancadas. Sinto que retomei a autonomia sobre minha saúde mental." }
      ].map((item, i) => (
        <div key={i} className="glass-panel p-8 italic text-white/70 relative">
          <MessageSquare className="absolute -top-4 -left-4 text-nacar-gold/20" size={48} />
          <p className="mb-6 leading-relaxed">"{item.text}"</p>
          <p className="text-[10px] uppercase tracking-widest opacity-50">— {item.name}</p>
        </div>
      ))}
    </div>
  </section>
);

const Partnerships = () => (
  <section className="py-16 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-[10px] uppercase tracking-[0.4em] opacity-40 mb-12">Rede de Cuidado & Parcerias</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all">
        {['Clínica Integrar', 'Instituto Chacruna', 'Berkeley Center', 'MAPS Brazil'].map(p => (
          <span key={p} className="text-xl font-serif tracking-widest">{p}</span>
        ))}
      </div>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative">
      <div className="atmosphere" />
      <Navigation activeSection={activeSection} setActiveSection={scrollToSection} />
      
      <main>
        <div id="home"><Hero onNext={() => scrollToSection('about')} /></div>
        <div id="about"><AboutDr /></div>
        <div id="philosophy"><Philosophy /></div>
        <div id="treatments"><Treatments /></div>
        <div id="science"><ScientificBase /></div>
        <div id="testimonials"><Testimonials /></div>
        <div id="ethics"><Ethics /></div>
        <div id="partnerships"><Partnerships /></div>
        <div id="contact"><Contact /></div>
      </main>
      
      <Footer />
    </div>
  );
}
