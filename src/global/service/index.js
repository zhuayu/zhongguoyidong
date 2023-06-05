import API from "@/global/request/api.js";
import request from "@/global/request/axios.js";

const Index = {
  getIndex: () => {
    return request.get(API.index);
  },
};

export default Index;
