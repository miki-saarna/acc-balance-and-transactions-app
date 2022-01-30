// this helper function converts the components of a date to include at least 2 characters - adds a 0 at the beginning if single digit
const formatNumber = (number) => {
    if (number.length < 2) {
      number = 0 + number;
    }
    return number;
  }

const getLastThirtyDaysDates = (timezoneOffset) => {
    const currentDateUTC = new Date().getTime() - timezoneOffset;
    const currentDateArray = new Date(currentDateUTC).toLocaleDateString().split('/');
    const currentDate = [currentDateArray[2], formatNumber(currentDateArray[0]), formatNumber(currentDateArray[1])].join('-');
    
    const thirtyDaysInMS = 1000 * 60 * 60 * 24 * 30;
    const thirtyDaysAgoDateArray = new Date(currentDateUTC - thirtyDaysInMS).toLocaleDateString().split('/');
    const thirtyDaysAgoDate = [thirtyDaysAgoDateArray[2], formatNumber(thirtyDaysAgoDateArray[0]), formatNumber(thirtyDaysAgoDateArray[1])].join('-');

    return {
        currentDate,
        thirtyDaysAgoDate,
    }
}

module.exports = getLastThirtyDaysDates;
