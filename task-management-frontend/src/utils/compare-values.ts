/**
 * Compares two values based on a specified condition
 * @param fieldValue The value from the form state
 * @param condition The comparison operator ('===', '!==', '>', '<', '>=', '<=')
 * @param compareValue The value to compare against
 * @returns Boolean result of the comparison
 */
export function compareValues(fieldValue: any, condition: string, compareValue: string): boolean {
  const fieldStr = String(fieldValue);
  const compareStr = String(compareValue);

  // Convert to numbers for numeric comparisons
  const numFieldValue = !isNaN(Number(fieldValue)) ? Number(fieldValue) : fieldValue;
  const numCompareValue = !isNaN(Number(compareValue)) ? Number(compareValue) : compareValue;

  switch (condition) {
    case '===':
      return fieldStr === compareStr;
    case '!==':
      return fieldStr !== compareStr;
    case '>':
      return numFieldValue > numCompareValue;
    case '<':
      return numFieldValue < numCompareValue;
    case '>=':
      return numFieldValue >= numCompareValue;
    case '<=':
      return numFieldValue <= numCompareValue;
    default:
      return false;
  }
}
