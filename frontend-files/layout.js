import './globals.css'

export const metadata = {
  title: 'منصة الانتخابات العراقية | Iraqi Election Platform',
  description: 'قارن بين 7,769 مرشحاً للانتخابات العراقية',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
