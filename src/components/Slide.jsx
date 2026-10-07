/*
  Slide: the NextEd frame shared by every slide. Spirit Red top rule,
  eyebrow with the slide code in red, Roboto Condensed title (second beat
  in Gateway Blue via <em>), the part label top right, and an optional
  beams cluster. Slides render their content as children of the stage.
*/
export default function Slide({ slide, title, eyebrow, beams = false, stageStyle, children }) {
  return (
    <section className="slide">
      {beams && (
        <div className={`beams${beams === 'small' ? ' small' : ''}`} aria-hidden="true">
          <i className="g1" /><i className="r1" /><i className="b1" /><i className="g2" /><i className="r2" /><i className="g3" />
        </div>
      )}
      <div className="slide-head">
        <div>
          <div className="eyebrow">
            <span className="no">{slide.code}</span>
            <span>{eyebrow ?? slide.part}</span>
          </div>
          {title && <h1 className="slide-title">{title}</h1>}
        </div>
        <div className="slide-index">
          <div className="big">{slide.code}</div>
        </div>
      </div>
      <div className="stage" style={stageStyle}>{children}</div>
    </section>
  )
}
