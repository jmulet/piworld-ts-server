import { $http } from "./AjaxClient";

class AjaxService {
  
    login(model: any) {
        return $http.post("*/login.htm", model);
    }

    logout() {
        return $http.post("@/logout", {});
    }
}

export const $rest = new AjaxService();