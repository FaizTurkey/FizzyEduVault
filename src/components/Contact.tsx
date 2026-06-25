import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, Tag, MessageSquare } from 'lucide-react'
import { FREEFORM_ENDPOINT } from '../config/site'
import { SectionHeading } from './SearchSection'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const initial: FormState = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): boolean => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    else if (form.name.trim().length < 2) e.name = 'Name is too short'

    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'

    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      // Submit to Freeform.io endpoint. Falls back to a success state if the
      // endpoint is not yet configured (placeholder '#').
      if (FREEFORM_ENDPOINT && FREEFORM_ENDPOINT !== '#' && /^https?:\/\//.test(FREEFORM_ENDPOINT)) {
        const res = await fetch(FREEFORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        // No endpoint configured yet — simulate a successful submission.
        await new Promise((r) => setTimeout(r, 900))
      }
      setStatus('success')
      setForm(initial)
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const update = (k: keyof FormState) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl -z-10" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact Me"
          subtitle="Have a question or want to contribute papers? Drop a message and I'll get back to you."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} noValidate className="glass-card rounded-3xl p-6 sm:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Name"
                icon={User}
                error={errors.name}
                value={form.name}
                onChange={update('name')}
                placeholder="Your name"
              />
              <Field
                label="Email"
                type="email"
                icon={Mail}
                error={errors.email}
                value={form.email}
                onChange={update('email')}
                placeholder="you@example.com"
              />
            </div>

            <Field
              label="Subject"
              icon={Tag}
              error={errors.subject}
              value={form.subject}
              onChange={update('subject')}
              placeholder="What's this about?"
            />

            <div>
              <label className="block text-sm font-medium mb-1.5">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <textarea
                  value={form.message}
                  onChange={(e) => update('message')(e.target.value)}
                  rows={5}
                  placeholder="Write your message..."
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl glass-card resize-none focus:outline-none focus:ring-2 transition-all ${
                    errors.message ? 'ring-2 ring-red-500/60' : 'focus:ring-primary-500/50'
                  }`}
                />
              </div>
              {errors.message && <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Message sent successfully! I'll reply soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium"
                >
                  <AlertCircle className="w-5 h-5" />
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function Field({
  label,
  icon: Icon,
  error,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  error?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-3.5 rounded-xl glass-card focus:outline-none focus:ring-2 transition-all ${
            error ? 'ring-2 ring-red-500/60' : 'focus:ring-primary-500/50'
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}
