import { Container } from '../layout/Container'
import { Text } from '../typography/Text'
import { ClockUI } from '../ui/ClockUI'
import { FooterLinkList } from './FooterLinkList'
import { footerName, footerSocialLinks } from '../../data/footer'

/** Compact site footer on every page: local time, social links and copyright in one row. */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border-primary bg-bg-primary/45 py-6 backdrop-blur-md">
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <ClockUI />
        <nav aria-label="Social">
          <FooterLinkList links={footerSocialLinks} />
        </nav>
        <Text size="sm" muted>&copy; {currentYear} {footerName}</Text>
      </Container>
    </footer>
  )
}
