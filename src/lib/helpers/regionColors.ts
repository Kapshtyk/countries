export const getRegionColor = (region: string) => {
  switch (region) {
    case 'Oceania':
      return '#2978ff78'
    case 'Americas':
      return '#43a0489e'
    case 'Africa':
      return '#ef6c009c'
    case 'Europe':
      return '#ffb3009b'
    case 'Asia':
      return '#d81b609c'
    case 'Antarctic':
      return '#039ae5b4'
    default:
      return '#8d24aaaa'
  }
}
