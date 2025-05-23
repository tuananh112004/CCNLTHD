// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./components/Home/Home";
// import Lessons from "./components/Home/Lessons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Login from "./components/User/Login";
// import Register from "./components/User/Register";
// import { Icon } from "react-native-paper";
// import CourseDetails from "./components/Home/CourseDetails";
// import { MyDispatchContext, MyUserContext } from "./configs/Contexts";
// import { useContext, useReducer } from "react";
// import MyUserReducer from "./reducers/MyUserReducer";
// import Profile from "./components/User/Profile";
// import MyCourse from "./components/Home/MyCourse"
// import Apointment from "./components/Home/Apointment"
// import Chat from "./components/Home/Chat"
// import InforTeacher from "./components/Home/infoTeacher"


// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';


// const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="home" component={Home} options={{title:"Danh sách khóa học"}} />
//       <Stack.Screen name="lessons" component={Lessons} options={{title: "Danh sách bài học"}} />
//       <Stack.Screen name="course-details" component={CourseDetails} options={{title: "Chi tiết bài học"}} />
//       <Stack.Screen name="apointment" component={Apointment} />
//       <Stack.Screen name="info" component={InforTeacher} />
//       {/* <Stack.Screen name="myCourse" component={MyCourse} options={{title: "My Courses"}} /> */}
//     </Stack.Navigator>
//   );
// }
// const MyCourseStack = createNativeStackNavigator();
// const MyCourseStackScreen = () => (
//   <MyCourseStack.Navigator>
//     <MyCourseStack.Screen name="myCourse" component={MyCourse} />
//     <MyCourseStack.Screen name="lessons" component={Lessons} />
//     <MyCourseStack.Screen name="apointment" component={Apointment} />
//     <MyCourseStack.Screen name="chat" component={Chat} />
   
//   </MyCourseStack.Navigator>
// );
// const Tab = createBottomTabNavigator();
// const TabNavigator = () => {
//   const user = useContext(MyUserContext);

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="index" component={StackNavigator} options={{title: "Khóa học", headerShown:false, tabBarIcon: () => <Icon size={30} source="home" />}} />

//       {user === null?<>
//         <Tab.Screen name="login" component={Login} options={{ title: "Đăng nhập", tabBarIcon: () => <Icon size={30} source="account" />}} />
//         <Tab.Screen name="register" component={Register} options={{title: "Đăng ký", tabBarIcon: () => <Icon size={30} source="account-plus" />}} />
//       </>:<>
//       <Tab.Screen name="profile" component={Profile} options={{title: "Tài khoản", tabBarIcon: () => <Icon size={30} source="account-plus" />}} />
//       <Tab.Screen name="myCourse" component={MyCourseStackScreen} options={{ title: "My Course",tabBarIcon: () => <Icon size={30} source="account-plus" />}} />
//       </>}
      
      
//     </Tab.Navigator>
//   );
// }

// const App = () => {
//   const [user, dispatch] = useReducer(MyUserReducer, null);
 
//   return (
//     <MyUserContext.Provider value={user}>
//       <MyDispatchContext.Provider value={dispatch}>
//         <NavigationContainer>
//           <TabNavigator />
//         </NavigationContainer>
//       </MyDispatchContext.Provider>
//     </MyUserContext.Provider>
    
//   );
// }


// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });


// export default App;

import React, { useContext, useReducer, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import { Platform, Alert } from "react-native";

import Home from "./components/Home/Home";
import Lessons from "./components/Home/Lessons";
import CourseDetails from "./components/Home/CourseDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import MyCourse from "./components/Home/MyCourse";
import Apointment from "./components/Home/Apointment";
import Chat from "./components/Home/Chat";
import InforTeacher from "./components/Home/infoTeacher";

import { MyDispatchContext, MyUserContext } from "./configs/Contexts";
import MyUserReducer from "./reducers/MyUserReducer";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// 🔔 Cấu hình Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MyCourseStack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="home" component={Home} options={{ title: "Danh sách khóa học" }} />
    <Stack.Screen name="lessons" component={Lessons} options={{ title: "Danh sách bài học" }} />
    <Stack.Screen name="course-details" component={CourseDetails} options={{ title: "Chi tiết bài học" }} />
    <Stack.Screen name="apointment" component={Apointment} />
    <Stack.Screen name="info" component={InforTeacher} />
  </Stack.Navigator>
);

const MyCourseStackScreen = () => (
  <MyCourseStack.Navigator>
    <MyCourseStack.Screen name="myCourse" component={MyCourse} />
    <MyCourseStack.Screen name="lessons" component={Lessons} />
    <MyCourseStack.Screen name="apointment" component={Apointment} />
    <MyCourseStack.Screen name="chat" component={Chat} />
  </MyCourseStack.Navigator>
);

const TabNavigator = () => {
  const user = useContext(MyUserContext);

  return (
    <Tab.Navigator>
      <Tab.Screen name="index" component={StackNavigator} options={{ title: "Khóa học", headerShown: false, tabBarIcon: () => <Icon size={30} source="home" /> }} />
      {user === null ? (
        <>
          <Tab.Screen name="login" component={Login} options={{ title: "Đăng nhập", tabBarIcon: () => <Icon size={30} source="account" /> }} />
          <Tab.Screen name="register" component={Register} options={{ title: "Đăng ký", tabBarIcon: () => <Icon size={30} source="account-plus" /> }} />
        </>
      ) : (
        <>
          <Tab.Screen name="profile" component={Profile} options={{ title: "Tài khoản", tabBarIcon: () => <Icon size={30} source="account" /> }} />
          <Tab.Screen name="myCourse" component={MyCourseStackScreen} options={{ title: "My Course", tabBarIcon: () => <Icon size={30} source="book" /> }} />
        </>
      )}
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  // 🔔 Notification logic
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    // Khi nhận thông báo foreground
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("📩 Notification Received:", notification);
    });

    // Khi bấm vào thông báo
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("👉 Notification Tapped:", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};

export default App;

// 🧠 HÀM ĐĂNG KÝ PUSH TOKEN
async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert("Thông báo", "Push notification chỉ hoạt động trên thiết bị thật.");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Thông báo", "Bạn chưa cấp quyền nhận thông báo.");
    return;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  const token = tokenData.data;
  console.log("Expo Push Token:", token);

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
