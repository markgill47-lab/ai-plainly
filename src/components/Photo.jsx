import { useState } from 'react'

/*
  Photo: renders public/photos/<file> if it exists, otherwise a labeled
  gray placeholder with the SCSU dot texture. Drop the real file in and
  the slide picks it up with no code change.
*/
// Bump when a photo file is replaced under the same name so browsers refetch it.
const PHOTO_VERSION = 2

export default function Photo({ file, label, ratio = '4 / 3', style }) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className={`photo${missing ? ' placeholder dots' : ''}`} style={{ aspectRatio: ratio, ...style }}>
      {!missing && <img src={`photos/${file}?v=${PHOTO_VERSION}`} alt={label} onError={() => setMissing(true)} />}
      <figcaption className="cap">{label}</figcaption>
    </figure>
  )
}
