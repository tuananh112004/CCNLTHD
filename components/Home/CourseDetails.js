
// import Apis, { authApis, endpoints } from "../../configs/Apis";
// import { useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useContext } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
// import React, { useState, useRef } from 'react';
// import {
//   ScrollView,
//   View,
//   Platform,
//   KeyboardAvoidingView,
//   TextInput as RNTextInput,
//   StyleSheet,
// } from 'react-native';
// import {
//   Card,
//   Title,
//   Paragraph,
//   Button,
//   Text,
//   Divider,
//   IconButton,
//   Avatar,
//   useTheme,
//   List,
// } from 'react-native-paper';

// const COMMENT_INPUT_HEIGHT = 56;



// const LessonDetails = ({ route }) => {

//     const [courseDetails, setCourseDetails] = useState(null);
//     const [loading, setLoading] = useState(true); // Theo dõi trạng thái tải
//     const [error, setError] = useState(null); // Theo dõi lỗi
//     const [lessons, setLessons] = useState([]);
//     const courseId = route.params?.courseId;
//     let course = {}
//     const nav = useNavigation();
//     const user = useContext(MyUserContext);
//     const dispatch = useContext(MyDispatchContext);
//     // console.log('param', route.params);
  
//     const loadLessons = async () => {
//       try {
//         const res = await Apis.get(endpoints['lessons'](courseId));
//         console.log('res', res.data);
//         setLessons(res.data);
//       } catch (err) {
//         console.error('Lỗi khi tải chi tiết khóa học:', err);
//         setError('Không thể tải chi tiết khóa học.');
//       } 
//     }
//     const loadCourseDetails = async () => {
      
//       try {
//         const res = await Apis.get(endpoints['course-detail'](courseId));
//         loadLessons()
//         setCourseDetails(res.data);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false); // Đánh dấu đã xong
//       }
          
       
//     };

  
    

//     useEffect(() => {
//       loadCourseDetails()
      
//     }, [courseId]);
//     console.log('lesson',lessons)
//     console.log('userAdd', user)
//     // console.log('courseId',courseDetails);
//     console.log('courseDetails',courseDetails);
//         const theme = useTheme();
//         const scrollRef = useRef(null);
      
//         // Dữ liệu khóa học
//         const addStudent = async ()=>{
//           const token = await AsyncStorage.getItem('token');
//           console.log('token', token)
//           let u = await authApis(token).post(endpoints['add-student'](courseId));
//           console.info('Add Student',u.data);
      


//         }
      
//         const courseImages = [
//           'https://source.unsplash.com/600x400/?yoga',
//           'https://source.unsplash.com/600x400/?meditation',
//           'https://source.unsplash.com/600x400/?stretching',
//         ];
      
     
      
//         const initialComments = [
//           {
//             id: 1,
//             name: 'Thu Hằng',
//             avatar: 'https://i.pravatar.cc/150?img=7',
//             content: 'Cô giáo dạy rất dễ hiểu và nhiệt tình. Cảm thấy cơ thể nhẹ nhõm hơn nhiều!',
//             time: '3 ngày trước',
//           },
//           {
//             id: 2,
//             name: 'Hoàng Minh',
//             avatar: 'https://i.pravatar.cc/150?img=8',
//             content: 'Bài học được sắp xếp khoa học, phù hợp với người mới. Rất hài lòng!',
//             time: '1 tuần trước',
//           },
//         ];
      
//         // State
//         const [commentText, setCommentText] = useState('');
//         const [commentList, setCommentList] = useState(initialComments);
      
//         // Thêm comment mới
//         const handleSendComment = () => {
//           const text = commentText.trim();
//           if (!text) return;
      
//           const newComment = {
//             id: Date.now(),
//             name: 'Bạn',
//             avatar: 'https://i.pravatar.cc/150?u=me',
//             content: text,
//             time: 'Vừa xong',
//           };
//           setCommentList(prev => [...prev, newComment]);
//           setCommentText('');
      
//           // Cuộn về cuối sau khi thêm
//           setTimeout(() => {
//             scrollRef.current?.scrollToEnd({ animated: true });
//           }, 100);
//         };
      
