import { message } from "antd";

export const useMessage = () => {
  const showSuccess = (content: string) => {
    message.success(content);
  };

  const showError = (content: string) => {
    message.error(content);
  };

  return { showSuccess, showError };
};
