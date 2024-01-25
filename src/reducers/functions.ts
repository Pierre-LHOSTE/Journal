export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    const expirationDate = payload.exp;
    return Date.now() >= expirationDate * 1000;
  } catch (error) {
    console.error(error);
  }
  return true;
};

async function refreshTokenApi(refreshToken: string) {
  const response = await fetch(
    "https://westeurope.azure.services.cloud.mongodb.com/api/client/v2.0/auth/session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  const data = await response.json();
  if (data.access_token) {
    return data.access_token;
  } else {
    return false;
  }
}

export { refreshTokenApi };
