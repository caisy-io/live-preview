export const getCaisyToken = () => {
    const key = "caisy_preview_access_token";
    const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return keyValue ? keyValue[2] : null;
  };