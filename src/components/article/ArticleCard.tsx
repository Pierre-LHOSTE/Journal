import { List, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArticleFullType } from "../../types/article";
import Thumbnail from "./thumbnail/Thumbnail";

function ArticleCard({ article }: { article: ArticleFullType; theme: string }) {
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

  const categoryTag = <Tag bordered={false}>{category}</Tag>;

  const details = (
    <>
      {categoryTag} {displayDate}
    </>
  );

  const navigateToUrl = () => {
    // return;
    navigate(urls[0]);
  };

  return (
    <List.Item
      className="article"
      extra={
        <Link to={urls[0]}>
          <Thumbnail color={color} image={image} />
        </Link>
      }
    >
      <List.Item.Meta
        title={<Link to={urls[0]}>{name}</Link>}
        description={details}
      />
      {description}
    </List.Item>
  );
}

export default ArticleCard;
