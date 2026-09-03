import { useSound } from "../sound/SoundProvider";

export function SoundToggle() {
  const { enabled, toggleEnabled, play } = useSound();

  return (
    <button
      className={`sound-toggle${enabled ? " sound-on" : ""}`}
      type="button"
      onClick={() => {
        if (enabled) {
          play("tap");
        }
        toggleEnabled();
      }}
      aria-label={enabled ? "Sound on" : "Sound off"}
      title={enabled ? "Sound on" : "Sound off"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
        {enabled ? (
          <>
            <path d="M16 9c1 1 1 5 0 6" />
            <path d="M18.5 6.5c3 3 3 8 0 11" />
          </>
        ) : (
          <path d="m17 9 4 6M21 9l-4 6" />
        )}
      </svg>
    </button>
  );
}
