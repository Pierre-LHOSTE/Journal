export interface ArticleType {
  name: string;
  data?: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  color: string;
  urls: string[];
  description: string;
}

export interface ArticleFullType extends ArticleType {
  date: {
    createdAt: number;
    updatedAt?: number;
  };
  refreshCount: number;
  _id: string;
}
