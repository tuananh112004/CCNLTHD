import AsyncStorage from "@react-native-async-storage/async-storage";

export default (current, action) => {
    switch (action.type) {
        case 'login':
           
            return action.payload;
        case 'logout':
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user-detail');

            return null;
        case 'addCourse':
            return {
                ...state,
                myCourses: [...state.myCourses, action.payload]
              }
    }

    return current;
}