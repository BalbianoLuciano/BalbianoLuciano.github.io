// Contador de solicitudes del PLAN-100. Una ventana chica, siempre arriba, con los
// seis canales del plan y un + y un - por canal. Guarda un JSON por dia en esta
// misma carpeta (jobsearch/contador/dias/YYYY-MM-DD.json): eso es lo que se mide
// los viernes. Al cambiar el dia, arranca de cero solo.
//
// Compilar: ./build.sh   (genera Contador.app al lado)

import SwiftUI
import AppKit

// MARK: - Datos

struct Canal: Identifiable, Codable {
    let id: String
    let nombre: String
    let meta: Int
    var hecho: Int = 0
}

let CANALES_BASE: [Canal] = [
    Canal(id: "easy",   nombre: "LinkedIn (sencilla + solicitar)", meta: 40),   // 32 Easy Apply es el techo diario
    Canal(id: "info",   nombre: "InfoJobs",            meta: 15),
    Canal(id: "portal", nombre: "Otros portales",      meta: 12),
    Canal(id: "feed",   nombre: "Avisos con /aplicar", meta: 18),
    Canal(id: "mail",   nombre: "Espontáneas por mail", meta: 10),
    Canal(id: "dm",     nombre: "DMs a recruiters",    meta: 15),
]

let META_DIA = 100

struct Dia: Codable {
    var fecha: String
    var canales: [Canal]
    var total: Int { canales.reduce(0) { $0 + $1.hecho } }
}

@MainActor
final class Estado: ObservableObject {
    @Published var dia: Dia
    private var reloj: Timer?

    static let carpeta: URL = {
        // La carpeta donde vive el .app: jobsearch/contador/. Los dias van en dias/.
        let app = Bundle.main.bundleURL.deletingLastPathComponent()
        let url = app.appendingPathComponent("dias", isDirectory: true)
        try? FileManager.default.createDirectory(at: url, withIntermediateDirectories: true)
        return url
    }()

    static func hoy() -> String {
        let f = DateFormatter(); f.dateFormat = "yyyy-MM-dd"; f.locale = Locale(identifier: "es_AR")
        return f.string(from: Date())
    }

    init() {
        dia = Estado.cargar(Estado.hoy())
        guardar()   // el dia existe en disco desde que se abre, aunque quede en cero
        // Cada minuto mira si cambio el dia. Si cambio, guarda el viejo y arranca uno nuevo.
        reloj = Timer.scheduledTimer(withTimeInterval: 60, repeats: true) { [weak self] _ in
            Task { @MainActor in self?.cambioDeDia() }
        }
    }

    static func cargar(_ fecha: String) -> Dia {
        let url = carpeta.appendingPathComponent("\(fecha).json")
        if let d = try? Data(contentsOf: url), let dia = try? JSONDecoder().decode(Dia.self, from: d) {
            // Si el plan cambio de canales, se respetan los conteos de los que siguen.
            let hechos = Dictionary(uniqueKeysWithValues: dia.canales.map { ($0.id, $0.hecho) })
            var canales = CANALES_BASE
            for i in canales.indices { canales[i].hecho = hechos[canales[i].id] ?? 0 }
            return Dia(fecha: fecha, canales: canales)
        }
        return Dia(fecha: fecha, canales: CANALES_BASE)
    }

    func guardar() {
        let url = Estado.carpeta.appendingPathComponent("\(dia.fecha).json")
        let enc = JSONEncoder(); enc.outputFormatting = [.prettyPrinted, .sortedKeys]
        if let d = try? enc.encode(dia) { try? d.write(to: url, options: .atomic) }
    }

    func cambioDeDia() {
        let hoy = Estado.hoy()
        guard hoy != dia.fecha else { return }
        guardar()
        dia = Estado.cargar(hoy)
    }

    func sumar(_ id: String, _ delta: Int) {
        guard let i = dia.canales.firstIndex(where: { $0.id == id }) else { return }
        dia.canales[i].hecho = max(0, dia.canales[i].hecho + delta)
        guardar()
    }
}

// MARK: - Vista

// Paleta del manual de marca: hormigon, sombra, vacio, baranda.
extension Color {
    static let hormigon = Color(red: 0.659, green: 0.643, blue: 0.608)
    static let luz      = Color(red: 0.776, green: 0.761, blue: 0.722)
    static let sombra   = Color(red: 0.333, green: 0.322, blue: 0.298)
    static let vacio    = Color(red: 0.082, green: 0.075, blue: 0.059)
    static let baranda  = Color(red: 0.184, green: 0.333, blue: 0.408)
}

