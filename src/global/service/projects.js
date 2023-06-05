import API from "@/global/request/api.js";
import request from "@/global/request/axios.js";

const Projects = {
  getProjectList: (params) => {
    return request.get(API.projects, params);
  },
  getProjectDetail: (id) => {
    return request.get(`${API.projects}/${id}`);
  },
  postProject: (params) => {
    return request.post(API.projects, params);
  },
};

export default Projects;
