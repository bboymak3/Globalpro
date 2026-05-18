#!/usr/bin/env python3
"""
Agrega la sección modal 'Cambio de Aceite en [Comuna]' a todas las comunas
(excepto padre-hurtado que ya la tiene).
La sección se inserta dentro del div seo-text, después del último párrafo SEO
y antes del cierre del div.
"""

import os
import re
import glob

COMUNAS_DIR = "/home/z/my-project/Globalpro/comunas"

# Mapeo de slug -> nombre display para la comuna
COMUNA_NAMES = {
    "alhue": "Alhué",
    "buin": "Buín",
    "calera-de-tango": "Calera de Tango",
    "cerrillos": "Cerrillos",
    "cerro-navia": "Cerro Navia",
    "colina": "Colina",
    "conchali": "Conchalí",
    "curacavi": "Curacaví",
    "el-bosque": "El Bosque",
    "el-monte": "El Monte",
    "estacion-central": "Estación Central",
    "huechuraba": "Huechuraba",
    "independencia": "Independencia",
    "isla-de-maipo": "Isla de Maipo",
    "la-cisterna": "La Cisterna",
    "la-florida": "La Florida",
    "la-granja": "La Granja",
    "la-pintana": "La Pintana",
    "la-reina": "La Reina",
    "lampa": "Lampa",
    "las-condes": "Las Condes",
    "lo-barnechea": "Lo Barnechea",
    "lo-espejo": "Lo Espejo",
    "lo-prado": "Lo Prado",
    "macul": "Macul",
    "maipu": "Maipú",
    "maria-pinto": "María Pinto",
    "melipilla": "Melipilla",
    "nunoa": "Ñuñoa",
    "padre-hurtado": "Padre Hurtado",
    "paine": "Paine",
    "pedro-aguirre-cerda": "Pedro Aguirre Cerda",
    "penaflor": "Peñaflor",
    "penalolen": "Peñalolén",
    "pirque": "Pirque",
    "providencia": "Providencia",
    "pudahuel": "Pudahuel",
    "puente-alto": "Puente Alto",
    "quilicura": "Quilicura",
    "quinta-normal": "Quinta Normal",
    "recoleta": "Recoleta",
    "renca": "Renca",
    "san-bernardo": "San Bernardo",
    "san-joaquin": "San Joaquín",
    "san-jose-de-maipo": "San José de Maipo",
    "san-miguel": "San Miguel",
    "san-pedro": "San Pedro",
    "san-ramon": "San Ramón",
    "santiago": "Santiago",
    "talagante": "Talagante",
    "tiltil": "Tiltil",
    "vitacura": "Vitacura",
}

