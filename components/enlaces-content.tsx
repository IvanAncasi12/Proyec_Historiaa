'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, Link as LinkIcon } from 'lucide-react';
import { api, utils } from '@/lib/api';

interface EnlacesContentProps {
  colors: { primario: string; secundario: string; terciario: string; };
}

export default function EnlacesContent({ colors }: EnlacesContentProps) {
  const [enlaces, setEnlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEnlaces = async () => {
      try {
        const resourcesData = await api.resources.getAll();
         
        const listaEnlaces = (resourcesData.linksExternoInterno || [])
          .filter((link: any) => link.estado === 1);
        
        setEnlaces(listaEnlaces);
      } catch (error) {
        console.error('Error cargando enlaces:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarEnlaces();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
       
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 top-[-8rem] h-[130%] w-[48rem] origin-top -translate-x-[88%] -rotate-[30deg] rounded-full blur-[80px] opacity-65"
            style={{
              background: `linear-gradient(180deg, ${colors.primario}99 0%, ${colors.secundario}55 42%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[-8rem] h-[130%] w-[48rem] origin-top -translate-x-[12%] rotate-[30deg] rounded-full blur-[80px] opacity-65"
            style={{
              background: `linear-gradient(180deg, ${colors.terciario}99 0%, ${colors.primario}55 42%, transparent 80%)`,
            }}
          />

          <div className="absolute inset-0 bg-white/45" />

          <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative z-10 flex items-center gap-4 px-7 py-5 rounded-3xl border border-white/80 bg-white/75 backdrop-blur-xl shadow-2xl shadow-slate-300/40">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border"
            style={{
              color: colors.primario,
              borderColor: `${colors.primario}55`,
              backgroundColor: `${colors.primario}12`,
              boxShadow: `0 18px 40px ${colors.primario}25`,
            }}
          >
            <LinkIcon className="w-7 h-7 animate-pulse" />
          </div>

          <div>
            <p className="text-slate-900 text-lg font-black">Cargando enlaces</p>
            <p className="text-slate-500 text-sm">Preparando recursos institucionales...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-white">
       
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, ${colors.primario}24 0%, rgba(255,255,255,0.78) 36%, ${colors.terciario}24 100%)
            `,
          }}
        />
 
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-[-10rem] h-[150%] w-[54rem] origin-top -translate-x-[92%] -rotate-[31deg] rounded-full blur-[78px] opacity-90"
            style={{
              background: `linear-gradient(180deg, ${colors.primario}bb 0%, ${colors.secundario}75 42%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[-10rem] h-[150%] w-[54rem] origin-top -translate-x-[8%] rotate-[31deg] rounded-full blur-[78px] opacity-90"
            style={{
              background: `linear-gradient(180deg, ${colors.terciario}bb 0%, ${colors.primario}75 42%, transparent 80%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-[12%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-[95px] opacity-65"
            style={{
              background: `radial-gradient(circle, ${colors.secundario}99 0%, ${colors.primario}45 38%, transparent 72%)`,
            }}
          />
        </div>

        <div
          className="absolute top-10 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: colors.primario }}
        />

        <div
          className="absolute bottom-10 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: colors.terciario }}
        />

        <div className="absolute inset-0 bg-white/38" />
 
        <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.45)_1px,transparent_1px)] bg-[size:72px_72px]" />
 
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0 22%, ${colors.primario} 22.15%, transparent 22.3%),
              linear-gradient(0deg, transparent 0 36%, ${colors.terciario} 36.15%, transparent 36.3%),
              linear-gradient(90deg, transparent 0 72%, ${colors.secundario} 72.15%, transparent 72.3%)
            `,
            backgroundSize: '260px 260px, 320px 320px, 420px 420px',
          }}
        />
 
        <div className="absolute left-8 top-8 w-12 h-12 border-l-2 border-t-2 border-slate-400/45" />
        <div className="absolute right-8 top-8 w-12 h-12 border-r-2 border-t-2 border-slate-400/45" />
        <div className="absolute left-8 bottom-8 w-12 h-12 border-l-2 border-b-2 border-slate-400/45" />
        <div className="absolute right-8 bottom-8 w-12 h-12 border-r-2 border-b-2 border-slate-400/45" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
         
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl mb-6"
            style={{
              borderColor: `${colors.primario}35`,
              backgroundColor: `${colors.primario}10`,
              boxShadow: `0 18px 45px ${colors.primario}18`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: colors.primario,
                boxShadow: `0 0 16px ${colors.primario}`,
              }}
            />

            <span className="text-xs sm:text-sm font-black tracking-[0.28em] uppercase text-slate-700">
              Recursos institucionales
            </span>
          </div>

        </div>
         
        <div className="w-full">
          {enlaces.length === 0 ? (
            <div className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-16 text-center shadow-2xl shadow-slate-300/30">
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25"
                style={{ backgroundColor: colors.primario }}
              />

              <LinkIcon
                className="w-16 h-16 mx-auto mb-5 opacity-70"
                style={{ color: colors.primario }}
              />

              <h3 className="text-2xl font-black text-slate-900 mb-2">
                No hay enlaces disponibles
              </h3>

              <p className="text-slate-500">
                Pronto agregaremos nuevos recursos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {enlaces.map((enlace, index) => {
                const imageUrl = enlace.imagen 
                  ? utils.buildImageUrl(enlace.imagen) 
                  : null;

                return (
                  <div 
                    key={enlace.id_link}
                    className="group relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3"
                    style={{
                      borderColor: `${colors.primario}28`,
                      boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                    }}
                  >
                    
                    <div
                      className="absolute inset-0 opacity-[0.08] pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(15,23,42,0.18) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(15,23,42,0.18) 1px, transparent 1px)
                        `,
                        backgroundSize: '42px 42px',
                      }}
                    />

                    <div
                      className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-35"
                      style={{ backgroundColor: colors.terciario }}
                    />

                    <div
                      className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                      style={{ backgroundColor: colors.primario }}
                    />

                    <span
                      className="absolute top-5 right-5 text-5xl font-black leading-none opacity-10"
                      style={{ color: colors.primario }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
 
                    <div
                      className="relative z-10 w-24 h-24 rounded-[1.5rem] mb-5 flex items-center justify-center bg-white border overflow-hidden group-hover:scale-105 transition-transform shadow-xl"
                      style={{
                        borderColor: `${colors.primario}28`,
                        boxShadow: `0 18px 40px rgba(15,23,42,0.12), 0 0 30px ${colors.primario}14`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-80"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primario}10, ${colors.terciario}10)`,
                        }}
                      />

                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={enlace.nombre} 
                          className="relative z-10 w-14 h-14 object-contain"
                          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                        />
                      ) : (
                        <ExternalLink
                          className="relative z-10 w-9 h-9"
                          style={{ color: colors.primario }}
                        />
                      )}
                    </div>
  
                    <div className="relative z-10 w-full flex-1">
                      {enlace.tipo && (
                        <span
                          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black text-white mb-4 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${colors.secundario}, ${colors.terciario})`,
                            boxShadow: `0 12px 28px ${colors.secundario}22`,
                          }}
                        >
                          {enlace.tipo}
                        </span>
                      )}

                      <h3 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight">
                        {enlace.nombre || 'Enlace Institucional'}
                      </h3>
                    </div>
                     
                    <a 
                      href={enlace.url_link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 text-white"
                      style={{ 
                        background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                        boxShadow: `0 14px 28px ${colors.primario}25`,
                      }}
                    >
                      Visitar Sitio <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}