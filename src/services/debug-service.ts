import apiClient from "./api-client";

interface Value {
  value: string;
}

export interface Data {
  value: Value;
  variable: string;
}

interface Request {
  code: string;
}

class Debug {
  getDebugResponse(code: Request) {
    const response = apiClient.post<Data[]>("createAST/", code);
    return response;
  }
}

export default new Debug();
