import { Button, Form, Input, Select, Space } from "antd";
import { useCreateArticleMutation } from "../../reducers/adminApi";
import { articleType } from "../../types/article";
import getSlug from "speakingurl";

function EditArticlePage() {
  const [form] = Form.useForm();
  const [createArticle] = useCreateArticleMutation();

  const onFinish = (values: articleType) => {
    const url = getSlug(values.name, {
      lang: "fr",
    });
    createArticle({ ...values, url: url });
  };

  return (
    <div>
      Edit
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}
          initialValue={"name"}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="data"
          label="Data"
          rules={[{ required: true }]}
          initialValue={"data"}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true }]}
          initialValue={"author"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
            }}
            initialValue={"category"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
            }}
            initialValue={["tags"]}
          >
            <Select mode="tags" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
            }}
            initialValue={"image"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
            }}
            initialValue={"color"}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditArticlePage;
