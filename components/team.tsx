'use client';

import { useState, useEffect } from 'react';
import { Facebook, Twitter, Phone, Loader2 } from 'lucide-react';
import { api, Autoridad, utils } from '@/lib/api';

export default function Team() {
  const [autoridades, setAutoridades] = useState<Autoridad[]>([]);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState({
    primario: '#10b981',
    secundario: '#f59e0b',
    terciario: '#06b6d4',
  });

  useEffect(() => {
    const cargar = async () => {
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

        const contentData = await api.content.getAll();
        setAutoridades(contentData.autoridad || []);
      } catch (error) {
        console.error('Error cargando autoridades:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) {
    return (
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#1d140f] px-4">
        <div className="history-team-paper absolute inset-0 opacity-50" />
        <div className="history-team-grain absolute inset-0 opacity-30" />

        <div
          className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: colors.primario }}
        />

        <div className="relative z-10 flex items-center gap-4 rounded-[2rem] border border-[#f3dfb8]/16 bg-[#fff2d5]/10 px-7 py-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border"
            style={{
              color: colors.primario,
              borderColor: `${colors.primario}55`,
              backgroundColor: `${colors.primario}12`,
              boxShadow: `0 0 35px ${colors.primario}28`,
            }}
          >
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>

          <div>
            <p className="text-lg font-black text-[#fff2d5]">
              Cargando autoridades
            </p>
            <p className="text-sm text-[#f3dfb8]/65">
              Preparando equipo institucional...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (autoridades.length === 0) return null;

  return (
    <>
      <section
        id="team"
        className="relative overflow-hidden bg-[#1d140f] px-4 py-24"
      >
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="history-team-paper absolute inset-0 opacity-75" />
          <div className="history-team-grain absolute inset-0 opacity-30" />
          <div className="history-team-lines absolute inset-0 opacity-20" />

          <div
            className="absolute -left-56 top-10 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.primario }}
          />

          <div
            className="absolute -right-56 bottom-10 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.terciario }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10"
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
                borderColor: `${colors.primario}40`,
                backgroundColor: `${colors.primario}12`,
                boxShadow: `0 18px 45px ${colors.primario}16`,
              }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full animate-pulse"
                style={{
                  backgroundColor: colors.primario,
                  boxShadow: `0 0 16px ${colors.primario}`,
                }}
              />

              <span className="text-xs font-black uppercase tracking-[0.32em] text-[#f3dfb8]/80 sm:text-sm">
                Equipo institucional
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
                animation: 'historyTeamShimmer 4s linear infinite',
                filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.35))',
              }}
            >
              Nuestras Autoridades
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
                  color: colors.primario,
                  borderColor: `${colors.primario}40`,
                  backgroundColor: 'rgba(255, 242, 213, 0.08)',
                }}
              >
                Dirección
              </span>

              <div
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, ${colors.terciario}, transparent)`,
                }}
              />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-[#f3dfb8]/72 sm:text-xl">
              Conoce al equipo directivo que guía la formación académica,
              la memoria institucional y el desarrollo de la carrera.
            </p>
          </div>

          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {autoridades.map((aut, idx) => (
              <AuthorityCard
                key={aut.id_autoridad}
                autoridad={aut}
                colors={colors}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes historyTeamShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 220% 50%;
          }
        }

        @keyframes historyTeamFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes historyTeamSealRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes historyTeamFadeUp {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes historyTeamDust {
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

        .history-team-paper {
          background:
            radial-gradient(circle at 18% 22%, rgba(244, 225, 183, 0.10), transparent 24%),
            radial-gradient(circle at 78% 34%, rgba(91, 57, 31, 0.18), transparent 26%),
            linear-gradient(180deg, rgba(255, 244, 221, 0.05), rgba(71, 43, 23, 0.10));
        }

        .history-team-grain {
          background-image:
            radial-gradient(rgba(255, 244, 221, 0.28) 0.7px, transparent 0.7px),
            radial-gradient(rgba(74, 45, 24, 0.20) 0.8px, transparent 0.8px);
          background-size: 24px 24px, 18px 18px;
          background-position: 0 0, 10px 12px;
          mix-blend-mode: soft-light;
          animation: historyTeamDust 7s ease-in-out infinite;
        }

        .history-team-lines {
          background-image:
            linear-gradient(to right, rgba(255, 239, 212, 0.13) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 239, 212, 0.10) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 76%);
        }

        .history-authority-card {
          animation: historyTeamFadeUp 0.8s ease both;
        }

        .authority-photo-float {
          animation: historyTeamFloat 5.8s ease-in-out infinite;
        }

        .authority-seal-spin {
          animation: historyTeamSealRotate 24s linear infinite;
        }
      `}</style>
    </>
  );
}

