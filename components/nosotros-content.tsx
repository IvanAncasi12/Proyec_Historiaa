'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, Briefcase, Target, Eye, Users, Award, 
  TrendingUp, Building2, MapPin, ChevronRight,
  Calendar, FileText, Video, Link as LinkIcon
} from 'lucide-react';
import { api, utils, Autoridad } from '@/lib/api';

interface NosotrosContentProps {
  colors: { primario: string; secundario: string; terciario: string; };
}

export default function NosotrosContent({ colors }: NosotrosContentProps) {
  const [institucion, setInstitucion] = useState<any>(null);
  const [autoridades, setAutoridades] = useState<Autoridad[]>([]);
  const [loading, setLoading] = useState(true);
   
  const [counts, setCounts] = useState({
    convocatorias: 0,
    comunicados: 0,
    avisos: 0,
    seminarios: 0,
    cursos: 0,
    servicios: 0,
    ofertas: 0,
    publicaciones: 0,
    gacetas: 0,
    eventos: 0,
    videos: 0,
    enlaces: 0,
  });

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const [instData, contentData, eventsData, resourcesData] = await Promise.all([
          api.institution.getCurrentPrincipal(),
          api.content.getAll(),
          api.events.getAll(),
          api.resources.getAll()
        ]);
        
        setInstitucion(instData);
        setAutoridades(contentData.autoridad || []);
         
        setCounts({
          convocatorias: (eventsData.convocatorias || []).length,
          comunicados: 0,  
          avisos: 0,
          seminarios: (eventsData.cursos || []).filter((c: any) => c.tipo_curso_otro?.tipo_conv_curso_nombre?.toLowerCase().includes('seminario')).length,
          cursos: (eventsData.cursos || []).length,
          servicios: (eventsData.serviciosCarrera || []).length,
          ofertas: (eventsData.ofertasAcademicas || []).length,
          publicaciones: (resourcesData.upea_publicaciones || []).length,
          gacetas: (eventsData.upea_gaceta_universitaria || []).length,
          eventos: (eventsData.upea_evento || []).length,
          videos: (contentData.upea_videos || []).length,
          enlaces: (resourcesData.linksExternoInterno || []).length,
        });
      } catch (error) {
        console.error('Error cargando conteos:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarTodo();
  }, []);
 
  const categoriesData = [
    { name: 'Convocatorias', count: counts.convocatorias, href: '/convocatorias', icon: FileText },
    { name: 'Comunicados', count: counts.comunicados, href: '/comunicados', icon: FileText },
    { name: 'Avisos', count: counts.avisos, href: '/avisos', icon: FileText },
    { name: 'Seminarios', count: counts.seminarios, href: '/seminarios', icon: Video },
    { name: 'Cursos', count: counts.cursos, href: '/cursos', icon: BookOpen },
    { name: 'Servicios', count: counts.servicios, href: '/servicios', icon: Briefcase },
    { name: 'Ofertas Académicas', count: counts.ofertas, href: '/ofertas', icon: Award },
    { name: 'Publicaciones', count: counts.publicaciones, href: '/publicaciones', icon: FileText },
    { name: 'Gaceta', count: counts.gacetas, href: '/gacetas', icon: FileText },
    { name: 'Eventos', count: counts.eventos, href: '/eventos', icon: Calendar },
    { name: 'Videos', count: counts.videos, href: '/videos', icon: Video },
    { name: 'Enlaces', count: counts.enlaces, href: '/enlaces', icon: LinkIcon },
  ].filter(cat => cat.count > 0);  

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
            <BookOpen className="w-7 h-7 animate-pulse" />
          </div>

          <div>
            <p className="text-slate-900 text-lg font-black">Cargando información</p>
            <p className="text-slate-500 text-sm">Preparando datos institucionales...</p>
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
              Información institucional
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mt-7">
            <div
              className="h-px w-20 sm:w-32"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.primario})`,
              }}
            />

            <span
              className="px-4 py-1.5 rounded-full text-xs font-black tracking-[0.25em] uppercase border bg-white/70 backdrop-blur-xl"
              style={{
                color: colors.primario,
                borderColor: `${colors.primario}35`,
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

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mt-7 leading-relaxed">
            Conoce el perfil profesional, campo laboral, misión, visión y equipo institucional de la carrera.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          <div className="lg:col-span-3 space-y-10">
             
            <div
              className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-8 sm:p-10"
              style={{
                borderColor: `${colors.primario}28`,
                boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
              }}
            >
              <div
                className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: colors.primario }}
              />

              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div
                  className="p-3 rounded-2xl border bg-white"
                  style={{
                    borderColor: `${colors.primario}30`,
                    color: colors.primario,
                    boxShadow: `0 14px 32px ${colors.primario}18`,
                  }}
                >
                  <BookOpen className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-black" style={{ color: colors.primario }}>
                  Perfil Profesional
                </h3>
              </div>

              <div
                className="relative z-10 text-slate-600 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: institucion?.institucion_objetivos || '' }}
              />
            </div>
  
            <div
              className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-8 sm:p-10"
              style={{
                borderColor: `${colors.secundario}28`,
                boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.secundario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
              }}
            >
              <div
                className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: colors.secundario }}
              />

              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div
                  className="p-3 rounded-2xl border bg-white"
                  style={{
                    borderColor: `${colors.secundario}30`,
                    color: colors.secundario,
                    boxShadow: `0 14px 32px ${colors.secundario}18`,
                  }}
                >
                  <Briefcase className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-black" style={{ color: colors.secundario }}>
                  Campo de Trabajo
                </h3>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                      icon: Building2,
                      title: 'Investigación Histórica',
                      desc: 'Análisis de procesos históricos, revisión de fuentes documentales, archivos, testimonios y memoria social.'
                    },
                    {
                      icon: MapPin,
                      title: 'Patrimonio y Cultura',
                      desc: 'Gestión, conservación y difusión del patrimonio histórico, cultural, documental y material de la sociedad.'
                    },
                    {
                      icon: TrendingUp,
                      title: 'Docencia y Formación',
                      desc: 'Desempeño en instituciones educativas, centros de formación, universidades y espacios de enseñanza de la historia.'
                    },
                    {
                      icon: Target,
                      title: 'Gestión Pública y Social',
                      desc: 'Participación en proyectos culturales, instituciones públicas, museos, archivos, bibliotecas y programas sociales.'
                    }
                  ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden p-5 rounded-2xl border bg-white/72 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2"
                    style={{
                      borderColor: `${colors.primario}24`,
                      boxShadow: `0 14px 35px rgba(15,23,42,0.08)`,
                    }}
                  >
                    <div
                      className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"
                      style={{ backgroundColor: colors.primario }}
                    />

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border bg-white mb-4"
                      style={{
                        color: colors.primario,
                        borderColor: `${colors.primario}30`,
                      }}
                    >
                      <item.icon className="w-7 h-7" />
                    </div>

                    <h4 className="font-black text-slate-900 mb-2">
                      {item.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-8"
                style={{
                  borderColor: `${colors.primario}28`,
                  boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border"
                    style={{
                      color: colors.primario,
                      borderColor: `${colors.primario}30`,
                    }}
                  >
                    <Target className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-black" style={{ color: colors.primario }}>
                    Misión
                  </h3>
                </div>

                <div
                  className="text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: institucion?.institucion_mision || '' }}
                />
              </div>

              <div
                className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-8"
                style={{
                  borderColor: `${colors.terciario}28`,
                  boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.terciario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border"
                    style={{
                      color: colors.terciario,
                      borderColor: `${colors.terciario}30`,
                    }}
                  >
                    <Eye className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-black" style={{ color: colors.terciario }}>
                    Visión
                  </h3>
                </div>

                <div
                  className="text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: institucion?.institucion_vision || '' }}
                />
              </div>
            </div>
  
            <div className="w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-center">
                <div
                  className="p-3 rounded-2xl border bg-white"
                  style={{
                    color: colors.terciario,
                    borderColor: `${colors.terciario}30`,
                    boxShadow: `0 14px 32px ${colors.terciario}18`,
                  }}
                >
                  <Users className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-black" style={{ color: colors.terciario }}>
                  Nuestras Autoridades
                </h3>
              </div>

              {autoridades.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                  {autoridades.map((aut, index) => (
                    <div 
                      key={aut.id_autoridad} 
                      className="group relative overflow-hidden w-full max-w-sm p-7 rounded-[2rem] border bg-white/78 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 flex flex-col items-center text-center"
                      style={{
                        borderColor: `${colors.primario}24`,
                        boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                      }}
                    >
                      <span
                        className="absolute top-5 right-5 text-5xl font-black leading-none opacity-10"
                        style={{ color: colors.primario }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div
                        className="absolute -bottom-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity"
                        style={{ backgroundColor: colors.primario }}
                      />
                     
                      <div
                        className="relative w-32 h-32 rounded-full overflow-hidden border-4 mb-5 shadow-xl group-hover:scale-105 transition-transform bg-white"
                        style={{
                          borderColor: '#ffffff',
                          boxShadow: `0 0 0 2px ${colors.primario}55, 0 22px 55px rgba(15,23,42,0.18)`,
                        }}
                      >
                        {aut.foto_autoridad ? (
                          <img 
                            src={utils.buildImageUrl(aut.foto_autoridad)} 
                            alt={aut.nombre_autoridad || ''}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primario}18, ${colors.terciario}14)`,
                            }}
                          >
                            <Users className="w-12 h-12 text-slate-400" />
                          </div>
                        )}
                      </div>
                      
                      <h4 className="relative z-10 font-black text-slate-900 text-lg leading-tight mb-2">
                        {aut.nombre_autoridad}
                      </h4>

                      <span
                        className="relative z-10 text-sm font-black px-4 py-1.5 rounded-full mb-3"
                        style={{
                          color: colors.secundario,
                          backgroundColor: `${colors.secundario}12`,
                        }}
                      >
                        {aut.cargo_autoridad}
                      </span>

                      {aut.facebook_autoridad && (
                        <div className="relative z-10 flex justify-center gap-3 pt-4 border-t border-slate-200/80 mt-auto w-full">
                          <a
                            href={aut.facebook_autoridad}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border bg-white/80 flex items-center justify-center transition-all hover:-translate-y-1 hover:scale-110"
                            style={{
                              color: colors.primario,
                              borderColor: `${colors.primario}30`,
                              boxShadow: `0 10px 25px ${colors.primario}18`,
                            }}
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-12 text-center">
                  <Users className="w-14 h-14 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-500 text-center">
                    No hay autoridades registradas.
                  </p>
                </div>
              )}
            </div>

          </div>
  
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="text-center pb-4 border-b border-slate-300/70">
                <h3 className="text-xl font-black text-slate-800 tracking-[0.18em]">
                  CATEGORÍAS
                </h3>
              </div>

              <div className="space-y-3">
                {categoriesData.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <a
                      key={cat.name}
                      href={cat.href}
                      className="group flex items-center justify-between p-4 rounded-2xl border bg-white/72 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                      style={{ 
                        borderColor: `${colors.primario}24`,
                        boxShadow: `0 14px 35px rgba(15,23,42,0.08)`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center border bg-white group-hover:scale-110 transition-transform"
                          style={{
                            color: colors.primario,
                            borderColor: `${colors.primario}30`,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </span>

                        <span className="text-sm font-bold text-slate-700 group-hover:text-slate-950">
                          {cat.name}
                        </span>
                      </div>

                      <span 
                        className="px-2.5 py-0.5 rounded-full text-xs font-black text-white"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                        }}
                      >
                        {cat.count}
                      </span>
                    </a>
                  );
                })}
              </div>

              <div
                className="p-6 rounded-[1.5rem] border bg-white/72 backdrop-blur-xl text-center"
                style={{
                  borderColor: `${colors.primario}30`,
                  boxShadow: `0 20px 50px ${colors.primario}12`,
                }}
              >
                <p className="text-sm text-slate-500 mb-3">
                  ¿Necesitas más información?
                </p>

                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all hover:scale-105 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                    boxShadow: `0 14px 28px ${colors.primario}25`,
                  }}
                >
                  Contáctanos <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}