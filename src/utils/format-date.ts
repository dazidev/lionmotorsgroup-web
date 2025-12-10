export class FormatDate {
  constructor() {}

  public static complete(date: Date) {
    const formatUSA = date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // AM/PM
    });

    return formatUSA;
  }

  public static onlyDate(date: Date) {
    const formatUSA = date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    return formatUSA;
  }
}
