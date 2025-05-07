import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import Apis, { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Apointment = ({ route }) => {
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState(undefined);
  const [notes, setNotes] = useState('');
  const [token, setToken] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

    console.log(route.params?.teacher_id)

  const handleConfirm = async() => {
    if (date && time) {
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
    
        const data = {
          date: formattedDate,
          time: formattedTime,
          notes: notes,
          student: route.params?.student_id,
          teacher: route.params?.teacher_id,
        };
        console.log(data)
    
        try {
            let t = await AsyncStorage.getItem("token");
            setToken(t);
            let res = await Apis.post(endpoints['apointment'],data
            ,{
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${t}` // Bỏ comment nếu cần xác thực
                }
            });

    
          
        } catch (error) {
          console.error('Lỗi kết nối API:', error);
        }
      } else {
        console.log('Vui lòng chọn ngày và giờ.');
      }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch học</Text>

      <Button mode="outlined" onPress={() => setDatePickerVisible(true)} style={styles.input}>
  {date 
    ? `Ngày: ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}` 
    : 'Chọn ngày'}
</Button>


      <Button mode="outlined" onPress={() => setTimePickerVisible(true)} style={styles.input}>
        {time ? `Giờ: ${time.hours}:${String(time.minutes).padStart(2, '0')}` : 'Chọn giờ'}
      </Button>

      <TextInput
        label="Ghi chú"
        value={notes}
        onChangeText={({notes}) => setNotes(notes)}
        mode="outlined"
        multiline
        numberOfLines={5}
        style={styles.textarea}
      />

      <Button mode="contained" onPress={handleConfirm}>
        Xác nhận
      </Button>

      <DatePickerModal
        locale="vi"
        mode="single"
        visible={datePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        date={date}
        onConfirm={({ date }) => {
          setDate(date);
          setDatePickerVisible(false);
        }}
      />

      <TimePickerModal
        visible={timePickerVisible}
        onDismiss={() => setTimePickerVisible(false)}
        onConfirm={(params) => {
          setTime({ hours: params.hours, minutes: params.minutes });
          setTimePickerVisible(false);
        }}
        hours={14}
        minutes={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  textarea: {
    marginBottom: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default Apointment;
