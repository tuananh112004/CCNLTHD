import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { TextInput, Button, Avatar, Card, Title, Text, ActivityIndicator, IconButton, Appbar, useTheme } from 'react-native-paper';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, serverTimestamp } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { addDoc, serverTimestamp as fsTimestamp } from 'firebase/firestore';
// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBHI91Pupwnx5Sck8M9E7Y1Uskn1ASe6Js",
  authDomain: "courseapp-9ea1e.firebaseapp.com",
  databaseURL: "https://courseapp-9ea1e-default-rtdb.firebaseio.com/",
  projectId: "courseapp-9ea1e",
  storageBucket: "courseapp-9ea1e.appspot.com",
  messagingSenderId: "1093403127439",
  appId: "1:1093403127439:web:09ac3a8d9a20a2f1d60afa",
  measurementId: "G-F6YVGLMCN3"
};

// 👇 Chỉ khởi tạo nếu chưa có app nào
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app); // 👈 Thêm ở đây
import { useContext } from "react";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";

const GroupChatScreen = ({ route, navigation }) => {
  const user = useContext(MyUserContext);
  console.log(route?.params)
  // const { groupId=2 } = route?.params || 2;
  const groupId = route?.params?.groupId ?? 2;



  // const  groupId  = route?.params.courseId || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();
  const theme = useTheme();
  
  console.log("User-curent-chat",user)
  // Lấy thông tin người dùng hiện tại
  const currentUser = auth.currentUser || {
    uid: user.id,
    displayName: user.first_name,
    photoURL: user.avatar
  };



  useEffect(() => {
    const messagesRef = collection(db, 'groups', String(groupId), 'messages');
    console.log("messagesRef", messagesRef)
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => a.timestamp - b.timestamp);
      console.log('messageList', messageList);
      setMessages(messageList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching messages:', error);
      setLoading(false);
    });
  
    return unsubscribe;
  }, [groupId]);


  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
  
    try {
      const messagesRef = collection(db, 'groups',String(groupId), 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userAvatar: currentUser.photoURL,
        timestamp: fsTimestamp(),
      });
      setNewMessage('');
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.userId === currentUser.uid;

    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        {!isCurrentUser && (
          <Avatar.Image 
            size={36} 
            source={item.userAvatar ? { uri: item.userAvatar } : "https://res.cloudinary.com/darr5at86/image/upload/v1745901506/wbrnsevb8n7sc6m4dyro.png"}
            style={styles.avatar}
          />
        )}
        <View style={[
          styles.messageBubble, 
          { backgroundColor: isCurrentUser ? theme.colors.primary : theme.colors.surfaceVariant }
        ]}>
          {!isCurrentUser && (
            <Text style={styles.userName}>{item.userName}</Text>
          )}
          <Text style={{ color: isCurrentUser ? 'white' : theme.colors.onSurfaceVariant }}>
            {item.text}
          </Text>
          <Text style={[
            styles.timestamp, 
            { color: isCurrentUser ? 'rgba(255,255,255,0.7)' : theme.colors.onSurfaceDisabled }
          ]}>
            {item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Đang gửi...'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.messageList}
            contentContainerStyle={{ paddingBottom: 80 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}
  
        <View style={styles.inputWrapper}>
          <TextInput
            mode="outlined"
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Nhập tin nhắn..."
            style={styles.input}
            right={
              <TextInput.Icon
                icon="send"
                onPress={sendMessage}
                disabled={newMessage.trim() === ''}
              />
            }
            onSubmitEditing={sendMessage}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
  
  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  currentUserMessage: {
    justifyContent: 'flex-end',
  },
  otherUserMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    elevation: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 12,
  },
  timestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    padding: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputWrapper: {
    padding: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    backgroundColor: 'white',
  },
});

export default GroupChatScreen;
