export const apiBaseURL = "http://localhost:8080/api/";
export const getCategoriesURL = apiBaseURL + "categories/getAll";
export const postCategory = apiBaseURL + "categories/add";
export const getTransactions = apiBaseURL + "transactions/getAll/{id}?id=";
export const postTransaction = apiBaseURL + "transactions/add/{id}?id=";
export const registerUserUrl = apiBaseURL + "register"
export const jwtConfig =  {
    headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiQmxhemVqIiwidXNlcklEIjoxLCJyb2xlIjoiUk9MRV9QUkVNSVVNIiwiaWF0IjoxNjIyNDk1MTQ1LCJleHAiOjE2MjI0OTcxNDV9.2jP_WsQvgNIGONeSQklWGmMKXxKq_FPUtICRAEickectGIYKSJuo1CtfYOKT0YRuoMyKijsU36dIqiq7ZEPizw"
    }
}

export const jwt = "eyJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoiQmxhemVqIiwidXNlcklEIjoxLCJyb2xlIjoiUk9MRV9QUkVNSVVNIiwiaWF0IjoxNjIyNDk2OTc0LCJleHAiOjE2MjI0OTg5NzR9.nk3bZBwVfZ-v8xN-g4vu1220RLnDof2kS9C4b-alyqGzcLqaaixTf41XsVHom2U3cCU5WslzY15SfG7Sur6lSQ"
export const heroku = "https://cors-anywhere.herokuapp.com/"