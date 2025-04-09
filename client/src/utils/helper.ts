export function formatTime(timestamp: string, timeZone = "UTC") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(new Date(timestamp));
  }