def generate_modal_section(comuna_name, slug):
    """Genera el HTML de la sección modal para una comuna específica."""
    # WhatsApp text: usa el slug sin guiones para el texto
    wa_comuna = comuna_name.replace(" ", "%20")
    return f'''
        <!-- ===== CAMBIO DE ACEITE - SECCIÓN DESTACADA MODAL ===== -->
        <div style="margin: 50px 0; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 50px rgba(168,0,0,0.4), 0 0 0 3px #a80000; position: relative; background: linear-gradient(135deg, #1a0000 0%, #121212 40%, #2a0000 100%);">
          <!-- Barra superior roja animada -->
          <div style="background: linear-gradient(90deg, #a80000, #ff1a1a, #a80000); padding: 6px 0; text-align: center; animation: shimmerBar 3s ease-in-out infinite;">
            <span style="color: #fff; font-weight: 800; font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase;"><i class="fas fa-fire"></i> Servicio Más Buscado <i class="fas fa-fire"></i></span>
          </div>
          <!-- Contenido principal -->
          <div style="padding: 40px 30px; text-align: center; position: relative;">
            <!-- Iconos decorativos flotantes -->
            <div style="position: absolute; top: 15px; left: 25px; opacity: 0.15; font-size: 3rem; color: #a80000;"><i class="fas fa-oil-can"></i></div>
            <div style="position: absolute; top: 15px; right: 25px; opacity: 0.15; font-size: 3rem; color: #a80000;"><i class="fas fa-tools"></i></div>
            <div style="position: absolute; bottom: 15px; left: 25px; opacity: 0.1; font-size: 2.5rem; color: #ff1a1a;"><i class="fas fa-car"></i></div>
            <div style="position: absolute; bottom: 15px; right: 25px; opacity: 0.1; font-size: 2.5rem; color: #ff1a1a;"><i class="fas fa-cog"></i></div>

            <!-- Icono central grande -->
            <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #a80000, #ff1a1a); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; box-shadow: 0 0 40px rgba(168,0,0,0.6), 0 0 80px rgba(168,0,0,0.2); animation: pulseIcon 2.5s ease-in-out infinite;">
              <i class="fas fa-oil-can" style="font-size: 2.8rem; color: #fff;"></i>
            </div>

            <!-- H2 enorme estilo H1 -->
            <h2 style="font-size: 3rem; font-weight: 900; text-transform: uppercase; color: #fff; letter-spacing: 2px; margin-bottom: 8px; line-height: 1.15; text-shadow: 0 0 30px rgba(168,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.8);">
              <i class="fas fa-oil-can" style="color: #ff1a1a; font-size: 2.5rem; margin-right: 10px;"></i>
              Cambio de Aceite
              <i class="fas fa-oil-can" style="color: #ff1a1a; font-size: 2.5rem; margin-left: 10px;"></i>
            </h2>
            <h2 style="font-size: 2.2rem; font-weight: 800; text-transform: uppercase; color: #ff1a1a; letter-spacing: 4px; margin-bottom: 25px; text-shadow: 0 0 20px rgba(255,26,26,0.4);">
              en {comuna_name}
            </h2>

            <!-- Separador decorativo -->
            <div style="width: 120px; height: 4px; background: linear-gradient(90deg, transparent, #a80000, transparent); margin: 0 auto 25px; border-radius: 2px;"></div>

            <!-- Texto descriptivo con estilo -->
            <p style="font-size: 1.25rem; line-height: 1.9; color: #e0e0e0; max-width: 800px; margin: 0 auto 30px; font-weight: 500;">
              Si buscas <strong style="color: #ff1a1a; font-size: 1.35rem; text-shadow: 0 0 10px rgba(255,26,26,0.3);">cambio de aceite cerca mio</strong> en {comuna_name}, <strong style="color: #fff;">GlobalPro</strong> es tu mejor opción. Nuestro servicio a domicilio incluye aceite sintético y semi-sintético de primera calidad, reemplazo de filtro y revisión completa de niveles. Sin filas, sin taller: vamos a tu casa u oficina con todo el equipamiento. Agenda en minutos por WhatsApp y mantiene tu motor protegido.
            </p>

            <!-- Badges de beneficios -->
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 30px;">
              <span style="background: rgba(168,0,0,0.25); border: 1px solid #a80000; color: #ff6666; padding: 8px 18px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;"><i class="fas fa-home"></i> A Domicilio</span>
              <span style="background: rgba(168,0,0,0.25); border: 1px solid #a80000; color: #ff6666; padding: 8px 18px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;"><i class="fas fa-tint"></i> Sintético Premium</span>
              <span style="background: rgba(168,0,0,0.25); border: 1px solid #a80000; color: #ff6666; padding: 8px 18px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;"><i class="fas fa-filter"></i> Filtro Incluido</span>
              <span style="background: rgba(168,0,0,0.25); border: 1px solid #a80000; color: #ff6666; padding: 8px 18px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;"><i class="fas fa-clock"></i> Agenda Rápido</span>
            </div>

            <!-- Botón CTA grande -->
            <a href="https://wa.me/56939026185?text=Hola%20necesito%20un%20cambio%20de%20aceite%20a%20domicilio%20en%20{wa_comuna}" target="_blank" style="display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #25D366, #128c7e); color: #fff; font-size: 1.3rem; font-weight: 800; padding: 18px 45px; border-radius: 60px; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 8px 30px rgba(37,211,102,0.4); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-3px) scale(1.03)';this.style.boxShadow='0 12px 40px rgba(37,211,102,0.5)'" onmouseout="this.style.transform='translateY(0) scale(1)';this.style.boxShadow='0 8px 30px rgba(37,211,102,0.4)'">
              <i class="fab fa-whatsapp" style="font-size: 1.6rem;"></i>
              Agenda Tu Cambio de Aceite Ya
            </a>
          </div>
        </div>
        <!-- ===== FIN SECCIÓN CAMBIO DE ACEITE ===== -->'''


