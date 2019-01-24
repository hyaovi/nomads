import axios from "axios";

const setAuthToken = token => {
  //If token exist apply to every request else delete this header
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
  //Delete header
  else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
