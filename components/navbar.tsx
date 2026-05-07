'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import { institutionApi, utils, DescripcionInstitucion } from '@/lib/api';

interface NavItem {
  name: string;
  href?: string;
  children?: NavItem[];
}

const navStructure: NavItem[] = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Carrera',
    children: [{ name: 'Nosotros', href: '/nosotros' }],
  },
  {
    name: 'Convocatorias',
    children: [
      { name: 'Convocatorias', href: '/convocatorias' },
      { name: 'Comunicados', href: '/comunicados' },
      { name: 'Avisos', href: '/avisos' },
    ],
  },
  {
    name: 'Cursos',
    children: [
      { name: 'Cursos', href: '/cursos' },
      { name: 'Seminarios', href: '/seminarios' },
    ],
  },
  {
    name: 'Más',
    children: [
      { name: 'Servicios', href: '/servicios' },
      { name: 'Ofertas Académicas', href: '/ofertas' },
      { name: 'Publicaciones', href: '/publicaciones' },
      { name: 'Gacetas', href: '/gacetas' },
      { name: 'Eventos', href: '/eventos' },
      { name: 'Videos', href: '/videos' },
    ],
  },
  { name: 'Contactos', href: '/contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [institucion, setInstitucion] = useState<DescripcionInstitucion | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    let animationFrameId: number;
    const animate = () => {
      setAutoRotate((prev) => (prev + 0.18) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    const fetchData = async () => {
      try {
        const data = await institutionApi.getCurrentPrincipal();
        setInstitucion(data);

        if (data.colorinstitucion?.[0]) {
          const colors = data.colorinstitucion[0];

          document.documentElement.style.setProperty('--color-primario', colors.color_primario);
          document.documentElement.style.setProperty('--color-secundario', colors.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', colors.color_terciario);

          const primarioRgb = hexToRgb(colors.color_primario);
          const secundarioRgb = hexToRgb(colors.color_secundario);
          const terciarioRgb = hexToRgb(colors.color_terciario);

          document.documentElement.style.setProperty('--color-primario-rgb', primarioRgb);
          document.documentElement.style.setProperty('--color-secundario-rgb', secundarioRgb);
          document.documentElement.style.setProperty('--color-terciario-rgb', terciarioRgb);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xRotation = ((y - rect.height / 2) / rect.height) * -8;
    const yRotation = ((x - rect.width / 2) / rect.width) * 8;

    setRotateX(xRotation);
    setRotateY(yRotation);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const logoUrl = institucion ? utils.buildImageUrl(institucion.institucion_logo) : '';

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '120, 74, 39';
  }

  const particlePositions = isMounted
    ? [...Array(7)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${12 + Math.random() * 10}s`,
        delay: `${Math.random() * 6}s`,
      }))
    : [...Array(7)].map(() => ({
        left: '0%',
        top: '0%',
        duration: '12s',
        delay: '0s',
      }));

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50">
       
        <div className="absolute inset-0 border-b border-[#ead8b8]/15 bg-[#160f0a]/72 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl" />
 
        <div className="navbar-history-texture absolute inset-0 opacity-45" />

       
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(244,225,183,0.45), var(--color-primario), var(--color-secundario), rgba(244,225,183,0.45), transparent)',
            boxShadow: '0 0 20px rgba(var(--color-primario-rgb,120,74,39),0.25)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex min-h-[86px] items-center justify-between gap-6">
            
            <div
              className="group flex cursor-pointer items-center gap-4"
              onClick={() => scrollToSection('inicio')}
            >
              {loading ? (
                <div className="h-15 w-15 animate-pulse rounded-full bg-[#f4dfb8]/20" />
              ) : (
                <div
                  className="relative"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${autoRotate * 0.015}deg)`,
                    transition:
                      rotateX === 0 && rotateY === 0
                        ? 'transform 0.45s ease'
                        : 'transform 0.1s ease-out',
                  }}
                >
                  <div
                    className="absolute -inset-4 rounded-full blur-2xl opacity-70 transition duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(var(--color-primario-rgb,120,74,39),0.28), transparent 68%)',
                    }}
                  />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#f4dfb8]/25 bg-[#f7ead0]/90 p-2 shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
                    <div className="absolute inset-2 rounded-full border border-[#7a4a28]/15" />
                    <div className="absolute inset-0 rounded-full navbar-seal-ring" />

                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo Institución"
                        className="relative z-10 h-full w-full object-contain transition duration-500 group-hover:scale-110"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                      />
                    ) : (
                      <div className="relative z-10 flex h-full w-full items-center justify-center text-xl font-black text-[var(--color-primario)]">
                        HIS
                      </div>
                    )}
                  </div>

                  <div
                    className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#160f0a] shadow-md"
                    style={{ backgroundColor: 'var(--color-secundario)' }}
                  />
                </div>
              )}

              <div className="hidden lg:block">
                <div className="flex items-center gap-2">
                  <span
                    className="h-px w-10"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, var(--color-primario))',
                    }}
                  />

                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f4dfb8]/70">
                    UPEA
                  </span>
                </div>

                <h1 className="mt-1 text-[1.55rem] font-black uppercase leading-none tracking-tight text-[#fff2d6] drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]">
                  {institucion?.institucion_nombre || 'Cargando...'}
                </h1>
              </div>
            </div>
 
            <div className="hidden items-center gap-4 lg:flex">
              <div className="flex items-center rounded-full border border-[#f4dfb8]/14 bg-[#fff1d4]/8 px-2 py-2 shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                {navStructure.map((item) => (
                  <div key={item.name} className="group relative">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-[#f7e7c7]/76 transition-all duration-300 hover:bg-[#fff1d4]/12 hover:text-[#fff5df]"
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <div className="invisible absolute left-1/2 top-full min-w-[240px] -translate-x-1/2 translate-y-4 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                          <div className="navbar-dropdown overflow-hidden rounded-[1.5rem] border border-[#7a4a28]/18 bg-[#f5e4c4]/95 p-2 shadow-[0_25px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                            <div className="mb-2 rounded-[1.1rem] border border-[#7a4a28]/10 bg-[#7a4a28]/8 px-4 py-3">
                              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#7a4a28]/80">
                                {item.name}
                              </p>
                            </div>

                            {item.children.map((child) => (
                              <div key={child.name} className="relative">
                                {child.children ? (
                                  <>
                                    <button
                                      onClick={() => toggleDropdown(child.name)}
                                      className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-[#4b2d19]/75 transition hover:bg-[#7a4a28]/8 hover:text-[#2b170b]"
                                    >
                                      {child.name}
                                      <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform ${
                                          activeDropdown === child.name ? 'rotate-180' : '-rotate-90'
                                        }`}
                                      />
                                    </button>

                                    <div className="absolute left-full top-0 ml-2 hidden min-w-[190px] group-hover:block">
                                      <div className="rounded-[1.4rem] border border-[#7a4a28]/18 bg-[#f5e4c4]/95 p-2 shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                                        {child.children.map((sub) => (
                                          <a
                                            key={sub.name}
                                            href={sub.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#4b2d19]/70 transition hover:bg-[#7a4a28]/8 hover:text-[#2b170b]"
                                          >
                                            {sub.name}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <a
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className="group/link flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-[#4b2d19]/75 transition hover:bg-[#7a4a28]/8 hover:text-[#2b170b]"
                                  >
                                    <span>{child.name}</span>
                                    <span
                                      className="h-1.5 w-1.5 rounded-full opacity-0 transition group-hover/link:opacity-100"
                                      style={{ backgroundColor: 'var(--color-primario)' }}
                                    />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-full px-4 py-2.5 text-sm font-bold text-[#f7e7c7]/76 transition-all duration-300 hover:bg-[#fff1d4]/12 hover:text-[#fff5df]"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <a
                href="/enlaces"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-[#f4dfb8]/16 bg-[#fff1d4]/8 px-5 py-3 text-sm font-black text-[#f7e7c7]/78 shadow-[0_12px_34px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff1d4]/13 hover:text-[#fff5df]"
              >
                Enlaces
              </a>

              <a
                href="https://servicioadministrador.upea.bo/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full px-5 py-3 text-sm font-black text-white shadow-[0_18px_42px_rgba(0,0,0,0.26)] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primario), var(--color-secundario))',
                }}
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="relative flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </span>
              </a>
            </div>

           
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#f4dfb8]/16 bg-[#fff1d4]/10 text-[#fff1d4] shadow-sm backdrop-blur-xl transition hover:bg-[#fff1d4]/15 lg:hidden"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

         
          {isOpen && (
            <div className="pb-4 lg:hidden">
              <div className="navbar-mobile-panel mt-3 overflow-hidden rounded-[1.8rem] border border-[#f4dfb8]/16 bg-[#1d130d]/92 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-3 rounded-[1.4rem] border border-[#f4dfb8]/12 bg-[#fff1d4]/8 p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5e4c4] p-2">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo Institución"
                        className="h-full w-full object-contain"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                      />
                    ) : (
                      <div className="text-sm font-black text-[var(--color-primario)]">
                        HIS
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#f4dfb8]/60">
                      Universidad Pública de El Alto
                    </p>
                    <h2 className="text-base font-black uppercase text-[#fff2d6]">
                      {institucion?.institucion_nombre || 'Historia'}
                    </h2>
                  </div>
                </div>

                <div className="space-y-1">
                  {navStructure.map((item) => (
                    <div key={item.name}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-black text-[#f7e7c7]/76 transition hover:bg-[#fff1d4]/9 hover:text-[#fff5df]"
                          >
                            {item.name}
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${
                                activeDropdown === item.name ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              activeDropdown === item.name
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div
                              className="ml-4 mt-1 space-y-1 border-l pl-3"
                              style={{
                                borderColor: 'rgba(var(--color-primario-rgb,120,74,39),0.36)',
                              }}
                            >
                              {item.children.map((child) => (
                                <div key={child.name}>
                                  {child.children ? (
                                    <>
                                      <button
                                        onClick={() => toggleDropdown(child.name)}
                                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#f7e7c7]/58 transition hover:bg-[#fff1d4]/9 hover:text-[#fff5df]"
                                      >
                                        {child.name}
                                        <ChevronDown
                                          className={`h-4 w-4 transition-transform ${
                                            activeDropdown === child.name ? 'rotate-180' : ''
                                          }`}
                                        />
                                      </button>

                                      <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                          activeDropdown === child.name
                                            ? 'max-h-40 opacity-100'
                                            : 'max-h-0 opacity-0'
                                        }`}
                                      >
                                        <div className="pl-3">
                                          {child.children.map((sub) => (
                                            <a
                                              key={sub.name}
                                              href={sub.href}
                                              onClick={() => setIsOpen(false)}
                                              className="block rounded-xl px-3 py-2 text-xs font-semibold text-[#f7e7c7]/46 transition hover:bg-[#fff1d4]/9 hover:text-[#fff5df]"
                                            >
                                              {sub.name}
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <a
                                      href={child.href}
                                      onClick={() => setIsOpen(false)}
                                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#f7e7c7]/58 transition hover:bg-[#fff1d4]/9 hover:text-[#fff5df]"
                                    >
                                      {child.name}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-2xl px-4 py-3 text-sm font-black text-[#f7e7c7]/76 transition hover:bg-[#fff1d4]/9 hover:text-[#fff5df]"
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 border-t border-[#f4dfb8]/12 pt-4">
                  <a
                    href="/enlaces"
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-[#f4dfb8]/15 bg-[#fff1d4]/8 px-4 py-3 text-center text-sm font-black text-[#fff2d6] transition hover:bg-[#fff1d4]/13"
                  >
                    Enlaces
                  </a>

                  <a
                    href="https://servicioadministrador.upea.bo/sign-in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-primario), var(--color-secundario))',
                    }}
                  >
                    <LogIn className="h-5 w-5" />
                    Iniciar Sesión
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
 
        {isMounted && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particlePositions.map((pos, i) => (
              <div
                key={i}
                className="navbar-dust absolute h-1 w-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(244, 225, 183, 0.55)',
                  left: pos.left,
                  top: pos.top,
                  animationDuration: pos.duration,
                  animationDelay: pos.delay,
                }}
              />
            ))}
          </div>
        )}
      </nav>

      <style jsx global>{`
        @keyframes navbarDustFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }

          18% {
            opacity: 0.7;
          }

          55% {
            transform: translateY(-14px) translateX(8px);
            opacity: 0.42;
          }

          100% {
            transform: translateY(-34px) translateX(-8px);
            opacity: 0;
          }
        }

        @keyframes sealSlowRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .navbar-history-texture {
          background-image:
            radial-gradient(circle at 18% 22%, rgba(244, 225, 183, 0.10), transparent 22%),
            radial-gradient(circle at 78% 34%, rgba(90, 58, 32, 0.12), transparent 24%),
            linear-gradient(90deg, rgba(244, 225, 183, 0.035) 1px, transparent 1px),
            linear-gradient(rgba(244, 225, 183, 0.025) 1px, transparent 1px);
          background-size: 260px 260px, 320px 320px, 26px 26px, 26px 26px;
        }

        .navbar-seal-ring {
          border: 1px dashed rgba(122, 74, 40, 0.18);
          animation: sealSlowRotate 22s linear infinite;
        }

        .navbar-dropdown {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(122, 74, 40, 0.06), transparent 22%),
            radial-gradient(circle at 80% 30%, rgba(122, 74, 40, 0.05), transparent 24%),
            linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0));
        }

        .navbar-mobile-panel {
          background-image:
            radial-gradient(circle at 15% 20%, rgba(244,225,183,0.08), transparent 22%),
            radial-gradient(circle at 84% 38%, rgba(122,74,40,0.12), transparent 24%);
        }

        .navbar-dust {
          animation-name: navbarDustFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
}