//         // Render các phần
//         const renderRating = () => {
//           const stars = [];
//           const fullStars = Math.floor(course.rating);
//           const hasHalf = course.rating % 1 >= 0.5;
//           for (let i = 0; i < fullStars; i++) {
//             stars.push(<IconButton key={`f${i}`} icon="star" size={20} iconColor="#FFD700" />);
//           }
//           if (hasHalf) {
//             stars.push(<IconButton key="half" icon="star-half" size={20} iconColor="#FFD700" />);
//           }
//           while (stars.length < 5) {
//             stars.push(<IconButton key={`e${stars.length}`} icon="star-outline" size={20} iconColor="#FFD700" />);
//           }
//           return (
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
//               {stars}
//               <Text>({course.reviewsCount} đánh giá)</Text>
//             </View>
//           );
//         };
      
//         const renderCourseImages = () => (
//           <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Hình ảnh khóa học</Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               {courseImages.map((uri, idx) => (
//                 <Card key={idx} style={{ width: 180, marginRight: 12 }}>
//                   <Card.Cover source={{ uri }} />
//                 </Card>
//               ))}
//             </ScrollView>
//           </View>
//         );
      
//         const renderLessonList = () => (
//           <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Danh sách bài học</Text>
//             {lessons.map((lesson, index) => (
//               <List.Item
//                 key={index}
//                 title={`${index + 1}. ${lesson.title}`}
//                 left={() => <List.Icon icon="play-circle" />}
//               />
//             ))}
//           </View>
//         );
      
//         const renderComments = () => (
//           <View style={{ padding: 16 }}>
//             {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Bình luận học viên</Text>
//             {commentList.map(c => (
//               <View key={c.id} style={{ flexDirection: 'row', marginBottom: 16 }}>
//                 <Avatar.Image size={40} source={{ uri: c.avatar }} />
//                 <View style={{ marginLeft: 10, flex: 1 }}>
//                   <Text style={{ fontWeight: 'bold' }}>{c.name}</Text>
//                   <Paragraph>{c.content}</Paragraph>
//                   <Text style={{ fontSize: 12, color: 'gray' }}>{c.time}</Text>
//                 </View>
//               </View>
//             ))} */}
//           </View>
//         );
      
//         return (
//           <KeyboardAvoidingView
//             style={styles.container}
//             behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             keyboardVerticalOffset={80}
//           >
//             <ScrollView
//               ref={scrollRef}
//               style={styles.scroll}
//               contentContainerStyle={{ paddingBottom: COMMENT_INPUT_HEIGHT + 16 }}
//             >
//               <Card>
//                 <Card.Cover source={{ uri: courseDetails?.image||'Anh' }} />
//                 <Card.Content>
//                   <Title style={{ fontSize: 24, marginTop: 12 }}>{courseDetails?.name||'kdkfnd'}</Title>
//                   {renderRating()}
//                   <Paragraph style={{ fontSize: 16, marginTop: 10 }}>{ courseDetails?.description||'des'}</Paragraph>
//                   <Divider style={{ marginVertical: 12 }} />
//                   <Text style={{ fontSize: 16 }}>
//                     👩‍🏫 Giảng viên: <Text style={{ fontWeight: 'bold' }}>'GV'</Text>
//                   </Text>
//                   <Text style={{ fontSize: 16, marginTop: 4 }}>
//                     🕒 Thời lượng: <Text style={{ fontWeight: 'bold' }}>14</Text> (buổi)
//                   </Text>
//                   <Text style={{ fontSize: 16, marginTop: 4 }}>
//                     📅 Khai giảng: <Text style={{ fontWeight: 'bold' }}>{courseDetails?.start_date||'Ngay bd'}</Text>
//                   </Text>
//                   <Text style={{ fontSize: 16, marginTop: 4 }}>
//                     📅 Ket thuc: <Text style={{ fontWeight: 'bold' }}>{courseDetails?.end_date||'Ngay kt'}</Text>
//                   </Text>
//                 </Card.Content>
//                 <Card.Actions style={{ justifyContent: 'center', marginTop: 10 }}>
//                   <Button
//                     mode="contained"
//                     icon="book-check"
//                     onPress={async () => {
//                       try {
//                         await addStudent(); // đợi API hoàn thành
//                         nav.navigate('lessons', { courseId: courseDetails?.id });
//                       } catch (err) {
//                         console.error('Lỗi khi thêm học viên:', err);
//                         Alert.alert('Lỗi', 'Không thể đăng ký khóa học. Vui lòng thử lại.');
//                       }
//                     }}
                    
//                     contentStyle={{ paddingHorizontal: 20, paddingVertical: 5 }}
//                   >
//                     Đăng ký ngay
//                   </Button>
//                 </Card.Actions>
//               </Card>
      
