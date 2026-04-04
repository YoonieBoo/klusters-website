"use client"

import { useMemo, useState } from 'react'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const creatorQuestions = [
  { name: 'school', label: 'School or program', placeholder: 'Bangkok University' },
  { name: 'focusArea', label: 'Primary creative focus', placeholder: 'UGC, design, short-form video, copywriting' },
  { name: 'hoursPerWeek', label: 'Hours available each week', placeholder: '10-15 hours' },
  { name: 'portfolio', label: 'Portfolio or socials', placeholder: 'Instagram, TikTok, Behance, website' },
  { name: 'interests', label: 'What do you want to contribute?', placeholder: 'Campaign production, editing, research, community growth' },
]

const managerQuestions = [
  { name: 'company', label: 'Company or team name', placeholder: 'Acme Marketing' },
  { name: 'role', label: 'Your role', placeholder: 'Campaign Manager' },
  { name: 'campaignType', label: 'Campaigns you manage', placeholder: 'UGC launches, creator partnerships, paid social' },
  { name: 'hoursPerWeek', label: 'Hours you can dedicate each week', placeholder: '5-8 hours' },
  { name: 'goals', label: 'What support do you need?', placeholder: 'Creator sourcing, campaign coordination, reporting' },
]

const initialFields = {
  name: '',
  email: '',
  location: '',
  school: '',
  focusArea: '',
  hoursPerWeek: '',
  portfolio: '',
  interests: '',
  company: '',
  role: '',
  campaignType: '',
  goals: '',
  notes: '',
}

export default function SignupPage() {
  const [signupType, setSignupType] = useState('student-creator')
  const [form, setForm] = useState(initialFields)
  const [status, setStatus] = useState({ type: '', message: '' })

  const questions = useMemo(
    () => (signupType === 'student-creator' ? creatorQuestions : managerQuestions),
    [signupType]
  )

  const updateField = (key) => (event) => {
    setStatus({ type: '', message: '' })
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleTypeChange = (value) => {
    if (!value) return
    setStatus({ type: '', message: '' })
    setSignupType(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })

    if (!form.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    const missingQuestion = questions.find(({ name }) => !form[name].trim())
    if (missingQuestion) {
      setStatus({ type: 'error', message: `Please answer: ${missingQuestion.label}.` })
      return
    }

    const roleLabel =
      signupType === 'student-creator' ? 'Student Creator Sign Up' : 'Campaign Manager Sign Up'

    const details = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Location: ${form.location || 'Not provided'}`,
      `Signup Type: ${roleLabel}`,
      ...questions.map(({ label, name }) => `${label}: ${form[name]}`),
      `Additional Notes: ${form.notes || 'None'}`,
    ].join('\n')

    window.location.href = `mailto:klustercompany@gmail.com?subject=${encodeURIComponent(roleLabel)}&body=${encodeURIComponent(details)}`

    setStatus({ type: 'success', message: 'Your email app is opening with your signup details.' })
    setForm(initialFields)
  }

  return (
    <MarketingPageLayout>
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-10 h-72 w-72 rounded-full bg-primary/14 blur-3xl" />
          <div className="absolute right-[-6%] top-0 h-96 w-96 rounded-full bg-secondary/16 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="rounded-[2rem] border border-primary/10 bg-[#f8f1ff] p-8 shadow-[0_24px_60px_rgba(203,108,230,0.12)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Sign Up</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#111111] sm:text-5xl">
              Join Klusters in the role that fits your work.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#111111]/70">
              Choose whether you are applying as a student creator or a campaign manager, then share your availability, background, and what you want to contribute.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[#111111]/72">
              <div className="rounded-2xl border border-primary/12 bg-white/90 p-4">
                <p className="font-semibold text-[#111111]">Student creator</p>
                <p className="mt-1">Tell us about your skills, portfolio, and how many hours you can contribute each week.</p>
              </div>
              <div className="rounded-2xl border border-primary/12 bg-white/90 p-4">
                <p className="font-semibold text-[#111111]">Campaign manager</p>
                <p className="mt-1">Share your team context, campaign needs, and the time you can dedicate to collaboration.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-[0_28px_80px_rgba(17,17,17,0.08)] sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-semibold text-[#111111]">I am signing up as</label>
                <ToggleGroup
                  type="single"
                  value={signupType}
                  onValueChange={handleTypeChange}
                  className="mt-3 grid w-full grid-cols-2 overflow-hidden rounded-xl border border-primary/12 bg-[#f8f1ff] p-1"
                >
                  <ToggleGroupItem value="student-creator" className="rounded-lg text-sm data-[state=on]:bg-primary data-[state=on]:text-white">
                    Student Creator
                  </ToggleGroupItem>
                  <ToggleGroupItem value="campaign-manager" className="rounded-lg text-sm data-[state=on]:bg-primary data-[state=on]:text-white">
                    Campaign Manager
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-[#111111]">Full name</label>
                  <Input id="name" value={form.name} onChange={updateField('name')} placeholder="Your name" className="mt-2 h-11 border-primary/12 bg-[#fcfbff]" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-[#111111]">Email</label>
                  <Input id="email" type="email" value={form.email} onChange={updateField('email')} placeholder="you@example.com" className="mt-2 h-11 border-primary/12 bg-[#fcfbff]" />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="text-sm font-medium text-[#111111]">Location</label>
                <Input id="location" value={form.location} onChange={updateField('location')} placeholder="City, country" className="mt-2 h-11 border-primary/12 bg-[#fcfbff]" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {questions.map((question) => (
                  <div key={question.name} className={question.name === 'interests' || question.name === 'goals' ? 'sm:col-span-2' : ''}>
                    <label htmlFor={question.name} className="text-sm font-medium text-[#111111]">
                      {question.label}
                    </label>
                    <Input
                      id={question.name}
                      value={form[question.name]}
                      onChange={updateField(question.name)}
                      placeholder={question.placeholder}
                      className="mt-2 h-11 border-primary/12 bg-[#fcfbff]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label htmlFor="notes" className="text-sm font-medium text-[#111111]">Anything else we should know?</label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={updateField('notes')}
                  placeholder="Experience, preferred projects, target timeline, or questions."
                  className="mt-2 min-h-28 border-primary/12 bg-[#fcfbff]"
                />
              </div>

              {status.message ? (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    status.type === 'error'
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {status.message}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#111111]/60">
                  This form opens your email app with the answers prefilled.
                </p>
                <Button type="submit" size="lg" className="sm:min-w-40">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
