"use client"

import { useMemo, useState } from 'react'
import { MarketingPageLayout } from '@/components/marketing-page-layout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const creatorQuestions = [
  { name: 'nickname', label: 'Nickname', placeholder: 'Ning' },
  { name: 'school', label: 'University / Faculty / Program', placeholder: 'Bangkok University / Communication Arts / Digital Marketing' },
  { name: 'year', label: 'Year', type: 'select', placeholder: 'Select year', options: ['1', '2', '3', '4'] },
  { name: 'phoneNumber', label: 'Phone number', placeholder: '+66 8X-XXX-XXXX' },
  { name: 'preferredContact', label: 'LINE ID / Preferred contact', placeholder: 'lineid123 or WhatsApp' },
  { name: 'instagramHandle', label: 'Instagram handle', placeholder: '@yourhandle' },
  { name: 'tiktokHandle', label: 'TikTok handle', placeholder: '@yourhandle' },
  { name: 'otherPlatforms', label: 'Other platforms (optional)', placeholder: 'YouTube, Lemon8, X', optional: true },
  { name: 'focusArea', label: 'Primary creative focus', placeholder: 'UGC, design, short-form video, copywriting' },
  { name: 'followers', label: 'How many followers do you have?', placeholder: '2,500' },
  {
    name: 'experienceLevel',
    label: 'Experience level',
    type: 'select',
    placeholder: 'Select experience level',
    options: ['Beginner (just starting)', 'Intermediate (posting sometimes)', 'Active creator (consistent)'],
  },
  { name: 'hoursPerWeek', label: 'Hours available each week', placeholder: '10-15 hours' },
  { name: 'portfolio', label: 'Portfolio / Content Links', placeholder: 'Instagram, TikTok, Behance, website' },
  { name: 'interests', label: 'What do you want to contribute?', placeholder: 'Campaign production, editing, research, community growth' },
]

const creatorContentTypes = [
  'Lifestyle',
  'Food',
  'Beauty',
  'Fashion',
  'Campus life',
  'Educational',
  'Other',
]

const managerQuestions = [
  { name: 'managerProgram', label: 'Program', placeholder: 'Marketing, Business, Communication Arts' },
  { name: 'managerYear', label: 'Year', type: 'select', placeholder: 'Select year', options: ['1', '2', '3', '4'] },
  { name: 'managerPhone', label: 'Phone', placeholder: '+66 8X-XXX-XXXX' },
  { name: 'managerLineId', label: 'LINE ID', placeholder: 'lineid123' },
  {
    name: 'managedBefore',
    label: 'Have you managed a team/project before?',
    type: 'select',
    placeholder: 'Select an option',
    options: ['Yes', 'No'],
  },
  {
    name: 'organizationExperience',
    label: 'Describe any experience managing people, events, or projects',
    placeholder: 'Student clubs, campaign teams, productions, events, or client work',
    type: 'textarea',
  },
]

const managerTools = ['Google Sheets', 'Notion', 'Excel', 'Other']
const managerResponsibilities = [
  'Track creator progress',
  'Follow up with team members',
  'Ensure deadlines are met',
  'Submit weekly reports',
]

