import axios from 'axios';
import type { Candidate, Governorate, PaginatedCandidates, Stats } from './types';

const DEFAULT_API_BASE_URL = 'https://winter-leaf-f532.safaribosafar.workers.dev';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

type CandidateQueryParams = {
  page?: number;
  limit?: number;
  query?: string;
  governorate?: string;
  gender?: 'Male' | 'Female';
  sort?: string;
};

type PortalQueryParams = {
  page: number;
  limit: number;
  province?: string;
  search?: string;
  gender?: string;
};

const sanitizeText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
};

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeGender = (value: unknown): Candidate['gender'] => {
  const normalized = sanitizeText(value).toLowerCase();

  if (normalized.startsWith('f') || normalized.startsWith('w')) {
    return 'Female';
  }

  return 'Male';
};

const normalizeCandidate = (raw: any, fallbackId: string): Candidate => {
  const id = sanitizeText(raw?.id ?? raw?.candidate_id ?? raw?.uuid ?? raw?._id) || fallbackId;
  const name = sanitizeText(
    raw?.name ??
      raw?.full_name ??
      raw?.candidate_name ??
      raw?.english_name ??
      raw?.arabic_name ??
      raw?.display_name,
  );
  const governorate = sanitizeText(
    raw?.governorate ??
      raw?.governorate_name ??
      raw?.province ??
      raw?.region ??
      raw?.governorate_en ??
      raw?.location,
  );
  const party = sanitizeText(
    raw?.party ??
      raw?.party_name ??
      raw?.political_party ??
      raw?.alliance ??
      raw?.party_en ??
      raw?.affiliation,
  );
  const nominationType = sanitizeText(
    raw?.nomination_type ??
      raw?.nominationType ??
      raw?.list_type ??
      raw?.category ??
      raw?.position ??
      raw?.seat_type,
  );
  const ballotNumber = toNumber(
    raw?.ballot_number ??
      raw?.ballotNumber ??
      raw?.ballot_no ??
      raw?.list_number ??
      raw?.ballot ??
      raw?.number,
    0,
  );
  const gender = normalizeGender(raw?.gender ?? raw?.sex ?? raw?.gender_label ?? raw?.gender_en);

  return {
    id,
    name: name || `Candidate ${id}`,
    gender,
    governorate: governorate || 'Unknown Governorate',
    party: party || 'Independent',
    nomination_type: nominationType || 'General',
    ballot_number: ballotNumber,
  };
};

const extractCandidateList = (payload: any): any[] => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.candidates)) {
    return payload.candidates;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (payload?.candidate) {
    return [payload.candidate];
  }

  return [];
};

const normalizePaginatedPayload = (
  payload: any,
  fallbackPage: number,
  fallbackLimit: number,
): PaginatedCandidates => {
  const rawCandidates = extractCandidateList(payload);
  const normalizedCandidates = rawCandidates.map((candidate, index) =>
    normalizeCandidate(candidate, `candidate-${fallbackPage}-${index}`),
  );

  const pagination = payload?.pagination ?? {};
  const page = Math.max(1, toNumber(payload?.page ?? pagination.page, fallbackPage));
  const limit = Math.max(1, toNumber(payload?.limit ?? pagination.limit, fallbackLimit));
  const total = toNumber(payload?.total ?? pagination.total, normalizedCandidates.length);

  return {
    data: normalizedCandidates,
    total: total >= normalizedCandidates.length ? total : normalizedCandidates.length,
    page,
    limit,
  };
};

const applyLocalFilters = (candidates: Candidate[], params: CandidateQueryParams): Candidate[] => {
  let filtered = candidates;

  if (params.query) {
    const query = params.query.toLowerCase();
    filtered = filtered.filter((candidate) => {
      const name = candidate.name.toLowerCase();
      const party = candidate.party.toLowerCase();
      const governorate = candidate.governorate.toLowerCase();

      return name.includes(query) || party.includes(query) || governorate.includes(query);
    });
  }

  if (params.governorate) {
    const governorate = params.governorate.toLowerCase();
    filtered = filtered.filter((candidate) => candidate.governorate.toLowerCase() === governorate);
  }

  if (params.gender) {
    filtered = filtered.filter((candidate) => candidate.gender === params.gender);
  }

  if (params.sort) {
    const sortKey = params.sort.toLowerCase();

    if (sortKey.includes('name') && sortKey.includes('desc')) {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortKey.includes('name')) {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey.includes('ballot') && sortKey.includes('desc')) {
      filtered = [...filtered].sort((a, b) => b.ballot_number - a.ballot_number);
    } else if (sortKey.includes('ballot')) {
      filtered = [...filtered].sort((a, b) => a.ballot_number - b.ballot_number);
    }
  }

  return filtered;
};

