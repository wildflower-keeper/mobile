export type calenderOptionType = {
    startingDay?: boolean;
    endingDay?: boolean;
    color: string;
    textColor: string;
  };
  
export type disableOptionType = {
    [date: string]: {
      disabled: boolean
    }
  }
  
export type selectOvernightType = {
    [day: string]: calenderOptionType;
  };