import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  description: "Menüyü yönetin ve QR kodunuzu özelleştirin.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminPage />;
}
