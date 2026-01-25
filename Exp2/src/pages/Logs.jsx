import logs from './../data/logs';

const Logs = ()=>{
    return(
        <div>
        <div style={{marginLeft: 'auto', backgroundColor: "rgb(250, 232, 111)",marginRight: "auto", maxWidth: "30%", padding: 20,marginBottom: 10, marginTop: 10, borderRadius: 10, borderColor: 'rgb(250, 113, 28)', borderWidth: 2, borderStyle: "solid"}}>
            <h2>HIGH CARBON EMISSION</h2>
            {logs.filter((ele)=>{
                return ele.carbon >= 4; 
            }).map((ele)=> {
                return(
                    <>
                        <h3 style={{color: 'rgb(250, 113, 28)'}}>{ele.activity} {ele.carbon}</h3>
                    </>
                )
            })}
        </div>
        
        <div style={{marginLeft: 'auto', backgroundColor: "rgb(250, 232, 111)",marginRight: "auto", maxWidth: "30%", padding: 20, borderRadius: 10, borderColor: 'rgb(0, 82, 31)', borderWidth: 2, borderStyle: "solid"}}>
            <h2>LOW CARBON EMISSION</h2>
                
            {logs.filter((ele)=>{
                return ele.carbon < 4; 
            }).map((ele)=> {
                return(
                    <>
                        <h3 style={{color: 'rgb(0, 82, 31)'}}>{ele.activity} {ele.carbon}</h3>
                    </>
                )
            })}
        </div>
        
        </div>

    )
}
export default Logs; 