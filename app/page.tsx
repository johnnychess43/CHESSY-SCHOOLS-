import { ArrowRight, BookOpen, BrainCircuit, BriefcaseBusiness, ChartNoAxesCombined, Code2, GraduationCap, MessageCircle, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

const courses = [
  { icon: Code2, category: "TECHNOLOGY", title: "Software & Web Development", desc: "Programming foundations, HTML, CSS, JavaScript, APIs and software engineering.", tags: ["Beginner friendly", "Projects"] },
  { icon: BrainCircuit, category: "AI & DATA", title: "AI, Machine Learning & Data Science", desc: "Explore Python, statistics, data analysis, machine learning and responsible AI.", tags: ["Practical labs", "Data skills"] },
  { icon: ShieldCheck, category: "CYBERSECURITY", title: "Cybersecurity & Ethical Hacking", desc: "Learn defensive security, networking, secure systems and legal lab-based testing.", tags: ["Defensive first", "Safe labs"] },
  { icon: ChartNoAxesCombined, category: "FINANCE", title: "Financial Literacy & Forex", desc: "Budgeting, saving, accounting basics, markets, risk and trading fundamentals.", tags: ["Risk awareness", "Real-world skills"] },
  { icon: BriefcaseBusiness, category: "BUSINESS", title: "BBIT, Business & Information Science", desc: "Business management, ICT, accounting, finance and digital transformation.", tags: ["Career skills", "Case studies"] },
  { icon: BookOpen, category: "MATHEMATICS", title: "Mathematics & Applied Statistics", desc: "Algebra, discrete mathematics, integrated algebra, probability and statistics.", tags: ["Step by step", "Practice"] },
];

const topics = ["NoSQL databases", "Game development", "ICT fundamentals", "Information science", "Accounting & finance", "Business management", "Applied statistics", "Programming languages", "Scholarship discovery", "Study skills"];

export default function Home() {
  const whatsapp = "https://wa.me/254140415653?text=" + encodeURIComponent("Hello CHESSY SCHOOLS, I need help with the learning platform.");
  return <main>
    <div className="announcement"><Sparkles size={14}/> Your next skill starts here <span>Explore learning paths <ArrowRight size={13}/></span></div>
    <header className="nav wrap">
      <a className="brand" href="#"><img className="brand-logo" src="/jchess-icon.svg" alt="" aria-hidden="true"/><span>CHESSY<span className="brand-muted"> SCHOOLS</span><small>LEARN WITHOUT LIMITS</small></span></a>
      <nav><a href="#courses">Courses</a><a href="#how">How it works</a><a href="#scholarships">Scholarships</a></nav>
      <a className="nav-cta" href="#courses">Start learning <ArrowRight size={15}/></a>
    </header>

    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot"/> THE FUTURE IS YOURS TO BUILD</div>
        <h1>Big ideas.<br/>Real skills.<br/><em>New possibilities.</em></h1>
        <p className="hero-desc">A modern learning space for technology, finance, business, mathematics and the skills shaping tomorrow.</p>
        <div className="hero-actions"><a className="button-primary" href="#courses">Explore courses <ArrowRight size={17}/></a><a className="button-secondary" href="#how"><span className="play">▶</span> How it works</a></div>
        <div className="trust-row"><div className="avatar-stack"><span>CS</span><span>AI</span><span>∞</span></div><div><strong>Learn at your pace</strong><small>Build knowledge, one lesson at a time</small></div></div>
      </div>
      <div className="hero-art">
        <div className="orb orb-one"></div><div className="orb orb-two"></div>
        <div className="art-grid"></div>
        <div className="floating-card card-top"><span className="tiny-icon purple"><BrainCircuit size={17}/></span><div><strong>AI & Data Science</strong><small>Think beyond the ordinary</small></div><span className="status">●</span></div>
        <div className="chess-emblem"><div className="emblem-ring"></div><div className="emblem-piece">♟</div><div className="emblem-caption">STRATEGY MEETS KNOWLEDGE</div></div>
        <div className="floating-card card-bottom"><span className="tiny-icon green"><GraduationCap size={18}/></span><div><strong>Your next chapter</strong><small>Starts with one lesson</small></div><ArrowRight size={16}/></div>
        <div className="art-label">KNOWLEDGE IS YOUR ADVANTAGE <span>✳</span></div>
      </div>
    </section>

    <section className="metrics wrap"><div><strong>01</strong><span>Learn at your pace</span></div><div><strong>∞</strong><span>Skills to explore</span></div><div><strong>🌍</strong><span>Global opportunities</span></div><div><strong>♟</strong><span>Think. Learn. Grow.</span></div></section>

    <section id="courses" className="section wrap">
      <div className="section-heading"><div><div className="eyebrow">YOUR LEARNING JOURNEY</div><h2>Knowledge that <em>moves you forward.</em></h2></div><p>From first principles to practical projects, discover a path that fits your goals.</p></div>
      <div className="course-grid">{courses.map((c) => { const Icon = c.icon; return <article className="course-card" key={c.title}><div className="course-icon"><Icon size={21}/></div><div className="course-category">{c.category}</div><h3>{c.title}</h3><p>{c.desc}</p><div className="tags">{c.tags.map(t=><span key={t}>{t}</span>)}</div><a href={whatsapp} target="_blank" rel="noreferrer" className="course-link">Ask about this course <ArrowRight size={15}/></a></article>})}</div>
      <div className="all-topics"><div><span className="eyebrow">AND THERE'S MORE</span><h3>One platform. Many possibilities.</h3></div><div className="topic-list">{topics.map(t=><span key={t}>{t}</span>)}</div></div>
    </section>

    <section id="how" className="path-section"><div className="wrap path-inner"><div><div className="eyebrow">A CLEAR PATH FORWARD</div><h2>Make learning<br/><em>work for you.</em></h2><p>Learn a concept, practise it, test your understanding and keep track of your progress. The platform will grow with your ambitions.</p><a className="button-primary" href="#courses">Find your starting point <ArrowRight size={17}/></a></div><div className="steps"><div className="step"><span>01</span><div><h3>Choose a learning path</h3><p>Explore topics based on your interests and goals.</p></div><WalletCards/></div><div className="step"><span>02</span><div><h3>Learn and practise</h3><p>Work through lessons, examples and assessments.</p></div><BookOpen/></div><div className="step"><span>03</span><div><h3>Show what you know</h3><p>Complete course requirements and request an eligible certificate.</p></div><GraduationCap/></div></div></div></section>

    <section id="scholarships" className="scholarship wrap"><div className="scholarship-art"><div className="scholarship-symbol">✦</div><span>OPPORTUNITY IS EVERYWHERE</span></div><div className="scholarship-copy"><div className="eyebrow">THINK GLOBAL</div><h2>Make room for<br/><em>your next opportunity.</em></h2><p>Discover scholarships, bursaries, grants and learning opportunities from institutions around the world. Eligibility and deadlines vary, so always verify details with the official provider.</p><a className="button-primary" href={whatsapp} target="_blank" rel="noreferrer">Ask about opportunities <ArrowRight size={16}/></a></div></section>

    <section className="ai-banner wrap"><div className="ai-icon"><BrainCircuit size={27}/></div><div><span className="eyebrow">YOUR LEARNING COMPANION</span><h2>Questions? Let's figure it out together.</h2><p>Our planned AI learning guide will help you navigate courses and understand concepts. For now, contact our support team directly.</p></div><a href={whatsapp} target="_blank" rel="noreferrer" className="button-light"><MessageCircle size={17}/> Chat with support</a></section>

    <footer className="footer"><div className="wrap footer-inner"><a className="brand" href="#"><span className="brand-mark">♟</span><span>CHESSY<span className="brand-muted"> SCHOOLS</span><small>LEARN WITHOUT LIMITS</small></span></a><div className="footer-links"><a href="#courses">Courses</a><a href="#scholarships">Scholarships</a><a href={whatsapp} target="_blank" rel="noreferrer">Contact support</a></div><span className="copyright">© {new Date().getFullYear()} CHESSY SCHOOLS</span></div><div className="wrap disclaimer">Learning platform preview. Course accreditation, certificates, scholarships, AI guidance and payment processing must be configured and verified before launch. Forex education is for learning only and is not financial advice.</div></footer>
    <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Contact customer support on WhatsApp"><MessageCircle size={23}/></a>
  </main>;
}
