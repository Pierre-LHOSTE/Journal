import type { Meta, StoryObj } from "@storybook/react";

import ArticleCard from "./ArticleCard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Article/Card",
  component: ArticleCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ArticleCard>;

const commonArgs = {
  _id: "123456789",
  refreshCount: 1,
  urls: [""],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Full: Story = {
  args: {
    article: {
      ...commonArgs,
      name: "Article Test",
      category: "TEST",
      author: "Myself",
      date: {
        createdAt: 1620000000000,
      },
      image:
        "https://cdn.pixabay.com/photo/2018/03/01/06/57/rose-3189881_1280.png",
      color: "#efe2ac",
      tags: ["test", "test2"],
      description: "This is a test",
    },
    theme: "dark",
  },
};
