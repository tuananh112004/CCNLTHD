import { useContext, useState } from "react";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useEffect } from "react";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import { 
  Button, 
  Avatar, 
  Divider, 
  Card, 
  Title, 
  Paragraph, 
  List, 
  IconButton, 
  Menu, 
  Appbar 
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Profile4 = ({route}) => {
    const dispatch = useContext(MyDispatchContext);
    const nav = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    const [infoExpanded, setInfoExpanded] = useState(false);
    const [user, setUser] = useState(null);
    console.log("user: ", user)
    const logout = () => {
        dispatch({
            "type": "logout"
        });
        nav.navigate('index');
    };
    const teacherId = route.params?.teacherId;
  const loadUser = async () => {
    try {
      const res = await Apis.get(endpoints['user'](teacherId));
      setUser(res.data);
    } catch (err) {
      console.error('Lỗi khi tải user:', err);
      setError('Không thể tải user.');
    }
  }
 useEffect(() => {
    loadUser();
  }, [teacherId]);
    const handleEditProfile = () => {
        // Điều hướng đến trang chỉnh sửa hồ sơ
        nav.navigate('EditProfile');
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => nav.goBack()} />
                <Appbar.Content title="Hồ sơ cá nhân" />
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Appbar.Action icon="dots-vertical" onPress={() => setMenuVisible(true)} />
                    }
                >
                    <Menu.Item onPress={handleEditProfile} title="Chỉnh sửa hồ sơ" />
                    <Menu.Item onPress={() => nav.navigate('Settings')} title="Cài đặt" />
                    <Divider />
                    <Menu.Item onPress={logout} title="Đăng xuất" />
                </Menu>
            </Appbar.Header>

            <ScrollView style={styles.scrollView}>
                <View style={styles.profileHeader}>
                    <View style={styles.coverImageContainer}>
                        <Image 
                            source={{ uri: user?.coverImage || 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' }} 
                            style={styles.coverImage}
                        />
                    </View>
                    
                    <View style={styles.avatarContainer}>
                        <Avatar.Image 
                            size={100} 
                            source={{ uri: user?.avatar || 'https://i.pravatar.cc/300' }} 
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editAvatarButton} onPress={handleEditProfile}>
                            <Icon name="camera" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.profileInfo}>
                        <Text style={[MyStyles.subject, styles.profileName]}>Chào {user?.first_name +" "+ user?.last_name}!</Text>
                        
                    </View>
                </View>

                <Divider />

                <View style={styles.infoSection}>
                    <List.Item
                        title="Thông tin cá nhân"
                        left={props => <List.Icon {...props} icon="account-details" />}
                        right={props => <List.Icon {...props} icon={infoExpanded ? "chevron-up" : "chevron-down"} />}
                        onPress={() => setInfoExpanded(!infoExpanded)}
                    />
                    {infoExpanded && (
                        <Card style={styles.infoCard}>
                            <Card.Content>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Email:</Text>
                                    <Text style={styles.infoValue}>{user.email || 'Chưa cập nhật'}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Số điện thoại:</Text>
                                    <Text style={styles.infoValue}>{user.phone || 'Chưa cập nhật'}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Ngày tham gia:</Text>
                                    <Text style={styles.infoValue}>{user.joinDate || 'Chưa có thông tin'}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Vai trò:</Text>
                                    <Text style={styles.infoValue}>{user.role || 'Thành viên'}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    )}
                </View>

                <Divider />

                <Divider />

                {/* Phần hiển thị các kết nối
                <List.Section>
                    <List.Subheader>Kết nối của bạn</List.Subheader>
                   
                    <List.Item
                        title="Sự kiện"
                        description={`${user.events || 0} sự kiện`}
                        left={props => <List.Icon {...props} icon="calendar" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => nav.navigate('Events')}
                    />
                </List.Section> */}

                {/* <View style={styles.logoutButtonContainer}>
                    <Button 
                        onPress={logout} 
                        mode="outlined" 
                        style={[MyStyles.m, styles.logoutButton]} 
                        icon="logout"
                    >
                        Đăng xuất
                    </Button>
                </View> */}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>© 2025 - Phiên bản 1.0.0</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    profileHeader: {
        position: 'relative',
        marginBottom: 70,
    },
    coverImageContainer: {
        height: 180,
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    avatarContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: -50,
    },
    avatar: {
        borderWidth: 4,
        borderColor: 'white',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#6200ee',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        paddingTop: 60,
        paddingBottom:60,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    profileName: {
        fontSize: 22,
        marginBottom: 5,
    },
    profileUsername: {
        fontSize: 16,
        color: '#777',
        marginBottom: 8,
    },
    profileBio: {
        alignItems: 'center',
        marginBottom: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: '#777',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    editButton: {
        borderRadius: 25,
        paddingHorizontal: 16,
    },
    shareButton: {
        marginLeft: 8,
    },
    infoSection: {
        backgroundColor: 'white',
        paddingVertical: 8,
    },
    infoCard: {
        margin: 16,
        elevation: 1,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#555',
        flex: 1,
    },
    infoValue: {
        color: '#333',
        flex: 2,
        textAlign: 'right',
    },
    section: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: 'white',
    },
    sectionTitle: {
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
    },
    timeText: {
        fontSize: 12,
        color: '#777',
        marginTop: 8,
    },
    logoutButtonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    logoutButton: {
        width: '70%',
    },
    footer: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    footerText: {
        color: '#777',
    },
});

export default Profile4;