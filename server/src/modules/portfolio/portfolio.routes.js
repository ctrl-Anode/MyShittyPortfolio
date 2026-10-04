import { Router } from 'express';
import * as controller from './portfolio.controller.js';
import * as v from './portfolio.validation.js';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { apiLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

/* @openapi
  /portfolio/profile:
    get:
      tags: [Portfolio]
      summary: Public portfolio profile (hero / about)
      security: []
      responses:
        200: { description: Profile }
*/
router.get('/profile', controller.getProfile);

/* @openapi
  /portfolio/heroes:
    get:
      tags: [Portfolio]
      summary: Public list of heroes
      security: []
      responses:
        200: { description: Heroes }
*/
router.get('/heroes', validate({ query: v.listQuerySchema }), controller.listHeroes);

/* @openapi
  /portfolio/experiences:
    get:
      tags: [Portfolio]
      summary: Public list of work experiences
      security: []
      responses:
        200: { description: Experiences }
*/
router.get('/experiences', validate({ query: v.listQuerySchema }), controller.listExperiences);

/* @openapi
  /portfolio/projects:
    get:
      tags: [Portfolio]
      summary: Public list of published projects
      security: []
      responses:
        200: { description: Projects }
*/
router.get('/projects', validate({ query: v.listQuerySchema }), controller.listProjects);

/* @openapi
  /portfolio/skills:
    get:
      tags: [Portfolio]
      summary: Public list of skills
      security: []
      responses:
        200: { description: Skills }
*/
router.get('/skills', validate({ query: v.listQuerySchema }), controller.listSkills);

/* @openapi
  /portfolio/certificates:
    get:
      tags: [Portfolio]
      summary: Public list of certificates
      security: []
      responses:
        200: { description: Certificates }
*/
router.get('/certificates', validate({ query: v.listQuerySchema }), controller.listCertificates);

/* @openapi
  /portfolio/github:
    get:
      tags: [Portfolio]
      summary: Public list of GitHub repositories
      security: []
      responses:
        200: { description: Repositories }
*/
router.get('/github', validate({ query: v.listQuerySchema }), controller.listGithub);

/* @openapi
  /portfolio/testimonials:
    get:
      tags: [Portfolio]
      summary: Public list of testimonials
      security: []
      responses:
        200: { description: Testimonials }
*/
router.get('/testimonials', validate({ query: v.listQuerySchema }), controller.listTestimonials);

/* @openapi
  /portfolio/contact:
    post:
      tags: [Portfolio]
      summary: Submit a contact message (public)
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name: { type: string }
                email: { type: string }
                subject: { type: string }
                message: { type: string }
      responses:
        201: { description: Created }
*/
router.post('/contact', apiLimiter, validate({ body: v.createSchemas.contact }), controller.createContactMessage);

/* @openapi
  /portfolio/github/config:
    get:
      tags: [Portfolio]
      summary: Public GitHub sync configuration flags (no secrets)
      security: []
      responses:
        200: { description: Config }
*/
router.get('/github/config', controller.githubConfig);

/* @openapi
  /portfolio/admin/github/sync:
    post:
      tags: [Portfolio]
      summary: Pull repositories from GitHub and merge into the repo list
      description: Requires permission "portfolio:manage". Needs GITHUB_USERNAME configured.
      security: [{ bearerAuth: [] }]
      responses:
        200: { description: Repositories synced }
        400: { description: GITHUB_USERNAME not configured }
*/
router.post(
  '/admin/github/sync',
  authenticate,
  authorize('portfolio:manage'),
  controller.syncGithub
);

/* @openapi
  /portfolio/admin/{resource}:
    get:
      tags: [Portfolio]
      summary: Admin list of a portfolio resource (experiences, projects, skills, certificates, github, testimonials, contact, profile)
      security: [{ bearerAuth: [] }]
      parameters:
        - { in: path, name: resource, required: true, schema: { type: string, enum: [experience, project, skill, certificate, github, testimonial, contact, profile, hero] } }
      responses:
        200: { description: Paginated rows }
        403: { $ref: '#/components/responses/Forbidden' }
*/
const admin = Router();
admin.use(authenticate, authorize('portfolio:manage'));

admin.get('/:resource', validate({ params: v.resourceParamSchema, query: v.listQuerySchema }), controller.adminList);
admin.get('/:resource/:id', validate({ params: v.resourceIdParamSchema }), controller.adminGet);
admin.post('/:resource', validate({ params: v.resourceParamSchema }), controller.adminCreate);
admin.patch('/:resource/:id', validate({ params: v.resourceIdParamSchema }), controller.adminUpdate);
admin.delete('/:resource/:id', validate({ params: v.resourceIdParamSchema }), controller.adminDelete);

router.use('/admin', admin);

export default router;