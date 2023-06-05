const API_PREFIX = import.meta.env.VITE_APP_API;
export default {
  experts: `${API_PREFIX}/api/admin/experts`,
  projects: `${API_PREFIX}/api/admin/projects`,
  index: `${API_PREFIX}/api/admin/index`,
};
