import React from "react"
import { Button } from "react-native-paper"
import { DatePickerModal } from "react-native-paper-dates"
import { RangeChange, SingleChange } from "react-native-paper-dates/lib/typescript/Date/Calendar"

export default function RangeDatePage() {
    const [visible, setVisible] = React.useState(false)
    const onDismiss = React.useCallback(() => {
      setVisible(false)
    }, [setVisible])
  
    const handleSingleChange: SingleChange = React.useCallback(({ startDate }) => {
      setVisible(false);
      console.log(startDate);
    }, []);
    
    const handleRangeChange: RangeChange = React.useCallback(({ startDate, endDate }) => {
      setVisible(false);
      console.log({ startDate, endDate });
    }, []);
    
    return (
      <>
        <DatePickerModal
          locale= "en-US" 
          mode='range'
          visible={visible}
          onDismiss={onDismiss}
          startDate={undefined}
          endDate={undefined}
          onConfirm={handleRangeChange}
          presentationStyle='pageSheet'
          saveLabel="Save"
          label="From - dates"
          startLabel="From"
          endLabel="To"
          animationType="slide"
        />
        <Button onPress={()=> setVisible(true)}>
          Pick range
        </Button>
      </>
    )
  }