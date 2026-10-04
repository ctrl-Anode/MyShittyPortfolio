import http from './http';

export const portfolioApi = {
  profile: () => http.get('/portfolio/profile').then((r) => r.data.data),
  heroes: (params) => http.get('/portfolio/heroes', { params }).then((r) => r.data),
  hero: (params) => http.get('/portfolio/heroes', { params }).then((r) => (r.data.data?.[0] || null)),
  list: (section, params) => http.get(`/portfolio/${section}`, { params }).then((r) => r.data),
  contact: (payload) => http.post('/portfolio/contact', payload).then((r) => r.data.data),
  githubConfig: () => http.get('/portfolio/github/config').then((r) => r.data.data),

  admin: {
    list: (resource, params) => http.get(`/portfolio/admin/${resource}`, { params }).then((r) => r.data),
    get: (resource, id) => http.get(`/portfolio/admin/${resource}/${id}`).then((r) => r.data.data),
    create: (resource, payload) => http.post(`/portfolio/admin/${resource}`, payload).then((r) => r.data.data),
    update: (resource, id, payload) => http.patch(`/portfolio/admin/${resource}/${id}`, payload).then((r) => r.data.data),
    remove: (resource, id) => http.delete(`/portfolio/admin/${resource}/${id}`).then((r) => r.data),
    syncGithub: () => http.post('/portfolio/admin/github/sync').then((r) => r.data.data)
  }
};