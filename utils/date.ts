const minTime = 60;
const hourTime = minTime * 60;
const dayTime = hourTime * 24;
const weekTime = dayTime * 7;
const monthTime = dayTime * 30;
const yearTime = dayTime * 365;

export type Timeunit =
  | 'sec'
  | 'min'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';
export interface Datedelta {
  delta: number;
  unit: Timeunit;
}

export function formatDatedelta(since: Date, until: Date): Datedelta {
  let delta = (until.getTime() - since.getTime()) / 1000;
  let unit: Timeunit = 'sec';
  if (delta < minTime) {
    unit = 'sec';
  } else if (delta < hourTime) {
    unit = 'min';
    delta = delta / minTime;
  } else if (delta < dayTime) {
    unit = 'hour';
    delta = delta / hourTime;
  } else if (delta < weekTime) {
    unit = 'day';
    delta = delta / dayTime;
  } else if (delta < monthTime) {
    unit = 'week';
    delta = delta / weekTime;
  } else if (delta < yearTime) {
    unit = 'month';
    delta = delta / monthTime;
  } else {
    unit = 'year';
    delta = delta / yearTime;
  }
  delta = Math.trunc(delta);
  return { delta, unit };
}

export function jaTimeunit(u: Timeunit): string {
  switch (u) {
    case 'sec':
      return '秒';
    case 'min':
      return '分';
    case 'hour':
      return '時間';
    case 'day':
      return '日';
    case 'week':
      return '週間';
    case 'month':
      return 'か月';
    case 'year':
      return '年';
  }
}
