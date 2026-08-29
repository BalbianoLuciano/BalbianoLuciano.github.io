import React from 'react';

/**
 * Un hueco dentro del parrafo de contacto.
 *
 * El ancho lo maneja el atributo `size` (en caracteres) y no CSS: es la unica
 * forma que funciona en todos los browsers sin medir texto a mano ni depender
 * de `field-sizing: content`, que Safari todavia no soporta.
 */
const BlankField = ({ id, label, value, onChange, type = 'text', min = 8, max = 32 }) => (
  <>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      autoComplete="off"
      size={Math.min(Math.max(value.length || label.length, min), max)}
      className="mx-1 border-b border-white/30 bg-transparent pb-0.5 text-center text-white placeholder:text-white/30 focus:border-white focus:outline-none"
    />
  </>
);

export default BlankField;
