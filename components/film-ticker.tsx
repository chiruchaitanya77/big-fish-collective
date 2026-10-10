const beats = ["CAST", "CREW", "STORY", "DIRECTION", "CAMERA", "LIGHT", "EDIT", "PRODUCTION"];

export function FilmTicker() {
  return (
    <div className="film-ticker" aria-hidden="true">
      <div className="film-ticker-track">
        {[...beats, ...beats].map((beat, index) => <span key={`${beat}-${index}`}>{beat}</span>)}
      </div>
    </div>
  );
}
