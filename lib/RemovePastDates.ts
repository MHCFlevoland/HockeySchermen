export function RemovePastDates(objects: any[]) {
  const now = new Date();
  const utcMin = new Date(now.toISOString());
  utcMin.setMinutes(utcMin.getMinutes() - 90);
  const utcMax = new Date(now.toISOString());
  utcMax.setHours(utcMax.getHours() + 10);
  return objects.filter(
    (obj) => new Date(obj.datetime) > utcMin && new Date(obj.datetime) < utcMax
  );
}
