import type { Locale } from "./i18n";

/**
 * Everything shown in the About section, in both languages. Edit this file to update
 * your profile: add or remove paragraphs, facts, and journey entries freely (keep the
 * English and Indonesian lists in step). Text in [brackets] is a visible placeholder
 * until you replace it.
 */

export type AboutFact = { label: string; value: string };

export type JourneyItem = {
  /** e.g. "2024 — Now" */
  period: string;
  /** Role, degree, or milestone. */
  title: string;
  /** Company, campus, or client. */
  place: string;
  desc: string;
};

export type AboutContent = {
  /** Short status on the photo. */
  status: string;
  /** One or two sentences under the heading. */
  intro: string;
  /** Main description. Each string is one paragraph; the first one is shown larger. */
  bio: string[];
  /** Quick facts shown as small cards. */
  facts: AboutFact[];
  /** Work and education timeline, newest first. */
  journey: JourneyItem[];
};

/** Path to your photo in /public, e.g. "/images/ridho.jpg". Empty shows a placeholder. */
export const aboutPhoto = "";

export const about: Record<Locale, AboutContent> = {
  en: {
    status: "Available for work",
    intro:
      "[A one-line intro: who you are and what you build, e.g. a software developer from Indonesia who builds websites and mobile apps.]",
    bio: [
      "[Paragraph 1: your background, education, and how you got into web and mobile development.]",
      "[Paragraph 2: how you work with clients: communication, reliability, and what they can expect.]",
      "[Paragraph 3 (optional): what you enjoy outside of code, or what you are learning now.]",
    ],
    facts: [
      { label: "Based in", value: "Indonesia" },
      { label: "Experience", value: "[X] years" },
    ],
    journey: [
      {
        period: "[YEAR] — Now",
        title: "[Your current role]",
        place: "[Company or freelance]",
        desc: "[What you do there, in one or two sentences.]",
      },
      {
        period: "[YEAR] — [YEAR]",
        title: "[Previous role or internship]",
        place: "[Company]",
        desc: "[What you worked on and what you learned.]",
      },
      {
        period: "[YEAR] — [YEAR]",
        title: "[Degree or program]",
        place: "[School or campus]",
        desc: "[Major, focus, or a project you are proud of.]",
      },
    ],
  },
  id: {
    status: "Siap terima proyek",
    intro:
      "[Satu kalimat perkenalan: siapa kamu dan apa yang kamu buat, misalnya software developer dari Indonesia yang bikin website dan aplikasi mobile.]",
    bio: [
      "[Paragraf 1: latar belakang, pendidikan, dan awal mula kamu masuk ke dunia web dan mobile.]",
      "[Paragraf 2: cara kamu kerja bareng klien: komunikasi, tanggung jawab, dan apa yang bisa mereka harapkan.]",
      "[Paragraf 3 (opsional): hal yang kamu suka di luar coding, atau yang sedang kamu pelajari.]",
    ],
    facts: [
      { label: "Lokasi", value: "Indonesia" },
      { label: "Pengalaman", value: "[X] tahun" },
    ],
    journey: [
      {
        period: "[TAHUN] — Sekarang",
        title: "[Posisi kamu sekarang]",
        place: "[Perusahaan atau freelance]",
        desc: "[Apa yang kamu kerjakan di sana, satu atau dua kalimat.]",
      },
      {
        period: "[TAHUN] — [TAHUN]",
        title: "[Posisi sebelumnya atau magang]",
        place: "[Perusahaan]",
        desc: "[Apa yang kamu kerjakan dan pelajari.]",
      },
      {
        period: "[TAHUN] — [TAHUN]",
        title: "[Jurusan atau program]",
        place: "[Sekolah atau kampus]",
        desc: "[Jurusan, fokus, atau proyek yang kamu banggakan.]",
      },
    ],
  },
};
