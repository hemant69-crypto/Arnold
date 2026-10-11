"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  emptySignature,
  signatureDesigns,
  signatureDownload,
  signatureHtml,
  signatureLogoPath,
  signatureText,
  validateSignature,
  type SignatureDetails,
  type SignatureDesign,
} from "@/lib/email-signature";

const fields: {
  key: keyof SignatureDetails;
  label: string;
  placeholder: string;
  maxLength: number;
  type?: string;
  required?: boolean;
}[] = [
  {
    key: "name",
    label: "Full name",
    placeholder: "Your full name",
    maxLength: 80,
    required: true,
  },
  {
    key: "designation",
    label: "Designation",
    placeholder: "e.g. Senior Consultant",
    maxLength: 100,
    required: true,
  },
  {
    key: "email",
    label: "Work email",
    placeholder: "you@arnoldconsultants.com",
    maxLength: 120,
    type: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Phone number",
    placeholder: "+91 98765 43210",
    maxLength: 30,
    type: "tel",
  },
  {
    key: "linkedin",
    label: "LinkedIn profile",
    placeholder: "https://www.linkedin.com/in/your-name",
    maxLength: 240,
  },
];

const subscribeToHydration = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

function CopyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

export function EmailSignatureGenerator({
  assetOrigin,
}: {
  assetOrigin: string;
}) {
  const [details, setDetails] = useState<SignatureDetails>(emptySignature);
  const [design, setDesign] = useState<SignatureDesign>("classic");
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [manual, setManual] = useState(false);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    browserReady,
    serverReady,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const errors = attempted ? validateSignature(details) : {};
  const complete = Object.keys(validateSignature(details)).length === 0;
  const previewHtml = signatureHtml(
    details,
    manual ? new URL(signatureLogoPath, assetOrigin).href : signatureLogoPath,
    design,
  );

  function focusFirstError() {
    const first = Object.keys(validateSignature(details))[0];
    formRef.current
      ?.querySelector<HTMLInputElement>(`[name="${first}"]`)
      ?.focus();
  }

  function selectSignature() {
    const target = previewRef.current?.querySelector("table");
    if (!target) return;
    const range = document.createRange();
    range.selectNode(target);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    previewRef.current?.focus({ preventScroll: true });
  }

  async function copySignature(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setManual(false);
    if (!complete) {
      setStatus("Check the highlighted fields before copying.");
      focusFirstError();
      return;
    }
    const html = signatureHtml(
      details,
      new URL(signatureLogoPath, assetOrigin).href,
      design,
    );
    const text = signatureText(details);
    setBusy(true);
    setStatus("");
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined")
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      setStatus(
        "Signature copied. Paste it into Gmail’s signature box, then save.",
      );
    } catch {
      let handled = false;
      const onCopy = (copyEvent: ClipboardEvent) => {
        if (!copyEvent.clipboardData) return;
        copyEvent.clipboardData.setData("text/html", html);
        copyEvent.clipboardData.setData("text/plain", text);
        copyEvent.preventDefault();
        handled = true;
      };
      document.addEventListener("copy", onCopy);
      selectSignature();
      try {
        const copied = document.execCommand("copy");
        if (!copied || !handled) throw new Error("Copy blocked");
        window.getSelection()?.removeAllRanges();
        setStatus(
          "Signature copied. Paste it into Gmail’s signature box, then save.",
        );
      } catch {
        // Keep a visible, correctly formatted selection for manual copy.
        setManual(true);
        setStatus(
          "Automatic copy was blocked. Click ‘Select signature for manual copy’, press Ctrl+C or ⌘C, then paste it into Gmail.",
        );
      } finally {
        document.removeEventListener("copy", onCopy);
      }
    } finally {
      setBusy(false);
    }
  }

  function downloadSignature() {
    setAttempted(true);
    setManual(false);
    if (!complete) {
      setStatus("Check the highlighted fields before downloading.");
      focusFirstError();
      return;
    }
    const file = signatureDownload(
      details,
      new URL(signatureLogoPath, assetOrigin).href,
      design,
    );
    const url = URL.createObjectURL(
      new Blob([file.html], { type: "text/html;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = file.filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      `${signatureDesigns.find((option) => option.id === design)!.name} signature downloaded. Open the HTML file in a browser to view it.`,
    );
  }

  return (
    <div className="sig-tool">
      <div className="sig-shell">
        <header className="sig-intro">
          <p className="sig-kicker">For the Arnold team</p>
          <h1>
            Your signature.
            <br />
            <span>One consistent identity.</span>
          </h1>
          <p className="sig-lede">
            Add your details, choose a design and copy your signature into
            Gmail.
          </p>
        </header>

        <div className="sig-workspace">
          <section className="sig-details" aria-labelledby="sig-details-title">
            <div className="sig-section-heading">
              <span className="sig-step" aria-hidden="true">
                1
              </span>
              <h2 id="sig-details-title">Your details</h2>
            </div>
            <p className="sig-description">
              Use the name and designation you share with clients.
            </p>
            <form
              ref={formRef}
              onSubmit={copySignature}
              noValidate
              autoComplete="off"
            >
              <div className="sig-fields">
                {fields.map(
                  ({ key, label, placeholder, maxLength, type, required }) => (
                    <div className="sig-field" key={key}>
                      <label htmlFor={`sig-${key}`}>
                        {label}
                        {required ? (
                          <span className="sig-required" aria-hidden="true">
                            {" "}
                            *
                          </span>
                        ) : (
                          <span className="sig-optional">Optional</span>
                        )}
                      </label>
                      <input
                        id={`sig-${key}`}
                        name={key}
                        type={type ?? "text"}
                        required={required}
                        disabled={!hydrated}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        value={details[key]}
                        spellCheck={false}
                        autoCapitalize={
                          key === "email" || key === "linkedin"
                            ? "none"
                            : undefined
                        }
                        aria-invalid={!!errors[key]}
                        aria-describedby={
                          errors[key] ? `sig-${key}-error` : undefined
                        }
                        onChange={(event) => {
                          setDetails((current) => ({
                            ...current,
                            [key]: event.target.value,
                          }));
                          setStatus("");
                          setManual(false);
                        }}
                      />
                      {errors[key] ? (
                        <p className="sig-error" id={`sig-${key}-error`}>
                          {errors[key]}
                        </p>
                      ) : null}
                    </div>
                  ),
                )}
              </div>
              <p className="sig-fixed-note">
                Arnold’s logo, company details and address are included
                automatically.
              </p>
              <button
                className="sig-copy"
                type="submit"
                disabled={busy || !hydrated}
              >
                <CopyIcon />
                {busy ? "Copying…" : "Copy signature"}
              </button>
              <button
                className="sig-download"
                type="button"
                disabled={!hydrated || busy}
                onClick={downloadSignature}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <path d="M12 3v12m-4-4 4 4 4-4M4 15v5h16v-5" />
                </svg>
                Download signature
              </button>
              <p className="sig-download-note">
                Download an HTML copy for later. To install it in Gmail, use
                Copy signature.
              </p>
              <p className="sig-status" role="status" aria-live="polite">
                {status}
              </p>
              {manual ? (
                <button
                  className="sig-select"
                  type="button"
                  onClick={selectSignature}
                >
                  Select signature for manual copy
                </button>
              ) : null}
              <button
                className="sig-reset"
                type="button"
                onClick={() => {
                  setDetails(emptySignature);
                  setAttempted(false);
                  setStatus("Fields cleared.");
                  setManual(false);
                  formRef.current
                    ?.querySelector<HTMLInputElement>("input")
                    ?.focus();
                }}
              >
                Clear details
              </button>
            </form>
            <p className="sig-privacy">
              Your details stay in this browser tab. They are cleared when you
              reload or leave this page.
            </p>
          </section>

          <div className="sig-right">
            <section
              className="sig-preview-section"
              aria-labelledby="sig-preview-title"
            >
              <div className="sig-section-heading">
                <span className="sig-step" aria-hidden="true">
                  2
                </span>
                <h2 id="sig-preview-title">Signature preview</h2>
              </div>
              <fieldset className="sig-designs" disabled={!hydrated}>
                <legend>Choose your design</legend>
                <div className="sig-design-options">
                  {signatureDesigns.map((option) => (
                    <label
                      className={`sig-design-option${design === option.id ? " is-selected" : ""}`}
                      key={option.id}
                    >
                      <input
                        type="radio"
                        name="signature-design"
                        value={option.id}
                        checked={design === option.id}
                        onChange={() => {
                          setDesign(option.id);
                          setStatus("");
                          setManual(false);
                        }}
                      />
                      <span
                        className={`sig-sketch sig-sketch-${option.id}`}
                        aria-hidden="true"
                      >
                        <span className="sig-sketch-logo" />
                        <span className="sig-sketch-name" />
                        <span className="sig-sketch-line" />
                        <span className="sig-sketch-line" />
                      </span>
                      <span className="sig-design-name">{option.name}</span>
                      <span className="sig-design-description">
                        {option.description}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sig-email">
                <div className="sig-email-chrome">
                  <span className="sig-dot" />
                  <span>
                    {complete ? "Ready to copy" : "Preview updates as you type"}
                  </span>
                  <span className="sig-email-label">Gmail</span>
                </div>
                <div className="sig-email-body">
                  <p className="sig-email-message">Best regards,</p>
                  <div
                    ref={previewRef}
                    className="sig-preview"
                    tabIndex={-1}
                    aria-label="Your email signature preview"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              </div>
              <p className="sig-preview-note">
                Only the signature is copied. “Best regards” stays outside it.
              </p>
            </section>

            <section
              className="sig-install"
              aria-labelledby="sig-install-title"
            >
              <div className="sig-section-heading">
                <span className="sig-step" aria-hidden="true">
                  3
                </span>
                <h2 id="sig-install-title">Add it to Gmail</h2>
              </div>
              <ol>
                <li>
                  On your computer, open Gmail and choose{" "}
                  <strong>Settings → See all settings</strong>.
                </li>
                <li>
                  Under <strong>General → Signature</strong>, click{" "}
                  <strong>Create new</strong> and name it “Arnold”.
                </li>
                <li>
                  Paste your copied signature into the box using{" "}
                  <strong>Ctrl+V</strong> or <strong>⌘V</strong>.
                </li>
                <li>
                  Choose it under <strong>Signature defaults</strong> for new
                  emails and replies, then click <strong>Save Changes</strong>.
                </li>
              </ol>
              <div className="sig-install-footer">
                <p>Send yourself a test email to check the logo and links.</p>
                <a
                  href="https://support.google.com/mail/answer/8395?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gmail help
                </a>
              </div>
              <p className="sig-update-note">
                Changed your role or phone number? Return here, copy your
                updated signature and save it in Gmail again. Mobile app
                signatures may need separate setup.
              </p>
            </section>
          </div>
        </div>
        <p className="sig-noscript" hidden={hydrated}>
          Turn on JavaScript to enter your details and copy a signature. The
          Gmail setup instructions remain available above.
        </p>
      </div>
    </div>
  );
}
