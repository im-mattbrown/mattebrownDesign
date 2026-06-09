import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import s from '../styles/Contact.module.css'

const DAILY_LIMIT = 10
const STORAGE_KEY = 'contact_rl'
const PROMPT_PREFIX = 'contact@mattebrown ~ % '
const WELCOME = "Welcome to Matte's chatbot. Feel free to ask me anything about Matte and his work. You can share this chat along with your email at any time."
const WEB3FORMS_KEY = 'd43315d9-2496-40cd-92f8-a52c82eb47f2'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function loadRateLimit() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 0
    const { date, count } = JSON.parse(raw)
    return date === todayKey() ? count : 0
  } catch {
    return 0
  }
}

function saveRateLimit(count) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey(), count }))
}

function formatTranscript(messages) {
  return messages
    .map(m => `${m.role === 'user' ? 'Visitor' : 'Matt\'s Assistant'}: ${m.content}`)
    .join('\n\n')
}

export default function Contact() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }])
  const [apiMessages, setApiMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [used, setUsed] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [shareName, setShareName] = useState('')
  const [shareEmail, setShareEmail] = useState('')
  const [shareSending, setShareSending] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [shareError, setShareError] = useState('')

  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    setUsed(loadRateLimit())
  }, [])

  const mountedRef = useRef(false)
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (showModal) nameRef.current?.focus()
  }, [showModal])

  const remaining = DAILY_LIMIT - used
  const hasConversation = messages.length > 1

  async function handleSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading || remaining <= 0) return

    setInput('')
    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])

    const newApiMessages = [...apiMessages, userMsg]
    setApiMessages(newApiMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newApiMessages }),
      })
      const data = await res.json()

      if (res.status !== 429) {
        const newUsed = used + 1
        setUsed(newUsed)
        saveRateLimit(newUsed)
      }

      const reply = data.reply || data.error || 'Something went wrong.'
      const assistantMsg = { role: 'assistant', content: reply }
      setMessages(prev => [...prev, assistantMsg])
      setApiMessages(prev => [...prev, assistantMsg])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  async function handleShare(e) {
    e.preventDefault()
    setShareSending(true)
    setShareError('')

    const transcript = formatTranscript(messages)

    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('name', shareName)
    formData.append('email', shareEmail)
    formData.append('subject', `Portfolio chat from ${shareName}`)
    formData.append('message', `Chat transcript from portfolio:\n\n${transcript}`)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setShareSuccess(true)
        setShareName('')
        setShareEmail('')
      } else {
        setShareError('Something went wrong. Try emailing m@monomstud.io directly.')
      }
    } catch {
      setShareError('Could not send. Try emailing m@monomstud.io directly.')
    } finally {
      setShareSending(false)
    }
  }

  function closeModal() {
    setShowModal(false)
    setShareSuccess(false)
    setShareError('')
  }

  return (
    <>
      <Head>
        <title>Contact — Matte Brown</title>
      </Head>
      <div className={s.page}>
        <main className={s.main}>
          <div className={s.terminal}>
            <div className={s.titleBar}>
              <div className={s.dots}>
                <span className={s.dotRed} />
                <span className={s.dotYellow} />
                <span className={s.dotGreen} />
              </div>
              <span className={s.titleText}>mattebrown — -zsh — 80×24</span>
            </div>

            <div className={s.tabBar}>
              <div className={`${s.tab} ${s.tabActive}`}>mattebrown — -zsh</div>
              <div className={s.tab}>-zsh</div>
              <div className={s.tab}>claude</div>
              <div className={s.tabAdd}>+</div>
            </div>

            <div className={s.body} onClick={() => inputRef.current?.focus()}>
              <div className={s.messages}>
                {messages.map((msg, i) => (
                  msg.role === 'user' ? (
                    <div key={i} className={s.userLine}>
                      <span className={s.prompt}>{PROMPT_PREFIX}</span>
                      <span className={s.text}>{msg.content}</span>
                    </div>
                  ) : (
                    <div key={i} className={s.assistantLine}>
                      {msg.content}
                    </div>
                  )
                ))}
                {loading && (
                  <div className={s.assistantLine}>
                    <span className={s.blink}>▋</span>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSubmit} className={s.inputLine}>
                {remaining > 0 ? (
                  <>
                    <span className={s.prompt}>{PROMPT_PREFIX}</span>
                    <input
                      ref={inputRef}
                      className={s.input}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      disabled={loading}
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </>
                ) : (
                  <span className={s.rateLimitMsg}>Rate limit reached. Come back tomorrow.</span>
                )}
              </form>

              <div className={s.statusBar}>
                {hasConversation && (
                  <button
                    className={s.shareBtn}
                    onClick={e => { e.stopPropagation(); setShowModal(true) }}
                  >
                    Share chat with Matt
                  </button>
                )}
                <span>
                  {remaining > 0
                    ? `${remaining} prompt${remaining === 1 ? '' : 's'} remaining today`
                    : 'Daily limit reached'}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className={s.modalOverlay} onClick={closeModal}>
          <div className={s.modal} onClick={e => e.stopPropagation()}>
            {shareSuccess ? (
              <>
                <p className={s.modalTitle}>Sent.</p>
                <p className={s.modalSub}>Matt will have the full transcript. He'll be in touch.</p>
                <button className={s.modalClose} onClick={closeModal}>Close</button>
              </>
            ) : (
              <>
                <p className={s.modalTitle}>Share this chat</p>
                <p className={s.modalSub}>Add your details so Matt can follow up.</p>
                <form onSubmit={handleShare} className={s.modalForm}>
                  <input
                    ref={nameRef}
                    className={s.modalInput}
                    type="text"
                    placeholder="Your name"
                    value={shareName}
                    onChange={e => setShareName(e.target.value)}
                    required
                  />
                  <input
                    className={s.modalInput}
                    type="email"
                    placeholder="Your email"
                    value={shareEmail}
                    onChange={e => setShareEmail(e.target.value)}
                    required
                  />
                  {shareError && <p className={s.modalError}>{shareError}</p>}
                  <button
                    className={s.modalSubmit}
                    type="submit"
                    disabled={shareSending}
                  >
                    {shareSending ? 'Sending…' : 'Send transcript'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
