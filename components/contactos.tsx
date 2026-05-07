'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Youtube,
  Twitter,
  Send,
  Navigation,
  Loader2,
} from 'lucide-react';
import { api, DescripcionInstitucion } from '@/lib/api';

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

export default function Contactos() {
  const [institucion, setInstitucion] = useState<DescripcionInstitucion | null>(null);
  const [loading, setLoading] = useState(true);

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

          document.documentElement.style.setProperty('--color-primario', c.color_primario);
          document.documentElement.style.setProperty('--color-secundario', c.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', c.color_terciario);
        }
      } catch (error) {
        console.error('Error cargando contactos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const formatPhone = (phone: number | string | null) => {
    if (!phone) return null;
    return String(phone).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };

  if (loading) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1d140f] px-4">
        <div className="contact-history-paper absolute inset-0 opacity-80" />
        <div className="contact-history-grain absolute inset-0 opacity-35" />

        <div
          className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: colors.primario }}
        />

        <div className="relative z-10 flex items-center gap-4 rounded-[2rem] border border-[#f3dfb8]/16 bg-[#fff2d5]/10 px-7 py-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border"
            style={{
              color: colors.primario,
              borderColor: `${colors.primario}55`,
              backgroundColor: `${colors.primario}16`,
              boxShadow: `0 0 35px ${colors.primario}28`,
            }}
          >
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>

          <div>
            <p className="text-lg font-black text-[#fff2d5]">
              Cargando información de contacto
            </p>
            <p className="text-sm text-[#f3dfb8]/65">
              Preparando datos institucionales...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="contacto"
        className="relative overflow-hidden bg-[#1d140f] px-4 py-24"
      >
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="contact-history-paper absolute inset-0 opacity-85" />
          <div className="contact-history-grain absolute inset-0 opacity-30" />
          <div className="contact-history-lines absolute inset-0 opacity-20" />

          <div
            className="absolute -left-56 top-0 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-24"
            style={{ backgroundColor: colors.primario }}
          />

          <div
            className="absolute -right-56 bottom-0 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-24"
            style={{ backgroundColor: colors.terciario }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-12"
            style={{ backgroundColor: colors.secundario }}
          />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f3dfb8]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f3dfb8]/25 to-transparent" />

          <span className="absolute left-8 top-8 h-12 w-12 border-l-2 border-t-2 border-[#f3dfb8]/25" />
          <span className="absolute right-8 top-8 h-12 w-12 border-r-2 border-t-2 border-[#f3dfb8]/25" />
          <span className="absolute bottom-8 left-8 h-12 w-12 border-b-2 border-l-2 border-[#f3dfb8]/25" />
          <span className="absolute bottom-8 right-8 h-12 w-12 border-b-2 border-r-2 border-[#f3dfb8]/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
         
          <div className="mb-16 text-center">
            <div
              className="mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 backdrop-blur-xl"
              style={{
                borderColor: `${colors.primario}55`,
                backgroundColor: `${colors.primario}16`,
                boxShadow: `0 18px 45px ${colors.primario}22`,
              }}
            >
              <span
                className="h-2.5 w-2.5 animate-pulse rounded-full"
                style={{
                  backgroundColor: colors.secundario,
                  boxShadow: `0 0 16px ${colors.secundario}`,
                }}
              />

              <span className="text-xs font-black uppercase tracking-[0.32em] text-[#f3dfb8]/90 sm:text-sm">
                Información de contacto
              </span>
            </div>

            <h2
              className="text-4xl font-black leading-none tracking-tight sm:text-5xl lg:text-7xl"
              style={{
                background: `linear-gradient(135deg, #fff7df 0%, ${colors.primario} 34%, ${colors.secundario} 70%, #f3dfb8 100%)`,
                backgroundSize: '220% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'contactHistoryShimmer 4s linear infinite',
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.35))',
              }}
            >
              Contáctanos
            </h2>

            <div className="mt-7 flex items-center justify-center gap-4">
              <div
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors.primario})`,
                }}
              />

              <span
                className="rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] backdrop-blur-xl"
                style={{
                  color: colors.secundario,
                  borderColor: `${colors.secundario}55`,
                  backgroundColor: 'rgba(255, 242, 213, 0.10)',
                }}
              >
                Carrera
              </span>

              <div
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, ${colors.terciario}, transparent)`,
                }}
              />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-[#f3dfb8]/78 sm:text-xl">
              Estamos aquí para resolver tus dudas. Visítanos, llámanos o escríbenos directamente.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">
            
            <div className="space-y-6 lg:col-span-3">
              {institucion?.institucion_direccion && (
                <InfoCard
                  icon={MapPin}
                  title="Dirección"
                  value={institucion.institucion_direccion}
                  color={colors.primario}
                />
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {institucion?.institucion_telefono1 && (
                  <InfoCard
                    icon={Phone}
                    title="Teléfono Fijo"
                    value={formatPhone(institucion.institucion_telefono1)}
                    color={colors.secundario}
                    isLink
                    href={`tel:${institucion.institucion_telefono1}`}
                  />
                )}

                {institucion?.institucion_celular1 && (
                  <InfoCard
                    icon={Phone}
                    title="Celular / WhatsApp"
                    value={formatPhone(institucion.institucion_celular1)}
                    color={colors.secundario}
                    isLink
                    href={`tel:${institucion.institucion_celular1}`}
                  />
                )}
              </div>

              {(institucion?.institucion_correo1 || institucion?.institucion_correo2) && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {institucion.institucion_correo1 && (
                    <InfoCard
                      icon={Mail}
                      title="Correo Principal"
                      value={institucion.institucion_correo1}
                      color={colors.terciario}
                      isLink
                      href={`mailto:${institucion.institucion_correo1}`}
                    />
                  )}

                  {institucion.institucion_correo2 && (
                    <InfoCard
                      icon={Mail}
                      title="Correo Secundario"
                      value={institucion.institucion_correo2}
                      color={colors.terciario}
                      isLink
                      href={`mailto:${institucion.institucion_correo2}`}
                    />
                  )}
                </div>
              )}

       
              <div
                className="group relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl"
                style={{
                  borderColor: 'rgba(243, 223, 184, 0.20)',
                  background:
                    'linear-gradient(180deg, rgba(255, 242, 213, 0.15), rgba(255, 242, 213, 0.08))',
                  boxShadow: `0 26px 80px rgba(0,0,0,0.30), 0 18px 45px ${colors.primario}14`,
                }}
              >
                <div className="contact-history-paper absolute inset-0 opacity-25" />
                <div className="contact-history-grain absolute inset-0 opacity-20" />

                <div
                  className="absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl opacity-25 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: colors.primario }}
                />

                <div className="relative z-10">
                  <h3
                    className="mb-5 flex items-center gap-3 text-xl font-black"
                    style={{ color: colors.secundario }}
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full border"
                      style={{
                        borderColor: `${colors.secundario}55`,
                        backgroundColor: `${colors.secundario}18`,
                      }}
                    >
                      <Send className="h-5 w-5" />
                    </span>
                    Síguenos en redes
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    {institucion?.institucion_facebook && (
                      <SocialLink
                        icon={Facebook}
                        url={institucion.institucion_facebook}
                        label="Facebook"
                        color={colors.primario}
                      />
                    )}

                    {institucion?.institucion_youtube && (
                      <SocialLink
                        icon={Youtube}
                        url={institucion.institucion_youtube}
                        label="YouTube"
                        color="#FF0000"
                      />
                    )}

                    {institucion?.institucion_twitter && (
                      <SocialLink
                        icon={Twitter}
                        url={institucion.institucion_twitter}
                        label="Twitter"
                        color={colors.terciario}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div
                className="relative overflow-hidden rounded-[2rem] border p-3 backdrop-blur-xl"
                style={{
                  borderColor: 'rgba(243, 223, 184, 0.22)',
                  background:
                    'linear-gradient(180deg, rgba(255, 242, 213, 0.16), rgba(255, 242, 213, 0.08))',
                  boxShadow: `0 26px 80px rgba(0,0,0,0.34), 0 18px 45px ${colors.primario}16`,
                }}
              >
                <div className="contact-history-paper absolute inset-0 opacity-25" />

                <div
                  className="absolute -left-20 -top-20 h-56 w-56 rounded-full blur-3xl opacity-25"
                  style={{ backgroundColor: colors.primario }}
                />

                {institucion?.institucion_api_google_map ? (
                  <div className="relative h-80 w-full overflow-hidden rounded-[1.5rem] bg-[#110b07] md:h-96">
                    <iframe
                      src={institucion.institucion_api_google_map}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 grayscale-[0.25] sepia-[0.15]"
                    />
                  </div>
                ) : (
                  <div
                    className="relative flex h-80 flex-col items-center justify-center rounded-[1.5rem] p-6 text-center md:h-96"
                    style={{
                      background: `linear-gradient(135deg, ${hexToRgba(colors.primario, 0.22)}, ${hexToRgba(colors.terciario, 0.16)})`,
                    }}
                  >
                    <MapPin
                      className="mb-3 h-14 w-14 opacity-80"
                      style={{ color: colors.secundario }}
                    />
                    <p className="font-bold text-[#f3dfb8]/75">
                      Ubicación no disponible en mapa
                    </p>
                  </div>
                )}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  institucion?.institucion_direccion || 'Historia UPEA'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-center font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                  boxShadow: `0 18px 45px ${colors.primario}24`,
                }}
              >
                <Navigation className="h-5 w-5 transition-transform group-hover:rotate-12" />
                Abrir en Google Maps
              </a>

              <div
                className="relative flex items-center gap-4 overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl"
                style={{
                  borderColor: 'rgba(243, 223, 184, 0.20)',
                  background:
                    'linear-gradient(180deg, rgba(255, 242, 213, 0.15), rgba(255, 242, 213, 0.08))',
                  boxShadow: `0 26px 80px rgba(0,0,0,0.28), 0 18px 45px ${colors.secundario}14`,
                }}
              >
                <div className="contact-history-paper absolute inset-0 opacity-20" />

                <div
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    color: colors.secundario,
                    borderColor: `${colors.secundario}55`,
                    backgroundColor: `${colors.secundario}16`,
                    boxShadow: `0 14px 32px ${colors.secundario}18`,
                  }}
                >
                  <Clock className="h-8 w-8" />
                </div>

                <div className="relative z-10">
                  <h4 className="font-black text-[#fff2d5]">
                    Horario de Atención
                  </h4>
                  <p className="text-sm text-[#f3dfb8]/65">
                    Lunes a Viernes: 8:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes contactHistoryShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 220% 50%;
          }
        }

        @keyframes contactDustMove {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.45;
          }
        }

        @keyframes contactCardGlow {
          0%,
          100% {
            opacity: 0.25;
            transform: translateY(0);
          }
          50% {
            opacity: 0.42;
            transform: translateY(-8px);
          }
        }

        .contact-history-paper {
          background:
            radial-gradient(circle at 18% 22%, rgba(244, 225, 183, 0.10), transparent 24%),
            radial-gradient(circle at 78% 34%, rgba(91, 57, 31, 0.18), transparent 26%),
            linear-gradient(180deg, rgba(255, 244, 221, 0.05), rgba(71, 43, 23, 0.10));
        }

        .contact-history-grain {
          background-image:
            radial-gradient(rgba(255, 244, 221, 0.28) 0.7px, transparent 0.7px),
            radial-gradient(rgba(74, 45, 24, 0.20) 0.8px, transparent 0.8px);
          background-size: 24px 24px, 18px 18px;
          background-position: 0 0, 10px 12px;
          mix-blend-mode: soft-light;
          animation: contactDustMove 7s ease-in-out infinite;
        }

        .contact-history-lines {
          background-image:
            linear-gradient(to right, rgba(255, 239, 212, 0.13) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 239, 212, 0.10) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 76%);
        }
      `}</style>
    </>
  );
}

function InfoCard({ icon: Icon, title, value, color, isLink, href }: any) {
  if (!value) return null;

  const content = (
    <div
      className="group relative flex items-start gap-4 overflow-hidden rounded-[2rem] border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: `${color}55`,
        background: `
          linear-gradient(
            145deg,
            ${hexToRgba(color, 0.24)} 0%,
            rgba(255, 242, 213, 0.14) 48%,
            rgba(255, 242, 213, 0.08) 100%
          )
        `,
        boxShadow: `0 26px 80px rgba(0,0,0,0.28), 0 0 45px ${color}14`,
      }}
    >
      <div className="contact-history-paper absolute inset-0 opacity-20" />
      <div className="contact-history-grain absolute inset-0 opacity-15" />

      <div
        className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-25 transition-opacity group-hover:opacity-45"
        style={{
          backgroundColor: color,
          animation: 'contactCardGlow 5s ease-in-out infinite',
        }}
      />

      <div
        className="relative z-10 shrink-0 rounded-full border p-3"
        style={{
          color,
          borderColor: `${color}70`,
          backgroundColor: `${color}22`,
          boxShadow: `0 14px 32px ${color}20`,
        }}
      >
        <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <h3 className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-[#f3dfb8]/52">
          {title}
        </h3>

        <p
          className="truncate text-base font-black text-[#fff2d5] md:text-lg"
          title={String(value)}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return isLink ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function SocialLink({ icon: Icon, url, label, color }: any) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:scale-110"
      style={{
        borderColor: `${color}55`,
        color,
        backgroundColor: `${color}18`,
        boxShadow: `0 12px 28px ${color}18`,
      }}
    >
      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
    </a>
  );
}