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
  Loader2
} from 'lucide-react';
import { api } from '@/lib/api';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PageHero from '@/components/page-hero';

export default function ContactoPage() {
  const [institucion, setInstitucion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [colors, setColors] = useState({ 
    primario: '#10b981', 
    secundario: '#f59e0b', 
    terciario: '#06b6d4' 
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        const instData = await api.institution.getCurrentPrincipal();
        
        setInstitucion(instData);
        
        if (instData.colorinstitucion?.[0]) {
          const c = instData.colorinstitucion[0];

          setColors({
            primario: c.color_primario,
            secundario: c.color_secundario,
            terciario: c.color_terciario
          });
        }
      } catch (error) {
        console.error('Error cargando contacto:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
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
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>

          <div>
            <p className="text-slate-900 text-lg font-black">
              Cargando información de contacto
            </p>
            <p className="text-slate-500 text-sm">
              Preparando datos institucionales...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="Contáctanos"
        breadcrumb="Contacto"
        colors={colors}
      />
 
      {/* CONTENIDO */}
      <section className="py-24 px-4 relative overflow-hidden bg-white">
        {/* FONDO CLARO CON COLORES DEL SERVICIO */}
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
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
                  Información de Contacto
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  Encuentra nuestros canales oficiales de atención y comunicación.
                </p>
              </div>
        
              {institucion?.institucion_direccion && (
                <ContactCard 
                  icon={MapPin} 
                  title="Nuestra Dirección" 
                  value={institucion.institucion_direccion} 
                  color={colors.primario} 
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {institucion?.institucion_telefono1 && (
                  <ContactCard 
                    icon={Phone} 
                    title="Teléfono" 
                    value={String(institucion.institucion_telefono1).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')} 
                    color={colors.secundario}
                    href={`tel:${institucion.institucion_telefono1}`}
                  />
                )}

                {institucion?.institucion_celular1 && (
                  <ContactCard 
                    icon={Phone} 
                    title="Celular / WhatsApp" 
                    value={String(institucion.institucion_celular1).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')} 
                    color={colors.secundario}
                    href={`tel:${institucion.institucion_celular1}`}
                  />
                )}
              </div>
 
              {(institucion?.institucion_correo1 || institucion?.institucion_correo2) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {institucion.institucion_correo1 && (
                    <ContactCard 
                      icon={Mail} 
                      title="Correo Principal" 
                      value={institucion.institucion_correo1} 
                      color={colors.terciario}
                      href={`mailto:${institucion.institucion_correo1}`}
                    />
                  )}

                  {institucion.institucion_correo2 && (
                    <ContactCard 
                      icon={Mail} 
                      title="Correo Secundario" 
                      value={institucion.institucion_correo2} 
                      color={colors.terciario}
                      href={`mailto:${institucion.institucion_correo2}`}
                    />
                  )}
                </div>
              )}
 
              <div
                className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-6"
                style={{
                  borderColor: `${colors.primario}28`,
                  boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                }}
              >
                <div
                  className="absolute -top-20 -right-20 h-52 w-52 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: colors.primario }}
                />

                <div className="relative z-10">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-slate-900">
                    <Send className="w-5 h-5" style={{ color: colors.primario }} />
                    Síguenos en redes
                  </h3>

                  <div className="flex gap-4 flex-wrap">
                    {institucion?.institucion_facebook && (
                      <SocialIcon icon={Facebook} url={institucion.institucion_facebook} color={colors.primario} />
                    )}

                    {institucion?.institucion_youtube && (
                      <SocialIcon icon={Youtube} url={institucion.institucion_youtube} color="#FF0000" />
                    )}

                    {institucion?.institucion_twitter && (
                      <SocialIcon icon={Twitter} url={institucion.institucion_twitter} color={colors.terciario} />
                    )}
                  </div>
                </div>
              </div>
 
              <div
                className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-6 flex items-center gap-4"
                style={{
                  borderColor: `${colors.secundario}28`,
                  boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${colors.secundario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white border shrink-0"
                  style={{
                    color: colors.secundario,
                    borderColor: `${colors.secundario}30`,
                    boxShadow: `0 14px 32px ${colors.secundario}18`,
                  }}
                >
                  <Clock className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-black text-slate-900">
                    Horario de Atención
                  </h4>
                  <p className="text-sm text-slate-500">
                    Lunes a Viernes: 08:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
 
            <div className="h-full min-h-[500px] flex flex-col gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
                  Ubicación
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  Visítanos en nuestra dirección institucional.
                </p>
              </div>
              
              <div
                className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-2 flex-1 shadow-2xl"
                style={{
                  borderColor: `${colors.primario}28`,
                  boxShadow: `0 24px 70px rgba(15,23,42,0.12), 0 18px 45px ${colors.primario}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
                }}
              >
                {institucion?.institucion_api_google_map ? (
                  <iframe
                    src={institucion.institucion_api_google_map}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '450px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-[1.5rem]"
                  />
                ) : (
                  <div
                    className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-10 rounded-[1.5rem]"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primario}18, ${colors.terciario}14)`,
                    }}
                  >
                    <MapPin
                      className="w-16 h-16 mb-4 opacity-70"
                      style={{ color: colors.primario }}
                    />
                    <p className="text-slate-700 text-lg font-black mb-4">
                      No hay mapa disponible
                    </p>
                    <p className="text-slate-500">
                      {institucion?.institucion_direccion}
                    </p>
                  </div>
                )}
              </div>
      
              {institucion?.institucion_direccion && (
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(institucion.institucion_direccion)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl font-black text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primario}, ${colors.terciario})`, 
                    boxShadow: `0 16px 35px ${colors.primario}28`,
                  }}
                >
                  <Navigation className="w-5 h-5" /> 
                  Cómo llegar desde Google Maps
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactCard({ icon: Icon, title, value, color, href }: any) {
  const content = (
    <div
      className="relative overflow-hidden rounded-[2rem] border bg-white/78 backdrop-blur-xl p-6 flex items-start gap-4 group hover:-translate-y-1 transition-all duration-300"
      style={{
        borderColor: `${color}28`,
        boxShadow: `0 24px 70px rgba(15,23,42,0.10), 0 18px 45px ${color}12, inset 0 1px 0 rgba(255,255,255,0.90)`,
      }}
    >
      <div
        className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div
        className="relative z-10 p-3 rounded-2xl shrink-0 border bg-white"
        style={{
          color,
          borderColor: `${color}30`,
          boxShadow: `0 14px 32px ${color}18`,
        }}
      >
        <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400 mb-1">
          {title}
        </h3>

        <p className="text-base md:text-lg text-slate-900 font-black truncate" title={String(value)}>
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : content;
}

function SocialIcon({ icon: Icon, url, color }: { icon: any; url: string; color: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-2xl border bg-white/80 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
      style={{ 
        borderColor: `${color}35`, 
        color,
        boxShadow: `0 12px 28px ${color}18`,
      }}
      aria-label="Red social"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}