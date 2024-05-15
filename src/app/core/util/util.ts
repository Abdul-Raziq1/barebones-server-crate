export function getErrorMessage(error: any) {
    if (error.detail) {
        return error.detail
    }
    return 'Something went wrong'
} 
export function millisecondsToMinutesSeconds(timeInMs: number) {
    // Check if input is a number
    if (typeof timeInMs !== 'number' || isNaN(timeInMs)) {
      throw new TypeError('Input must be a number');
    }
  
    // Convert milliseconds to seconds (round down using Math.floor)
    const seconds = Math.floor(timeInMs / 1000);
  
    // Calculate minutes
    const minutes = Math.floor(seconds / 60);
  
    // Get remaining seconds (no decimals)
    const remainingSeconds = seconds % 60;
  
    // Format output string with leading zeros for minutes and seconds
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
}

export function countdown(startTime: number) {
    const minutes = startTime
}