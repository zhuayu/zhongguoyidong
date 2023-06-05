import API from "@/global/request/api.js";
import request from "@/global/request/axios.js";

const Experts = {
  getExpertList: (params) => {
    return request.get(API.experts, params);
  },
  getExpertDetail: (id) => {
    return request.get(`${API.experts}/${id}`);
  },
  postExpert: (params) => {
    return request.post(API.experts, params);
  },
  getExpertProjectList: (id) => {
    return request.get(`${API.experts}/${id}/projects`);
  },
};

export default Experts;