def process_comuna(filepath, slug, comuna_name):
    """Procesa un archivo de comuna y agrega la sección modal."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip padre-hurtado (ya tiene la sección modal)
    if "SECCIÓN DESTACADA MODAL" in content:
        print(f"  SKIP: {slug} (ya tiene sección modal)")
        return False

    # Verificar que tiene la sección seo-text
    if 'class="seo-text"' not in content:
        print(f"  SKIP: {slug} (no tiene sección seo-text)")
        return False

    # Buscar el cierre del div seo-text: el patrón es </div> seguido de los closes
    # Buscamos el último </p> dentro de seo-text y luego el </div> que cierra seo-text
    # Patrón: después del último párrafo del SEO, antes del cierre de seo-text

    # Estrategia: buscar el patrón de cierre de la sección SEO
    # En la mayoría de los archivos el patrón es:
    # </p>\n\n        </div>\n      </div>\n    </div>\n  </div>\n</section>

    # Vamos a insertar justo antes del cierre del div seo-text
    # Buscamos el patrón donde se cierra la sección seo-text

    # Patrón flexible: busca el cierre del seo-text div
    # El seo-text div se cierra con "        </div>" (8 espacios) seguido de más cierres

    # Mejor estrategia: buscar el patrón específico de cierre de seo-section
    # que es: </div>\n      </div>\n    </div>\n  </div>\n</section>\n

    # Vamos a insertar el modal ANTES del cierre del div seo-text
    # Buscamos: último </p> dentro de seo-text, y antes del </div> que cierra seo-text

    # Buscamos el final del contenido seo-text
    # El patrón típico es:
    # [último párrafo]</p>\n\n        </div>   <-- cierra seo-text
    #      </div>    <-- cierra col-lg-12
    #    </div>      <-- cierra row
    #  </div>        <-- cierra container
    # </section>     <-- cierra seo-section

    modal = generate_modal_section(comuna_name, slug)

    # Buscamos el cierre de la sección SEO
    # Patrón: después del contenido seo, viene el cierre de divs
    # Insertamos el modal dentro del div seo-text, antes de su cierre

    # Buscamos el punto de inserción: justo antes del primer </div> que sigue al último <p> dentro de seo-text
    # El patrón es: </p>\n\n        </div>\n      </div>

    # Intentamos encontrar el cierre de seo-text
    # Buscamos desde el final del seo-text div

    pattern = r'(class="seo-text">.*?)(</p>\s*</div>\s*</div>\s*</div>\s*</div>\s*</section>)'

    match = re.search(pattern, content, re.DOTALL)
    if match:
        # Insertamos el modal dentro del seo-text div, antes de su cierre
        # Específicamente, reemplazamos el cierre para agregar el modal antes del </div> de seo-text
        before = content[:match.start(2)]
        after = match.group(2)
        new_content = before + "</p>\n\n" + modal + "\n\n        </div>\n      </div>\n    </div>\n  </div>\n</section>"

        # Pero necesitamos ser más preciso. Vamos a reemplazar solo la parte final
        # Buscamos el último </p> antes del cierre de seo-text
        # y agregamos el modal después de ese </p>
        pass

    # Estrategia más simple: buscar el patrón de cierre exacto
    # Después del contenido SEO, el patrón es:
    # </p>\n\n        </div>\n      </div>\n    </div>\n  </div>\n</section>

    # Vamos a insertar el modal entre el </p> final y el cierre del div seo-text

    # Buscamos el patrón: fin de párrafo SEO + cierre de divs + cierre de sección
    # Los patrones varían ligeramente entre archivos, así que usamos regex flexible

    # Patrón 1: El seo-text se cierra con espaciado de 8 espacios
    closing_pattern = re.compile(
        r'(</p>)\s*(</div>\s*</div>\s*</div>\s*</div>\s*</section>)',
        re.DOTALL
    )

    match = closing_pattern.search(content)
    if not match:
        # Patrón alternativo con diferente espaciado
        closing_pattern2 = re.compile(
            r'(</p>)\s*(</div>\s*</div>\s*</div>\s*</section>)',
            re.DOTALL
        )
        match = closing_pattern2.search(content)
        if not match:
            print(f"  ERROR: {slug} - no se encontró patrón de cierre SEO")
            return False

    # Insertamos el modal después del último </p> dentro de seo-text
    insert_pos = match.start(2)
    new_content = content[:insert_pos] + "\n\n" + modal + "\n\n" + content[insert_pos:]

    # También necesitamos agregar la animación CSS shimmerBar si no existe
    if "shimmerBar" not in content:
        # Buscamos la etiqueta </style> y agregamos antes
        style_addition = "@keyframes shimmerBar { 0%,100%{background:linear-gradient(90deg,#a80000,#ff1a1a,#a80000)} 50%{background:linear-gradient(90deg,#ff1a1a,#a80000,#ff1a1a)} }\n@keyframes pulseIcon { 0%,100%{box-shadow:0 0 40px rgba(168,0,0,0.6),0 0 80px rgba(168,0,0,0.2);transform:scale(1)} 50%{box-shadow:0 0 60px rgba(168,0,0,0.8),0 0 120px rgba(168,0,0,0.3);transform:scale(1.05)} }\n"
        # Insertamos antes del </style> que cierra el bloque CSS del head
        # Buscamos el último </style>
        last_style_pos = new_content.rfind("</style>")
        if last_style_pos > 0:
            new_content = new_content[:last_style_pos] + style_addition + new_content[last_style_pos:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"  OK: {slug} - sección modal agregada")
    return True


def main():
    files = sorted(glob.glob(os.path.join(COMUNAS_DIR, "*.html")))
    print(f"Procesando {len(files)} archivos de comunas...")

    success = 0
    skipped = 0
    errors = 0

    for filepath in files:
        slug = os.path.splitext(os.path.basename(filepath))[0]
        comuna_name = COMUNA_NAMES.get(slug, slug.replace("-", " ").title())

        result = process_comuna(filepath, slug, comuna_name)
        if result is True:
            success += 1
        elif result is False and "SKIP" in str(result):
            skipped += 1
        else:
            # Check the actual skip reason from print
            pass

    # Re-count
    print(f"\nProcesamiento completado.")
    print(f"  Archivos modificados: revisar output arriba")


if __name__ == "__main__":
    main()
