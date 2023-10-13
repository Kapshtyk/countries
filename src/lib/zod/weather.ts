import { ZodError, z } from 'zod'

const WeatherSchema = z.object({
  main: z.object({
    temp: z.number()
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      description: z.string(),
      icon: z.string()
    })
  ),
  wind: z.object({
    speed: z.number(),
    deg: z.number()
  })
})

export default function validateAndCleanUpWeatherData(
  data: any
): Weather | null {
  try {
    return WeatherSchema.parse(data)
  } catch (error: unknown) {
    const { name = 'ZodError', issues = [] } = error as ZodError
    console.log(JSON.stringify({ name, issues, data }, null, 2))
    return null
  }
}

export type Weather = z.infer<typeof WeatherSchema>
