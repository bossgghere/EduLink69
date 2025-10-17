import api from '../services/api'

export async function fetchCourses() {
  const res = await api.get('/courses')
  // Use the array directly
  return res.data.courses
}
