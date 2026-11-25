// In-memory demo data with the same response shapes as registrationsApi.js.

const FEES = { Exhibitor: 1500, Competitor: 2500, VIP: 5000 };

// [name, contact, email, address, carMakeModel, plateNumber, type, status, amountPaid]
const ROWS = [
  ["Juan Dela Cruz", "09171234567", "juan@example.com", "123 Rizal St., Naga City", "Toyota Supra MK4", "ABC 1234", "Competitor", "Confirmed", 1000],
  ["Maria Santos", "09181234568", "maria.santos@example.com", "45 Magsaysay Ave., Naga City", "Honda Civic EG", "DEF 2345", "Competitor", "CheckedIn", 2500],
  ["Pedro Reyes", "09191234569", "pedro.reyes@example.com", "12 Panganiban Dr., Naga City", "Nissan Skyline R34", "GHI 3456", "Competitor", "Confirmed", 2500],
  ["Ana Villanueva", "09201234570", "ana.v@example.com", "78 Peñafrancia Ave., Naga City", "Mazda RX-7 FD", "JKL 4567", "Competitor", "Pending", 0],
  ["Carlo Mendoza", "09211234571", "carlo.m@example.com", "9 Elias Angeles St., Naga City", "Subaru WRX STI", "MNO 5678", "Competitor", "CheckedIn", 2500],
  ["Liza Ramos", "09221234572", "liza.ramos@example.com", "301 Zero Ave., Legazpi City", "Mitsubishi Lancer Evo IX", "PQR 6789", "Competitor", "Confirmed", 1500],
  ["Mark Bautista", "09231234573", "mark.b@example.com", "56 Rizal St., Daraga, Albay", "Toyota AE86 Trueno", "STU 7890", "Competitor", "Cancelled", 0],
  ["Grace Aquino", "09241234574", "grace.aquino@example.com", "18 Burgos St., Sorsogon City", "Honda S2000", "VWX 8901", "Competitor", "Pending", 500],
  ["Jose Garcia", "09251234575", "jose.garcia@example.com", "22 Quezon Ave., Naga City", "Nissan 350Z", "YZA 9012", "Competitor", "Confirmed", 2500],
  ["Rica Navarro", "09261234576", "rica.n@example.com", "7 Del Rosario St., Naga City", "Mazda MX-5 NA", "BCD 0123", "Competitor", "CheckedIn", 2500],
  ["Paolo Castillo", "09271234577", "paolo.c@example.com", "64 Concepcion Pequeña, Naga City", "BMW M3 E46", "EFG 1357", "Competitor", "Confirmed", 1250],
  ["Jenny Flores", "09281234578", "jenny.f@example.com", "11 Abella St., Naga City", "Ford Mustang GT", "HIJ 2468", "Competitor", "Pending", 0],
  ["Ramon Cruz", "09291234579", "ramon.cruz@example.com", "90 Triangulo, Naga City", "Chevrolet Camaro", "KLM 3579", "Competitor", "Confirmed", 2500],
  ["Daisy Lopez", "09301234580", "daisy.l@example.com", "35 San Felipe, Naga City", "Toyota GR86", "NOP 4680", "Competitor", "CheckedIn", 2500],
  ["Arvin Soriano", "09311234581", "arvin.s@example.com", "2 Balatas Rd., Naga City", "Subaru BRZ", "QRS 5791", "Competitor", "Confirmed", 2500],
  ["Kevin Tan", "09321234582", "kevin.tan@example.com", "14 Sabang, Naga City", "Honda Integra Type R", "TUV 6802", "Exhibitor", "Confirmed", 1000],
  ["Nina Domingo", "09331234583", "nina.d@example.com", "27 Tinago, Naga City", "Nissan Silvia S15", "WXY 7913", "Exhibitor", "CheckedIn", 1000],
  ["Edgar Pascual", "09341234584", "edgar.p@example.com", "83 Carolina, Naga City", "Toyota Chaser JZX100", "ZAB 8024", "Exhibitor", "Pending", 0],
  ["Shiela Marquez", "09351234585", "shiela.m@example.com", "5 Mabolo, Naga City", "Mazda RX-8", "CDE 9135", "Exhibitor", "Cancelled", 0],
  ["Bryan Lim", "09361234586", "bryan.lim@example.com", "41 Sta. Cruz, Naga City", "Honda Civic FD2", "FGH 0246", "Exhibitor", "Pending", 500],
  ["Tina Alvarez", "09371234587", "tina.a@example.com", "19 Pacol, Naga City", "—", "—", "VIP", "Confirmed", 500],
  ["Rey Salazar", "09381234588", "rey.s@example.com", "66 Calauag, Naga City", "—", "—", "VIP", "Confirmed", 500],
  ["Hazel Diaz", "09391234589", "hazel.d@example.com", "8 Dayangdang, Naga City", "—", "—", "VIP", "Cancelled", 0],
  ["Noel Ocampo", "09401234590", "noel.o@example.com", "31 Cararayan, Naga City", "—", "—", "VIP", "CheckedIn", 500],
  ["Cathy Morales", "09411234591", "cathy.m@example.com", "50 Bagumbayan Sur, Naga City", "—", "—", "VIP", "Pending", 0],
];

