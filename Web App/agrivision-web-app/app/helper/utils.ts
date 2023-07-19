export const historicalDataVariables = ['temperature', 'ec', 'pH', 'humidity'] as const
export type HistoricalDataVariable = typeof historicalDataVariables[number]

export const historicalDataPeriods = ['1', '7', '30'] as const
export type HistoricalDataPeriod = typeof historicalDataPeriods[number]