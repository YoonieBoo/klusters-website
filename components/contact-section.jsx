"use client"

import { useState } from 'react'
import { Clock, Mail } from 'lucide-react'

const contactOptions = [
  'Platform Demo',
  'Campaign Planning',
  'Creator Discovery',
  'Launch Support',
  'Custom Scope / Pricing',
]

export function ContactSection({ className = '' }) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    inquiry: '',
    message: '',
  })
  const [contactStatus, setContactStatus] = useState({ type: '', msg: '' })

  const isContactEmailValid =
    contactForm.email.trim().length === 0 ||
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactForm.email.trim())

  const updateContactField = (key) => (event) => {
    setContactStatus({ type: '', msg: '' })
    setContactForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    setContactStatus({ type: '', msg: '' })

    if (!contactForm.name.trim()) {
      setContactStatus({ type: 'error', msg: 'Please enter your name.' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactForm.email.trim())) {
      setContactStatus({ type: 'error', msg: 'Please enter a valid email address.' })
      return
    }

    if (!contactForm.inquiry.trim()) {
      setContactStatus({ type: 'error', msg: 'Please select an inquiry type.' })
      return
    }

    if (!contactForm.message.trim()) {
      setContactStatus({ type: 'error', msg: 'Please enter a message.' })
      return
    }

    const subject = encodeURIComponent(`Klusters Inquiry: ${contactForm.inquiry}`)
    const body = encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\nInquiry: ${contactForm.inquiry}\n\nMessage:\n${contactForm.message}`
    )

    window.location.href = `mailto:klustercompany@gmail.com?subject=${subject}&body=${body}`

    setContactStatus({ type: 'success', msg: 'Your email app is opening with this message.' })
    setContactForm({
      name: '',
      email: '',
      inquiry: '',
      message: '',
    })
  }

  return (
    <section className={`px-4 pb-20 pt-6 sm:px-6 lg:px-8 ${className}`.trim()}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-0">
          <div className="py-8 pr-0 lg:pr-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Contact Us</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Start the conversation.
            </h2>
            <p className="mt-4 max-w-md text-base font-semibold text-slate-600 sm:text-lg">
              Feel free to reach out any time.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              Whether you want a platform walkthrough, pricing details, or support for an upcoming campaign, we will get back to you as soon as we can.
            </p>

            <form onSubmit={handleContactSubmit} noValidate className="mt-8 space-y-6">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={updateContactField('name')}
                  autoComplete="name"
                  className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#0B1C33]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={contactForm.email}
                  onChange={updateContactField('email')}
                  autoComplete="email"
                  className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#0B1C33]"
                />
                {!isContactEmailValid ? (
                  <p className="mt-2 text-xs text-red-700">Please enter a valid email address.</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">What do you need?</label>
                <select
                  name="inquiry"
                  value={contactForm.inquiry}
                  onChange={updateContactField('inquiry')}
                  className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#0B1C33]"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {contactOptions.map((option) => (
                    <option key={option} value={option} className="text-foreground">
                      {option}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  This helps us respond with the right information and next step.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">Message</label>
                <textarea
                  rows={3}
                  name="message"
                  placeholder="Tell us a little about what you need."
                  value={contactForm.message}
                  onChange={updateContactField('message')}
                  className="w-full resize-none border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#0B1C33]"
                />
              </div>

              {contactStatus.msg ? (
                <p className={`text-sm ${contactStatus.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
                  {contactStatus.msg}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#004aad] px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#003a8c]"
              >
                Send
              </button>
            </form>
          </div>

          <div className="relative mt-8 flex items-stretch justify-end lg:mt-0">
            <div className="absolute right-0 top-8 h-[85%] w-8 rounded-l-lg bg-[#004aad]" />

            <div className="relative z-10 flex w-full translate-x-0 flex-col justify-between rounded-l-3xl bg-white px-6 py-8 text-[#111111] shadow-xl sm:px-8 sm:py-10 lg:w-[70%] lg:translate-x-[-1.5rem] lg:px-10 lg:py-12">
              <div className="absolute -top-3 left-6 h-6 w-6 rounded-sm bg-[#004aad] sm:left-8 lg:left-10" />
              <div className="absolute -bottom-3 right-6 h-6 w-6 rounded-sm bg-[#004aad] sm:right-8 lg:right-10" />

              <div>
                <h3 className="mb-8 text-xl font-semibold text-[#111111]">Info</h3>

                <div className="space-y-6 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs uppercase text-slate-500">Email</p>
                      <p className="font-medium text-[#111111]">klustercompany@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs uppercase text-slate-500">Hours</p>
                      <p className="font-medium text-[#111111]">Mon - Fri, 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
