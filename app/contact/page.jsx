"use client"

import Link from 'next/link'
import { useState } from 'react'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Mail } from 'lucide-react'

const inquiryOptions = [
  'Platform Demo',
  'Campaign Planning',
  'Creator Discovery',
  'Partnership Inquiry',
  'Pricing / Custom Scope',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', msg: '' })

  const isEmailValid =
    form.email.trim().length === 0 ||
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())

  const updateField = (key) => (event) => {
    setStatus({ type: '', msg: '' })
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus({ type: '', msg: '' })

    if (!form.name.trim()) {
      setStatus({ type: 'error', msg: 'Please enter your name.' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setStatus({ type: 'error', msg: 'Please enter a valid email address.' })
      return
    }

    if (!form.inquiry.trim()) {
      setStatus({ type: 'error', msg: 'Please select an inquiry type.' })
      return
    }

    if (!form.message.trim()) {
      setStatus({ type: 'error', msg: 'Please enter a message.' })
      return
    }

    const subject = encodeURIComponent(`Klusters Inquiry: ${form.inquiry}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInquiry: ${form.inquiry}\n\nMessage:\n${form.message}`
    )

    window.location.href = `mailto:klustercompany@gmail.com?subject=${subject}&body=${body}`

    setStatus({ type: 'success', msg: 'Your email app is opening with this message.' })
    setForm({
      name: '',
      email: '',
      inquiry: '',
      message: '',
    })
  }

  return (
    <MarketingPageLayout>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-0 md:grid-cols-[1.08fr_0.92fr]">
            <div className="py-10 pr-0 md:pr-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Contact</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                Start the conversation.
              </h1>
              <p className="mt-5 max-w-md text-base font-semibold text-slate-600">
                Reach out any time.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                Whether you want a platform walkthrough, campaign planning support, or pricing information, send a note and we will follow up with the right next step.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={updateField('name')}
                    autoComplete="name"
                    className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#003A8C]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField('email')}
                    autoComplete="email"
                    className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#003A8C]"
                  />
                  {!isEmailValid ? (
                    <p className="mt-2 text-xs text-red-700">Please enter a valid email address.</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">What do you need?</label>
                  <select
                    name="inquiry"
                    value={form.inquiry}
                    onChange={updateField('inquiry')}
                    className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#003A8C]"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {inquiryOptions.map((option) => (
                      <option key={option} value={option} className="text-foreground">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-600">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Tell us a little about what you need."
                    value={form.message}
                    onChange={updateField('message')}
                    className="w-full resize-none border-b border-slate-300 bg-transparent py-2 text-sm text-foreground outline-none focus:border-[#003A8C]"
                  />
                </div>

                {status.msg ? (
                  <p className={`text-sm ${status.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
                    {status.msg}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#111111] px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#1f1f1f]"
                >
                  Send
                </button>
              </form>
            </div>

            <div className="relative mt-10 flex items-stretch justify-end md:mt-0">
              <div className="absolute right-0 top-8 h-[85%] w-8 rounded-l-lg bg-primary" />

              <div className="relative z-10 flex w-full translate-x-0 flex-col justify-between rounded-l-[2rem] bg-[#003A8C] px-10 py-12 text-white shadow-xl md:w-[80%] md:translate-x-[-1.5rem] lg:w-[72%]">
                <div className="absolute -top-3 left-10 h-6 w-6 rounded-sm bg-primary" />
                <div className="absolute -bottom-3 right-10 h-6 w-6 rounded-sm bg-primary" />

                <div>
                  <h2 className="text-xl font-semibold">Info</h2>

                  <div className="mt-8 space-y-6 text-sm">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-white/80" />
                      <div>
                        <p className="text-xs uppercase text-white/60">Email</p>
                        <p className="font-medium">klustercompany@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-white/80" />
                      <div>
                        <p className="text-xs uppercase text-white/60">Hours</p>
                        <p className="font-medium">Mon - Fri, 09:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/features" className="inline-flex items-center gap-2 text-sm font-medium text-white/88 transition hover:text-white">
                    <span>Explore the platform</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/15 transition hover:bg-white/18">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
