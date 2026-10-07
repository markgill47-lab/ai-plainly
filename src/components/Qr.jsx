/*
  QR code for the public copy of the deck. The image is a static SVG in
  public/, generated once from DECK_URL:
    npx qrcode -t svg -e M -q 2 -o public/qr-ai-plainly.svg "<DECK_URL>"
  Regenerate it if the URL ever changes. White plate in both themes so it
  stays scannable in dark mode.
*/
export const DECK_URL = 'https://markgill47-lab.github.io/ai-plainly/'

export default function Qr({ size = 150, caption = 'Follow along', className = '', style }) {
  return (
    <a className={`qr ${className}`} href={DECK_URL} target="_blank" rel="noreferrer" style={style}>
      <img src="qr-ai-plainly.svg" alt={`QR code for ${DECK_URL}`} width={size} height={size} />
      <span className="k">{caption}</span>
      <span className="u">{DECK_URL.replace(/^https:\/\/|\/$/g, '')}</span>
    </a>
  )
}
