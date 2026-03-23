import { useState } from 'react'
import type { AppPage } from './types'
import { useLanguage } from './hooks/useLanguage'
import { BottomNav } from './components/layout/BottomNav'
import Home     from './pages/Home'
import Live     from './pages/Live'
import Chat     from './pages/Chat'
import Voice    from './pages/Voice'
import Settings from './pages/Settings'
import s from './App.module.css'

export default function App() {
  const [page, setPage]         = useState<AppPage>('home')
  const [prevPage, setPrevPage] = useState<AppPage>('home')
  const { lang, setLanguage }   = useLanguage()

  const navigate = (p: AppPage) => {
    setPrevPage(page)
    setPage(p)
  }

  const goSettings = () => navigate('settings')
  const goBack     = () => navigate(prevPage === 'settings' ? 'home' : prevPage)

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <Home
            onNavigate={navigate}
            onSettings={goSettings}
          />
        )
      case 'live':
        return (
          <Live
            lang={lang}
            onNavigate={navigate}
          />
        )
      case 'chat':
        return (
          <Chat
            lang={lang}
            onSettings={goSettings}
          />
        )
      case 'voice':
        return (
          <Voice
            lang={lang}
            onSettings={goSettings}
          />
        )
      case 'settings':
        return (
          <Settings
            lang={lang}
            onLangChange={setLanguage}
          />
        )
    }
  }

  // Hide bottom nav on settings and live pages
  const showNav = page !== 'live'

  return (
    <div className={s.shell}>
      <main className={`${s.main} ${!showNav ? s.fullHeight : ''}`}>
        {renderPage()}
      </main>
      {showNav && (
        <BottomNav current={page} onChange={navigate}/>
      )}
    </div>
  )
}