//               <Divider style={{ marginVertical: 16 }} />
//               {renderCourseImages()}
//               <Divider style={{ marginVertical: 16 }} />
//               {renderLessonList()}
//               <Divider style={{ marginVertical: 16 }} />
//               {renderComments()}
//             </ScrollView>
      
//             {/* Khung nhập bình luận cố định */}
//             <View style={styles.commentInputContainer}>
//               <View style={styles.inputRow}>
//                 <RNTextInput
//                   value={commentText}
//                   onChangeText={setCommentText}
//                   placeholder="Nhập bình luận của bạn..."
//                   style={styles.textInput}
//                 />
//                 <Button icon="send" mode="contained" onPress={handleSendComment}>
//                   Gửi
//                 </Button>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         );
// }











// export default LessonDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     backgroundColor: '#fff',
//   },
//   scroll: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   commentInputContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: COMMENT_INPUT_HEIGHT,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textInput: {
//     flex: 1,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     paddingVertical: Platform.OS === 'ios' ? 12 : 8,
//     marginRight: 8,
//     backgroundColor: '#fafafa',
//   },
// });


// import Apis, { authApis, endpoints } from "../../configs/Apis";
// import { useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useContext } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
// import React, { useState, useRef } from 'react';
// import {
//   ScrollView,
//   View,
//   Platform,
//   KeyboardAvoidingView,
//   TextInput as RNTextInput,
//   StyleSheet,
//   StatusBar,
//   Image,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import {
//   Card,
//   Title,
//   Paragraph,
//   Button,
//   Text,
//   Divider,
//   IconButton,
//   Avatar,
//   useTheme,
//   List,
//   Chip,
//   ActivityIndicator,
// } from 'react-native-paper';

// const { width } = Dimensions.get('window');

// const LessonDetails = ({ route }) => {
//   const [courseDetails, setCourseDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const [enrolling, setEnrolling] = useState(false);
//   const courseId = route.params?.courseId;
//   const nav = useNavigation();
//   const user = useContext(MyUserContext);
//   const theme = useTheme();
//   const scrollRef = useRef(null);

//   const loadLessons = async () => {
//     try {
//       const res = await Apis.get(endpoints['lessons'](courseId));
//       setLessons(res.data);
//     } catch (err) {
//       console.error('Lỗi khi tải danh sách bài học:', err);
//       setError('Không thể tải danh sách bài học.');
//     }
//   }

//   const loadCourseDetails = async () => {
//     try {
//       const res = await Apis.get(endpoints['course-detail'](courseId));
//       setCourseDetails(res.data);
//       await loadLessons();
//     } catch (e) {
//       console.error(e);
//       setError('Không thể tải thông tin chi tiết khóa học.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCourseDetails();
//   }, [courseId]);

//   const addStudent = async () => {
//     try {
//       setEnrolling(true);
//       const token = await AsyncStorage.getItem('token');
//       const u = await authApis(token).post(endpoints['add-student'](courseId));
//       console.info('Add Student', u.data);
//       nav.navigate('lessons', { courseId: courseDetails?.id });
//     } catch (err) {
//       console.error('Lỗi khi thêm học viên:', err);
//       Alert.alert('Lỗi', 'Không thể đăng ký khóa học. Vui lòng thử lại.');
//     } finally {
//       setEnrolling(false);
//     }
//   };

//   // State
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   // const [lessons, setLessons] = useState([]);
//   // const [enrolling, setEnrolling] = useState(false);

//   const handleSendComment = () => {
//     const text = commentText.trim();
//     if (!text) return;

//     const newComment = {
//       id: Date.now(),
//       name: user?.name || 'Bạn',
//       avatar: user?.avatar || 'https://i.pravatar.cc/150?u=me',
//       content: text,
//       time: 'Vừa xong',
//     };
//     setCommentList(prev => [...prev, newComment]);
//     setCommentText('');

//     setTimeout(() => {
//       scrollRef.current?.scrollToEnd({ animated: true });
//     }, 100);
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//         <Text style={styles.loadingText}>Đang tải thông tin khóa học...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <Button mode="contained" onPress={() => loadCourseDetails()}>
//           Thử lại
//         </Button>
//       </View>
//     );
//   }

