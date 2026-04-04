"use client"

import { useMemo, useState } from 'react'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

const creatorContentTypes = [
  'Lifestyle',
  'Food',
  'Fashion',
  'Campus life',
  'Educational',
]

const managerQuestions = [
  { name: 'company', label: 'Company or team name', placeholder: 'Acme Marketing' },
  { name: 'role', label: 'Your role', placeholder: 'Campaign Manager' },
  { name: 'campaignType', label: 'Campaigns you manage', placeholder: 'UGC launches, creator partnerships, paid social' },
  { name: 'hoursPerWeek', label: 'Hours you can dedicate each week', placeholder: '5-8 hours' },
  { name: 'goals', label: 'What support do you need?', placeholder: 'Creator sourcing, campaign coordination, reporting' },
  { name: 'organizationExperience', label: 'Describe any experience in organizing people, events, or projects', placeholder: 'Student clubs, campaign teams, productions, events, or client work' },
]

const managerResponsibilities = [
  'Track creator progress weekly',
  'Follow up with team members',
  'Report updates',
  'Ensure deadlines are met',
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
  creatorContentTypes: [],
  company: '',
  role: '',
  campaignType: '',
  goals: '',
  organizationExperience: '',
  managerResponsibilities: [],
  notes: '',
}

export default function SignupPage() {
  const [signupType, setSignupType] = useState('student-creator')
  const [form, setForm] = useState(initialFields)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const toggleResponsibility = (responsibility, checked) => {
    setStatus({ type: '', message: '' })
    setForm((prev) => ({
      ...prev,
      managerResponsibilities: checked
        ? [...prev.managerResponsibilities, responsibility]
        : prev.managerResponsibilities.filter((item) => item !== responsibility),
    }))
  }

  const toggleCreatorContentType = (contentType, checked) => {
    setStatus({ type: '', message: '' })
    setForm((prev) => ({
      ...prev,
      creatorContentTypes: checked
        ? [...prev.creatorContentTypes, contentType]
        : prev.creatorContentTypes.filter((item) => item !== contentType),
    }))
  }

  const handleSubmit = async (event) => {
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

    if (signupType === 'student-creator' && form.creatorContentTypes.length === 0) {
      setStatus({ type: 'error', message: 'Please select at least one content type.' })
      return
    }

    if (signupType === 'campaign-manager' && form.managerResponsibilities.length === 0) {
      setStatus({ type: 'error', message: 'Please select at least one campaign manager responsibility.' })
      return
    }

    const roleLabel =
      signupType === 'student-creator' ? 'Student Creator Sign Up' : 'Campaign Manager Sign Up'

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signupType,
          roleLabel,
          form,
          questions,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: data?.error || 'Something went wrong while sending your signup. Please try again.',
        })
        return
      }

      setStatus({ type: 'success', message: 'Thanks. Your signup was sent successfully.' })
      setForm(initialFields)
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong while sending your signup. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MarketingPageLayout>
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-10 h-72 w-72 rounded-full bg-primary/14 blur-3xl" />
          <div className="absolute right-[-6%] top-0 h-96 w-96 rounded-full bg-secondary/16 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Sign Up</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-[3.2rem]">
              Tell us a bit about yourself.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#111111]/70">
              Choose your role and share a few details so we can understand how you would like to get involved.
            </p>
          </div>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
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
                <div key={question.name} className={question.name === 'interests' || question.name === 'goals' || question.name === 'organizationExperience' ? 'sm:col-span-2' : ''}>
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

            {signupType === 'student-creator' ? (
              <div>
                <p className="text-sm font-medium text-[#111111]">What type of content are you interested in creating?</p>
                <div className="mt-3 grid gap-3 rounded-2xl border border-primary/12 bg-[#fcfbff] p-4 sm:grid-cols-2">
                  {creatorContentTypes.map((contentType) => (
                    <label key={contentType} className="flex items-center gap-3 text-sm text-[#111111]">
                      <Checkbox
                        checked={form.creatorContentTypes.includes(contentType)}
                        onCheckedChange={(checked) => toggleCreatorContentType(contentType, checked === true)}
                      />
                      <span>{contentType}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {signupType === 'campaign-manager' ? (
              <div>
                <p className="text-sm font-medium text-[#111111]">Are you willing to</p>
                <div className="mt-3 grid gap-3 rounded-2xl border border-primary/12 bg-[#fcfbff] p-4">
                  {managerResponsibilities.map((responsibility) => (
                    <label key={responsibility} className="flex items-center gap-3 text-sm text-[#111111]">
                      <Checkbox
                        checked={form.managerResponsibilities.includes(responsibility)}
                        onCheckedChange={(checked) => toggleResponsibility(responsibility, checked === true)}
                      />
                      <span>{responsibility}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <label htmlFor="notes" className="text-sm font-medium text-[#111111]">Anything else?</label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={updateField('notes')}
                placeholder="Experience, timeline, or questions."
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
              <p className="text-sm text-[#111111]/60">Your details will be sent directly to our team.</p>
              <Button type="submit" size="lg" className="sm:min-w-40" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
