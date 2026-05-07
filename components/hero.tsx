'use client';

import { useEffect, useState } from 'react';
import { api, utils } from '@/lib/api';

function hexToRgb(hex?: string | null) {
  if (!hex) return '0, 166, 81';

  const cleanHex = hex.replace('#', '').trim();

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 166, 81';
}

export default function Hero() {
  const [institucion, setInstitucion] = useState<any>(null);
  const [portadas, setPortadas] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [instData, contentData] = await Promise.all([
          api.institution.getCurrentPrincipal(),
          api.content.getAll(),
        ]);

        setInstitucion(instData);
        setPortadas(contentData.portada || []);

        if (instData.colorinstitucion?.[0]) {
          const colors = instData.colorinstitucion[0];

          document.documentElement.style.setProperty('--color-primario', colors.color_primario);
          document.documentElement.style.setProperty('--color-secundario', colors.color_secundario);
          document.documentElement.style.setProperty('--color-terciario', colors.color_terciario);

          document.documentElement.style.setProperty('--color-primario-rgb', hexToRgb(colors.color_primario));
          document.documentElement.style.setProperty('--color-secundario-rgb', hexToRgb(colors.color_secundario));
          document.documentElement.style.setProperty('--color-terciario-rgb', hexToRgb(colors.color_terciario));
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAssembled(true);
    }, 180);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!institucion?.institucion_nombre) return;

    const fullText = institucion.institucion_nombre.toUpperCase();
    let index = 0;

    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);

        setTimeout(() => {
          setDisplayedText('');
        }, 2500);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [institucion]);

  useEffect(() => {
    if (portadas.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portadas.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [portadas]);

  const getPortadaUrl = (portada: any) => {
    if (!portada?.portada_imagen) return '';
    return utils.buildImageUrl(portada.portada_imagen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1f1711] text-white">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-14 h-14 rounded-full border-4 border-white/10 border-t-white animate-spin"
            style={{ borderTopColor: 'var(--color-primario)' }}
          />
          <p className="text-sm tracking-[0.35em] uppercase text-white/70">Cargando</p>
        </div>
      </div>
    );
  }

  if (portadas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2a120f] text-white text-2xl">
        NO HAY PORTADAS
      </div>
    );
  }

  return (
    <>
      <section
        id="inicio"
        className={`hero-history relative min-h-screen overflow-hidden bg-[#1f1711] ${
          assembled ? 'is-assembled' : ''
        }`}
      >
        <div className="absolute inset-0 z-0">
          {portadas.map((portada, index) => (
            <div
              key={portada.portada_id ?? index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={getPortadaUrl(portada)}
                alt={portada.portada_titulo || 'Portada'}
                className="w-full h-full object-cover scale-[1.03] history-bg-image"
              />
            </div>
          ))}

          <div className="absolute inset-0 z-20 bg-[#1a120d]/35" />

          <div
            className="absolute inset-0 z-20"
            style={{
              background:
                'linear-gradient(180deg, rgba(25,18,12,0.38) 0%, rgba(25,18,12,0.18) 30%, rgba(15,10,7,0.55) 100%)',
            }}
          />

          <div
            className="absolute inset-0 z-20"
            style={{
              background:
                'radial-gradient(circle at center, rgba(246, 226, 189, 0.06) 0%, rgba(29,20,14,0.12) 40%, rgba(14,9,6,0.38) 100%)',
            }}
          />
        </div>

        <div className="hero-history-paper" aria-hidden="true" />
        <div className="hero-history-grain" aria-hidden="true" />
        <div className="hero-history-lines" aria-hidden="true" />
        <div className="hero-history-vignette" aria-hidden="true" />
        <div className="hero-history-dust" aria-hidden="true" />

        <div className="hero-puzzle-overlay" aria-hidden="true">
          <span className="puzzle-piece piece-1" />
          <span className="puzzle-piece piece-2" />
          <span className="puzzle-piece piece-3" />
          <span className="puzzle-piece piece-4" />
          <span className="puzzle-piece piece-5" />
          <span className="puzzle-piece piece-6" />
        </div>

        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 34%, rgba(var(--color-primario-rgb, 0, 166, 81), 0.10), transparent 24%), radial-gradient(circle at 20% 75%, rgba(var(--color-secundario-rgb, 30, 108, 68), 0.08), transparent 26%), radial-gradient(circle at 82% 66%, rgba(var(--color-terciario-rgb, 30, 108, 68), 0.08), transparent 28%)',
          }}
        />

        <div
          className="absolute top-0 left-0 w-full h-[2px] z-30"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(244,225,183,0.45), var(--color-primario), rgba(244,225,183,0.45), transparent)',
            boxShadow: '0 0 18px rgba(var(--color-primario-rgb, 0, 166, 81), 0.35)',
          }}
        />

        <div className="relative z-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-24">
          <div className="w-full max-w-6xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative mb-8 reveal-piece reveal-logo">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-40 scale-125"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(244, 225, 183, 0.24), rgba(var(--color-primario-rgb, 0, 166, 81), 0.18), transparent 68%)',
                  }}
                />

                <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                  <div className="history-logo-aura absolute inset-0 rounded-full" />

                  <div
                    className="absolute inset-0 rounded-full border backdrop-blur-[2px]"
                    style={{
                      borderColor: 'rgba(244, 231, 205, 0.24)',
                      background:
                        'radial-gradient(circle, rgba(255,255,255,0.08), rgba(96,67,44,0.10), rgba(34,24,18,0.10))',
                      boxShadow:
                        '0 0 70px rgba(64, 41, 24, 0.24), inset 0 0 80px rgba(255,255,255,0.03)',
                    }}
                  />

                  <div
                    className="absolute inset-3 rounded-full border opacity-70"
                    style={{
                      borderColor: 'rgba(243, 224, 188, 0.30)',
                    }}
                  />

                  <div
                    className="absolute inset-8 rounded-full border border-dashed opacity-35 animate-spin-slow"
                    style={{
                      borderColor: 'rgba(var(--color-primario-rgb, 0, 166, 81), 0.45)',
                    }}
                  />

                  <div
                    className="absolute inset-[22%] rounded-full border opacity-25"
                    style={{
                      borderColor: 'rgba(var(--color-secundario-rgb, 30, 108, 68), 0.40)',
                    }}
                  />

                  <span className="history-seal-mark history-seal-mark-top" />
                  <span className="history-seal-mark history-seal-mark-right" />
                  <span className="history-seal-mark history-seal-mark-bottom" />
                  <span className="history-seal-mark history-seal-mark-left" />

                  <span className="logo-puzzle-block logo-piece-1" />
                  <span className="logo-puzzle-block logo-piece-2" />
                  <span className="logo-puzzle-block logo-piece-3" />
                  <span className="logo-puzzle-block logo-piece-4" />

                  <div className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-8 lg:p-10">
                    {institucion?.institucion_logo ? (
                      <img
                        src={utils.buildImageUrl(institucion.institucion_logo)}
                        alt={institucion.institucion_nombre}
                        className="w-full h-full object-contain floating-history-logo"
                        style={{
                          filter:
                            'drop-shadow(0 20px 55px rgba(0,0,0,0.45)) sepia(0.04) saturate(1.04)',
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center text-6xl lg:text-7xl font-black"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(244,225,183,0.20), rgba(var(--color-terciario-rgb,30,108,68),0.10))',
                          color: 'var(--color-primario)',
                        }}
                      >
                        {institucion?.institucion_iniciales || 'UPEA'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <h2
                className="text-base sm:text-lg lg:text-2xl font-semibold tracking-[0.42em] uppercase mb-4 reveal-piece reveal-subtitle"
                style={{
                  color: 'var(--color-primario)',
                  textShadow: '0 0 18px rgba(var(--color-primario-rgb, 0, 166, 81), 0.28)',
                }}
              >
                Carrera de
              </h2>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight max-w-5xl">
                <span
                  className="block"
                  style={{
                    background:
                      'linear-gradient(135deg, #ffffff 0%, var(--color-primario) 42%, var(--color-terciario) 78%, var(--color-secundario) 100%)',
                    backgroundSize: '220% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 3s linear infinite',
                    filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.30))',
                  }}
                >
                  {displayedText || institucion?.institucion_nombre.toUpperCase()}
                </span>
              </h1>

              <div className="flex items-center justify-center gap-4 pt-8 reveal-piece reveal-badge">
                <div
                  className="h-px w-14 sm:w-28"
                  style={{
                    background: 'linear-gradient(90deg, transparent, var(--color-primario))',
                  }}
                />

                <span
                  className="px-5 py-2 rounded-full text-sm sm:text-base font-black tracking-[0.35em] border backdrop-blur-md"
                  style={{
                    color: 'var(--color-primario)',
                    borderColor: 'rgba(var(--color-primario-rgb, 0, 166, 81), 0.35)',
                    background: 'rgba(33, 22, 15, 0.42)',
                    boxShadow: '0 0 24px rgba(var(--color-primario-rgb, 0, 166, 81), 0.08)',
                  }}
                >
                  {institucion?.institucion_iniciales}
                </span>

                <div
                  className="h-px w-14 sm:w-28"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-terciario), transparent)',
                  }}
                />
              </div>

              <p className="mt-8 max-w-3xl text-base sm:text-lg lg:text-xl text-white leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] reveal-piece reveal-text">
                Formación académica, creatividad proyectual e innovación profesional
                para diseñar espacios funcionales, estéticos y sostenibles.
              </p>
            </div>
          </div>
        </div>

        {portadas.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-[#21160f]/55 backdrop-blur-xl px-5 py-3 reveal-piece reveal-slider">
            {portadas.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                  i === currentSlide ? 'w-14 bg-white/20' : 'w-7 bg-white/25 hover:bg-white/45'
                }`}
                aria-label={`Ir a portada ${i + 1}`}
              >
                {i === currentSlide && (
                  <div
                    className="absolute inset-y-0 left-0 h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-primario), var(--color-terciario))',
                      animation: 'slideProgress 8s linear forwards',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 220% 50%;
          }
        }

        @keyframes slideProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes floatingHistory {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.01);
          }
        }

        @keyframes auraPulseHistory {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.95;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
          }
        }

        @keyframes dustMove {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.26;
          }
          50% {
            transform: translate3d(0, -8px, 0);
            opacity: 0.36;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.26;
          }
        }

        @keyframes puzzleCycleA {
          0% {
            opacity: 0;
            transform: translate(-140px, -90px) rotate(-10deg) scale(0.86);
          }
          16% {
            opacity: 0.8;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          55% {
            opacity: 0.55;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          72% {
            opacity: 0.75;
            transform: translate(18px, -10px) rotate(2deg) scale(1.02);
          }
          100% {
            opacity: 0;
            transform: translate(120px, 80px) rotate(9deg) scale(0.9);
          }
        }

        @keyframes puzzleCycleB {
          0% {
            opacity: 0;
            transform: translate(140px, -80px) rotate(10deg) scale(0.86);
          }
          18% {
            opacity: 0.8;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          56% {
            opacity: 0.55;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          74% {
            opacity: 0.75;
            transform: translate(-20px, -8px) rotate(-2deg) scale(1.02);
          }
          100% {
            opacity: 0;
            transform: translate(-120px, 85px) rotate(-9deg) scale(0.9);
          }
        }

        @keyframes puzzleCycleC {
          0% {
            opacity: 0;
            transform: translate(-130px, 100px) rotate(8deg) scale(0.88);
          }
          20% {
            opacity: 0.75;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          58% {
            opacity: 0.52;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          76% {
            opacity: 0.72;
            transform: translate(16px, 12px) rotate(-2deg) scale(1.02);
          }
          100% {
            opacity: 0;
            transform: translate(110px, -85px) rotate(8deg) scale(0.9);
          }
        }

        @keyframes puzzleCycleD {
          0% {
            opacity: 0;
            transform: translate(125px, 95px) rotate(-9deg) scale(0.88);
          }
          22% {
            opacity: 0.75;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          60% {
            opacity: 0.52;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          78% {
            opacity: 0.72;
            transform: translate(-18px, 10px) rotate(2deg) scale(1.02);
          }
          100% {
            opacity: 0;
            transform: translate(-110px, -90px) rotate(-8deg) scale(0.9);
          }
        }

        @keyframes revealPiece {
          0% {
            opacity: 0;
            transform: translateY(26px) scale(0.97);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-spin-slow {
          animation: slowSpin 20s linear infinite;
        }

        .history-bg-image {
          filter: sepia(0.28) saturate(0.88) contrast(1.02) brightness(0.82);
        }

        .hero-history-paper {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255, 247, 232, 0.03), rgba(82, 59, 38, 0.03)),
            radial-gradient(circle at 18% 22%, rgba(245, 227, 190, 0.05), transparent 24%),
            radial-gradient(circle at 76% 30%, rgba(84, 60, 39, 0.06), transparent 28%);
        }

        .hero-history-grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.12;
          background-image:
            radial-gradient(rgba(255, 244, 221, 0.28) 0.7px, transparent 0.7px),
            radial-gradient(rgba(69, 48, 31, 0.16) 0.7px, transparent 0.7px);
          background-position: 0 0, 12px 12px;
          background-size: 24px 24px;
          mix-blend-mode: soft-light;
        }

        .hero-history-lines {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.08;
          background-image:
            linear-gradient(to right, rgba(255, 239, 212, 0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 239, 212, 0.18) 1px, transparent 1px);
          background-size: 58px 58px;
        }

        .hero-history-vignette {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background:
            radial-gradient(circle at center, transparent 34%, rgba(13, 9, 7, 0.18) 68%, rgba(8, 5, 4, 0.48) 100%);
        }

        .hero-history-dust {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background:
            radial-gradient(circle at 16% 24%, rgba(255, 240, 214, 0.12) 0 2px, transparent 3px),
            radial-gradient(circle at 72% 28%, rgba(255, 240, 214, 0.10) 0 1.5px, transparent 3px),
            radial-gradient(circle at 84% 60%, rgba(255, 240, 214, 0.11) 0 2px, transparent 3px),
            radial-gradient(circle at 25% 72%, rgba(255, 240, 214, 0.08) 0 1.5px, transparent 3px),
            radial-gradient(circle at 58% 78%, rgba(255, 240, 214, 0.08) 0 1.5px, transparent 3px);
          animation: dustMove 7s ease-in-out infinite;
        }

        .hero-puzzle-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        .puzzle-piece {
          position: absolute;
          background:
            linear-gradient(
              145deg,
              rgba(244, 231, 208, 0.14),
              rgba(78, 56, 37, 0.16)
            );
          border: 1px solid rgba(245, 233, 208, 0.10);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.03),
            0 18px 40px rgba(0,0,0,0.12);
          backdrop-filter: blur(2px);
          opacity: 0;
        }

        .piece-1 {
          width: 22%;
          height: 18%;
          top: 8%;
          left: 7%;
          border-radius: 22px;
          clip-path: polygon(0 0, 82% 0, 82% 18%, 100% 18%, 100% 100%, 0 100%, 0 60%, 12% 60%, 12% 42%, 0 42%);
        }

        .piece-2 {
          width: 24%;
          height: 20%;
          top: 10%;
          right: 9%;
          border-radius: 24px;
          clip-path: polygon(0 0, 100% 0, 100% 58%, 84% 58%, 84% 76%, 100% 76%, 100% 100%, 0 100%, 0 16%, 12% 16%, 12% 0);
        }

        .piece-3 {
          width: 20%;
          height: 22%;
          top: 39%;
          left: 4%;
          border-radius: 26px;
          clip-path: polygon(0 0, 100% 0, 100% 36%, 82% 36%, 82% 56%, 100% 56%, 100% 100%, 0 100%);
        }

        .piece-4 {
          width: 21%;
          height: 21%;
          top: 42%;
          right: 5%;
          border-radius: 26px;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 12% 100%, 12% 82%, 0 82%);
        }

        .piece-5 {
          width: 26%;
          height: 15%;
          bottom: 10%;
          left: 18%;
          border-radius: 20px;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 18% 100%, 18% 80%, 0 80%);
        }

        .piece-6 {
          width: 24%;
          height: 14%;
          bottom: 12%;
          right: 18%;
          border-radius: 20px;
          clip-path: polygon(0 0, 82% 0, 82% 22%, 100% 22%, 100% 100%, 0 100%);
        }

        .hero-history.is-assembled .piece-1 {
          animation: puzzleCycleA 9s ease-in-out infinite;
        }

        .hero-history.is-assembled .piece-2 {
          animation: puzzleCycleB 10s ease-in-out 0.8s infinite;
        }

        .hero-history.is-assembled .piece-3 {
          animation: puzzleCycleC 9.5s ease-in-out 1.1s infinite;
        }

        .hero-history.is-assembled .piece-4 {
          animation: puzzleCycleD 10.5s ease-in-out 0.5s infinite;
        }

        .hero-history.is-assembled .piece-5 {
          animation: puzzleCycleA 11s ease-in-out 1.4s infinite;
        }

        .hero-history.is-assembled .piece-6 {
          animation: puzzleCycleB 10.2s ease-in-out 1.8s infinite;
        }

        .reveal-piece {
          opacity: 0;
          transform: translateY(26px) scale(0.97);
          filter: blur(6px);
        }

        .hero-history.is-assembled .reveal-piece {
          animation: revealPiece 0.9s ease forwards;
        }

        .hero-history.is-assembled .reveal-logo {
          animation-delay: 0.2s;
        }

        .hero-history.is-assembled .reveal-subtitle {
          animation-delay: 0.48s;
        }

        .hero-history.is-assembled .reveal-badge {
          animation-delay: 0.72s;
        }

        .hero-history.is-assembled .reveal-text {
          animation-delay: 0.9s;
        }

        .hero-history.is-assembled .reveal-slider {
          animation-delay: 1.05s;
        }

        .history-logo-aura {
          background:
            radial-gradient(circle, rgba(248, 235, 208, 0.16) 0%, rgba(121, 92, 61, 0.10) 52%, transparent 78%);
          filter: blur(10px);
          animation: auraPulseHistory 5s ease-in-out infinite;
        }

        .history-seal-mark {
          position: absolute;
          z-index: 2;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: rgba(244, 228, 197, 0.85);
          box-shadow: 0 0 12px rgba(244, 228, 197, 0.28);
        }

        .history-seal-mark-top {
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
        }

        .history-seal-mark-right {
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
        }

        .history-seal-mark-bottom {
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
        }

        .history-seal-mark-left {
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
        }

        .floating-history-logo {
          animation: floatingHistory 5.6s ease-in-out infinite;
        }

        .logo-puzzle-block {
          position: absolute;
          z-index: 3;
          width: 34%;
          height: 34%;
          background:
            linear-gradient(145deg, rgba(244, 232, 210, 0.16), rgba(82, 58, 38, 0.18));
          border: 1px solid rgba(245, 231, 208, 0.10);
          backdrop-filter: blur(2px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.14);
          border-radius: 16px;
          opacity: 0;
        }

        .logo-piece-1 {
          top: 10%;
          left: 10%;
          clip-path: polygon(0 0, 100% 0, 100% 74%, 78% 74%, 78% 100%, 0 100%);
        }

        .logo-piece-2 {
          top: 10%;
          right: 10%;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 24% 100%, 24% 76%, 0 76%);
        }

        .logo-piece-3 {
          bottom: 10%;
          left: 10%;
          clip-path: polygon(0 0, 76% 0, 76% 22%, 100% 22%, 100% 100%, 0 100%);
        }

        .logo-piece-4 {
          bottom: 10%;
          right: 10%;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 22%, 24% 22%, 24% 0);
        }

        .hero-history.is-assembled .logo-piece-1 {
          animation: puzzleCycleA 7.5s ease-in-out infinite;
        }

        .hero-history.is-assembled .logo-piece-2 {
          animation: puzzleCycleB 7.8s ease-in-out 0.4s infinite;
        }

        .hero-history.is-assembled .logo-piece-3 {
          animation: puzzleCycleC 8s ease-in-out 0.7s infinite;
        }

        .hero-history.is-assembled .logo-piece-4 {
          animation: puzzleCycleD 8.2s ease-in-out 1s infinite;
        }

        @media (max-width: 1024px) {
          .piece-1,
          .piece-2,
          .piece-3,
          .piece-4,
          .piece-5,
          .piece-6 {
            opacity: 0.7;
          }
        }

        @media (max-width: 640px) {
          .hero-puzzle-overlay {
            display: none;
          }

          .history-seal-mark {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </>
  );
}