//   const renderCourseHeader = () => (
//     <View style={styles.headerContainer}>
//       <Image 
//         source={{ uri: courseDetails?.image || 'https://source.unsplash.com/600x400/?education' }} 
//         style={styles.headerImage}
//       />
//       <View style={styles.headerOverlay}>
//         <Title style={styles.headerTitle}>{courseDetails?.name || 'Khóa học'}</Title>
//         <View style={styles.headerInfo}>
//           <View style={styles.instructorChip}>
//             <Avatar.Image 
//               size={28} 
//               source={{ 
//                 uri: courseDetails?.teacher?.avatar || 
                    
//                      'https://i.pravatar.cc/150?u=instructor' 
//               }} 
//             />
//             <Text style={styles.instructorName}>
//               {courseDetails?.teacher?.first_name || 'Giảng viên'}
//             </Text>
//           </View>
//           <Chip icon="clock" style={styles.chip}>
//             {lessons.length} bài học
//           </Chip>
//         </View>
//       </View>
//     </View>
//   );

//   const renderCourseInfo = () => (
//     <Card style={styles.infoCard}>
//       <Card.Content>
//         <View style={styles.infoSection}>
//           <Avatar.Image 
//             size={48} 
//             source={{ 
//               uri: courseDetails?.teacher?.avatar || 
                 
//                    'https://i.pravatar.cc/150?u=instructor' 
//             }} 
//           />
//           <View style={styles.infoText}>
//             <Text style={styles.infoLabel}>Giảng viên</Text>
//             <Text style={styles.infoValue}>
//               {courseDetails?.teacher?.first_name || 'Chưa có thông tin'}
//             </Text>
//           </View>
//         </View>
        
//         <View style={styles.infoSection}>
//           <IconButton icon="calendar-start" size={24} iconColor={theme.colors.primary} />
//           <View style={styles.infoText}>
//             <Text style={styles.infoLabel}>Khai giảng</Text>
//             <Text style={styles.infoValue}>
//               {courseDetails?.start_date || 'Chưa xác định'}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.infoSection}>
//           <IconButton icon="calendar-end" size={24} iconColor={theme.colors.primary} />
//           <View style={styles.infoText}>
//             <Text style={styles.infoLabel}>Kết thúc</Text>
//             <Text style={styles.infoValue}>
//               {courseDetails?.end_date || 'Chưa xác định'}
//             </Text>
//           </View>
//         </View>

//         <Divider style={styles.divider} />
        
//         <Paragraph style={styles.description}>
//           {courseDetails?.description || 'Chưa có mô tả chi tiết.'}
//         </Paragraph>
//       </Card.Content>
//     </Card>
//   );

//   const renderLessonList = () => (
//     <Card style={styles.lessonCard}>
//       <Card.Content>
//         <Title style={styles.sectionTitle}>Danh sách bài học</Title>
//         {lessons.length > 0 ? (
//           lessons.map((lesson, index) => (
//             <List.Item
//               key={index}
//               title={lesson.title}
//               description={lesson.description || `Bài học ${index + 1}`}
//               left={() => (
//                 <View style={styles.lessonNumber}>
//                   <Text style={styles.lessonNumberText}>{index + 1}</Text>
//                 </View>
//               )}
//               right={() => <List.Icon icon="play-circle" />}
//               style={styles.lessonItem}
//             />
//           ))
//         ) : (
//           <Text style={styles.emptyText}>Chưa có bài học nào.</Text>
//         )}
//       </Card.Content>
//     </Card>
//   );

//   const renderComments = () => (
//     <Card style={styles.commentCard}>
//       <Card.Content>
//         <Title style={styles.sectionTitle}>Bình luận</Title>
//         {commentList.length > 0 ? (
//           commentList.map(comment => (
//             <View key={comment.id} style={styles.commentItem}>
//               <Avatar.Image size={40} source={{ uri: comment.avatar }} />
//               <View style={styles.commentContent}>
//                 <Text style={styles.commentAuthor}>{comment.name}</Text>
//                 <Paragraph style={styles.commentText}>{comment.content}</Paragraph>
//                 <Text style={styles.commentTime}>{comment.time}</Text>
//               </View>
//             </View>
//           ))
//         ) : (
//           <Text style={styles.emptyText}>Chưa có bình luận nào. Hãy là người đầu tiên!</Text>
//         )}
//       </Card.Content>
//     </Card>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       keyboardVerticalOffset={80}
//     >
//       <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      
//       <ScrollView
//         ref={scrollRef}
//         style={styles.scroll}
//         contentContainerStyle={{ paddingBottom: 80 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {renderCourseHeader()}
//         {renderCourseInfo()}
//         {renderLessonList()}
//       </ScrollView>

