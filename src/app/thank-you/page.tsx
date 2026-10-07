import { cookies } from "next/headers";
import { ThankYou } from "@/components/SitePages";
import { validReceipt } from "@/lib/enquiry";
export const metadata = {
  title: "Enquiry confirmation",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function ConfirmationPage() {
  const value = (await cookies()).get("arnold-receipt")?.value;
  return (
    <ThankYou
      accepted={validReceipt(value, process.env.RECEIPT_SECRET ?? "")}
    />
  );
}
