import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import getSlug from "speakingurl";
import { openNotification } from "../../reducers/NotificationSlice";
import { useCreateArticleMutation } from "../../reducers/adminApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { ArticleType } from "../../types/article";

function EditArticlePage() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [createArticle, { isLoading, isError, isSuccess, error }] =
    useCreateArticleMutation();
  const [urls, setUrls] = useState<string[]>([""]);
  const isLogged = useAppSelector((state) => state.auth.isLogged);

  function updateMainUrl(e: { target: { value: string } }) {
    const mainUrl = slugify(e.target.value);
    setUrls((url) => {
      if (url.length <= 0) return [mainUrl];
      return url.map((u, i) => (i === 0 ? mainUrl : u));
    });
    form.setFieldValue("urls", urls);
  }

  function updateUrls(array: string[]) {
    const newUrls = array.map((el) => slugify(el));
    setUrls(newUrls);
  }

  const onFinish = (values: ArticleType) => {
    createArticle({ ...values });
  };

  function slugify(text: string) {
    return getSlug(text, {
      lang: "fr",
    });
  }

  useEffect(() => {
    form.setFieldValue("urls", urls);
  }, [urls]);

  useEffect(() => {
    if (!isLoading) return;
    dispatch(
      openNotification({
        title: "Chargement",
        type: "loading",
      })
    );
  }, [isLoading]);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(
      openNotification({
        title: "Article créé",
        type: "success",
      })
    );
  }, [isSuccess]);

  useEffect(() => {
    if (!isError || !error) return;
    let errorMessage;
    if (!("data" in error && error.data)) {
      errorMessage = "Error login";
    } else {
      errorMessage = (error.data as { error: string }).error;
    }
    dispatch(
      openNotification({
        title: "Erreur",
        type: "error",
        description: errorMessage,
        detailed: true,
      })
    );
  }, [isError]);

  return (
    <>
      {isLogged ? (
        <div>
          Edit
          <Form
            layout="vertical"
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input size="large" onChange={updateMainUrl} />
            </Form.Item>
            <Form.Item name="data" label="Data" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true }]}
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
              >
                <Input />
              </Form.Item>
            </Form.Item>

            <Form.Item name="urls" label="URLs" rules={[{ required: true }]}>
              <Select mode="tags" onChange={updateUrls} />
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
      ) : (
        <>No connected</>
      )}
    </>
  );
}

export default EditArticlePage;
