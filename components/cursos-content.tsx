'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Users,
  TrendingUp, Award, FileText, ExternalLink,
  Briefcase, X
} from 'lucide-react';
import { api, Curso } from '@/lib/api';

interface CursosContentProps {
  colors: { primario: string; secundario: string; terciario: string; };
}

export default function CursosContent({ colors }: CursosContentProps) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    convocatorias: 0, comunicados: 0, avisos: 0, seminarios: 0,
    cursos: 0, servicios: 0, ofertas: 0, publicaciones: 0,
    gacetas: 0, eventos: 0, videos: 0, enlaces: 0,
  });

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const [eventsData, resourcesData, contentData] = await Promise.all([
          api.events.getAll(),
          api.resources.getAll(),
          api.content.getAll()
        ]);
         
        const todosCursos = eventsData.cursos || [];
        const soloCursos = todosCursos.filter((c: Curso) => {
          const tipo = c.tipo_curso_otro?.tipo_conv_curso_nombre?.toLowerCase() || '';
          return !tipo.includes('seminario');
        });
        
        setCursos(soloCursos);
        
        setCounts({
          convocatorias: (eventsData.convocatorias || []).filter((c: any) => 
            c.tipo_conv_comun?.tipo_conv_comun_titulo?.toLowerCase().includes('convocatoria')
          ).length,
          comunicados: (eventsData.convocatorias || []).filter((c: any) => 
            c.tipo_conv_comun?.tipo_conv_comun_titulo?.toLowerCase().includes('comunicado')
          ).length,
          avisos: (eventsData.convocatorias || []).filter((c: any) => 
            c.tipo_conv_comun?.tipo_conv_comun_titulo?.toLowerCase().includes('aviso')
          ).length,
          seminarios: todosCursos.filter((c: Curso) => 
            c.tipo_curso_otro?.tipo_conv_curso_nombre?.toLowerCase().includes('seminario')
          ).length,
          cursos: soloCursos.length,
          servicios: (eventsData.serviciosCarrera || []).length,
          ofertas: (eventsData.ofertasAcademicas || []).length,
          publicaciones: (resourcesData.upea_publicaciones || []).length,
          gacetas: (eventsData.upea_gaceta_universitaria || []).length,
          eventos: (eventsData.upea_evento || []).length,
          videos: (contentData.upea_videos || []).length,
          enlaces: (resourcesData.linksExternoInterno || []).length,
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarTodo();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Por definir';
    return new Date(dateString).toLocaleDateString('es-BO', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const categoriesData = [
    { name: 'Convocatorias', count: counts.convocatorias, href: '/convocatorias', icon: FileText },
    { name: 'Comunicados', count: counts.comunicados, href: '/comunicados', icon: FileText },
    { name: 'Avisos', count: counts.avisos, href: '/avisos', icon: FileText },
    { name: 'Seminarios', count: counts.seminarios, href: '/seminarios', icon: TrendingUp },
    { name: 'Cursos', count: counts.cursos, href: '/cursos', icon: Award },
    { name: 'Servicios', count: counts.servicios, href: '/servicios', icon: Briefcase },
    { name: 'Ofertas Académicas', count: counts.ofertas, href: '/ofertas', icon: Award },
    { name: 'Publicaciones', count: counts.publicaciones, href: '/publicaciones', icon: FileText },
    { name: 'Gaceta', count: counts.gacetas, href: '/gacetas', icon: FileText },
    { name: 'Eventos', count: counts.eventos, href: '/eventos', icon: Calendar },
    { name: 'Videos', count: counts.videos, href: '/videos', icon: TrendingUp },
    { name: 'Enlaces', count: counts.enlaces, href: '/enlaces', icon: ExternalLink },
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
            <Award className="w-7 h-7 animate-pulse" />
          </div>

          <div>
            <p className="text-slate-900 text-lg font-black">Cargando cursos</p>
            <p className="text-slate-500 text-sm">Preparando actividades académicas...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-white">
    
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-xl"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar imagen"
          >
            <X className="w-7 h-7 text-slate-900" />
          </button>

          <img 
            src={selectedImage} 
            alt="Vista ampliada" 
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/30"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
 
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
              Formación continua
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
              Académico
            </span>

            <div
              className="h-px w-20 sm:w-32"
              style={{
                background: `linear-gradient(90deg, ${colors.terciario}, transparent)`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          <div className="lg:col-span-3 space-y-8">
            
            {cursos.length === 0 ? (
              <div className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-16 text-center shadow-2xl shadow-slate-300/30">
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25"
                  style={{ backgroundColor: colors.primario }}
                />

                <Award
                  className="w-16 h-16 mx-auto mb-5 opacity-70"
                  style={{ color: colors.primario }}
                />

                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  No hay cursos disponibles
                </h3>

                <p className="text-slate-500">
                  Pronto publicaremos nuevos cursos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {cursos.map((curso, index) => (
                  <div 
                    key={curso.iddetalle_cursos_academicos}
                    className="group relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-5 transition-all duration-500 hover:-translate-y-3"
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

                    <div className="relative z-10 flex flex-col gap-5">
                      
                      <div 
                        className="relative h-56 overflow-hidden cursor-pointer rounded-[1.5rem] border bg-white shadow-xl group/image"
                        style={{
                          borderColor: `${colors.primario}22`,
                          boxShadow: `0 18px 40px rgba(15,23,42,0.12)`,
                        }}
                        onClick={() => curso.det_img_portada && setSelectedImage(curso.det_img_portada)}
                      >
                        {curso.det_img_portada ? (
                          <img 
                            src={curso.det_img_portada} 
                            alt={curso.det_titulo}
                            className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primario}18, ${colors.terciario}14)`,
                            }}
                          >
                            <Award
                              className="w-14 h-14 opacity-60"
                              style={{ color: colors.primario }}
                            />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

                        <span
                          className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full text-xs font-black text-white shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                            boxShadow: `0 12px 28px ${colors.primario}28`,
                          }}
                        >
                          {curso.tipo_curso_otro?.tipo_conv_curso_nombre || 'Curso'}
                        </span>
                      </div>
  
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 line-clamp-2 mb-3 leading-tight">
                          {curso.det_titulo}
                        </h3>

                        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-5">
                          {curso.det_descripcion}
                        </p>

                        <div className="space-y-3 pt-5 border-t border-slate-200/80">
                          {curso.det_fecha_ini && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span
                                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border"
                                style={{
                                  color: colors.secundario,
                                  borderColor: `${colors.secundario}30`,
                                }}
                              >
                                <Calendar className="w-4 h-4" />
                              </span>

                              <span>
                                <b className="text-slate-800">Inicio:</b> {formatDate(curso.det_fecha_ini)}
                              </span>
                            </div>
                          )}

                          {curso.det_lugar_curso && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span
                                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border"
                                style={{
                                  color: colors.terciario,
                                  borderColor: `${colors.terciario}30`,
                                }}
                              >
                                <MapPin className="w-4 h-4" />
                              </span>

                              <span>{curso.det_lugar_curso}</span>
                            </div>
                          )}

                          {curso.det_cupo_max && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <span
                                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border"
                                style={{
                                  color: colors.primario,
                                  borderColor: `${colors.primario}30`,
                                }}
                              >
                                <Users className="w-4 h-4" />
                              </span>

                              <span>
                                <b className="text-slate-800">Cupo:</b> {curso.det_cupo_max} personas
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                <Award className="w-10 h-10 mx-auto mb-3" style={{ color: colors.primario }} />

                <p className="text-sm text-slate-500 mb-3">
                  Revisa nuevos cursos y oportunidades de capacitación disponibles.
                </p>

                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-black text-sm transition-all hover:scale-105 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`,
                    boxShadow: `0 14px 28px ${colors.primario}25`,
                  }}
                >
                  Más información
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}