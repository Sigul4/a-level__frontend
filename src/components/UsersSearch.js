import { Avatar, Card, Paper }  from "@mui/material";
import InputBase                from "@mui/material/InputBase";
import { styled }               from "@mui/material/styles";
import { useEffect, useState }  from "react";
import { useSelector } from "react-redux";
import { Link }                 from "react-router-dom";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function UsersSearch({onChooseNick}){

    const [nick,               setNick] = useState('') 
    const [fieldStatus, setFieldStatus] = useState(false) 
    const [requiredNicknames, setNicknames] = useState('')
    const Nicknames = useSelector(state => state?.promise?.requiredNicknames?.payload)

    useEffect(()=>{
        onChooseNick(nick)
    },[nick])    

    useEffect(()=>{
        setNicknames(Nicknames)
        console.log('requiredNicknames',requiredNicknames)
    },[Nicknames])


    return(
        <div>
            <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e)=>{setNick(e.target.value); }}
            value={nick}
            onFocus={() => {setTimeout(() =>setFieldStatus(!fieldStatus),300)}} 
            onBlur={() => {setTimeout(() => setFieldStatus(!fieldStatus),300)}}
            />

            <Card sx={{maxHeight: 700, overflowY:"scroll", position:"absolute", width: 224}}>
                {fieldStatus && nick? requiredNicknames?.map(user => <>
                    <Paper style={{color:'black',display: 'flex', justifyContent:'space-between', alignItems:'flex-start',margin: 5, padding:5}} elevation={3}>
                        <Link to={`/profile/${user.user_id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
                            <Avatar sx={{ bgcolor: "red[500]" }} alt='' aria-label="recipe" src={`http://hipstagram.node.ed.asmer.org.ua/${user?.avatar?.url}`}></Avatar>
                            <strong><span>{user.user_nick !== null ? user.user_nick.slice(0,15).concat("...") : 'Анонимная парасятина!'}</span></strong>
                        </Link>
                    </Paper>
                </>):''}
            </Card>
        </div>
    )
}
