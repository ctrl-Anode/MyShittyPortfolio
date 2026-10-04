<script setup>
import { computed, ref } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { ArrowRightIcon, EnvelopeIcon, ClockIcon } from '@heroicons/vue/24/outline';
import { portfolioApi } from '@/api/portfolio';
import { useToastStore } from '@/stores/toast';
import { useProfile } from '@/composables/useProfile';
import SocialLinks from '@/components/portfolio/ui/SocialLinks.vue';

const toast = useToastStore();
const { profile } = useProfile();
const sending = ref(false)

const emailAddress = computed(() => profile.value?.socials?.email || '');

const schema = yup.object({
  name: yup.string().required('Name is required').max(150),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  subject: yup.string().max(200),
  message: yup.string().required('Message is required')
});

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [subject, subjectAttrs] = defineField('subject');
const [message, messageAttrs] = defineField('message');

const onSubmit = handleSubmit(async (values) => {
  sending.value = true;
  try {
    await portfolioApi.contact(values);
    toast.success('Message sent', 'Thanks for reaching out — I will get back to you soon.');
    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';
  } catch (error) {
    toast.error('Could not send', error?.message || 'Something went wrong, please try again.');
  } finally {
    sending.value = false;
  }
});

const fieldClass = 'w-full rounded-lg border bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 dark:bg-neutral-900 dark:text-neutral-100';
const errorClass = 'border-red-400 focus:ring-red-400/30';
const normalClass = 'border-neutral-300 focus:border-accent-500 focus:ring-accent-500/20 dark:border-neutral-700';
</script>

<template>
  <section id="contact" class="scroll-mt-24 bg-neutral-50/60 dark:bg-neutral-900/30">
    <div class="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div class="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p v-reveal class="mono-label inline-flex items-center gap-2.5 text-accent-600 dark:text-accent-300">
            <span class="inline-block h-px w-6 bg-accent-500/70" aria-hidden="true" />
            Contact
          </p>
          <h2 v-reveal class="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Let's build something <span class="text-accent-600 dark:text-accent-300">together</span>
          </h2>
          <p v-reveal class="mt-5 max-w-md text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            Interested in working together or just want to say hi? My inbox is always open.
          </p>

          <ul v-reveal class="mt-8 space-y-3 text-sm">
            <li class="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
              <ClockIcon class="h-4 w-4 shrink-0 text-accent-500" />
              <span>Usually replies within 24–48 hours</span>
            </li>
            <li class="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
              <EnvelopeIcon class="h-4 w-4 shrink-0 text-accent-500" />
              <a v-if="emailAddress" :href="`mailto:${emailAddress}`" class="link-underline font-mono text-sm text-neutral-800 hover:text-accent-600 dark:text-neutral-100 dark:hover:text-accent-300">
                {{ emailAddress }}
              </a>
              <span v-else>Prefer email? It's listed in my profile.</span>
            </li>
          </ul>

          <div v-reveal class="mt-8">
            <SocialLinks :socials="profile?.socials || {}" />
          </div>
        </div>

        <form v-reveal="'right'" class="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-10" novalidate @submit="onSubmit">
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label class="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400" for="contact-name">Name</label>
              <input id="contact-name" v-model="name" v-bind="nameAttrs" type="text" placeholder="Anode Dev" :class="[fieldClass, errors.name ? errorClass : normalClass]">
              <p v-if="errors.name" class="mt-1.5 text-xs font-medium text-red-500">{{ errors.name }}</p>
            </div>
            <div>
              <label class="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400" for="contact-email">Email</label>
              <input id="contact-email" v-model="email" v-bind="emailAttrs" type="email" placeholder="anoddevsample@gmail.com" :class="[fieldClass, errors.email ? errorClass : normalClass]">
              <p v-if="errors.email" class="mt-1.5 text-xs font-medium text-red-500">{{ errors.email }}</p>
            </div>
          </div>

          <div class="mt-6">
            <label class="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400" for="contact-subject">
              Subject <span class="normal-case tracking-normal text-neutral-400 dark:text-neutral-500">(optional)</span>
            </label>
            <input id="contact-subject" v-model="subject" v-bind="subjectAttrs" type="text" placeholder="Question about a project" :class="[fieldClass, normalClass]">
          </div>

          <div class="mt-6">
            <label class="mb-2 block font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400" for="contact-message">Message</label>
            <textarea id="contact-message" v-model="message" v-bind="messageAttrs" rows="5" placeholder="Tell me about your project..." :class="[fieldClass, errors.message ? errorClass : normalClass]" />
            <p v-if="errors.message" class="mt-1.5 text-xs font-medium text-red-500">{{ errors.message }}</p>
          </div>

          <button
            type="submit"
            :disabled="sending"
            class="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {{ sending ? 'Sending…' : 'Send message' }}
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
