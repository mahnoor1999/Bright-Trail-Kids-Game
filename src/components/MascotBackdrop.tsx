import { Mascot, type MascotCharacter } from "./Mascot";

type MascotBackdropProps = {
  characters?: MascotCharacter[];
};

const allCharacters: MascotCharacter[] = ["blob", "fox", "cat", "ghost"];

export function MascotBackdrop({ characters = allCharacters }: MascotBackdropProps) {
  return (
    <div className="mascot-backdrop" aria-hidden="true">
      {characters.map((character, index) => (
        <div className={`mascot-backdrop-item mascot-backdrop-item-${index % 4}`} key={character}>
          <Mascot character={character} />
        </div>
      ))}
    </div>
  );
}