const pad = (n, len) => String(n).padStart(len, "0");

const registrations = ROWS.map((r, i) => {
  const [participantName, contactNumber, email, address, carMakeModel, plateNumber, registrationType, status, amountPaid] = r;
  const registrationFee = FEES[registrationType];
  const paymentStatus =
    amountPaid >= registrationFee ? "Paid" : amountPaid > 0 ? "Partial" : "Unpaid";
  const day = pad((i % 28) + 1, 2);
  return {
    id: `00000000-0000-4000-8000-${pad(i + 1, 12)}`,
    registrationNumber: `CS27-${pad(i + 1, 4)}`,
    registrationDate: `2026-10-${day}T08:30:00Z`,
    participantName,
    contactNumber,
    email,
    address,
    carMakeModel,
    plateNumber,
    registrationType,
    status,
    registrationFee,
    amountPaid,
    paymentStatus,
  };
});

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/registrations
 * @param {{participantName?: string, type?: string, status?: string, page?: number, pageSize?: number}} params
 * @returns {Promise<{items: object[], page: number, pageSize: number, totalCount: number, totalPages: number}>}
 */
export async function getRegistrations({
  participantName = "",
  type = "",
  status = "",
  page = 1,
  pageSize = 10,
} = {}) {
  await delay();

  const search = participantName.trim().toLowerCase();
  const filtered = registrations.filter(
    (r) =>
      (!search || r.participantName.toLowerCase().includes(search)) &&
      (!type || r.registrationType === type) &&
      (!status || r.status === status)
  ).sort(
    (a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
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
export async function getSummary() {
  await delay();

  const count = (s) => registrations.filter((r) => r.status === s).length;
  const activeRegistrations = registrations.filter((r) => r.status !== "Cancelled");
  const totalFees = activeRegistrations.reduce((sum, r) => sum + r.registrationFee, 0);
  const totalPayments = activeRegistrations.reduce((sum, r) => sum + r.amountPaid, 0);

  return {
    totalRegistrations: registrations.length,
    confirmed: count("Confirmed"),
    checkedIn: count("CheckedIn"),
    pending: count("Pending"),
    cancelled: count("Cancelled"),
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  };
}

export async function createRegistration(registration) {
  await delay();

  const registrationType = registration.registrationType;
  const registrationFee = FEES[registrationType];
  if (!registrationFee) {
    throw new Error(`Unsupported registration type: ${registrationType}`);
  }

  const amountPaid = Number(registration.amountPaid ?? 0);
  const created = {
    ...registration,
    id: crypto.randomUUID(),
    registrationNumber: `CS27-${pad(registrations.length + 1, 4)}`,
    registrationDate: new Date().toISOString(),
    status: "Pending",
    registrationFee,
    amountPaid,
    paymentStatus:
      amountPaid >= registrationFee ? "Paid" : amountPaid > 0 ? "Partial" : "Unpaid",
  };
  registrations.unshift(created);
  return created;
}