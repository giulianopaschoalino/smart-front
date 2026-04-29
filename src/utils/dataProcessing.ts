/**
 * Utility functions to process economy data from API
 * Calculates the year with the last consolidated data and populates graphs accordingly
 */

interface EconomyData {
  ano?: string | number;
  mes?: string;
  economia_acumulada?: number;
  economia_mensal?: number;
  dad_estimado: boolean;
  [key: string]: any;
}

/**
 * Extract year from mes field supporting multiple formats
 * Supports: "YYYY-MM-DD", "MMM/YYYY", "MM/YYYY"
 * @param mesValue - The mes field value
 * @returns Year as number
 */
function extractYearFromMes(mesValue: string): number {
  const mesStr = mesValue.toString();
  
  // Handle "YYYY-MM-DD" format
  if (mesStr.includes('-')) {
    const yearStr = mesStr.split('-')[0];
    return parseInt(yearStr);
  }
  
  // Handle "MMM/YYYY" or "MM/YYYY" format
  if (mesStr.includes('/')) {
    const yearStr = mesStr.split('/')[1];
    return parseInt(yearStr);
  }
  
  // Fallback: try to parse as number if it's just a year
  const parsed = parseInt(mesStr);
  return !isNaN(parsed) ? parsed : new Date().getFullYear();
}

/**
 * Find the year with the last consolidated (non-estimated) data
 * @param data - Array of economy data
 * @param isMonthly - If true, extract year from 'mes' field; if false, use 'ano' field
 * @returns The year with the last consolidated data
 */
export function getLastConsolidatedYear(data: EconomyData[], isMonthly = false): number {
  if (!data || data.length === 0) {
    return new Date().getFullYear();
  }

  // Filter only consolidated data (dad_estimado === false explicitly)
  // Also ensure the entry has valid data (not just a date placeholder)
  // For cost indicator data, also check that custo_unit is not zero
  const consolidatedData = data.filter(item => {
    if (item.dad_estimado !== false) return false;
    
    // If custo_unit exists, it must be > 0 to be considered consolidated
    if (item.custo_unit !== undefined) {
      const costValue = parseFloat(item.custo_unit);
      return !isNaN(costValue) && costValue > 0;
    }
    
    // For other data types, check if they have valid data fields
    return item.economia_acumulada !== undefined || item.economia_mensal !== undefined;
  });

  // Extract all years present in the dataset (consolidated + estimated)
  const allYears = data
    .map(item => {
      if (isMonthly && item.mes) {
        return extractYearFromMes(item.mes);
      }
      return parseInt(item.ano?.toString() || new Date().getFullYear().toString());
    })
    .filter(year => !Number.isNaN(year));

  // Extract years from consolidated records
  const consolidatedYears = consolidatedData
    .map(item => {
      if (isMonthly && item.mes) {
        return extractYearFromMes(item.mes);
      }
      return parseInt(item.ano?.toString() || new Date().getFullYear().toString());
    })
    .filter(year => !Number.isNaN(year));

  // Prefer the latest consolidated year; if none, fall back to the latest year available
  if (consolidatedYears.length > 0) {
    return Math.max(...consolidatedYears);
  }

  if (allYears.length > 0) {
    return Math.max(...allYears);
  }

  return new Date().getFullYear();
}

/**
 * Filter and prepare graph data for a specific year
 * Uses consolidated data for that year and estimated data for remaining months
 * @param data - Array of economy data (monthly)
 * @param targetYear - The year to filter by
 * @returns Processed array with consolidated and estimated data
 */