const initialFields = {
  name: '',
  email: '',
  location: '',
  nickname: '',
  school: '',
  year: '',
  phoneNumber: '',
  preferredContact: '',
  instagramHandle: '',
  tiktokHandle: '',
  otherPlatforms: '',
  focusArea: '',
  followers: '',
  experienceLevel: '',
  hoursPerWeek: '',
  portfolio: '',
  interests: '',
  creatorContentTypes: [],
  creatorContentTypeOther: '',
  managerProgram: '',
  managerYear: '',
  managerPhone: '',
  managerLineId: '',
  managedBefore: '',
  organizationExperience: '',
  managerResponsibilities: [],
  managerTools: [],
  managerToolOther: '',
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

  const setFieldValue = (key, value) => {
    setStatus({ type: '', message: '' })
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleTypeChange = (value) => {
    if (!value) return
    setStatus({ type: '', message: '' })
    setSignupType(value)
  }

  const toggleManagerTool = (tool, checked) => {
    setStatus({ type: '', message: '' })
    setForm((prev) => ({
      ...prev,
      managerTools: checked
        ? [...prev.managerTools, tool]
        : prev.managerTools.filter((item) => item !== tool),
    }))
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

    const missingQuestion = questions.find(({ name, optional }) => !optional && !form[name].trim())
    if (missingQuestion) {
      setStatus({ type: 'error', message: `Please answer: ${missingQuestion.label}.` })
      return
    }

    if (signupType === 'student-creator' && form.creatorContentTypes.length === 0) {
      setStatus({ type: 'error', message: 'Please select at least one content type.' })
      return
    }

    if (
      signupType === 'student-creator' &&
      form.creatorContentTypes.includes('Other') &&
      !form.creatorContentTypeOther.trim()
    ) {
      setStatus({ type: 'error', message: 'Please specify your other content category.' })
      return
    }

    if (
      signupType === 'campaign-manager' &&
      form.managerTools.includes('Other') &&
      !form.managerToolOther.trim()
    ) {
      setStatus({ type: 'error', message: 'Please specify your other tool.' })
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
                <div key={question.name} className={question.name === 'interests' || question.name === 'organizationExperience' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={question.name} className="text-sm font-medium text-[#111111]">
                    {question.label}
                  </label>
                  {question.type === 'select' ? (
                    <Select value={form[question.name]} onValueChange={(value) => setFieldValue(question.name, value)}>
                      <SelectTrigger id={question.name} className="mt-2 h-11 w-full border-primary/12 bg-[#fcfbff]">
                        <SelectValue placeholder={question.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {question.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : question.type === 'textarea' ? (
                    <Textarea
                      id={question.name}
                      value={form[question.name]}
                      onChange={updateField(question.name)}
                      placeholder={question.placeholder}
                      className="mt-2 min-h-28 border-primary/12 bg-[#fcfbff]"
                    />
                  ) : (
                    <Input
                      id={question.name}
                      type={question.name === 'phoneNumber' || question.name === 'managerPhone' ? 'tel' : 'text'}
                      value={form[question.name]}
                      onChange={updateField(question.name)}
                      placeholder={question.placeholder}
                      className="mt-2 h-11 border-primary/12 bg-[#fcfbff]"
                    />
                  )}
                </div>
              ))}
            </div>

            {signupType === 'student-creator' ? (
              <div>
                <p className="text-sm font-medium text-[#111111]">Content category</p>
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
                {form.creatorContentTypes.includes('Other') ? (
                  <div className="mt-4">
                    <label htmlFor="creatorContentTypeOther" className="text-sm font-medium text-[#111111]">
                      Other content category
                    </label>
                    <Input
                      id="creatorContentTypeOther"
                      value={form.creatorContentTypeOther}
                      onChange={updateField('creatorContentTypeOther')}
                      placeholder="Music, gaming, tech, travel"
                      className="mt-2 h-11 border-primary/12 bg-[#fcfbff]"
                    />
                  </div>
                ) : null}
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

            {signupType === 'campaign-manager' ? (
              <div>
                <p className="text-sm font-medium text-[#111111]">What tools are you comfortable with? (optional)</p>
                <div className="mt-3 grid gap-3 rounded-2xl border border-primary/12 bg-[#fcfbff] p-4">
                  {managerTools.map((tool) => (
                    <label key={tool} className="flex items-center gap-3 text-sm text-[#111111]">
                      <Checkbox
                        checked={form.managerTools.includes(tool)}
                        onCheckedChange={(checked) => toggleManagerTool(tool, checked === true)}
                      />
                      <span>{tool}</span>
                    </label>
                  ))}
                </div>
                {form.managerTools.includes('Other') ? (
                  <div className="mt-4">
                    <label htmlFor="managerToolOther" className="text-sm font-medium text-[#111111]">
                      Other tool
                    </label>
                    <Input
                      id="managerToolOther"
                      value={form.managerToolOther}
                      onChange={updateField('managerToolOther')}
                      placeholder="Airtable, Trello, Slack"
                      className="mt-2 h-11 border-primary/12 bg-[#fcfbff]"
                    />
                  </div>
                ) : null}
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
