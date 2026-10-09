#!/usr/bin/env python3
"""Arma el .md del día con los DMs ya completos, listos para copiar y pegar.

    python3 jobsearch/espontaneas/dia.py            # 10 recruiters + 5 técnicos
    python3 jobsearch/espontaneas/dia.py --rec 15 --tec 0

Lee los contactos exportados de LinkedIn en contactos/ (ignorado por git, son
datos de terceros) y escribe contactos/dias/YYYY-MM-DD.md. Cada persona que sale
en un día queda anotada en contactos/usados.csv, así no se repite al día
siguiente. Nada se envía: el texto se copia y se manda a mano.
"""
import argparse
import csv
import datetime
import io
import re
from pathlib import Path

AQUI = Path(__file__).resolve().parent
CONTACTOS = AQUI / "contactos"
USADOS = CONTACTOS / "usados.csv"
PORTFOLIO = "https://balbianoluciano.github.io"

# Nunca: su empleador actual y quien ya está en una conversación abierta.
EXCLUIR_NOMBRES = {"alex brull"}
EMPRESAS_SIN_EMPRESA = re.compile(r"independiente|freelanc|self.?employed|^$", re.I)
NOMBRE_NO_HISPANO = re.compile(r"[žšćčđłřőűșț]|^[A-Z][a-z]+ [A-Z][a-z]+(sson|sen|ski|vić|ović)$", re.I)

# Técnicos elegidos a mano (founders y CTOs de producto o desarrollo). El resto
# de los 61 "técnicos" son founders de RRHH, marketing o coaching.
TECNICOS = [
    "Gabriel Martinez Corti", "tomas gonzalez", "Juan Manuel Ortiz",
    "Ezequiel Petruzzi", "Leandro Tula", "Marcos Alejandro Valle", "Nicolás Quiroga",
    "Emir Jussepp", "Juan Ignacio Iturriaga", "Matias Armani", "Rodrigo Presa",
    "Martin Cano", "Ana Fontana", "Danilo Maccari", "Ramiro Lacci",
    "Rafael G. Figueredo", "Juan P. Barrirero",
]
# Gancho propio cuando lo hay; si no, va el genérico.
GANCHO_TECNICO = {
    "Leandro Tula": "Vi que liderás backend en Mercado Libre: ¿están sumando gente al equipo, o te escribo más adelante?",
    "Marcos Alejandro Valle": "Vi que sos tech lead en Naranja X: ¿están sumando gente al equipo, o te escribo más adelante?",
}

REC_ES = """Hola {nombre}, ¿cómo estás? Una pregunta rápida: ¿en {empresa} están buscando perfiles senior full stack este trimestre, o te escribo más adelante?

Te cuento por qué: soy Luciano Balbiano, desarrollador full stack con 5 años en PHP, Laravel, Vue, React y TypeScript, e IA integrada en producción. Actualmente soy Team Leader en Invisible Geeks, lidero un equipo de tres y trabajo en remoto. Si encaja, te envío el CV. Portfolio: {portfolio}"""

REC_EN = """Hi {nombre}, quick question: is {empresa} hiring senior full stack developers this quarter, or should I reach out later?

Here's why I'm asking: I'm Luciano Balbiano, a full stack developer with 5 years in PHP, Laravel, Vue, React and TypeScript, with AI integrated in production. I'm Team Leader at Invisible Geeks, leading a team of three, and I work remotely. Happy to send my CV if it fits. Portfolio: {portfolio}"""

TEC_ES = """Hola {nombre}, ¿cómo estás? {gancho}

Soy Luciano Balbiano, desarrollador full stack con 5 años en PHP, Laravel, TypeScript, React y Vue. Lidero el equipo de desarrollo en Invisible Geeks y construí Gridwright, un plugin open source de Claude Code que convierte diseños de Figma en componentes verificados. Portfolio: {portfolio}"""


def leer_conexiones():
    lineas = (CONTACTOS / "Connections.csv").read_text(encoding="utf-8").split("\n")
    inicio = next(i for i, l in enumerate(lineas) if l.startswith("First Name"))
    return list(csv.DictReader(io.StringIO("\n".join(lineas[inicio:]))))


def leer_ya_hablaron():
    archivo = CONTACTOS / "messages.csv"
    if not archivo.exists():
        return set()
    nombres = set()
    for m in csv.DictReader(archivo.open(encoding="utf-8")):
        for k in ("FROM", "TO"):
            for n in (m.get(k) or "").split(","):
                nombres.add(n.strip().lower())
    return nombres


def leer_usados():
    if not USADOS.exists():
        return set()
    return {r["url"] for r in csv.DictReader(USADOS.open(encoding="utf-8"))}


# Consultoras y empresas que contratan desarrolladores: van primero.
PRIORIDAD = ["EPAM", "AgileEngine", "Bridgenext", "Ryz Labs", "Jobsity", "Hutrit", "Tsoft",
             "HUENEI", "WES", "Kantic", "Staffy", "WorkIT", "Tech City", "Techunting",
             "CONEXIONHR", "Globant", "Endava", "Avenga", "Truelogic", "BairesDev"]


