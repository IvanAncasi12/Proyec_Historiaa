'use client';

import { useEffect, useState } from 'react';
import {
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ChevronRight,
  GraduationCap,
  Clock,
} from 'lucide-react';
import { api, utils } from '@/lib/api';

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Sobre Nosotros', href: '#about' },
  { name: 'Ofertas Académicas', href: '#projects' },
  { name: 'Autoridades', href: '#team' },
  { name: 'Contacto', href: '#contacto' },
];

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '');

  if (clean.length < 6) {
    return `rgba(120, 74, 39, ${alpha})`;
  }

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Footer() {
  const [institucion, setInstitucion] = useState<any>(null);
  const [colors, setColors] = useState({
    primario: '#7a4a28',
    secundario: '#c28a45',
    terciario: '#4b2d19',
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await api.institution.getCurrentPrincipal();
        setInstitucion(data);

        if (data.colorinstitucion?.[0]) {
          const c = data.colorinstitucion[0];

          setColors({
            primario: c.color_primario,
            secundario: c.color_secundario,
            terciario: c.color_terciario,
          });
        }
      } catch (error) {
        console.error('Error cargando footer:', error);
      }
    };

    cargar();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!institucion) return null;

  return (
    <>
      <footer className="relative overflow-hidden bg-[#1d140f] px-4 pb-8 pt-20">
       
        <div className="pointer-events-none absolute inset-0">
          <div className="footer-history-paper absolute inset-0 opacity-90" />
          <div className="footer-history-grain absolute inset-0 opacity-30" />
          <div className="footer-history-lines absolute inset-0 opacity-20" />

          <div
            className="absolute -left-52 top-0 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.primario }}
          />

          <div
            className="absolute -right-52 bottom-0 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.terciario }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: colors.secundario }}
          />

          <div
            className="absolute left-0 top-0 h-[3px] w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primario}, ${colors.secundario}, ${colors.terciario}, transparent)`,
              boxShadow: `0 0 28px ${colors.primario}55`,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
         
          <div
            className="relative overflow-hidden rounded-[2.5rem] border px-6 py-10 sm:px-8 lg:px-10"
            style={{
              borderColor: 'rgba(243, 223, 184, 0.18)',
              background: `
                linear-gradient(
                  135deg,
                  rgba(255, 242, 213, 0.10) 0%,
                  ${hexToRgba(colors.primario, 0.13)} 32%,
                  ${hexToRgba(colors.terciario, 0.11)} 68%,
                  rgba(255, 242, 213, 0.08) 100%
                )
              `,
              boxShadow: `0 30px 100px rgba(0,0,0,0.35), 0 12px 40px ${colors.primario}12`,
            }}
          >
            <div className="footer-history-paper absolute inset-0 opacity-25" />
            <div className="footer-history-grain absolute inset-0 opacity-20" />

            <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.25fr_0.9fr_1.15fr_1fr] xl:gap-12">
          
              <div>
                <div className="flex items-center gap-4">
                  {institucion.institucion_logo && (
                    <div
                      className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-[#fff3dc] p-2 shadow-xl"
                      style={{
                        borderColor: `${colors.secundario}55`,
                        boxShadow: `0 14px 36px ${colors.primario}22`,
                      }}
                    >
                      <img
                        src={utils.buildImageUrl(institucion.institucion_logo)}
                        alt="Logo"
                        className="h-14 w-14 object-contain"
                      />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p
                      className="text-xs font-black uppercase tracking-[0.35em]"
                      style={{ color: colors.secundario }}
                    >
                      UPEA
                    </p>

                    <h3 className="text-4xl font-black leading-none text-[#fff2d5]">
                      {institucion.institucion_nombre || 'HIS'}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 max-w-md text-base leading-relaxed text-[#f3dfb8]/78">
                  Formando profesionales con excelencia académica, compromiso
                  social, innovación y visión de desarrollo para Bolivia.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {institucion.institucion_facebook && (
                    <SocialIcon
                      icon={Facebook}
                      url={institucion.institucion_facebook}
                      color="#2563eb"
                    />
                  )}

                  {institucion.institucion_youtube && (
                    <SocialIcon
                      icon={Youtube}
                      url={institucion.institucion_youtube}
                      color="#ef4444"
                    />
                  )}

                  {institucion.institucion_twitter && (
                    <SocialIcon
                      icon={Twitter}
                      url={institucion.institucion_twitter}
                      color="#38bdf8"
                    />
                  )}
                </div>
              </div>

              <div className="xl:border-l xl:border-[#f3dfb8]/12 xl:pl-10">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      color: '#2563eb',
                      borderColor: '#2563eb66',
                      backgroundColor: '#2563eb20',
                      boxShadow: '0 12px 28px rgba(37,99,235,0.18)',
                    }}
                  >
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <h4 className="text-3xl font-black leading-tight text-[#fff2d5]">
                    Enlaces Rápidos
                  </h4>
                </div>

                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-base font-bold text-[#f3dfb8]/76 transition-all hover:translate-x-1 hover:text-[#fff2d5]"
                      >
                        <ChevronRight
                          className="h-4 w-4 shrink-0"
                          style={{ color: colors.secundario }}
                        />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="xl:border-l xl:border-[#f3dfb8]/12 xl:pl-10">
                <h4 className="mb-6 text-3xl font-black text-[#fff2d5]">
                  Contacto
                </h4>

                <div className="space-y-5">
                  {institucion.institucion_direccion && (
                    <ContactRow
                      icon={MapPin}
                      text={institucion.institucion_direccion}
                      color="#2563eb"
                    />
                  )}

                  {institucion.institucion_telefono1 && (
                    <ContactRow
                      icon={Phone}
                      text={String(institucion.institucion_telefono1).replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        '$1-$2-$3'
                      )}
                      color={colors.secundario}
                      href={`tel:${institucion.institucion_telefono1}`}
                    />
                  )}

                  {institucion.institucion_correo1 && (
                    <ContactRow
                      icon={Mail}
                      text={institucion.institucion_correo1}
                      color={colors.terciario}
                      href={`mailto:${institucion.institucion_correo1}`}
                    />
                  )}
                </div>
              </div>

              <div className="xl:border-l xl:border-[#f3dfb8]/12 xl:pl-10">
                <button
                  onClick={scrollToTop}
                  className="group relative mt-5 flex w-full items-center justify-center gap-3 overflow-hidden rounded-[1.6rem] border px-6 py-5 text-base font-black text-white transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
                  style={{
                    borderColor: 'rgba(243, 223, 184, 0.20)',
                    background: `
                      linear-gradient(
                        135deg,
                        ${colors.primario} 0%,
                        ${colors.terciario} 55%,
                        ${colors.secundario} 100%
                      )
                    `,
                    boxShadow: `
                      0 18px 45px ${colors.primario}30,
                      inset 0 1px 0 rgba(255,255,255,0.18)
                    `,
                  }}
                >
                  <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.24),transparent)] translate-x-[-120%] transition-transform duration-700 group-hover:translate-x-[120%]" />

                  <span
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border bg-white/10"
                    style={{
                      borderColor: 'rgba(255,255,255,0.22)',
                      boxShadow: `0 0 24px ${colors.secundario}35`,
                    }}
                  >
                    <ArrowUp className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1" />
                  </span>

                  <span className="relative tracking-wide">
                    Volver al Inicio
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-center text-[#f3dfb8]/62 md:text-left">
              © {new Date().getFullYear()}{' '}
              <span className="font-black" style={{ color: colors.secundario }}>
                {institucion.institucion_nombre}
              </span>
              . Todos los derechos reservados.
            </p>

           <div className="flex items-center gap-3">
              <a
                href="https://utic.upea.bo/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <img
                  src="/LOGOUTIC.png"
                  alt="U-TIC"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700 hover:scale-110 transition-transform duration-300"
                />
              </a>

              <p className="flex items-center gap-1 text-slate-500">
                IAT U - TIC
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes footerDustMove {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.24;
          }
          50% {
            transform: translateY(-8px);
            opacity: 0.42;
          }
        }

        .footer-history-paper {
          background:
            radial-gradient(circle at 18% 22%, rgba(244, 225, 183, 0.10), transparent 24%),
            radial-gradient(circle at 78% 34%, rgba(91, 57, 31, 0.16), transparent 26%),
            linear-gradient(180deg, rgba(255, 244, 221, 0.05), rgba(71, 43, 23, 0.10));
        }

        .footer-history-grain {
          background-image:
            radial-gradient(rgba(255, 244, 221, 0.22) 0.7px, transparent 0.7px),
            radial-gradient(rgba(74, 45, 24, 0.16) 0.8px, transparent 0.8px);
          background-size: 24px 24px, 18px 18px;
          background-position: 0 0, 10px 12px;
          mix-blend-mode: soft-light;
          animation: footerDustMove 7s ease-in-out infinite;
        }

        .footer-history-lines {
          background-image:
            linear-gradient(to right, rgba(255, 239, 212, 0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 239, 212, 0.08) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 78%);
        }
      `}</style>
    </>
  );
}

function SocialIcon({
  icon: Icon,
  url,
  color,
}: {
  icon: any;
  url: string;
  color: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Red social"
      className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:scale-105"
      style={{
        color,
        borderColor: `${color}66`,
        backgroundColor: `${color}22`,
        boxShadow: `0 10px 26px ${color}18`,
      }}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

function ContactRow({
  icon: Icon,
  text,
  color,
  href,
}: {
  icon: any;
  text: string;
  color: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-4">
      <div
        className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
        style={{
          color,
          borderColor: `${color}66`,
          backgroundColor: `${color}22`,
          boxShadow: `0 10px 24px ${color}16`,
        }}
      >
        <Icon className="h-5 w-5" />
      </div>

      <p className="min-w-0 break-words text-base font-semibold leading-relaxed text-[#f3dfb8]/78">
        {text}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-opacity hover:opacity-100">
        {content}
      </a>
    );
  }

  return content;
}