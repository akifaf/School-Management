// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/AuthSlice';
import studentReducer from '../redux/StudenSlice';
import subjectReducer from '../redux/SubjectSlice';
import teacherReducer from '../redux/TeacherSlice';
import classroomReducer from '../redux/ClassSlice';
import storage from 'redux-persist/lib/storage';
import teacherDetailReducer from '../redux/TeacherDetailSlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'], // only persist the auth reducer
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  student: studentReducer,
  subject: subjectReducer,
  classroom: classroomReducer,
  teacher: teacherReducer,
  teacherDetail: teacherDetailReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,
            REGISTER],
    },
    }),
});

export default store;

const persistor = persistStore(store);

export { persistor };