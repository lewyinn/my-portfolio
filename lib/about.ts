/**
 * Everything shown in the About section. Edit this file to update
 * your profile: paragraphs, facts, core stack pills, and journey entries.
 */

export type AboutFact = { label: string; value: string };

export type JourneyItem = {
  period: string;
  title: string;
  place: string;
  desc: string;
};

export type AboutContent = {
  status: string;
  intro: string;
  bio: string[];
  facts: AboutFact[];
  stacksLabel: string;
  stacks: string[];
  journey: JourneyItem[];
};

/** Path to your photo in /public, e.g. "/images/ridho.jpg". Empty shows the Figma placeholder. */
export const aboutPhoto = "/images/profile.png";

export const about: AboutContent = {
  status: "Terbuka untuk kerja",
  intro:
    "Software Engineer yang membangun produk nyata dari aplikasi web, mobile, hingga layanan API.",
  bio: [
    "Saya Moch. Ridho Kurniawan, bisa dipanggil Ridho, Software Engineer dengan latar pendidikan SIJA di SMK Negeri 1 Cibinong (2023-Sekarang).",
    "Ketertarikan saya di dunia teknologi berawal dari rasa penasaran bagaimana sebuah aplikasi bekerja, mulai dari tampilan antarmuka hingga logika server di baliknya. Dari situ, saya terus mendalami pengembangan web, mobile, layanan API, serta database agar setiap produk berjalan cepat, rapi, dan nyaman digunakan.",
  ],
  facts: [
    { label: "Lokasi", value: "Bogor, Indonesia" },
    { label: "Posisi", value: "Software Engineer" },
  ],
  stacksLabel: "Minat & Stack",
  stacks: [
    "TypeScript",
    "Next.js",
    "Vue.js",
    "Flutter",
    "Laravel",
    "Golang",
    "Python",
    "Node.js",
    "Redis",
    "PostgreSQL",
  ],
  journey: [
    {
      period: "Agu 2026 - Sekarang",
      title: "IoT Software Engineer (Internship)",
      place: "PT Solu Filantropi",
      desc: "Sedang menjalani program Internship di bidang pengembangan perangkat lunak IoT.",
    },
    {
      period: "Mei - Agu 2026",
      title: "Software Developer (Internship)",
      place: "XNINE Indonesia",
      desc: "Mendalami pengembangan backend menggunakan Node.js, Java, dan Python, serta menggunakan ThingsBoard untuk monitoring dan manajemen IoT.",
    },
    {
      period: "2023 - Sekarang",
      title: "Siswa Jurusan SIJA",
      place: "SMK Negeri 1 Cibinong",
      desc: "Menempuh pendidikan jurusan SIJA dan belajar mulai dari networking, server, website, hingga design.",
    },
  ],
};
