export const formatTo24Hour = (time: string) => {
    const [hours, minutesAndPeriod] = time.split(":");
    const [minutes, period] = minutesAndPeriod.split(" ");
    let formattedHours = parseInt(hours);
    if (period === "PM" && formattedHours < 12) {
      formattedHours += 12;
    }
    if (period === "AM" && formattedHours === 12) {
      formattedHours = 0;
    }
    return `${formattedHours.toString().padStart(2, "0")}:${minutes}`;
  };