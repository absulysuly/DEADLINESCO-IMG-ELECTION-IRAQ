import axios from 'axios';
import type { Candidate, Governorate, Stats, PaginatedCandidates } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://winter-leaf-f532.safaribosafar.workers.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type CandidateApiResponse =
  | Candidate[]
  | {
      data?: Candidate[];
      candidates?: Candidate[];
      items?: Candidate[];
      total?: number;
      page?: number;
      limit?: number;
    };

const GOVERNORATE_AR_NAMES: Record<string, string> = {
  Baghdad: 'بغداد',
  Basra: 'البصرة',
  Nineveh: 'نينوى',
  Erbil: 'أربيل',
  Anbar: 'الأنبار',
  'Dhi Qar': 'ذي قار',
  'Salah al-Din': 'صلاح الدين',
  Diyala: 'ديالى',
  Kirkuk: 'كركوك',
  Sulaymaniyah: 'السليمانية',
  Babil: 'بابل',
  Wasit: 'واسط',
  Maysan: 'ميسان',
  Muthanna: 'المثنى',
  Qadisiyyah: 'القادسية',
  Najaf: 'النجف',
  Karbala: 'كربلاء',
  Dohuk: 'دهوك',
};

const normaliseGender = (gender?: string): 'Male' | 'Female' => {
  const normalized = (gender ?? '').toString().toLowerCase();
  if (normalized === 'female' || normalized === 'f') {
    return 'Female';
  }
  return 'Male';
};

const toCandidateArray = (payload: CandidateApiResponse): Candidate[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload?.candidates && Array.isArray(payload.candidates)) {
    return payload.candidates;
  }

  if (payload?.items && Array.isArray(payload.items)) {
    return payload.items;
  }

  throw new Error('Unexpected candidate response format from API');
};

export const fetchCandidateList = async (): Promise<Candidate[]> => {
  const { data } = await api.get<CandidateApiResponse>('/portal/candidates');
  const candidates = toCandidateArray(data);
  return candidates.map((candidate) => ({
    ...candidate,
    id: candidate.id ?? candidate.candidate_id ?? candidate.ballot_number?.toString() ?? candidate.name,
    gender: normaliseGender(candidate.gender),
  }));
};

type FetchCandidateParams = {
  page?: number;
  limit?: number;
  query?: string;
  governorate?: string;
  gender?: 'Male' | 'Female';
  sort?: string;
};

const applyCandidateFilters = (candidates: Candidate[], params: FetchCandidateParams): Candidate[] => {
  const { query, governorate, gender, sort } = params;
  let filtered = [...candidates];

  if (query) {
    const needle = query.toLowerCase();
    filtered = filtered.filter((candidate) =>
      [candidate.name, candidate.party, candidate.nomination_type]
        .filter(Boolean)
        .some((value) => value!.toString().toLowerCase().includes(needle)),
    );
  }

  if (governorate) {
    const target = governorate.toLowerCase();
    filtered = filtered.filter((candidate) => candidate.governorate?.toLowerCase() === target);
  }

  if (gender) {
    filtered = filtered.filter((candidate) => normaliseGender(candidate.gender) === gender);
  }

  if (sort) {
    const sortKey = sort.toLowerCase();
    if (sortKey.includes('ballot')) {
      filtered.sort((a, b) => (a.ballot_number ?? Number.MAX_SAFE_INTEGER) - (b.ballot_number ?? Number.MAX_SAFE_INTEGER));
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return filtered;
};

export const fetchCandidates = async (params: FetchCandidateParams = {}): Promise<PaginatedCandidates> => {
  const candidates = applyCandidateFilters(await fetchCandidateList(), params);

  const page = params.page && params.page > 0 ? params.page : 1;
  const limit = params.limit && params.limit > 0 ? params.limit : candidates.length || 1;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: candidates.slice(start, end),
    total: candidates.length,
    page,
    limit,
  };
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  const candidates = await fetchCandidateList();
  const candidate = candidates.find((item) => {
    const identifiers = [item.id, item.candidate_id, item.ballot_number?.toString()];
    return identifiers.filter(Boolean).some((identifier) => identifier?.toString() === id);
  });

  if (!candidate) {
    throw new Error(`Candidate with id "${id}" not found`);
  }

  return candidate;
};

export const fetchTrendingCandidates = async (limit: number = 6): Promise<Candidate[]> => {
  const candidates = await fetchCandidateList();
  const sorted = [...candidates].sort((a, b) => (a.ballot_number ?? Number.MAX_SAFE_INTEGER) - (b.ballot_number ?? Number.MAX_SAFE_INTEGER));
  return sorted.slice(0, limit);
};

const buildGovernorate = (name: string, index: number): Governorate => ({
  id: index + 1,
  name_en: name,
  name_ar: GOVERNORATE_AR_NAMES[name] ?? name,
});

export const fetchGovernorates = async (): Promise<Governorate[]> => {
  const candidates = await fetchCandidateList();
  const uniqueGovernorates = Array.from(
    new Set(
      candidates
        .map((candidate) => candidate.governorate)
        .filter((value): value is string => Boolean(value && value.trim())),
    ),
  );

  return uniqueGovernorates.map((name, index) => buildGovernorate(name, index));
};

export const fetchStats = async (): Promise<Stats> => {
  const candidates = await fetchCandidateList();
  const totalCandidates = candidates.length;

  const genderDistribution = candidates.reduce(
    (acc, candidate) => {
      const gender = normaliseGender(candidate.gender);
      acc[gender] += 1;
      return acc;
    },
    { Male: 0, Female: 0 },
  );

  const governorateCounts = new Map<string, number>();
  candidates.forEach((candidate) => {
    const key = candidate.governorate ?? 'Unknown';
    governorateCounts.set(key, (governorateCounts.get(key) ?? 0) + 1);
  });

  const candidatesPerGovernorate = Array.from(governorateCounts.entries())
    .map(([governorate, count]) => ({
      governorate_name: governorate,
      candidate_count: count,
    }))
    .sort((a, b) => b.candidate_count - a.candidate_count);

  return {
    total_candidates: totalCandidates,
    gender_distribution: genderDistribution,
    candidates_per_governorate: candidatesPerGovernorate,
  };
};