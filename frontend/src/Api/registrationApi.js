import * as sampleData from '../api/sample-data.js';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
const INCLUDE_SAMPLE_DATA = import.meta.env.VITE_REGISTRATIONS_SOURCE === "sample";
const API_PAGE_SIZE = 50;

/** Turn a ProblemDetails / validation response into a readable message. */
async function toError(response) {
  let message = `Request failed (${response.status}).`;
  try {
    const problem = await response.json();
    if (problem?.errors && typeof problem.errors === "object") {
      const lines = Object.entries(problem.errors).flatMap(([field, msgs]) =>
        (Array.isArray(msgs) ? msgs : [msgs]).map((m) => `${field}: ${m}`)
      );
      if (lines.length) message = lines.join("\n");
    } else if (problem?.detail || problem?.title) {
      message = problem.detail || problem.title;
    }
  } catch {
    // body was not JSON; keep the generic message
  }
  const error = new Error(message);
  error.status = response.status;
  return error;
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the server. Check your connection and try again.");
  }
  if (!response.ok) throw await toError(response);
  if (response.status === 204) return null;
  return response.json();
}

/**
 * GET /api/registrations?participantName=&type=&status=&page=&pageSize=
 * @returns {Promise<{items: object[], page: number, pageSize: number, totalCount: number, totalPages: number}>}
 */
async function getApiRegistrations({
  participantName = "",
  type = "",
  status = "",
  page = 1,
  pageSize = 10,
} = {}) {
  const params = new URLSearchParams();
  if (participantName) params.set("participantName", participantName);
  if (type) params.set("type", type);
  if (status) params.set("status", status);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  return request(`/api/registrations?${params}`);
}

async function getAllApiRegistrations() {
  const firstPage = await getApiRegistrations({ page: 1, pageSize: API_PAGE_SIZE });
  const items = [...firstPage.items];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    const result = await getApiRegistrations({ page, pageSize: API_PAGE_SIZE });
    items.push(...result.items);
  }

  return items;
}

async function getCombinedRegistrations() {
  const [sampleResult, apiItems] = await Promise.all([
    sampleData.getRegistrations({ page: 1, pageSize: API_PAGE_SIZE }),
    getAllApiRegistrations(),
  ]);
  const byRegistrationNumber = new Map(
    sampleResult.items.map((registration) => [
      `DEMO-${registration.registrationNumber}`,
      { ...registration, registrationNumber: `DEMO-${registration.registrationNumber}` },
    ])
  );
  apiItems.forEach((registration) => {
    byRegistrationNumber.set(registration.registrationNumber, registration);
  });

  return [...byRegistrationNumber.values()].sort(
    (a, b) =>
      new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
  );
}

export async function getRegistrations(filters = {}) {
  if (!INCLUDE_SAMPLE_DATA) return getApiRegistrations(filters);

  const {
    participantName = "",
    type = "",
    status = "",
    page = 1,
    pageSize = 10,
  } = filters;
  const search = participantName.trim().toLowerCase();
  const filtered = (await getCombinedRegistrations()).filter(
    (registration) =>
      (!search || registration.participantName.toLowerCase().includes(search)) &&
      (!type || registration.registrationType === type) &&
      (!status || registration.status === status)
  );
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalCount,
    totalPages,
  };
}

/**
 * GET /api/registrations/summary
 * @returns {Promise<{totalRegistrations: number, confirmed: number, checkedIn: number, pending: number, cancelled: number, totalFees: number, totalPayments: number, uncollectedPayments: number}>}
 */
async function getApiSummary() {
  return request("/api/registrations/summary");
}

export async function getSummary() {
  if (!INCLUDE_SAMPLE_DATA) return getApiSummary();

  const registrations = await getCombinedRegistrations();
  const activeRegistrations = registrations.filter(
    (registration) => registration.status !== "Cancelled"
  );
  const totalFees = activeRegistrations.reduce(
    (sum, registration) => sum + registration.registrationFee,
    0
  );
  const totalPayments = activeRegistrations.reduce(
    (sum, registration) => sum + registration.amountPaid,
    0
  );

  return {
    totalRegistrations: registrations.length,
    confirmed: registrations.filter((registration) => registration.status === "Confirmed").length,
    checkedIn: registrations.filter((registration) => registration.status === "CheckedIn").length,
    pending: registrations.filter((registration) => registration.status === "Pending").length,
    cancelled: registrations.filter((registration) => registration.status === "Cancelled").length,
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  };
}

export async function createRegistration(registration) {
  return request("/api/registrations", {
    method: "POST",
    body: JSON.stringify(registration),
  });
}