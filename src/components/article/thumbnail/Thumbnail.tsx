import { colord } from "colord";
import { useAppSelector } from "../../../store";

function Thumbnail({ image, color }: { image: string; color: string }) {
  const theme = useAppSelector((state) => state.settings.theme);

  const light_color = colord(color).lighten(0.5).toHex();

  const gradientColor =
    theme === "light"
      ? `linear-gradient(to top, ${light_color}, white 150%)`
      : `linear-gradient(to bottom, ${color}, black 200%)`;

  return (
    <div className="imageWrapper" style={{ background: gradientColor }}>
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
    </div>
  );
}

export default Thumbnail;
