'use client';

import { useState, useEffect } from 'react';
import {
  Target,
  Eye,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  PlayCircle,
  Loader2,
} from 'lucide-react';
import { api, DescripcionInstitucion } from '@/lib/api';

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');

  if (cleanHex.length < 6) {
    return `rgba(120, 74, 39, ${alpha})`;
  }

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function cleanHtml(html?: string | null) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

export default function About() {
  const [institucion, setInstitucion] = useState<DescripcionInstitucion | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mision' | 'vision'>('mision');

  const [colors, setColors] = useState({
    primario: '#7a4a28',
    secundario: '#c28a45',
    terciario: '#4b2d19',
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        const [instData, contentData] = await Promise.all([
          api.institution.getCurrentPrincipal(),
          api.content.getAll(),
        ]);

        setInstitucion(instData);

        const videosData = contentData.upea_videos || [];
        setVideos(videosData);
        setActiveVideo(videosData[0] || null);

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
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1d140f] px-4">
        <div className="about-history-paper absolute inset-0 opacity-80" />
        <div className="about-history-grain absolute inset-0 opacity-35" />

        <div
          className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25"
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
              Cargando información
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
        id="about"
        className="relative overflow-hidden bg-[#1d140f] px-4 py-24"
      > 
        <div className="absolute inset-0 pointer-events-none">
          <div className="about-history-paper absolute inset-0 opacity-80" />
          <div className="about-history-grain absolute inset-0 opacity-30" />
          <div className="about-history-lines absolute inset-0 opacity-20" />

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
           
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <div
              className="mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 backdrop-blur-xl"
              style={{
                borderColor: `${colors.primario}55`,
                backgroundColor: `${colors.primario}18`,
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
                Sobre la carrera
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
                animation: 'aboutHistoryShimmer 4s linear infinite',
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.35))',
              }}
            >
              {institucion?.institucion_nombre || 'Historia'}
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
                Memoria institucional
              </span>

              <div
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, ${colors.terciario}, transparent)`,
                }}
              />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-[#f3dfb8]/78 sm:text-xl">
              Una carrera orientada al estudio, análisis e interpretación de los
              procesos históricos, sociales y culturales que forman nuestra memoria colectiva.
            </p>
          </div>
 
          <div className="mb-16">
            <div
              className="group relative overflow-hidden rounded-[2.2rem] border p-8 backdrop-blur-xl lg:p-12"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    ${hexToRgba(colors.primario, 0.24)} 0%,
                    rgba(255, 242, 213, 0.13) 45%,
                    ${hexToRgba(colors.terciario, 0.22)} 100%
                  )
                `,
                borderColor: 'rgba(243, 223, 184, 0.24)',
                boxShadow: `0 30px 90px rgba(0,0,0,0.34), 0 22px 55px ${colors.primario}18`,
              }}
            >
              <div className="about-history-paper absolute inset-0 opacity-25" />
              <div className="about-history-grain absolute inset-0 opacity-20" />

              <div
                className="absolute -right-28 -top-28 h-80 w-80 rounded-full blur-3xl opacity-35 transition-opacity group-hover:opacity-50"
                style={{ backgroundColor: colors.primario }}
              />

              <div
                className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-45"
                style={{ backgroundColor: colors.terciario }}
              />

              <span
                className="absolute left-6 top-6 h-12 w-12 border-l-2 border-t-2 opacity-55"
                style={{ borderColor: colors.primario }}
              />
              <span
                className="absolute right-6 top-6 h-12 w-12 border-r-2 border-t-2 opacity-55"
                style={{ borderColor: colors.secundario }}
              />
              <span
                className="absolute bottom-6 left-6 h-12 w-12 border-b-2 border-l-2 opacity-55"
                style={{ borderColor: colors.secundario }}
              />
              <span
                className="absolute bottom-6 right-6 h-12 w-12 border-b-2 border-r-2 opacity-55"
                style={{ borderColor: colors.primario }}
              />

              <div className="relative z-10">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div
                    className="about-icon-seal flex h-16 w-16 items-center justify-center rounded-full border bg-[#fff2d5]/10 shadow-xl backdrop-blur-xl"
                    style={{
                      color: colors.secundario,
                      borderColor: `${colors.secundario}55`,
                      boxShadow: `0 18px 38px ${colors.secundario}22`,
                    }}
                  >
                    <Award className="h-9 w-9" />
                  </div>

                  <div>
                    <span
                      className="mb-2 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#2b170b]"
                      style={{
                        background: `linear-gradient(135deg, #fff2d5, ${colors.secundario})`,
                      }}
                    >
                      Formación profesional
                    </span>

                    <h3 className="text-3xl font-black text-[#fff2d5] lg:text-4xl">
                      Perfil Profesional
                    </h3>
                  </div>
                </div>

                <div
                  className="content-html about-content text-lg leading-relaxed text-[#f3dfb8]/86"
                  dangerouslySetInnerHTML={{
                    __html:
                      (institucion as any)?.institucion_objetivos ||
                      '<p>Información institucional no disponible.</p>',
                  }}
                />
              </div>
            </div>
          </div>
 
          {activeVideo && (
            <div className="mb-16">
              <div className="mb-8 text-center">
                <div
                  className="mb-4 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 backdrop-blur-xl"
                  style={{
                    borderColor: `${colors.secundario}55`,
                    backgroundColor: `${colors.secundario}16`,
                  }}
                >
                  <PlayCircle
                    className="h-5 w-5"
                    style={{ color: colors.secundario }}
                  />
                  <span className="text-xs font-black uppercase tracking-[0.32em] text-[#f3dfb8]/90">
                    Video institucional
                  </span>
                </div>

                <h3 className="text-3xl font-black text-[#fff2d5] sm:text-4xl">
                  {activeVideo.video_titulo || 'Material audiovisual'}
                </h3>

                {activeVideo.video_breve_descripcion && (
                  <p className="mx-auto mt-4 max-w-3xl text-[#f3dfb8]/72">
                    {cleanHtml(activeVideo.video_breve_descripcion)}
                  </p>
                )}
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
                <div
                  className="relative overflow-hidden rounded-[2rem] border bg-[#110b07]/70 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl"
                  style={{
                    borderColor: 'rgba(243, 223, 184, 0.22)',
                  }}
                >
                  <div
                    className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-25"
                    style={{ backgroundColor: colors.primario }}
                  />

                  <div
                    className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25"
                    style={{ backgroundColor: colors.secundario }}
                  />

                  <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-black">
                    <iframe
                      src={activeVideo.video_enlace}
                      title={activeVideo.video_titulo || 'Video institucional'}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {videos.length > 1 && (
                  <div className="space-y-3">
                    {videos.slice(0, 4).map((video) => (
                      <button
                        key={video.video_id}
                        onClick={() => setActiveVideo(video)}
                        className="group w-full rounded-[1.4rem] border p-4 text-left transition-all duration-300 hover:-translate-y-1"
                        style={{
                          borderColor:
                            activeVideo?.video_id === video.video_id
                              ? `${colors.secundario}70`
                              : 'rgba(243, 223, 184, 0.16)',
                          background:
                            activeVideo?.video_id === video.video_id
                              ? `linear-gradient(135deg, ${hexToRgba(colors.secundario, 0.22)}, rgba(255,242,213,0.10))`
                              : 'rgba(255,242,213,0.07)',
                          boxShadow:
                            activeVideo?.video_id === video.video_id
                              ? `0 18px 45px ${colors.secundario}18`
                              : '0 14px 35px rgba(0,0,0,0.18)',
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                            style={{
                              backgroundColor: `${colors.secundario}22`,
                              color: colors.secundario,
                            }}
                          >
                            <PlayCircle className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="font-black text-[#fff2d5]">
                              {video.video_titulo}
                            </p>
                            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#f3dfb8]/62">
                              {cleanHtml(video.video_breve_descripcion)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
 
          <div className="mb-16 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="space-y-4">
              <TabButton
                active={activeTab === 'mision'}
                onClick={() => setActiveTab('mision')}
                icon={Target}
                label="Misión"
                description="Propósito"
                colors={colors}
                type="primary"
              />

              <TabButton
                active={activeTab === 'vision'}
                onClick={() => setActiveTab('vision')}
                icon={Eye}
                label="Visión"
                description="Horizonte"
                colors={colors}
                type="tertiary"
              />
            </div>

            <div
              className="relative overflow-hidden rounded-[2rem] border p-8 backdrop-blur-xl lg:p-10"
              style={{
                borderColor: 'rgba(243, 223, 184, 0.22)',
                background:
                  'linear-gradient(180deg, rgba(255, 242, 213, 0.16), rgba(255, 242, 213, 0.08))',
                boxShadow: '0 26px 80px rgba(0,0,0,0.30)',
              }}
            >
              <div className="about-history-paper absolute inset-0 opacity-25" />
              <div className="about-history-grain absolute inset-0 opacity-20" />

              <div
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-28"
                style={{
                  backgroundColor:
                    activeTab === 'mision' ? colors.primario : colors.terciario,
                }}
              />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border"
                    style={{
                      color: colors.secundario,
                      borderColor: `${colors.secundario}55`,
                      backgroundColor: `${colors.secundario}18`,
                    }}
                  >
                    {activeTab === 'mision' ? (
                      <Target className="h-8 w-8" />
                    ) : (
                      <Eye className="h-8 w-8" />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.32em] text-[#f3dfb8]/55">
                      {activeTab === 'mision'
                        ? 'Propósito institucional'
                        : 'Proyección académica'}
                    </p>
                    <h3 className="text-3xl font-black text-[#fff2d5]">
                      {activeTab === 'mision' ? 'Misión' : 'Visión'}
                    </h3>
                  </div>
                </div>

                <div
                  className="content-html about-content text-lg leading-relaxed text-[#f3dfb8]/86"
                  dangerouslySetInnerHTML={{
                    __html:
                      activeTab === 'mision'
                        ? (institucion as any)?.institucion_mision ||
                          '<p>La misión institucional aún no está disponible.</p>'
                        : (institucion as any)?.institucion_vision ||
                          '<p>La visión institucional aún no está disponible.</p>',
                  }}
                />
              </div>
            </div>
          </div>
 
          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              icon={BookOpen}
              title="Investigación"
              text="Análisis crítico de procesos históricos, fuentes documentales y memoria social."
              color={colors.primario}
            />

            <InfoCard
              icon={Users}
              title="Sociedad"
              text="Comprensión de los cambios sociales, culturales y políticos desde la historia."
              color={colors.secundario}
            />

            <InfoCard
              icon={TrendingUp}
              title="Proyección"
              text="Formación académica orientada al pensamiento crítico y al aporte cultural."
              color={colors.terciario}
            />
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes aboutHistoryShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 220% 50%;
          }
        }

        @keyframes aboutDustMove {
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

        @keyframes aboutSealPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
          }
        }

        @keyframes aboutCardGlow {
          0%,
          100% {
            opacity: 0.28;
            transform: translateY(0);
          }
          50% {
            opacity: 0.48;
            transform: translateY(-8px);
          }
        }

        .about-history-paper {
          background:
            radial-gradient(circle at 18% 22%, rgba(244, 225, 183, 0.10), transparent 24%),
            radial-gradient(circle at 78% 34%, rgba(91, 57, 31, 0.18), transparent 26%),
            linear-gradient(180deg, rgba(255, 244, 221, 0.05), rgba(71, 43, 23, 0.10));
        }

        .about-history-grain {
          background-image:
            radial-gradient(rgba(255, 244, 221, 0.28) 0.7px, transparent 0.7px),
            radial-gradient(rgba(74, 45, 24, 0.20) 0.8px, transparent 0.8px);
          background-size: 24px 24px, 18px 18px;
          background-position: 0 0, 10px 12px;
          mix-blend-mode: soft-light;
          animation: aboutDustMove 7s ease-in-out infinite;
        }

        .about-history-lines {
          background-image:
            linear-gradient(to right, rgba(255, 239, 212, 0.13) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 239, 212, 0.10) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 76%);
        }

        .about-icon-seal {
          animation: aboutSealPulse 5s ease-in-out infinite;
        }

        .about-content p {
          margin-bottom: 1rem;
          color: rgba(243, 223, 184, 0.86);
        }

        .about-content strong {
          color: #fff2d5;
          font-weight: 900;
        }

        .about-content ul {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.4rem;
          list-style: disc;
        }

        .about-content li {
          margin-bottom: 0.5rem;
          color: rgba(243, 223, 184, 0.86);
        }
      `}</style>
    </>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  description,
  colors,
  type,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
  description: string;
  colors: any;
  type: 'primary' | 'tertiary';
}) {
  const activeColor = type === 'primary' ? colors.primario : colors.terciario;

  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-[1.8rem] border p-6 text-left transition-all duration-500 hover:-translate-y-1 ${
        active ? 'scale-[1.02]' : ''
      }`}
      style={{
        borderColor: active ? `${activeColor}80` : 'rgba(243, 223, 184, 0.20)',
        background: active
          ? `linear-gradient(135deg, ${hexToRgba(activeColor, 0.34)}, rgba(255,242,213,0.12))`
          : 'rgba(255, 242, 213, 0.09)',
        boxShadow: active
          ? `0 24px 60px ${activeColor}22`
          : '0 18px 50px rgba(0,0,0,0.20)',
      }}
    >
      <div className="about-history-paper absolute inset-0 opacity-20" />

      <div className="relative z-10 flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border"
          style={{
            color: active ? colors.secundario : '#f3dfb8',
            borderColor: active ? `${colors.secundario}60` : 'rgba(243,223,184,0.22)',
            backgroundColor: 'rgba(255,242,213,0.10)',
          }}
        >
          <Icon className="h-7 w-7" />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f3dfb8]/55">
            {description}
          </p>
          <h4 className="text-2xl font-black text-[#fff2d5]">
            {label}
          </h4>
        </div>
      </div>
    </button>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: any;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-[1.8rem] border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
      style={{
        borderColor: `${color}55`,
        background: `
          linear-gradient(
            145deg,
            ${hexToRgba(color, 0.30)} 0%,
            rgba(255, 242, 213, 0.16) 48%,
            rgba(255, 242, 213, 0.08) 100%
          )
        `,
        boxShadow: `0 26px 80px rgba(0,0,0,0.30), 0 0 45px ${color}18`,
      }}
    >
      <div className="about-history-paper absolute inset-0 opacity-25" />
      <div className="about-history-grain absolute inset-0 opacity-15" />

      <div
        className="absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl opacity-35 transition-opacity group-hover:opacity-55"
        style={{
          backgroundColor: color,
          animation: 'aboutCardGlow 5s ease-in-out infinite',
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border"
          style={{
            color,
            borderColor: `${color}70`,
            backgroundColor: `${color}24`,
            boxShadow: `0 18px 38px ${color}24, inset 0 0 18px rgba(255,255,255,0.06)`,
          }}
        >
          <Icon className="h-8 w-8" />
        </div>

        <h3 className="mb-4 text-3xl font-black text-[#fff2d5]">
          {title}
        </h3>

        <p className="text-lg leading-relaxed text-[#f3dfb8]/82">
          {text}
        </p>
      </div>
    </div>
  );
}