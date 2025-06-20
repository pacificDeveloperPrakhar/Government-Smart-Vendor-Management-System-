import { configureStore } from "@reduxjs/toolkit";
import toast from "./slices/toastSlices.jsx"
import user from "./slices/userSlice.jsx";
import company from "./slices/companySlice.jsx";
import job from "./slices/jobSlice.jsx";
const store=configureStore({
    reducer:{
       user,
       toast,
       company,
       job
    }
})
export default store