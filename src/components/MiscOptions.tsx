type MiscOptionsProps = {
  colorsAvailable: string[];
};

export function MiscOptions({ colorsAvailable }: MiscOptionsProps) {
  return (
    <div>
      {colorsAvailable.length > 0 && (
        <div>
          <label htmlFor="garment-color">Garment Color</label>
          <select id="garment-color">
            {colorsAvailable.map((color) => (
              <option>{color}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
