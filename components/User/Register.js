import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Button, HelperText, TextInput } from "react-native-paper";
import { use, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import Apis, { endpoints } from "../../configs/Apis";
import { useNavigation } from "@react-navigation/native";

import { auth, db  } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, getDocs,setDoc,doc,updateDoc} from 'firebase/firestore'

const Register = () => {
    const info = [{
        label: 'Tên',
        field: 'first_name',
        secureTextEntry: false,
        icon: "text"
    }, {
        label: 'Họ và tên lót',
        field: 'last_name',
        secureTextEntry: false,
        icon: "text"
    }, {
        label: 'Tên đăng nhập',
        field: 'username',
        secureTextEntry: false,
        icon: "account"
    }, {
        label: 'Mật khẩu',
        field: 'password',
        secureTextEntry: true,
        icon: "eye"
    }, {
        label: 'Xác nhận mật khẩu',
        field: 'confirm',
        secureTextEntry: true,
        icon: "eye"
    }];
    const [user, setUser] = useState({});
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();

    const setState = (value, field) => {
        setUser({...user, [field]: value});
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setState(result.assets[0], 'avatar');
        }
    }

    const validate = () => {
        if (Object.values(user).length === 0) {
            setMsg("Vui lòng nhập thông tin!");
            return false;
        }

        for (let i of info)
            if (user[i.field] === '') {
                setMsg(`Vui lòng nhập ${i.label}`);
                return false;
            }

        if (user.password !== user.confirm) {
            setMsg('Mật khẩu không khớp!');
            return false;
        }

        setMsg("");
        return true;
    }

    const register = async () => {
        if (validate() === true) {
            try {
                setLoading(true);
                console.log("lre");
            
                let form = new FormData();
                for (let key in user) {
                    if (key !== 'confirm') {
                        if (key === 'avatar') {
                            const localUri = user.avatar.uri;
                            const filename = localUri.split('/').pop();

                            // Lấy định dạng MIME từ đuôi file (fallback nếu không có sẵn)
                            const match = /\.(\w+)$/.exec(filename || '');
                            const ext = match?.[1];
                            const mimeType = user.avatar.mimeType || (ext ? `image/${ext}` : `image`);

                            console.log('avatar info:', user.avatar);

                            form.append('avatar', {
                                uri: localUri,
                                name: filename || 'avatar.jpg',
                                type: mimeType
                            });
                        } else{
                            form.append(key, user[key]);
                           
                        }

                           
                    }
                }
                form.append('role', 'hoc-vien');
                form.append('is_staff', false);
                form.append('is_superuser', false);
                form.append('email', '');
                console.log(endpoints['register']);
                let res = await Apis.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                createUserWithEmailAndPassword(auth, user.username, user.password).then((userCredential) => {
                    const userFB = userCredential.user;
                    console.log("regis firebase user", user)
                    setDoc(doc(db, "users", userFB.uid), { uid:userFB.uid, email:user.username, name:user.first_name, req:[], realFriend:[], avatar:user.avatar  });
                    updateProfile(userFB, {
                        displayName: userFB.first_name,
                        photoURL: user.avatar ? user.avatar : 'https://robohash.org/default',
                    })
                    }
                )
                





                if (res.status === 201)
                    nav.navigate('login');
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Đăng ký</Text>
                <Text style={styles.headerSubtitle}>Tạo tài khoản mới</Text>
            </View>

            <View style={styles.formContainer}>
                <HelperText type="error" visible={msg} style={styles.errorText}>{msg}</HelperText>

                {info.map(i => (
                    <TextInput
                        key={`Register${i.field}`}
                        value={user[i.field]}
                        onChangeText={t => setState(t, i.field)}
                        label={i.label}
                        style={styles.input}
                        secureTextEntry={i.secureTextEntry}
                        right={<TextInput.Icon icon={i.icon} />}
                        mode="outlined"
                    />
                ))}

                <TouchableOpacity style={styles.avatarButton} onPress={picker}>
                    <Text style={styles.avatarButtonText}>Chọn ảnh đại diện...</Text>
                </TouchableOpacity>

                {user?.avatar && (
                    <Image 
                        source={{uri: user.avatar.uri}} 
                        style={styles.avatarImage} 
                    />
                )}
                
                <Button
                    disabled={loading}
                    loading={loading}
                    onPress={register}
                    mode="contained"
                    style={styles.registerButton}
                    labelStyle={styles.registerButtonText}
                >
                    Đăng ký
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    formContainer: {
        padding: 24,
    },
    errorText: {
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    avatarButton: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007AFF',
        alignItems: 'center',
    },
    avatarButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 16,
    },
    registerButton: {
        marginTop: 8,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#007AFF',
    },
    registerButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Register;