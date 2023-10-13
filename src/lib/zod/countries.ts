import { ZodError, z } from 'zod'

const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string()
  }),
  area: z.number(),
  flags: z.object({
    png: z.string().url(),
    svg: z.string().url(),
    alt: z.string().optional()
  }),
  capital: z.array(z.string()).optional(),
  capitalInfo: z.object({
    latlng: z.array(z.number()).length(2).optional()
  }),
  region: z.string(),
  population: z.number(),
  languages: z.record(z.string()).optional(),
  currencies: z
    .record(
      z.object({
        name: z.string(),
        symbol: z.string().optional()
      })
    )
    .optional(),
  flag: z.string(),
  cca3: z.string(),
  borders: z.array(z.string()).optional()
})

const CountriesSchema = z.array(CountrySchema)

export default function validateAndCleanUpCountryData(data: any): Countries {
  try {
    const validatedCountries = data
      .map((country: any) => {
        const result = CountrySchema.safeParse(country)

        switch (result.success) {
          case true:
            return result.data
          case false:
            console.log(
              `Error validating country data: ${country.name.common}: `,
              JSON.stringify(result.error, null, 2)
            )
            return null
        }
      })
      .filter(Boolean)

    return validatedCountries
  } catch (error: unknown) {
    const { name = 'ZodError', issues = [] } = error as ZodError
    console.log(JSON.stringify({ name, issues, data }, null, 2))
    return []
  }
}

export type Country = z.infer<typeof CountrySchema>
export type Countries = z.infer<typeof CountriesSchema>
