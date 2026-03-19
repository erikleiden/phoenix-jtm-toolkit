import { Routes, Route, Link, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FrameworkPage from './pages/FrameworkPage'
import PlaybookPage from './pages/PlaybookPage'
import PathwayPage from './pages/PathwayPage'
import ResourcePage from './pages/ResourcePage'
import ROICalculatorPage from './pages/ROICalculatorPage'

function Header() {
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/framework', label: 'Framework' },
    { to: '/playbook', label: 'Playbook' },
    { to: '/pathways', label: 'Pathways' },
    { to: '/resources', label: 'Resources' },
    { to: '/roi', label: 'ROI Calculator' },
  ]

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 no-underline text-white">
            <div className="w-8 h-8 bg-orange rounded-md flex items-center justify-center font-bold font-display text-sm">JTM</div>
            <span className="font-display font-semibold text-base hidden sm:block">Phoenix Jobs That Mobilize</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors ${
                  location.pathname === link.to
                    ? 'bg-white/15 text-white'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex gap-1 pb-2 overflow-x-auto">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap no-underline ${
                location.pathname === link.to
                  ? 'bg-white/15 text-white'
                  : 'text-white/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-navy-dark text-white/60 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        <p className="font-display text-white/80 mb-2">
          Burning Glass Institute
        </p>
        <p className="mb-4">
          Phoenix Jobs That Mobilize Implementation Toolkit
        </p>
        <p className="text-xs text-white/40">
          Data and insights based on the JTM Framework. Illustrative examples for demonstration purposes.
          &copy; {new Date().getFullYear()} Burning Glass Institute.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-gray">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/framework" element={<FrameworkPage />} />
          <Route path="/playbook" element={<PlaybookPage />} />
          <Route path="/pathways" element={<PathwayPage />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/roi" element={<ROICalculatorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