const omitUndefined = (input: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  );

const fetchPortalCandidatesPage = async (params: PortalQueryParams): Promise<PaginatedCandidates> => {
  const response = await api.get('/portal/candidates', {
    params: omitUndefined({
      page: params.page,
      limit: params.limit,
      province: params.province,
      search: params.search,
      gender: params.gender,
    }),
  });

  return normalizePaginatedPayload(response.data, params.page, params.limit);
};

const fetchAllPortalCandidates = async (pageSize = 200, maxPages = 10): Promise<Candidate[]> => {
  const allCandidates: Candidate[] = [];
  let page = 1;

  while (page <= maxPages) {
    let pageResult: PaginatedCandidates;

    try {
      pageResult = await fetchPortalCandidatesPage({
        page,
        limit: pageSize,
      });
    } catch (error) {
      break;
    }

    if (pageResult.data.length === 0) {
      break;
    }

    allCandidates.push(...pageResult.data);

    if (allCandidates.length >= pageResult.total || pageResult.data.length < pageSize) {
      break;
    }

    page += 1;
  }

  return allCandidates;
};

const tryFetchCandidateFromPortal = async (id: string): Promise<Candidate | null> => {
  try {
    const directResponse = await api.get(`/portal/candidates/${id}`);
    const candidatePayload = extractCandidateList(directResponse.data)[0];

    if (candidatePayload) {
      return normalizeCandidate(candidatePayload, id);
    }
  } catch (error) {
    // Ignore direct lookup failures – we will fall back to a search request.
  }

  try {
    const searchResponse = await fetchPortalCandidatesPage({
      page: 1,
      limit: 200,
      search: id,
    });

    const directMatch = searchResponse.data.find((candidate) => candidate.id === id);
    if (directMatch) {
      return directMatch;
    }

    const nameMatch = searchResponse.data.find(
      (candidate) => candidate.name.toLowerCase() === id.toLowerCase(),
    );

    if (nameMatch) {
      return nameMatch;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Portal candidate lookup fallback failed for id ${id}:`, error);
    }
  }

  return null;
};

export const fetchCandidates = async (params: CandidateQueryParams): Promise<PaginatedCandidates> => {
  const page = params.page ?? 1;
  const limit = params.limit ?? 12;

  try {
    const portalResult = await fetchPortalCandidatesPage({
      page,
      limit,
      province: params.governorate,
      search: params.query,
      gender: params.gender,
    });

    const filteredData = applyLocalFilters(portalResult.data, params);
    const requiresLocalTotal = Boolean(params.query || params.governorate || params.gender || params.sort);

    return {
      data: filteredData,
      total: requiresLocalTotal ? filteredData.length : portalResult.total,
      page,
      limit,
    };
  } catch (portalError) {
    try {
      const { data } = await api.get('/api/candidates', {
        params: omitUndefined({
          page,
          limit,
          query: params.query,
          governorate: params.governorate,
          sex: params.gender,
          sort: params.sort,
        }),
      });

      const normalized = normalizePaginatedPayload(data, page, limit);
      const filteredData = applyLocalFilters(normalized.data, params);
      const requiresLocalTotal = Boolean(params.query || params.governorate || params.gender || params.sort);

      return {
        data: filteredData,
        total: requiresLocalTotal ? filteredData.length : normalized.total,
        page: normalized.page,
        limit: normalized.limit,
      };
    } catch (legacyError) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch candidates from live API:', portalError);
        console.error('Legacy endpoint also failed:', legacyError);
      }

      return {
        data: [],
        total: 0,
        page,
        limit,
      };
    }
  }
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  try {
    const { data } = await api.get(`/api/candidates/${id}`);
    return normalizeCandidate(data, id);
  } catch (legacyError) {
    const portalCandidate = await tryFetchCandidateFromPortal(id);

    if (portalCandidate) {
      return portalCandidate;
    }

    throw legacyError;
  }
};

export const fetchTrendingCandidates = async (limit = 6): Promise<Candidate[]> => {
  try {
    const { data } = await api.get('/api/trending', { params: { limit } });
    const candidates = extractCandidateList(data).map((candidate, index) =>
      normalizeCandidate(candidate, `trending-${index}`),
    );

    if (candidates.length > 0) {
      return candidates.slice(0, limit);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Falling back to portal candidates for trending data:', error);
    }
  }

  const fallback = await fetchCandidates({ page: 1, limit });
  return fallback.data.slice(0, limit);
};

const mapGovernorateRecord = (record: any, index: number): Governorate => {
  const id = Math.max(1, toNumber(record?.id ?? record?.governorate_id, index + 1));
  const nameEn = sanitizeText(
    record?.name_en ??
      record?.name ??
      record?.governorate ??
      record?.province ??
      record?.governorate_en,
  );
  const nameAr = sanitizeText(record?.name_ar ?? record?.arabic_name ?? record?.nameArabic ?? nameEn);

  return {
    id,
    name_en: nameEn || `Governorate ${id}`,
    name_ar: nameAr || nameEn || `Governorate ${id}`,
  };
};

const deriveGovernoratesFromCandidates = (candidates: Candidate[]): Governorate[] => {
  const unique = new Map<string, Governorate>();
  let counter = 1;

  candidates.forEach((candidate) => {
    const key = candidate.governorate.trim();

    if (!key) {
      return;
    }

    if (!unique.has(key)) {
      unique.set(key, {
        id: counter,
        name_en: key,
        name_ar: key,
      });

      counter += 1;
    }
  });

  return Array.from(unique.values());
};

export const fetchGovernorates = async (): Promise<Governorate[]> => {
  try {
    const { data } = await api.get('/api/governorates');

    if (Array.isArray(data) && data.length > 0) {
      return data.map((record, index) => mapGovernorateRecord(record, index));
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Falling back to portal candidates for governorate data:', error);
    }
  }

  const candidates = await fetchAllPortalCandidates();
  return deriveGovernoratesFromCandidates(candidates);
};

const computeStatsFromCandidates = (candidates: Candidate[]): Stats => {
  const genderDistribution: Stats['gender_distribution'] = { Male: 0, Female: 0 };
  const governorateMap = new Map<string, number>();

  candidates.forEach((candidate) => {
    genderDistribution[candidate.gender] += 1;
    const key = candidate.governorate.trim() || 'Unknown';
    governorateMap.set(key, (governorateMap.get(key) ?? 0) + 1);
  });

  return {
    total_candidates: candidates.length,
    gender_distribution: genderDistribution,
    candidates_per_governorate: Array.from(governorateMap.entries()).map(
      ([governorate_name, candidate_count]) => ({
        governorate_name,
        candidate_count,
      }),
    ),
  };
};

export const fetchStats = async (): Promise<Stats> => {
  try {
    const { data } = await api.get('/api/stats');

    if (data) {
      const total = toNumber(data.total_candidates, data.total ?? data.count ?? 0);
      const male = toNumber(data.gender_distribution?.Male ?? data.gender_distribution?.male, 0);
      const female = toNumber(data.gender_distribution?.Female ?? data.gender_distribution?.female, 0);
      const perGovernorateSource = Array.isArray(data.candidates_per_governorate)
        ? data.candidates_per_governorate
        : Array.isArray(data.governorates)
        ? data.governorates
        : [];

      const candidatesPerGovernorate = perGovernorateSource.map((item: any) => ({
        governorate_name: sanitizeText(
          item?.governorate_name ?? item?.governorate ?? item?.name ?? item?.governorate_en,
        ) || 'Unknown Governorate',
        candidate_count: toNumber(item?.candidate_count ?? item?.total ?? item?.count, 0),
      }));

      return {
        total_candidates: total,
        gender_distribution: { Male: male, Female: female },
        candidates_per_governorate: candidatesPerGovernorate,
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Falling back to derived statistics from portal candidates:', error);
    }
  }

  const candidates = await fetchAllPortalCandidates();
  return computeStatsFromCandidates(candidates);
};
