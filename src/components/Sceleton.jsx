import ContentLoader from 'react-content-loader'

const Sceleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    {/* TODO: убрать иконки в отдельный файл */}
    {/* TODO: убрать неиспользуемый файл */}
    <circle cx='124' cy='141' r='87' />
    <rect x='40' y='240' rx='4' ry='4' width='172' height='22' />
    <rect x='51' y='284' rx='15' ry='15' width='159' height='75' />
    <rect x='38' y='379' rx='4' ry='4' width='63' height='29' />
    <rect x='131' y='379' rx='15' ry='15' width='109' height='31' />
  </ContentLoader>
)

export default Sceleton
