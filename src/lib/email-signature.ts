import { company } from "@/content/company";

export const signatureLogoPath = "/media/email-signature/arnold-logo.png";
export const signatureWebsite = "https://www.arnoldconsultants.com";

export type SignatureDesign = "classic" | "executive" | "studio";
export const signatureDesigns: {
  id: SignatureDesign;
  name: string;
  description: string;
}[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Logo above, a clear blue divider.",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Logo beside your name and role.",
  },
  {
    id: "studio",
    name: "Studio",
    description: "Navy name panel, framed details.",
  },
];

export type SignatureDetails = {
  name: string;
  designation: string;
  email: string;
  phone: string;
  linkedin: string;
};
export type SignatureErrors = Partial<Record<keyof SignatureDetails, string>>;

export const emptySignature: SignatureDetails = {
  name: "",
  designation: "",
  email: "",
  phone: "",
  linkedin: "",
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export function linkedinUrl(value: string): string | null {
  if (!value.trim()) return null;
  try {
    const url = new URL(
      /^https?:\/\//i.test(value.trim())
        ? value.trim()
        : `https://${value.trim()}`,
    );
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      !(
        url.hostname === "linkedin.com" ||
        url.hostname.endsWith(".linkedin.com")
      ) ||
      !/^\/in\/[^/\s]+\/?$/.test(url.pathname)
    )
      return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

export function phoneHref(value: string): string {
  return `tel:${value.trim().replace(/[^\d+]/g, "")}`;
}

export function validateSignature(details: SignatureDetails): SignatureErrors {
  const errors: SignatureErrors = {};
  if (!details.name.trim()) errors.name = "Enter your full name.";
  else if (details.name.trim().length > 80)
    errors.name = "Keep your name within 80 characters.";
  if (!details.designation.trim())
    errors.designation = "Enter your designation.";
  else if (details.designation.trim().length > 100)
    errors.designation = "Keep your designation within 100 characters.";
  if (
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(details.email.trim()) ||
    details.email.length > 120
  )
    errors.email = "Enter a valid work email address.";
  if (details.phone.trim() && !/^\+?[\d\s().-]+$/.test(details.phone.trim()))
    errors.phone =
      "Use a phone number with digits and an optional country code.";
  else if (details.phone.trim()) {
    const digits = details.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15)
      errors.phone = "Enter a phone number with 7–15 digits.";
  }
  if (
    details.linkedin.trim() &&
    (!linkedinUrl(details.linkedin) || details.linkedin.length > 240)
  )
    errors.linkedin =
      "Enter your LinkedIn profile link, such as https://www.linkedin.com/in/your-name.";
  return errors;
}

/** Email-safe tables and inline styles. All employee input is escaped. */
export function signatureHtml(
  details: SignatureDetails,
  logoUrl: string,
  design: SignatureDesign = "classic",
): string {
  const name = escapeHtml(details.name.trim() || "Your name");
  const designation = escapeHtml(
    details.designation.trim() || "Your designation",
  );
  const email = details.email.trim() || "you@arnoldconsultants.com";
  const personalLinkedin = linkedinUrl(details.linkedin);
  const linkStyle =
    "display:inline-block;min-height:24px;line-height:24px;color:#15346b;text-decoration:none;overflow-wrap:anywhere;word-break:break-word;";
  const logo = (width: number, height: number) =>
    `<a href="${signatureWebsite}" style="text-decoration:none;"><img src="${escapeHtml(logoUrl)}" alt="Arnold Consulting — Partnering to Succeed" width="${width}" height="${height}" style="display:block;width:${width}px;height:${height}px;border:0;" /></a>`;
  const emailLink = `<a href="mailto:${escapeHtml(encodeURIComponent(email).replace(/%40/g, "@"))}" style="${linkStyle}">${escapeHtml(email)}</a>`;
  const phoneLink = details.phone.trim()
    ? `<a href="${escapeHtml(phoneHref(details.phone))}" style="${linkStyle}">${escapeHtml(details.phone.trim())}</a>`
    : "";
  const websiteLink = `<a href="${signatureWebsite}" style="${linkStyle}">www.arnoldconsultants.com</a>`;
  const linkedinLink = `<a href="${escapeHtml(personalLinkedin || company.linkedin)}" style="${linkStyle}">${personalLinkedin ? "Connect on LinkedIn" : "Arnold on LinkedIn"}</a>`;
  const address = company.address.lines.map(escapeHtml).join("<br />");
  const tableOpen = `<table role="presentation" data-signature-design="${design}" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:460px;font-family:Arial,Helvetica,sans-serif;text-align:left;background-color:#ffffff;color:#17243b;"><tbody>`;
  const row = (label: string, content: string) =>
    `<tr><td valign="top" style="padding:0 12px 5px 0;width:18px;color:#52637b;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:24px;">${label}</td><td style="padding:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:24px;color:#29364b;overflow-wrap:anywhere;word-break:break-word;">${content}</td></tr>`;
  const contact = [
    row("E", emailLink),
    ...(phoneLink ? [row("T", phoneLink)] : []),
    row("W", websiteLink),
    row("L", linkedinLink),
  ].join("");
  if (design === "executive") {
    return `${tableOpen}
      <tr><td style="padding:0 0 14px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;table-layout:fixed;"><tbody><tr>
        <td valign="top" width="126" style="width:126px;padding:3px 14px 0 0;">${logo(112, 39)}</td>
        <td valign="top" style="border-left:2px solid #3f76af;padding:0 0 0 14px;font-family:Arial,Helvetica,sans-serif;overflow-wrap:anywhere;word-break:break-word;">
          <div style="font-size:18px;line-height:24px;font-weight:700;color:#15346b;margin:0 0 5px;">${name}</div>
          <div style="font-size:12px;line-height:18px;color:#52637b;">${designation}</div>
        </td>
      </tr></tbody></table></td></tr>
      <tr><td style="padding:0 0 10px;border-bottom:1px solid #d8e2ed;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#29364b;">${escapeHtml(company.legalName)}</td></tr>
      <tr><td style="padding:12px 0 4px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;table-layout:fixed;"><tbody>${contact}</tbody></table></td></tr>
      <tr><td style="padding:3px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;color:#52637b;">${address}</td></tr>
    </tbody></table>`;
  }
  if (design === "studio") {
    return `${tableOpen}
      <tr><td bgcolor="#15346b" style="background-color:#15346b;border-radius:8px 8px 0 0;padding:17px 18px 15px;border-bottom:4px solid #64add5;font-family:Arial,Helvetica,sans-serif;overflow-wrap:anywhere;word-break:break-word;">
        <div style="font-size:19px;line-height:25px;font-weight:700;color:#ffffff;margin:0 0 5px;">${name}</div>
        <div style="font-size:12px;line-height:18px;color:#dce9f8;">${designation}</div>
      </td></tr>
      <tr><td style="padding:15px 15px 13px;border-left:1px solid #d8e2ed;border-right:1px solid #d8e2ed;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;table-layout:fixed;"><tbody><tr>
          <td valign="middle" width="116" style="width:116px;padding:0 14px 0 0;">${logo(102, 36)}</td>
          <td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;font-weight:700;color:#15346b;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(company.legalName)}</td>
        </tr></tbody></table>
      </td></tr>
      <tr><td bgcolor="#f3f7fc" style="background-color:#f3f7fc;padding:13px 17px 11px;border-left:1px solid #d8e2ed;border-right:1px solid #d8e2ed;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;table-layout:fixed;"><tbody>${contact}</tbody></table>
      </td></tr>
      <tr><td style="padding:13px 17px 15px;border:1px solid #d8e2ed;border-top:0;border-radius:0 0 8px 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;color:#52637b;">${address}</td></tr>
    </tbody></table>`;
  }
  return `${tableOpen}
    <tr><td style="padding:0 0 14px;">${logo(136, 48)}</td></tr>
    <tr><td style="padding:0 0 3px;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:24px;font-weight:700;color:#15346b;overflow-wrap:anywhere;word-break:break-word;">${name}</td></tr>
    <tr><td style="padding:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#52637b;overflow-wrap:anywhere;word-break:break-word;">${designation}</td></tr>
    <tr><td style="padding:0 0 13px;border-bottom:2px solid #3f76af;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#29364b;">${escapeHtml(company.legalName)}</td></tr>
    <tr><td style="padding:12px 0 4px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;table-layout:fixed;"><tbody>${contact}</tbody></table></td></tr>
    <tr><td style="padding:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:17px;color:#52637b;">${address}</td></tr>
  </tbody>
</table>`;
}

export function signatureDownload(
  details: SignatureDetails,
  logoUrl: string,
  design: SignatureDesign,
) {
  const name =
    details.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "employee";
  return {
    filename: `arnold-signature-${name}-${design}.html`,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escapeHtml(details.name)} — Arnold email signature</title></head><body style="margin:24px;background:#ffffff;">${signatureHtml(details, logoUrl, design)}</body></html>`,
  };
}

export function signatureText(details: SignatureDetails): string {
  return [
    details.name.trim(),
    details.designation.trim(),
    company.legalName,
    details.email.trim(),
    details.phone.trim(),
    "www.arnoldconsultants.com",
    linkedinUrl(details.linkedin) || company.linkedin,
    ...company.address.lines,
  ]
    .filter(Boolean)
    .join("\n");
}
