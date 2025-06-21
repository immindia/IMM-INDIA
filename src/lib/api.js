const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL is not defined. Please check your .env file."
  );
}

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  API: `${API_BASE_URL}/api`,
  UPLOADS: `${API_BASE_URL}/api/uploads`,
  AWARDS: `${API_BASE_URL}/api/index.php?category=Award`,
  NATIONAL_RESEARCH: `${API_BASE_URL}/api/index.php?category=National`,
  INTERNATIONAL_RESEARCH: `${API_BASE_URL}/api/index.php?category=International`,
  GALLERY: `${API_BASE_URL}/api/index.php`,
  FACULTY: `${API_BASE_URL}/api/indexFaculty.php`,
  CAREER: `${API_BASE_URL}/api/indexCareer.php?scope=active`,
  CAREER_DETAILS: `${API_BASE_URL}/api/indexCareer.php`,
  JOB_APPLICATION: `${API_BASE_URL}/api/indexJobApplication.php`,
  HALL_OF_FAME: `${API_BASE_URL}/api/indexPlacement.php?category=${encodeURIComponent(
    "Hall of Fame"
  )}`,
  DAZZLING_DIVAS: `${API_BASE_URL}/api/indexPlacement.php?category=${encodeURIComponent(
    "Dazzling Divas"
  )}`,
  SUMMER_PLACEMENT: `${API_BASE_URL}/api/indexPlacement.php?category=${encodeURIComponent(
    "Summer Placement"
  )}`,
  RECRUITERS: `${API_BASE_URL}/api/indexRecruiter.php`,
  CONTACT: `${API_BASE_URL}/api/indexContact.php`,
  RECRUIT_AND_PARTNER: `${API_BASE_URL}/api/indexRecruitAndPartner.php`,
  EVENTS: `${API_BASE_URL}/api/index2.php?resource=events`,
  CLUBS: `${API_BASE_URL}/api/index3.php?resource=clubs`,
};
