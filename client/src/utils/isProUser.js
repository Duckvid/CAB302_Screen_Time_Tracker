export async function getIsProUser() {
    const response = await fetch("/api/user/isProUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });
    const data = await response.json();
    return data;
  }
  