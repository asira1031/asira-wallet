import { redirect } from "next/navigation";

export default function CashOutRedirect() {
  redirect("/asira-wallet/send-money");
}