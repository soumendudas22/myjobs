import { URL } from "./url";

const SERVICE = {
  /**
   * 👉 Reuqest to signin user.
   * @param {String} email 
   * @param {String} password 
   * @returns 
   */
  LOGIN: async ({ email, password }) => {
    const res = await fetch(URL.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  },

  /**
   * 👉 Request to signup user
   * @param {String} email 
   * @param {String} password 
   * @param {String} confirmPassword 
   * @param {String} name 
   * @param {String} skills 
   * @param {Number} userRole where 0 is for employer and 1 is for job seeker
   * @returns JSON response
   */
  SIGNUP: async ({ email, password, confirmPassword, name, skills, userRole }) => {
    const res = await fetch(URL.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword, name, skills, userRole })
    });
    return await res.json();
  },

  /**
   * 👉 Request to reset the password
   * @param {String} email 
   * @returns JSON response
   */
  RESET_PASSWORD_TOKEN: async ({ email }) => {
    const res = await fetch(URL.RESET_PASSWORD_TOKEN + email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },

  /**
   * 👉 Reuqest for verification password token
   * @param {String} token 
   * @returns JSON response
   */
  VERIFY_PASSWORD_TOKEN: async ({ token }) => {
    const res = await fetch(URL.VERIFY_PASSWORD_TOKEN + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },

  /**
   * 👉 Request for changing the password
   * @param {String} token 
   * @param {String} password 
   * @param {String} confirmPassword 
   * @returns JSON response
   */
  CHANGE_PASSWORD: async ({ token, password, confirmPassword }) => {
    const res = await fetch(URL.CHANGE_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password, confirmPassword })
    });
    return await res.json();
  },

  /**
   * 👉 Request for Jobs posted by the recruiter
   * @param {String} token 
   * @returns JSON response
   */
  GET_JOBS_POSTED: async ({ token }) => {
    const res = await fetch(URL.GET_JOBS_POSTED, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
    });
    return await res.json();
  },

  /**
   * 👉 Request for getting the candidates of a job
   * @param {String} token 
   * @param {String} id 
   * @returns JSON response
   */
  GET_ONE_JOB_CANDIDATES: async ({ token, id }) => {
    const res = await fetch(URL.GET_ONE_JOB_CANDIDATES(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
    });
    return await res.json();
  },

  /**
   * 👉 Request for posting a job
   * @param {String} token 
   * @param {String} title 
   * @param {String} description 
   * @param {String} location 
   * @returns JSON response
   */
  JOB_POST: async ({ token, title, description, location }) => {
    const res = await fetch(URL.JOB_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({ title, description, location })
    });
    return await res.json();
  }
}

export {
  SERVICE
}