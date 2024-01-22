export interface articleType {
  name: string;
  data: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  color: string;
  url: string
}

export interface articleFullType extends articleType {
  createdAt: number;
  updatedAt: number;
  refreshCount: number;
  _id: string;
}
