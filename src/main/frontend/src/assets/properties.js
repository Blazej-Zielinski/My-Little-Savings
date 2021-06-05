export const apiBaseURL = "http://localhost:8080/api/";
export const getCategoriesURL = apiBaseURL + "categories/getAll";
export const postCategory = apiBaseURL + "categories/add";
export const getTransactions = apiBaseURL + "transactions/getAll/{id}?id=";
export const postTransaction = apiBaseURL + "transactions/add/{id}?id=";
export const registerUserUrl = apiBaseURL + "register"
export const loginUserUrl = apiBaseURL + "login"
export const getLoggedUsernameUrl = apiBaseURL + "users/get"

export const authTokenName = "jwtToken";

export const unauthorizedMessage = "Unauthorized entry";
export const loggedOutMessage = "Logged out";

export const loggedRoutesPaths = [
    "/categories",
    "/transactions/:id",
    "/budgets",
    "/summary"
]