import { Button, Form, Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store";
import { closeLogin } from "../../../reducers/settingsSlice";
import NameIcon from "./icons/NameIcon";
import "./login-modal.scss";
import PasswordIcon from "./icons/PasswordIcon";
import { FormSubmitType } from "../../../types/loginModal";
import { useLoginMutation } from "../../../reducers/authApi";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { openNotification } from "../../../reducers/NotificationSlice";
import { useCookies } from "react-cookie";
import { login as loginSlice, logout } from "../../../reducers/authSlice";

function LoginModal() {
  const [form] = Form.useForm();
  const loginModal = useAppSelector((state) => state.settings.loginModal);
  const dispatch = useAppDispatch();
  const [
    login,
    { data: loginResult, error: loginError, isLoading: loginLoading },
  ] = useLoginMutation();
  const [, setCookie, removeCookie] = useCookies(["token", "refreshToken"]);

  function successLogout() {
    dispatch(logout());
    removeCookie("token");
    removeCookie("refreshToken");
  }

  function successLogin({
    accessToken,
    refreshToken,
    isCookies = false,
  }: {
    accessToken?: string;
    refreshToken?: string;
    isCookies?: boolean;
  }) {
    dispatch(loginSlice({ accessToken, refreshToken }));
    if (!isCookies) {
      setCookie("token", accessToken, {
        secure: true,
        path: "/",
      });
      setCookie("refreshToken", refreshToken, {
        secure: true,
        path: "/",
      });
    }
  }

  function handleOk() {
    form.submit();
  }

  function handleCancel() {
    form.resetFields();
    dispatch(closeLogin());
  }

  function submit(e: FormSubmitType) {
    const loginData = { ...e };
    login(loginData);
  }

  useEffect(() => {
    if (loginResult && loginResult.access_token) {
      form.resetFields();
      handleCancel();
      dispatch(
        openNotification({
          title: "Connecté",
          type: "success",
          description: loginResult.user_id,
        })
      );
      const { access_token, refresh_token } = loginResult;
      successLogin({ accessToken: access_token, refreshToken: refresh_token });
    }
  }, [loginResult]);

  useEffect(() => {
    if (!loginError) return;
    let errorMessage;
    if (!("data" in loginError && loginError.data)) {
      errorMessage = "Error login";
    } else {
      errorMessage = (loginError.data as { error: string }).error;
    }
    dispatch(
      openNotification({
        title: "Error",
        type: "error",
        description: errorMessage,
      })
    );
    successLogout();
  }, [dispatch, loginError]);

  return (
    <Modal
      title="Connexion"
      open={loginModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" type="default" onClick={handleCancel}>
          Annuler
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          style={{ width: "55px" }}
        >
          {loginLoading ? <LoadingOutlined /> : "Ok"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name={"login_form"}
        onFinish={submit}
        requiredMark="optional"
        id="login-modal"
      >
        <Form.Item
          name="email"
          label={"Email"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input allowClear prefix={<NameIcon />} />
        </Form.Item>

        <Form.Item
          name="password"
          label={"Password"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password prefix={<PasswordIcon />} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LoginModal;