export function populateGraphDataForYear(data: EconomyData[], targetYear: number | string): EconomyData[] {
  if (!data || data.length === 0) {
    return [];
  }

  const year = parseInt(targetYear.toString());

  // Filter data for the target year
  const yearData = data.filter(item => {
    if (item.mes) {
      const itemYear = extractYearFromMes(item.mes);
      return itemYear === year;
    }
    return false;
  });

  // If no data for the year, try to use the latest year available to avoid empty charts
  if (yearData.length === 0) {
    const fallbackYear = data
      .map(item => (item.mes ? extractYearFromMes(item.mes) : parseInt(item.ano?.toString() || '0')))
      .filter(year => !Number.isNaN(year))
      .sort((a, b) => b - a)[0];

    if (!fallbackYear) {
      return [];
    }

    return populateGraphDataForYear(data, fallbackYear);
  }

  // Create a map of months for quick lookup
  // For duplicate month entries, prefer consolidated data and higher accumulated values.
  const dataMap = new Map<number, EconomyData>();
  yearData.forEach(item => {
    if (item.mes) {
      const mesStr = item.mes.toString();
      let month = 0;
      
      // Extract month from different formats
      if (mesStr.includes('-')) {
        // YYYY-MM-DD format
        month = parseInt(mesStr.split('-')[1]);
      } else if (mesStr.includes('/')) {
        // MMM/YYYY or MM/YYYY format
        const parts = mesStr.split('/');
        const monthPart = parts[0];
        // Try to parse as number first
        month = parseInt(monthPart);
        // If it's NaN, it's a month name, so we need to convert it
        if (isNaN(month)) {
          const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
          month = monthNames.indexOf(monthPart.toLowerCase()) + 1;
        }
      }
      
      if (month > 0) {
        const existingItem = dataMap.get(month);
        dataMap.set(month, resolveMonthEntry(existingItem, item));
      }
    }
  });

  // Build complete year data (1-12 months)
  const completeYearData: EconomyData[] = [];
  for (let month = 1; month <= 12; month++) {
    const monthData = dataMap.get(month);

    if (monthData) {
      completeYearData.push(monthData);
    } else {
      // Fill missing months using the latest known value in progression order.
      const lastKnownData = completeYearData[completeYearData.length - 1];
      if (lastKnownData) {
        completeYearData.push({
          ...lastKnownData,
          mes: `${month < 10 ? '0' : ''}${month}/${year}`,
          dad_estimado: true
        });
      } else if (dataMap.size > 0) {
        const firstAvailableMonth = Math.min(...Array.from(dataMap.keys()));
        const firstData = dataMap.get(firstAvailableMonth);
        if (firstData) {
          completeYearData.push({
            ...firstData,
            mes: `${month < 10 ? '0' : ''}${month}/${year}`,
            dad_estimado: true
          });
        }
      }
    }
  }

  return completeYearData.sort((a, b) => {
    const monthA = extractMonthFromMes(a.mes || '');
    const monthB = extractMonthFromMes(b.mes || '');
    return monthA - monthB;
  });
}

function resolveMonthEntry(existingItem: EconomyData | undefined, incomingItem: EconomyData): EconomyData {
  if (!existingItem) {
    return incomingItem;
  }

  if (existingItem.dad_estimado !== incomingItem.dad_estimado) {
    return existingItem.dad_estimado ? incomingItem : existingItem;
  }

  const existingValue = getEconomyValue(existingItem);
  const incomingValue = getEconomyValue(incomingItem);
  return incomingValue >= existingValue ? incomingItem : existingItem;
}

function getEconomyValue(item: EconomyData): number {
  const rawValue = item.economia_acumulada ?? item.economia_mensal ?? 0;
  const parsedValue = typeof rawValue === 'number' ? rawValue : parseFloat(String(rawValue));
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

/**
 * Extract month number from mes field
 * @param mesValue - The mes field value
 * @returns Month number (1-12)
 */
function extractMonthFromMes(mesValue: string): number {
  const mesStr = mesValue.toString();
  
  // Handle "YYYY-MM-DD" format
  if (mesStr.includes('-')) {
    return parseInt(mesStr.split('-')[1]);
  }
  
  // Handle "MMM/YYYY" or "MM/YYYY" format
  if (mesStr.includes('/')) {
    const monthPart = mesStr.split('/')[0];
    const parsed = parseInt(monthPart);
    if (!isNaN(parsed)) {
      return parsed;
    }
    return getMonthNumber(monthPart);
  }
  
  return 1; // Default to January
}

/**
 * Convert month name to month number
 * @param monthName - Month name (Jan, Feb, etc. or jan, fev, etc.)
 * @returns Month number (1-12)
 */
function getMonthNumber(monthName: string): number {
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return months.indexOf(monthName.toLowerCase()) + 1 || 1;
}

/**
 * Get consolidated and estimated data split for a specific year
 * Returns both consolidated and estimated datasets separately
 * @param data - Array of economy data
 * @param targetYear - The year to filter by
 * @returns Object with consolidated and estimated arrays
 */
export function getConsolidatedAndEstimatedData(
  data: EconomyData[],
  targetYear: number | string
): { consolidated: EconomyData[]; estimated: EconomyData[] } {
  const year = parseInt(targetYear.toString());

  const yearData = data.filter(item => {
    if (item.mes) {
      const itemYear = extractYearFromMes(item.mes);
      return itemYear === year;
    }
    return false;
  });

  const consolidated = yearData.filter(item => !item.dad_estimado);
  const estimated = yearData.filter(item => item.dad_estimado);

  return { consolidated, estimated };
}
