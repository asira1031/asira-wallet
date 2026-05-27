export function isLoggedIn() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("asira_wallet_logged_in") === "yes";
}

export function logoutUser() {
  localStorage.removeItem("asira_wallet_logged_in");
}

export function getWalletUser() {
  return {
    phone: localStorage.getItem("asira_wallet_phone") || "",
    fullName:
      localStorage.getItem("asira_wallet_full_name") ||
      "Asira User",
  };
}