'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Award,
  Loader2,
} from 'lucide-react';
import { api, OfertaAcademica, utils } from '@/lib/api';

function cleanText(html?: string | null) {
  if (!html) return 'Sin descripción disponible.';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

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

export default function Gallery() {
  const [ofertas, setOfertas] = useState<OfertaAcademica[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOferta, setSelectedOferta] = useState<OfertaAcademica | null>(null);

  const [colors, setColors] = useState({
    primario: '#7a4a28',
    secundario: '#c28a45',
    terciario: '#4b2d19',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const instData = await api.institution.getCurrentPrincipal();

        if (instData.colorinstitucion?.[0]) {
          const c = instData.colorinstitucion[0];

          setColors({
            primario: c.color_primario,
            secundario: c.color_secundario,
            terciario: c.color_terciario,
          });

          document.documentElement.style.setProperty('--color-primario', c.color_primario);
          document.documentElement.style.setProperty('--color-secundario', c.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', c.color_terciario);
        }

        const data = await api.events.getOfertasAcademicas();
        const activas = data.filter((o: OfertaAcademica) => o.ofertas_estado === 1);

        setOfertas(activas);
      } catch (error) {
        console.error('Error cargando ofertas:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    if (selectedOferta) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedOferta]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Por definir';

    return new Date(dateString).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1d140f] px-4 py-24">
        <div className="history-offer-paper absolute inset-0 opacity-80" />
        <div className="history-offer-grain absolute inset-0 opacity-30" />

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
              Cargando ofertas académicas
            </p>
            <p className="text-sm text-[#f3dfb8]/65">
              Preparando programas disponibles...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="projects"
        className="relative overflow-hidden bg-[#1d140f] px-4 py-24"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="history-offer-paper absolute inset-0 opacity-80" />
          <div className="history-offer-grain absolute inset-0 opacity-30" />
          <div className="history-offer-lines absolute inset-0 opacity-20" />

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
                Formación académica
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
                animation: 'historyOfferShimmer 4s linear infinite',
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.35))',
              }}
            >
              Ofertas Académicas
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
                Programas
              </span>

              <div
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, ${colors.terciario}, transparent)`,
                }}
              />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-[#f3dfb8]/78 sm:text-xl">
              Cursos, programas y ofertas de formación para fortalecer tu desarrollo académico.
            </p>
          </div>

          {ofertas.length === 0 ? (
            <div className="rounded-[2rem] border border-[#f3dfb8]/16 bg-[#fff2d5]/10 p-10 text-center text-[#f3dfb8]/80">
              No hay ofertas académicas disponibles.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ofertas.map((oferta, index) => (
                <OfertaCard
                  key={oferta.ofertas_id}
                  oferta={oferta}
                  colors={colors}
                  index={index}
                  formatDate={formatDate}
                  onClick={() => setSelectedOferta(oferta)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedOferta && (
        <OfertaModal
          oferta={selectedOferta}
          colors={colors}
          formatDate={formatDate}
          onClose={() => setSelectedOferta(null)}
        />
      )}

      <style jsx global>{`
        @keyframes historyOfferShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 220% 50%;
          }
        }

        @keyframes historyOfferDust {
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

        @keyframes offerCardEnter {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes modalIn {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .history-offer-paper {
          background:
            radial-gradient(circle at 18% 22%, rgba(244, 225, 183, 0.10), transparent 24%),
            radial-gradient(circle at 78% 34%, rgba(91, 57, 31, 0.18), transparent 26%),
            linear-gradient(180deg, rgba(255, 244, 221, 0.05), rgba(71, 43, 23, 0.10));
        }

        .history-offer-grain {
          background-image:
            radial-gradient(rgba(255, 244, 221, 0.28) 0.7px, transparent 0.7px),
            radial-gradient(rgba(74, 45, 24, 0.20) 0.8px, transparent 0.8px);
          background-size: 24px 24px, 18px 18px;
          background-position: 0 0, 10px 12px;
          mix-blend-mode: soft-light;
          animation: historyOfferDust 7s ease-in-out infinite;
        }

        .history-offer-lines {
          background-image:
            linear-gradient(to right, rgba(255, 239, 212, 0.13) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 239, 212, 0.10) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 76%);
        }

        .offer-card {
          animation: offerCardEnter 0.8s ease both;
        }

        .offer-modal-card {
          animation: modalIn 0.35s ease both;
        }
      `}</style>
    </>
  );
}

function OfertaCard({
  oferta,
  colors,
  index,
  formatDate,
  onClick,
}: {
  oferta: OfertaAcademica;
  colors: any;
  index: number;
  formatDate: (date: string) => string;
  onClick: () => void;
}) {
  const imageUrl = oferta.ofertas_imagen
    ? utils.buildImageUrl(oferta.ofertas_imagen)
    : '/placeholder.png';

  return (
    <article
      className="offer-card group relative overflow-hidden rounded-[2rem] border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
      style={{
        animationDelay: `${index * 120}ms`,
        borderColor: 'rgba(243, 223, 184, 0.18)',
        background:
          'linear-gradient(180deg, rgba(255, 242, 213, 0.14), rgba(255, 242, 213, 0.08))',
        boxShadow: `0 26px 80px rgba(0,0,0,0.30), 0 18px 45px ${colors.primario}12`,
      }}
    >
      <div className="history-offer-paper absolute inset-0 opacity-20" />

      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={oferta.ofertas_titulo}
          className="h-full w-full object-cover sepia-[0.16] saturate-[0.92] transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1d140f] via-[#1d140f]/15 to-transparent" />

        <span
          className="absolute bottom-5 left-5 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
          }}
        >
          Oferta Académica
        </span>
      </div>

      <div className="relative z-10 p-7">
        <h3 className="mb-4 text-3xl font-black uppercase leading-tight text-[#fff2d5]">
          {oferta.ofertas_titulo}
        </h3>

        <p className="mb-6 line-clamp-3 text-[#f3dfb8]/72">
          {cleanText(oferta.ofertas_descripcion)}
        </p>

        <div className="mb-6 grid gap-3">
          <div className="flex items-start gap-3 rounded-2xl border border-[#f3dfb8]/12 bg-[#fff2d5]/8 p-4">
            <Calendar
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: colors.secundario }}
            />
            <div>
              <p className="font-black text-[#fff2d5]">Inscripciones</p>
              <p className="text-sm text-[#f3dfb8]/70">
                {formatDate(oferta.ofertas_inscripciones_ini)}
              </p>
              <p className="text-xs text-[#f3dfb8]/45">
                Hasta: {formatDate(oferta.ofertas_inscripciones_fin)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-[#f3dfb8]/12 bg-[#fff2d5]/8 p-4">
            <Clock
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: colors.primario }}
            />
            <div>
              <p className="font-black text-[#fff2d5]">Examen</p>
              <p className="text-sm text-[#f3dfb8]/70">
                {formatDate(oferta.ofertas_fecha_examen)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#f3dfb8]/65">
            <MapPin className="h-5 w-5" style={{ color: colors.secundario }} />
            <span>{oferta.ofertas_referencia || 'Por definir'}</span>
          </div>
        </div>

        <button
          onClick={onClick}
          className="group/btn flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1"
          style={{
            background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
            boxShadow: `0 18px 45px ${colors.primario}22`,
          }}
        >
          Más Información
          <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </article>
  );
}

function OfertaModal({
  oferta,
  colors,
  formatDate,
  onClose,
}: {
  oferta: OfertaAcademica;
  colors: any;
  formatDate: (date: string) => string;
  onClose: () => void;
}) {
  const imageUrl = oferta.ofertas_imagen
    ? utils.buildImageUrl(oferta.ofertas_imagen)
    : '/placeholder.png';

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="offer-modal-card relative my-8 w-full max-w-5xl overflow-hidden rounded-[2rem] border bg-[#1d140f] shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
        style={{
          borderColor: 'rgba(243, 223, 184, 0.22)',
          maxHeight: 'calc(100vh - 2rem)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="history-offer-paper absolute inset-0 opacity-70" />
        <div className="history-offer-grain absolute inset-0 opacity-25" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-[#f3dfb8]/18 bg-[#1d140f]/80 text-[#fff2d5] shadow-xl backdrop-blur-xl transition hover:scale-105 hover:bg-[#fff2d5]/10"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative z-10 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[280px] lg:min-h-full">
              <img
                src={imageUrl}
                alt={oferta.ofertas_titulo}
                className="h-full max-h-[420px] w-full object-cover sepia-[0.12] saturate-[0.95] lg:max-h-none lg:min-h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d140f] via-[#1d140f]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1d140f]/70" />

              <span
                className="absolute bottom-6 left-6 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                }}
              >
                Oferta Académica
              </span>
            </div>

            <div className="relative p-7 sm:p-10">
              <p
                className="mb-3 text-xs font-black uppercase tracking-[0.34em]"
                style={{ color: colors.secundario }}
              >
                Información completa
              </p>

              <h3 className="mb-6 text-4xl font-black uppercase leading-tight text-[#fff2d5] sm:text-5xl">
                {oferta.ofertas_titulo}
              </h3>

              <div className="mb-8">
                <h4
                  className="mb-3 text-xl font-black"
                  style={{ color: colors.secundario }}
                >
                  Descripción
                </h4>

                <p className="text-lg leading-relaxed text-[#f3dfb8]/78">
                  {cleanText(oferta.ofertas_descripcion)}
                </p>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[#f3dfb8]/14 bg-[#fff2d5]/9 p-5">
                  <Calendar className="mb-3 h-7 w-7" style={{ color: colors.secundario }} />
                  <p className="mb-2 text-xl font-black text-[#fff2d5]">
                    Inscripciones
                  </p>
                  <p className="text-[#f3dfb8]/72">
                    {formatDate(oferta.ofertas_inscripciones_ini)}
                  </p>
                  <p className="text-sm text-[#f3dfb8]/48">
                    Hasta: {formatDate(oferta.ofertas_inscripciones_fin)}
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-[#f3dfb8]/14 bg-[#fff2d5]/9 p-5">
                  <Clock className="mb-3 h-7 w-7" style={{ color: colors.primario }} />
                  <p className="mb-2 text-xl font-black text-[#fff2d5]">
                    Examen
                  </p>
                  <p className="text-[#f3dfb8]/72">
                    {formatDate(oferta.ofertas_fecha_examen)}
                  </p>
                </div>
              </div>

              <div className="mb-8 flex items-center gap-3 text-[#f3dfb8]/72">
                <MapPin className="h-6 w-6 shrink-0" style={{ color: colors.secundario }} />
                <span>{oferta.ofertas_referencia || 'Por definir'}</span>
              </div>

              <a
                href={oferta.ofertas_referencia || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                  boxShadow: `0 18px 45px ${colors.primario}22`,
                }}
              >
                Más Información
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}