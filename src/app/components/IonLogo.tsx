/**
 * Логотип ИОН Студия — стилизованный ион/атом: ядро и орбита с электроном.
 * Ассоциация с зарядом, энергией и технологией.
 */
export function IonLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Ядро (центр) */}
      <circle cx="12" cy="12" r="2.25" fill="currentColor" />
      {/* Орбита и электрон в одной группе */}
      <g transform="rotate(-22 12 12)">
        <ellipse
          cx="12"
          cy="12"
          rx="7.5"
          ry="4.5"
          stroke="currentColor"
          strokeWidth="1.25"
          fill="none"
        />
        {/* Электрон на орбите (правая точка эллипса) */}
        <circle cx="19.5" cy="12" r="1.5" fill="currentColor" />
      </g>
    </svg>
  );
}