function AuthorityCard({
  autoridad,
  colors,
  index,
}: {
  autoridad: Autoridad;
  colors: any;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  const initials = autoridad.nombre_autoridad
    ? autoridad.nombre_autoridad
        .split(' ')
        .filter((n) => n.length > 0)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AU';

  const imageUrl =
    !imgError && autoridad.foto_autoridad
      ? utils.buildImageUrl(autoridad.foto_autoridad)
      : null;

  return (
    <div
      className="history-authority-card group relative overflow-hidden rounded-[2rem] border p-7 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-3"
      style={{
        animationDelay: `${index * 140}ms`,
        borderColor: 'rgba(243, 223, 184, 0.18)',
        background:
          'linear-gradient(180deg, rgba(255, 242, 213, 0.14), rgba(255, 242, 213, 0.08))',
        boxShadow: `0 26px 80px rgba(0,0,0,0.30), 0 18px 45px ${colors.primario}12`,
      }}
    >
      
      <div className="history-team-paper absolute inset-0 opacity-25 pointer-events-none" />
      <div className="history-team-grain absolute inset-0 opacity-20 pointer-events-none" />

       
      <div
        className="absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-35"
        style={{ backgroundColor: colors.terciario }}
      />

      <div
        className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: colors.primario }}
      />

      
      <span
        className="absolute right-6 top-5 text-5xl font-black leading-none opacity-10"
        style={{ color: colors.primario }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
 
      <span
        className="absolute left-5 top-5 h-9 w-9 border-l-2 border-t-2 opacity-45"
        style={{ borderColor: colors.primario }}
      />
      <span
        className="absolute right-5 top-5 h-9 w-9 border-r-2 border-t-2 opacity-45"
        style={{ borderColor: colors.terciario }}
      />
      <span
        className="absolute bottom-5 left-5 h-9 w-9 border-b-2 border-l-2 opacity-45"
        style={{ borderColor: colors.terciario }}
      />
      <span
        className="absolute bottom-5 right-5 h-9 w-9 border-b-2 border-r-2 opacity-45"
        style={{ borderColor: colors.primario }}
      />
 
      <div className="authority-photo-float relative mx-auto mb-7 h-44 w-44">
        <div
          className="authority-seal-spin absolute inset-0 rounded-full border-2 border-dashed opacity-55"
          style={{ borderColor: colors.primario }}
        />

        <div
          className="absolute inset-3 rounded-full border opacity-40"
          style={{ borderColor: colors.terciario }}
        />

        <div
          className="absolute inset-5 rounded-full blur-xl opacity-25"
          style={{ backgroundColor: colors.primario }}
        />

        <div
          className="absolute inset-5 overflow-hidden rounded-full border-4 bg-[#fff3d6] shadow-2xl"
          style={{
            borderColor: '#fff2d5',
            boxShadow: `0 0 0 2px ${colors.primario}55, 0 22px 55px rgba(0,0,0,0.24), 0 0 38px ${colors.primario}22`,
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={autoridad.nombre_autoridad || 'Autoridad'}
              className="h-full w-full object-cover sepia-[0.18] saturate-[0.9] transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primario}24, ${colors.terciario}16)`,
              }}
            >
              <span
                className="text-4xl font-black"
                style={{ color: colors.primario }}
              >
                {initials}
              </span>
            </div>
          )}
        </div>

        <div
          className="absolute bottom-4 right-5 z-10 h-5 w-5 rounded-full border-[3px] border-[#fff2d5]"
          style={{
            backgroundColor: colors.primario,
            boxShadow: `0 0 18px ${colors.primario}`,
          }}
        />
      </div>
 
      <div className="relative z-10">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-[#f3dfb8]/45">
          Autoridad
        </p>

        <h3 className="mb-3 text-2xl font-black leading-tight text-[#fff2d5] transition-colors">
          {autoridad.nombre_autoridad || 'Nombre no disponible'}
        </h3>

        <p
          className="mb-6 text-sm font-black uppercase leading-relaxed tracking-[0.18em]"
          style={{ color: colors.secundario }}
        >
          {autoridad.cargo_autoridad}
        </p>
      </div>
 
      <div className="relative z-10 flex justify-center gap-3 border-t border-[#f3dfb8]/15 pt-5">
        {autoridad.facebook_autoridad && (
          <SocialBtn
            icon={Facebook}
            url={autoridad.facebook_autoridad}
            color={colors.primario}
          />
        )}

        {autoridad.twiter_autoridad && (
          <SocialBtn
            icon={Twitter}
            url={autoridad.twiter_autoridad}
            color={colors.terciario}
          />
        )}

        {autoridad.celular_autoridad && (
          <SocialBtn
            icon={Phone}
            url={`tel:${autoridad.celular_autoridad}`}
            color={colors.secundario}
          />
        )}
      </div>
    </div>
  );
}

function SocialBtn({
  icon: Icon,
  url,
  color,
}: {
  icon: any;
  url: string;
  color: string;
}) {
  const isPhone = url.startsWith('tel:');

  return (
    <a
      href={url}
      target={isPhone ? undefined : '_blank'}
      rel={isPhone ? undefined : 'noopener noreferrer'}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border bg-[#fff2d5]/10 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
      style={{
        color,
        borderColor: `${color}35`,
        boxShadow: `0 10px 25px ${color}18`,
      }}
      aria-label="Red social"
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${color}22, rgba(255,242,213,0.18))`,
        }}
      />

      <Icon className="relative z-10 h-5 w-5" />
    </a>
  );
}