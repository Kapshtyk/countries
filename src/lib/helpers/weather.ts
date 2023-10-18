const weatherService = {
  getWindDirection: (angle: number) => {
    const directions = [
      '↓ N',
      '↙ NE',
      '← E',
      '↖ SE',
      '↑ S',
      '↗ SW',
      '→ W',
      '↘ NW'
    ]
    return directions[Math.round(angle / 45) % 8]
  },
  getWeatherIconURL: (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }
}

export default weatherService