//       {/* Nút đăng ký */}
//       <View style={styles.registerButtonContainer}>
//         <Button
//           mode="contained"
//           icon="book-check"
//           onPress={addStudent}
//           disabled={enrolling}
//           loading={enrolling}
//           contentStyle={styles.registerButton}
//         >
//           {enrolling ? 'Đang đăng ký...' : 'Đăng ký ngay'}
//         </Button>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default LessonDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   scroll: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#666',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   errorText: {
//     fontSize: 16,
//     color: '#e74c3c',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   headerContainer: {
//     position: 'relative',
//     height: 250,
//   },
//   headerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   headerOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 16,
//     background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     textShadowColor: 'rgba(0,0,0,0.75)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 5,
//   },
//   headerInfo: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   chip: {
//     backgroundColor: 'rgba(255,255,255,0.9)',
//   },
//   instructorChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   instructorName: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//   },
//   infoCard: {
//     margin: 16,
//     elevation: 4,
//     borderRadius: 12,
//   },
//   infoSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   infoText: {
//     marginLeft: 16,
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   infoValue: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   divider: {
//     marginVertical: 16,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#555',
//   },
//   lessonCard: {
//     marginHorizontal: 16,
//     marginBottom: 16,
//     elevation: 4,
//     borderRadius: 12,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   lessonNumber: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#e3f2fd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   lessonNumberText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1976d2',
//   },
//   lessonItem: {
//     paddingVertical: 8,
//     paddingHorizontal: 0,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#999',
//     fontSize: 16,
//     padding: 20,
//   },
//   commentCard: {
//     marginHorizontal: 16,
//     marginBottom: 16,
//     elevation: 4,
//     borderRadius: 12,
//   },
//   commentItem: {
//     flexDirection: 'row',
//     marginBottom: 16,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   commentContent: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   commentAuthor: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   commentText: {
//     fontSize: 15,
//     color: '#555',
//     marginBottom: 4,
//   },
//   commentTime: {
//     fontSize: 12,
//     color: '#999',
//   },
//   registerButtonContainer: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     right: 16,
//     backgroundColor: 'transparent',
//   },
//   registerButton: {
//     paddingVertical: 8,
//   },
// });


import Apis, { authApis, endpoints } from "../../configs/Apis";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Platform,
  KeyboardAvoidingView,
  TextInput as RNTextInput,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Alert,
  Pressable,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Divider,
  IconButton,
  Avatar,
  useTheme,
  List,
  Chip,
  ActivityIndicator,
} from 'react-native-paper';

const { width } = Dimensions.get('window');

