import { useNavigate } from "react-router-dom";
import { ArticleFullType } from "../../types/article";

function ArticleCard({
  article,
  theme,
}: {
  article: ArticleFullType;
  theme: string;
}) {
  const { name, category, author, date, image, urls, color, description } =
    article;
  const navigate = useNavigate();

  const lastDate = new Date(
    date.updatedAt ? date.updatedAt : date.createdAt
  ).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const displayDate = date.updatedAt
    ? `Mis à jour le ${lastDate}`
    : `Créé le ${lastDate}`;

  const gradientColor =
    theme === "light"
      ? `linear-gradient(to top right,${color}, white 150%)`
      : `linear-gradient(to top right, ${color}, black 150%)`;

  const navigateToUrl = () => {
    return;
    navigate(urls[0]);
  };

  return (
    <article onClick={navigateToUrl}>
      <div className="image" style={{ background: `${gradientColor}` }}>
        <img src={image} />
      </div>
      <div className="content">
        <div>
          <span>{category.toUpperCase()}</span>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div>
          <span>
            {author} - {displayDate}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
