import { company, companyMapUrl } from "@/content/company";

export function ContactDetails({
  showPerson = false,
}: {
  showPerson?: boolean;
}) {
  return (
    <address className="contact-details">
      <p className="contact-company">{company.legalName}</p>
      {showPerson && (
        <p className="contact-person">
          {company.contactPerson.name}
          <span>{company.contactPerson.role}</span>
        </p>
      )}
      <dl className="contact-direct">
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            <a href={company.phoneHref}>{company.phone}</a>
          </dd>
        </div>
      </dl>
      <p className="contact-label">Bengaluru office</p>
      <p className="contact-address">
        {company.address.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <a
        className="contact-map"
        href={companyMapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Google Maps <span aria-hidden="true">↗</span>
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </address>
  );
}
