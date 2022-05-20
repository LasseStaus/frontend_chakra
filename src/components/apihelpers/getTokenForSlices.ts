import { useSelector } from "react-redux"

export default function GetTokenForSlice() {


    const token = useSelector((state:any) => state.authentication.tokens)

    console.log("token found", token); 
    
}