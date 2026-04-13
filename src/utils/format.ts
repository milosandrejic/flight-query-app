export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
}

export function getDayDiff(departing: string, arriving: string): number {
  const dep = new Date(departing);
  const arr = new Date(arriving);
  const depDay = new Date(dep.getFullYear(), dep.getMonth(), dep.getDate());
  const arrDay = new Date(arr.getFullYear(), arr.getMonth(), arr.getDate());

  return Math.round((arrDay.getTime() - depDay.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatStops(stops: number): string {
  if (stops === 0) {return "Direct";}
  if (stops === 1) {return "1 stop";}

  return `${stops} stops`;
}

export function formatIsoDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

  if (!match) {
    return iso;
  }

  const hours = match[1] ? `${match[1]}h` : "";
  const minutes = match[2] ? ` ${match[2]}m` : "";

  return `${hours}${minutes}`.trim();
}
