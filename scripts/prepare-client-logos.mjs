import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

// Original embedded artwork from supplied company profile, PDF page 14, image 228.
// Extract with pdfimages -f 14 -l 14 -j -png before running; never redraw brand marks.
const source = "output/content-enhancement/logo-source/client-slide-003.jpg";
const definitions = [
  ["paypal", "PayPal", [970, 300, 335, 105]],
  ["toshiba", "Toshiba", [1313, 35, 294, 92]],
  ["upgrad", "upGrad", [1638, 12, 338, 94]],
  ["gsk", "GSK", [326, 422, 158, 141]],
  ["citrix", "Citrix", [1668, 135, 334, 140]],
  ["fractal", "Fractal", [528, 430, 304, 94]],
  ["molex", "Molex", [425, 596, 256, 96]],
  ["razorpay", "Razorpay", [1715, 603, 290, 76]],
  ["centurylink", "CenturyLink", [490, 168, 432, 102]],
  ["amadeus", "Amadeus", [950, 173, 293, 89]],
];
const destination = "public/media/clients";
await mkdir(destination, { recursive: true });
await mkdir("../assets/client-logos", { recursive: true });
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
const files = [];
for (const [id, name, [left, top, width, height]] of definitions) {
  const data = await sharp(source)
    .extract({ left, top, width, height })
    .resize({
      width: 400,
      height: 150,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 90 })
    .toBuffer();
  const path = `${destination}/${id}.webp`;
  await writeFile(path, data);
  const metadata = await sharp(data).metadata();
  files.push({
    id,
    name,
    path: `website/${path}`,
    sourceRect: { left, top, width, height },
    width: metadata.width,
    height: metadata.height,
    bytes: data.length,
    sha256: hash(data),
  });
}
const pdf = await readFile(
  "../sources/Arnold Consulting + Apex Workforce Advisory.pdf",
);
await writeFile(
  "../assets/client-logos/manifest.json",
  JSON.stringify(
    {
      source: "sources/Arnold Consulting + Apex Workforce Advisory.pdf",
      pdfPage: 14,
      imageObject: 228,
      sourceSha256: hash(pdf),
      extractedArtworkSha256: hash(await readFile(source)),
      status:
        "User-authorised local review; current relationship and public logo-use permission review remains part of release",
      treatment:
        "Original artwork extracted and bounded only; source-era identities retained; monochrome appearance through CSS",
      files,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Prepared ${files.length} source-derived logos, ${files.reduce((n, f) => n + f.bytes, 0)} bytes`,
);
