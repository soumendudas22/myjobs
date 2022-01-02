const BASE_URL = 'https://jobs-api.squareboat.info/api/v1';

const URL = {
  LOGIN: BASE_URL + '/auth/login',
  REGISTER: BASE_URL + '/auth/register',
  RESET_PASSWORD_TOKEN: BASE_URL + '/auth/resetpassword?email=',
  VERIFY_PASSWORD_TOKEN: BASE_URL + '/auth/resetpassword/',
  CHANGE_PASSWORD: BASE_URL + '/auth/resetpassword',
  GET_JOBS_POSTED: BASE_URL + '/recruiters/jobs', 
  GET_ONE_JOB_CANDIDATES: (id) => BASE_URL + `/recruiters/jobs/${id}/candidates`,
  JOB_POST: BASE_URL + '/jobs',
}

export {
  URL
}