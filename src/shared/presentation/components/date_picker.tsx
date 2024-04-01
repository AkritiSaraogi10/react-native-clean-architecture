import { Dispatch, SetStateAction, useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CalendarPicker, { CustomDateStyle } from 'react-native-calendar-picker';
import Colors from "../../../core/styles/app_colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from "react-native-paper";

type date = {
  startDate: string, 
  endDate: string
}

interface IDatePicker {
  visibility: boolean;
  dates: date,
  setVisibility: Dispatch<SetStateAction<boolean>>;
  setDates: Dispatch<SetStateAction<date>>;
  isRangeSelection: boolean
}

const DatePicker = ({ visibility, dates, setVisibility, setDates, isRangeSelection = true }: IDatePicker) => {
  const onDateChange = (date: any, type: any) => {
    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1, newDate.length-1);
    const dates = newDate1.split('T');
    const date1 = dates[0].split('-');
    const day = date1[2] ?? 'DD';
    const month = date1[1] ?? 'MM';
    const year = date1[0] ?? 'YYYY';

    if (type === 'END_DATE') {
      setDates((prevState) => ({
        ...prevState,
        endDate: day + '/' + month + '/' + year
      }));
    } else {
      setDates({startDate: day+'/'+month+'/'+year, endDate: 'DD/MM/YYYY'});
    }
  };

  const handleCancel = () => {
    setDates({startDate: 'DD/MM/YYYY', endDate: 'DD/MM/YYYY'})
    setVisibility(false);
  };

  const handleOk = () => {
    setVisibility(false);
  };

  return (
    <Modal
      visible={visibility}
      animationType={'fade'}
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>
          <View style={styles.dialogHeader}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Icon name="close" size={25} onPress={handleCancel}/>
              <Button textColor={Colors.greenColor} onPress={handleOk} >Save</Button>
            </View>
            {isRangeSelection ? 
              <View style={{ paddingLeft: 25, paddingRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                <Text style={{color: 'black'}}>From - to dates</Text>
                <View style={{height: 10}} />
                <Text style={{fontSize: 16, fontWeight: '500', color: Colors.black}}>{ `${dates.startDate} - ${dates.endDate}`}</Text>
                </View>
                <Icon name="pencil-outline" size={23} color='black' />
              </View> : 
              <View  style={{ paddingLeft: 40}}>
                <Text>Selected Date</Text>
                <Text style={{fontSize: 20, fontWeight: '500', color: Colors.black}}>{dates.startDate}</Text>
              </View>
            }
          </View>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              headerWrapperStyle={{display: 'none'}}
              allowRangeSelection={isRangeSelection}
              weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
              dayLabelsWrapper={{borderBottomWidth: 0, borderTopWidth: 0}}
              todayBackgroundColor={Colors.lightGreenBorderColor}
              todayTextStyle={{color: Colors.greenColor}}
              selectedDayColor={Colors.greenColor}
              selectedDayTextStyle={{color: isRangeSelection ? 'black' : 'white'}}
              selectedRangeStartStyle={{ backgroundColor: Colors.greenColor }}
              selectedRangeStartTextStyle={{color: 'white'}}
              selectedRangeEndStyle={{ backgroundColor: Colors.greenColor }}
              selectedRangeEndTextStyle={{color: 'white'}}
              selectedRangeStyle={{ backgroundColor: Colors.lightGreenBorderColor }}
              onDateChange={onDateChange}
              horizontal={false}
              scrollable={true}
            />
          </View>
          <View style={styles.dialogFooter}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOk}>
              <Text style={styles.button}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DatePicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
    elevation: 10,
    paddingVertical: 10,
    width: '95%',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  dialogHeader: {
    width: '100%',
    justifyContent: 'space-evenly',
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10, 
    paddingBottom: 15
  },
  dialogFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 15,
    borderTopColor: Colors.borderColor,
    borderTopWidth: 0.5,
    paddingHorizontal: 10, 
    paddingTop: 7
  },
  button: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.greenColor,
    margin: 8
  },
});