const LessonDetails = ({ route }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrolling, setEnrolling] = useState(false);
  const courseId = route.params?.courseId;
  const nav = useNavigation();
  const user = useContext(MyUserContext);
  const theme = useTheme();
  const scrollRef = useRef(null);

  const loadLessons = async () => {
    try {
      const res = await Apis.get(endpoints['lessons'](courseId));
      setLessons(res.data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách bài học:', err);
      setError('Không thể tải danh sách bài học.');
    }
  }

  const loadCourseDetails = async () => {
    try {
      const res = await Apis.get(endpoints['course-detail'](courseId));
      setCourseDetails(res.data);
      await loadLessons();
    } catch (e) {
      console.error(e);
      setError('Không thể tải thông tin chi tiết khóa học.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourseDetails();
  }, [courseId]);

  const addStudent = async () => {
    try {
      setEnrolling(true);
      const token = await AsyncStorage.getItem('token');
      const u = await authApis(token).post(endpoints['add-student'](courseId));
      console.info('Add Student', u.data);
      nav.navigate('lessons', { courseId: courseDetails?.id });
    } catch (err) {
      console.error('Lỗi khi thêm học viên:', err);
      Alert.alert('Lỗi', 'Không thể đăng ký khóa học. Vui lòng thử lại.');
    } finally {
      setEnrolling(false);
    }
  };

  // // State
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [lessons, setLessons] = useState([]);
  // const [enrolling, setEnrolling] = useState(false);

  const handleSendComment = () => {
    const text = commentText.trim();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      name: user?.name || 'Bạn',
      avatar: user?.avatar || 'https://i.pravatar.cc/150?u=me',
      content: text,
      time: 'Vừa xong',
    };
    setCommentList(prev => [...prev, newComment]);
    setCommentText('');

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Đang tải thông tin khóa học...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={() => loadCourseDetails()}>
          Thử lại
        </Button>
      </View>
    );
  }

  const renderCourseHeader = () => (
    <View style={styles.headerContainer}>
      <Image 
        source={{ uri: courseDetails?.image || 'https://source.unsplash.com/600x400/?education' }} 
        style={styles.headerImage}
      />
      <View style={styles.headerOverlay}>
        <Title style={styles.headerTitle}>{courseDetails?.name || 'Khóa học'}</Title>
        <View style={styles.headerInfo}>
          <Pressable 
            style={styles.instructorChip}
            onPress={() => nav.navigate('info', { 
              teacherId: courseDetails?.teacher?.id 
            })}
          >
            <Avatar.Image 
              size={28} 
              source={{ 
                uri: courseDetails?.instructor?.avatar || 
                     courseDetails?.instructor_avatar || 
                     'https://i.pravatar.cc/150?u=instructor' 
              }} 
            />
            <Text style={styles.instructorName}>
              {courseDetails?.teacher?.first_name || 'Giảng viên'}
            </Text>
          </Pressable>
          <Chip icon="clock" style={styles.chip}>
            {lessons.length} bài học
          </Chip>
        </View>
      </View>
    </View>
  );

  const renderCourseInfo = () => (
    <Card style={styles.infoCard}>
      <Card.Content>
        <Pressable 
          style={styles.infoSection}
          onPress={() => nav.navigate('profile', { 
              teacherId: courseDetails?.teacher?.id 
            })}
        >
          <Avatar.Image 
            size={48} 
            source={{ 
              uri: courseDetails?.instructor?.avatar || 
                   courseDetails?.instructor_avatar || 
                   'https://i.pravatar.cc/150?u=instructor' 
            }} 
          />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Giảng viên</Text>
            <Text style={styles.infoValue}>
              {courseDetails?.teacher?.first_name || 'Chưa có thông tin'}
            </Text>
          </View>
          <IconButton icon="chevron-right" size={24} iconColor={theme.colors.primary} />
        </Pressable>
        
        <View style={styles.infoSection}>
          <IconButton icon="calendar-start" size={24} iconColor={theme.colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Khai giảng</Text>
            <Text style={styles.infoValue}>
              {courseDetails?.start_date || 'Chưa xác định'}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <IconButton icon="calendar-end" size={24} iconColor={theme.colors.primary} />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Kết thúc</Text>
            <Text style={styles.infoValue}>
              {courseDetails?.end_date || 'Chưa xác định'}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />
        
        <Paragraph style={styles.description}>
          {courseDetails?.description || 'Chưa có mô tả chi tiết.'}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  const renderLessonList = () => (
    <Card style={styles.lessonCard}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Danh sách bài học</Title>
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <List.Item
              key={index}
              title={lesson.title}
              description={lesson.description || `Bài học ${index + 1}`}
              left={() => (
                <View style={styles.lessonNumber}>
                  <Text style={styles.lessonNumberText}>{index + 1}</Text>
                </View>
              )}
              right={() => <List.Icon icon="play-circle" />}
              style={styles.lessonItem}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Chưa có bài học nào.</Text>
        )}
      </Card.Content>
    </Card>
  );

  const renderComments = () => (
    <Card style={styles.commentCard}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Bình luận</Title>
        {commentList.length > 0 ? (
          commentList.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <Avatar.Image size={40} source={{ uri: comment.avatar }} />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{comment.name}</Text>
                <Paragraph style={styles.commentText}>{comment.content}</Paragraph>
                <Text style={styles.commentTime}>{comment.time}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Chưa có bình luận nào. Hãy là người đầu tiên!</Text>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {renderCourseHeader()}
        {renderCourseInfo()}
        {renderLessonList()}
      </ScrollView>

      {/* Nút đăng ký */}
      <View style={styles.registerButtonContainer}>
        <Button
          mode="contained"
          icon="book-check"
          onPress={addStudent}
          disabled={enrolling}
          loading={enrolling}
          contentStyle={styles.registerButton}
        >
          {enrolling ? 'Đang đăng ký...' : 'Đăng ký ngay'}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LessonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  headerInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  instructorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  instructorName: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  infoCard: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  lessonCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  lessonItem: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    padding: 20,
  },
  commentCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentContent: {
    marginLeft: 12,
    flex: 1,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  registerButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'transparent',
  },
  registerButton: {
    paddingVertical: 8,
  },
});