struct Fila: View {
    let canal: Canal
    let sumar: (Int) -> Void

    var cumplido: Bool { canal.hecho >= canal.meta }

    var body: some View {
        HStack(spacing: 10) {
            VStack(alignment: .leading, spacing: 2) {
                Text(canal.nombre)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundStyle(Color.vacio)
                GeometryReader { g in
                    ZStack(alignment: .leading) {
                        Rectangle().fill(Color.sombra.opacity(0.18))
                        Rectangle()
                            .fill(cumplido ? Color.baranda : Color.vacio)
                            .frame(width: g.size.width * min(1, Double(canal.hecho) / Double(canal.meta)))
                    }
                }
                .frame(height: 3)
            }
            Text("\(canal.hecho)")
                .font(.system(size: 20, weight: .bold, design: .monospaced))
                .foregroundStyle(cumplido ? Color.baranda : Color.vacio)
                .frame(width: 34, alignment: .trailing)
            Text("/ \(canal.meta)")
                .font(.system(size: 11, design: .monospaced))
                .foregroundStyle(Color.sombra)
                .frame(width: 30, alignment: .leading)
            Boton("−") { sumar(-1) }
            Boton("+") { sumar(+1) }
        }
        .padding(.vertical, 6)
    }
}

struct Boton: View {
    let texto: String
    let accion: () -> Void
    init(_ texto: String, accion: @escaping () -> Void) { self.texto = texto; self.accion = accion }
    var body: some View {
        Button(action: accion) {
            Text(texto)
                .font(.system(size: 16, weight: .bold, design: .monospaced))
                .foregroundStyle(Color.vacio)
                .frame(width: 28, height: 26)
                .background(Color.luz)
                .overlay(Rectangle().stroke(Color.vacio, lineWidth: 1))
        }
        .buttonStyle(.plain)
    }
}

struct Contenido: View {
    @EnvironmentObject var estado: Estado

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .firstTextBaseline) {
                Text("PLAN 100")
                    .font(.system(size: 11, weight: .medium, design: .monospaced))
                    .tracking(2)
                    .foregroundStyle(Color.sombra)
                Spacer()
                Text(estado.dia.fecha)
                    .font(.system(size: 11, design: .monospaced))
                    .foregroundStyle(Color.sombra)
            }
            .padding(.bottom, 8)

            HStack(alignment: .firstTextBaseline, spacing: 6) {
                Text("\(estado.dia.total)")
                    .font(.system(size: 44, weight: .bold, design: .monospaced))
                    .foregroundStyle(estado.dia.total >= META_DIA ? Color.baranda : Color.vacio)
                Text("/ \(META_DIA)")
                    .font(.system(size: 16, design: .monospaced))
                    .foregroundStyle(Color.sombra)
                Spacer()
                Text(estado.dia.total >= META_DIA ? "cumplido" : "faltan \(META_DIA - estado.dia.total)")
                    .font(.system(size: 11, design: .monospaced))
                    .foregroundStyle(Color.sombra)
            }

            Rectangle().fill(Color.vacio).frame(height: 1).padding(.vertical, 8)

            ForEach(estado.dia.canales) { canal in
                Fila(canal: canal) { delta in estado.sumar(canal.id, delta) }
                if canal.id != estado.dia.canales.last?.id {
                    Rectangle().fill(Color.sombra.opacity(0.18)).frame(height: 1)
                }
            }
        }
        .padding(16)
        .frame(width: 360)
        .background(Color.hormigon)
    }
}

// MARK: - App

final class Delegado: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ n: Notification) {
        NSApp.setActivationPolicy(.regular)
        NSApp.activate(ignoringOtherApps: true)
        // Ventana chica, siempre arriba, sin agrandar.
        for w in NSApp.windows {
            w.level = .floating
            w.styleMask.remove(.resizable)
            w.titlebarAppearsTransparent = true
            w.titleVisibility = .hidden
            w.backgroundColor = NSColor(red: 0.659, green: 0.643, blue: 0.608, alpha: 1)
            w.isMovableByWindowBackground = true
        }
    }
    func applicationShouldTerminateAfterLastWindowClosed(_ s: NSApplication) -> Bool { true }
}

@main
struct ContadorApp: App {
    @NSApplicationDelegateAdaptor(Delegado.self) var delegado
    @StateObject private var estado = Estado()

    var body: some Scene {
        WindowGroup("Contador") {
            Contenido().environmentObject(estado)
        }
        .windowResizability(.contentSize)
        .defaultPosition(.topTrailing)
    }
}
