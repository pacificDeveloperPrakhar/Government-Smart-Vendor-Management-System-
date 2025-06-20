import {createSlice,createAsyncThunk, current} from "@reduxjs/toolkit"
import axios from '../utils/axiosConfigured'
import { axiosInstanceForMultipart } from "../utils/axiosConfigured"

const companyState={
    companies:[],
    company:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
    error:null,
    isLoading:false,
    isAdding:false,
    message:null,
}
export const addCompanyAction = createAsyncThunk("company/add",async(payload,{rejectWithValue,getState,dispatch})=>{
    try {
  
  
        const config = {
          headers: {
            
            "Content-Type": "application/json",
          },
        };
     const { data } = await axiosInstanceForMultipart.post(
       import.meta.env.VITE_company_register,
       payload
     );
     return data;
   } catch (err) {
     if(!err.response)
       return (rejectWithValue( JSON.parse(JSON.stringify(err)),"error was seen"));
       return (rejectWithValue( JSON.parse(JSON.stringify(err.response.data)),"error was seen"));
   }
})

const companySlice=createSlice({
    name:'company',
    initialState:companyState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addCompanyAction.pending,(state,action)=>{
            state.isLoading=true
        }),
        builder.addCase(addCompanyAction.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAdding=true
            state.message={mssg:action.payload,type:'success'}
        }),
        builder.addCase(addCompanyAction.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false
            state.message={mssg:action.payload.mssg,type:'error'}
            state.error=action.payload
        })
    }
})
export default companySlice.reducer