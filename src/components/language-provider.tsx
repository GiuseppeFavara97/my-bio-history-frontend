"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "it" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  it: {
    // Sidebar
    profile: "Profilo",
    settings: "Impostazioni",
    logout: "Logout",
    clinical_record: "Cartella Clinica",
    summary: "Riepilogo",
    visits: "Visite",
    allergies: "Allergie",
    vaccines: "Vaccini",
    documents: "Documenti",
    home: "Home",
    allegato_e: "Allegato E",
    recipes: "Ricette",
    reports: "Report",
    calendar: "Calendario",
    messages: "Messaggi",
    
    // Settings Page
    settings_desc: "Gestisci le tue preferenze e la sicurezza dell'account.",
    appearance: "Aspetto",
    appearance_desc: "Personalizza come visualizzi l'applicazione.",
    dark_mode: "Tema Scuro",
    dark_mode_desc: "Attiva o disattiva il tema scuro per l'interfaccia.",
    text_size: "Dimensione Testo",
    text_size_desc: "Regola la dimensione dei caratteri.",
    notifications: "Notifiche",
    notif_desc: "Scegli come ricevere aggiornamenti sulla tua salute.",
    reminders: "Promemoria Visite",
    reminders_desc: "Ricevi una notifica 24 ore prima di una visita programmata.",
    new_docs: "Nuovi Documenti",
    new_docs_desc: "Avvisami quando un medico carica un nuovo referto o esame.",
    security: "Sicurezza",
    security_desc: "Proteggi il tuo account e i tuoi dati sensibili.",
    password: "Password",
    password_last_change: "L'ultima modifica risale a 3 mesi fa.",
    change_password: "Cambia Password",
    email: "Email",
    email_desc: "L'email corrente verrà utilizzata per le comunicazioni.",
    change_email: "Cambia Email",
    two_factor: "Autenticazione a due fattori",
    two_factor_desc: "Aggiungi un ulteriore livello di sicurezza al tuo login.",
    configure: "Configura",
    language_region: "Lingua e Regione",
    lang_interface: "Lingua interfaccia",
    lang_interface_desc: "Seleziona la lingua per l'applicazione.",
    coming_soon: "Prossimamente",
    cancel: "Annulla",
    save_changes: "Salva modifiche",
    send_confirmation: "Invia conferma",
    current_password: "Password attuale",
    new_password: "Nuova password",
    confirm_new_password: "Conferma nuova password",
    password_mismatch: "Le password non coincidono",
    password_updated: "Password aggiornata con successo",
    invalid_email: "Inserisci un'email valida",
    email_updated: "Email aggiornata con successo. Controlla la tua casella per confermare.",
    small: "Piccolo",
    medium: "Medio",
    large: "Grande",
    loading_patient: "Caricamento dati paziente..."
  },
  en: {
    // Sidebar
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    clinical_record: "Clinical Record",
    summary: "Summary",
    visits: "Visits",
    allergies: "Allergies",
    vaccines: "Vaccines",
    documents: "Documents",
    home: "Home",
    allegato_e: "Annex E",
    recipes: "Recipes",
    reports: "Reports",
    calendar: "Calendar",
    messages: "Messages",

    // Settings Page
    settings_desc: "Manage your preferences and account security.",
    appearance: "Appearance",
    appearance_desc: "Customize how you view the application.",
    dark_mode: "Dark Mode",
    dark_mode_desc: "Toggle dark theme for the interface.",
    text_size: "Text Size",
    text_size_desc: "Adjust the font size.",
    notifications: "Notifications",
    notif_desc: "Choose how you receive health updates.",
    reminders: "Appointment Reminders",
    reminders_desc: "Get a notification 24 hours before a scheduled visit.",
    new_docs: "New Documents",
    new_docs_desc: "Notify me when a doctor uploads a new report or exam.",
    security: "Security",
    security_desc: "Protect your account and sensitive data.",
    password: "Password",
    password_last_change: "Last changed 3 months ago.",
    change_password: "Change Password",
    email: "Email",
    email_desc: "The current email will be used for communications.",
    change_email: "Change Email",
    two_factor: "Two-Factor Authentication",
    two_factor_desc: "Add an extra layer of security to your login.",
    configure: "Configure",
    language_region: "Language & Region",
    lang_interface: "Interface Language",
    lang_interface_desc: "Select the language for the application.",
    coming_soon: "Coming Soon",
    cancel: "Cancel",
    save_changes: "Save changes",
    send_confirmation: "Send confirmation",
    current_password: "Current password",
    new_password: "New password",
    confirm_new_password: "Confirm new password",
    password_mismatch: "Passwords do not match",
    password_updated: "Password updated successfully",
    invalid_email: "Please enter a valid email",
    email_updated: "Email updated successfully. Check your inbox to confirm.",
    small: "Small",
    medium: "Medium",
    large: "Large",
    loading_patient: "Loading patient data..."
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("it")

  // Load language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem("app-language") as Language
    if (savedLang && (savedLang === "it" || savedLang === "en")) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("app-language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[language] as any
    return translation[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
