import React, {  useState,useEffect }  from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios'
import { HistoricalChart } from '../config/api';
import SelectButton from '../components/SelectButton';
import {CircularProgress, LinearProgress,createTheme, makeStyles, ThemeProvider} from '@material-ui/core';
import {Line} from 'react-chartjs-2';
import {chartDays} from '../config/data';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

const useStyles = makeStyles((theme)=>({
    container:{
        width :"75%",
        disable:"flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent:'center',
        marginTop:25,
        padding:40,
        [theme.breakpoints.down("md")]:{
            width:'100%',
            marginTop:0,
            padding:20,
            paddingTop:0,
        },

    },
}))

  
const CoinInfo = ({coin}) => {
   
  

    const classes = useStyles();
    const [historicalData, sethistoricalData] = useState();
    const [days,setDays] = useState(1);
    const {currency} =  CryptoState();
   
    const fetchHistoricalData = async()=>{
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
        sethistoricalData(data.prices);
       
    }

    useEffect(() => {
         fetchHistoricalData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency,days])
    
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });
  
    


    if(!historicalData) return <LinearProgress  style={{backgroundColor:"gold"}}/>
  return (
    <ThemeProvider theme={darkTheme}>
        {<div className={classes.container}>
         
        {
        
            !historicalData ? (
                <CircularProgress style={{color:'gold'}} size={250} thickness={1} />

            ):( 
                <>
                {/* {  <Line data={data} /> } */}
                    {<Line data={{
        labels:historicalData.map((coin)=>{
            let date= new Date(coin[0]);
            let time = date.getHours() > 12
             ? `${date.getHours()-12} : ${date.getMinutes()} PM`
             : `${date.getHours()} : ${date.getMinutes()} AM`;

            return days===1? time: date.toLocaleDateString()
        }),

        datasets:[
           { data:  historicalData.map((coin)=>coin[1]),
           label:`Price (Past ${days} Days) in ${currency}`,
           borderColor:'#EEBC1D',
           },

    ]
    }} 
    options={{
        elements:{
            point:{
                radius:1,
            },
        }
    }}

                    /> }
                    <div style={{
                        display: 'flex',
                        marginTop:20,
                        justifyContent: 'space-around',
                        width:"100%",

                    }}>
                        {chartDays.map((day)=> <SelectButton key={day.value}
                            onClick={()=> setDays(day.value)}
                        > {day.label} </SelectButton>)}
                    </div>
                </>
            )
        }
        </div> }
    </ThemeProvider>
  )
}

export default CoinInfo