def prioridad(c):
    empresa = (c["Company"] or "").lower()
    return next((i for i, p in enumerate(PRIORIDAD) if p.lower() in empresa), len(PRIORIDAD))


ES_RECRUITER = re.compile(r"recruit|talent|reclut|selecci|human resources|recursos humanos|\bhr\b|people|rrhh|headhunt|sourc|hiring|adquisic", re.I)


def armar_dia(fecha, conexiones, hablaron, usados, n_rec, n_tec):
    """Elige los contactos de un día, escribe su .md y devuelve los elegidos."""
    def disponible(c):
        nombre = f"{c['First Name']} {c['Last Name']}".strip()
        return (nombre.lower() not in EXCLUIR_NOMBRES
                and nombre.lower() not in hablaron
                and c["URL"] not in usados)

    # Recruiters: uno por empresa por día, solo los que tienen empresa nombrable.
    recs, empresas_hoy = [], set()
    for c in sorted(conexiones, key=prioridad):
        if len(recs) >= n_rec:
            break
        empresa = (c["Company"] or "").strip()
        if not ES_RECRUITER.search(c["Position"] or "") or EMPRESAS_SIN_EMPRESA.search(empresa):
            continue
        if empresa.lower() in empresas_hoy or not disponible(c):
            continue
        empresas_hoy.add(empresa.lower())
        recs.append(c)

    tecs = []
    for nombre in TECNICOS:
        if len(tecs) >= n_tec:
            break
        c = next((c for c in conexiones if f"{c['First Name']} {c['Last Name']}".strip().startswith(nombre)), None)
        if c and disponible(c):
            tecs.append(c)

    if not recs and not tecs:
        return [], []

    salida = [f"# DMs del {fecha} — {len(recs) + len(tecs)} mensajes", "",
              "Copiá el texto de cada bloque y pegalo en el chat de LinkedIn de esa persona.",
              "Cada DM suma 1 en la fila **DMs a recruiters** del contador.", ""]
    n = 0
    for c in recs:
        n += 1
        nombre, empresa = c["First Name"].strip(), c["Company"].strip()
        plantilla = REC_EN if NOMBRE_NO_HISPANO.search(f"{c['First Name']} {c['Last Name']}") else REC_ES
        texto = plantilla.format(nombre=nombre, empresa=empresa, portfolio=PORTFOLIO)
        salida += [f"## {n}. {c['First Name']} {c['Last Name']} · {empresa} · {c['Position']}",
                   c["URL"], "", texto, "", "---", ""]
    for c in tecs:
        n += 1
        completo = f"{c['First Name']} {c['Last Name']}".strip()
        empresa = c["Company"].strip()
        gancho = next((g for k, g in GANCHO_TECNICO.items() if completo.startswith(k)),
                      f"Una pregunta rápida: ¿en {empresa} están sumando gente al equipo técnico este trimestre, o te escribo más adelante?")
        texto = TEC_ES.format(nombre=c["First Name"].strip().capitalize(), gancho=gancho, portfolio=PORTFOLIO)
        salida += [f"## {n}. {completo} · {empresa} · {c['Position']}", c["URL"], "", texto, "", "---", ""]

    (CONTACTOS / "dias").mkdir(exist_ok=True)
    (CONTACTOS / "dias" / f"{fecha}.md").write_text("\n".join(salida), encoding="utf-8")
    for c in recs + tecs:
        usados.add(c["URL"])

    nuevo = not USADOS.exists()
    with USADOS.open("a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if nuevo:
            w.writerow(["fecha", "nombre", "empresa", "url", "tipo"])
        for c in recs:
            w.writerow([fecha, f"{c['First Name']} {c['Last Name']}", c["Company"], c["URL"], "recruiter"])
        for c in tecs:
            w.writerow([fecha, f"{c['First Name']} {c['Last Name']}", c["Company"], c["URL"], "tecnico"])
    return recs, tecs


def dias_habiles(desde, cantidad):
    d, out = desde, []
    while len(out) < cantidad:
        if d.weekday() < 5:
            out.append(d)
        d += datetime.timedelta(days=1)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rec", type=int, default=10)
    ap.add_argument("--tec", type=int, default=5)
    ap.add_argument("--dias", type=int, default=1, help="cuántos días hábiles generar desde hoy")
    args = ap.parse_args()

    conexiones = leer_conexiones()
    hablaron = leer_ya_hablaron()
    usados = leer_usados()

    total = 0
    for fecha in dias_habiles(datetime.date.today(), args.dias):
        recs, tecs = armar_dia(fecha.isoformat(), conexiones, hablaron, usados, args.rec, args.tec)
        if not recs and not tecs:
            print(f"{fecha}: no quedan contactos, se corta acá")
            break
        total += 1
        print(f"{fecha}: {len(recs)} recruiters + {len(tecs)} técnicos")
    print(f"{total} días generados en {CONTACTOS / 'dias'}")


if __name__ == "__main__":
    main()
