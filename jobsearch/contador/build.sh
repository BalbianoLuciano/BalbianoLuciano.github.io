#!/bin/sh
# Compila Contador.swift en un .app nativo, sin Xcode: alcanza con las Command Line Tools.
#   ./build.sh          compila
#   open Contador.app   abre
set -e
cd "$(dirname "$0")"

APP=Contador.app
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS"

swiftc -O -parse-as-library -target arm64-apple-macosx14.0 \
  -framework SwiftUI -framework AppKit \
  -o "$APP/Contents/MacOS/Contador" Contador.swift

cat > "$APP/Contents/Info.plist" <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleName</key><string>Contador</string>
  <key>CFBundleDisplayName</key><string>Contador</string>
  <key>CFBundleIdentifier</key><string>ar.com.dmeter.contador100</string>
  <key>CFBundleExecutable</key><string>Contador</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>1.0</string>
  <key>LSMinimumSystemVersion</key><string>14.0</string>
  <key>NSHighResolutionCapable</key><true/>
</dict></plist>
EOF

codesign --force --sign - "$APP" >/dev/null 2>&1 || true
echo "listo: $APP"
