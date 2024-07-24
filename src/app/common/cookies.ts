export function GetCookie(key: string): string | null {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split("=");
      if (cookieKey.trim() === key) {
        return cookieValue;
      }
    }
    return '';
  }