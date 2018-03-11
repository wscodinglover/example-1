import React from "react";
import './index.less';

export default class Games extends React.PureComponent {
    state={
        num:1,
        steps:[],
    }
    changeState = (stepArr) => {
        this.setState((prevState)=>{
            console.log('prevState',prevState)
            prevState.num++;
            prevState.steps = prevState.steps.concat(stepArr);
            return prevState
         })
    }

    draw = (e)=>{
        if(e.target.id.indexOf('s')){
            return;
        }
        let i = this.state.num;
        let step ='';
        let stepArr = [];
        let oDiv = document.getElementById(`${e.target.id.substr(1)}`);
        if(oDiv.style.display==="block"){
            return;
        }
        oDiv.style.display="block";
        oDiv.style.width="20px";
        oDiv.style.height="20px";
        oDiv.style.lineHeight="20px";
        oDiv.style.color="blue";
        oDiv.style.borderRadius="50%";
        oDiv.style.margin="0 auto";
        oDiv.style.textAlign="center";
        oDiv.innerHTML=i;
        
        if( i%2 ){
            step = `${i}: 黑棋${e.target.id} `;
            oDiv.style.backgroundColor="#000";
            stepArr.push(step);
            this.changeState(stepArr);
        }else{
            step = `${i}: 白棋${e.target.id} `
            oDiv.style.backgroundColor="#fff";
            stepArr.push(step);
            this.changeState(stepArr);
        }

        this.calc(e.target.id.substr(1));
        
        
    }
    calc = (data) => {
         let calc_data = data.split('-');
        
         let r=calc_data[0]*1;
         let c=calc_data[1]*1;
         let objArr = [
             `${r-4}-${c}#${r-3}-${c}#${r-2}-${c}#${r-1}-${c}#${r}-${c}`,
             `${r-3}-${c}#${r-2}-${c}#${r-1}-${c}#${r}-${c}#${r+1}-${c}`,
             `${r-2}-${c}#${r-1}-${c}#${r}-${c}#${r+1}-${c}#${r+2}-${c}`,
             `${r-1}-${c}#${r}-${c}#${r+1}-${c}#${r+2}-${c}#${r+3}-${c}`,
             `${r}-${c}#${r+1}-${c}#${r+2}-${c}#${r+3}-${c}#${r+4}-${c}`,

             `${r}-${c-4}#${r}-${c-3}#${r}-${c-2}#${r}-${c-1}#${r}-${c}`,
             `${r}-${c-3}#${r}-${c-2}#${r}-${c-1}#${r}-${c}#${r}-${c+1}`,
             `${r}-${c-2}#${r}-${c-1}#${r}-${c}#${r}-${c+1}#${r}-${c+2}`,
             `${r}-${c-1}#${r}-${c}#${r}-${c+1}#${r}-${c+2}#${r}-${c+3}`,
             `${r}-${c}#${r}-${c+1}#${r}-${c+2}#${r}-${c+3}#${r}-${c+4}`,

             `${r-4}-${c-4}#${r-3}-${c-3}#${r-2}-${c-2}#${r-1}-${c-1}#${r}-${c}`,
             `${r-3}-${c-3}#${r-2}-${c-2}#${r-1}-${c-1}#${r}-${c}#${r+1}-${c+1}`,
             `${r-2}-${c-2}#${r-1}-${c-1}#${r}-${c}#${r+1}-${c+1}#${r+2}-${c+2}`,
             `${r-1}-${c-1}#${r}-${c}#${r+1}-${c+1}#${r+2}-${c+2}#${r+3}-${c+3}`,
             `${r}-${c}#${r+1}-${c+1}#${r+2}-${c+2}#${r+3}-${c+3}#${r+4}-${c+4}`,

             `${r-4}-${c+4}#${r-3}-${c+3}#${r-2}-${c+2}#${r-1}-${c+1}#${r}-${c}`,
             `${r-3}-${c+3}#${r-2}-${c+2}#${r-1}-${c+1}#${r}-${c}#${r+1}-${c-1}`,
             `${r-2}-${c+2}#${r-1}-${c+1}#${r}-${c}#${r+1}-${c-1}#${r+2}-${c-2}`,
             `${r-1}-${c+1}#${r}-${c}#${r+1}-${c-1}#${r+2}-${c-2}#${r+3}-${c-3}`,
             `${r}-${c}#${r+1}-${c-1}#${r+2}-${c-2}#${r+3}-${c-3}#${r+4}-${c-4}`,
        ];

        // objArr.map((value,index)=>{
        //     let objStr = value.split('#');
        //     objStr.
        //     return true
        // })
        // let calcArr = [];
        for(let i = 0; i < objArr.length; i++){
            let objStr = objArr[i].split('#');
            let obj1 = document.getElementById(objStr[0]) || 0;
            let obj2 = document.getElementById(objStr[1]) || 0;
            let obj3 = document.getElementById(objStr[2]) || 0;
            let obj4 = document.getElementById(objStr[3]) || 0;
            let obj5 = document.getElementById(objStr[4]) || 0;
            if(obj1===0 || obj2===0 || obj3===0 || obj4===0 || obj5===0){
                // console.log('obj',objStr)
                return;
            }
            
            if(obj1.style.display==="block"&&obj2.style.display==="block"&&obj3.style.display==="block"&&obj4.style.display==="block"&&obj5.style.display==="block"){
               
                if(obj1.style.backgroundColor==="rgb(0, 0, 0)"&&obj2.style.backgroundColor==="rgb(0, 0, 0)"&&obj3.style.backgroundColor==="rgb(0, 0, 0)"&&obj4.style.backgroundColor==="rgb(0, 0, 0)"&&obj5.style.backgroundColor==="rgb(0, 0, 0)"){
                    console.log('黑棋赢',objStr);
                }
                // if(obj1.style.backgroundColor==="rgb(0, 0, 0)"&&obj2.style.backgroundColor==="rgb(0, 0, 0)"&&obj3.style.backgroundColor==="rgb(0, 0, 0)"&&obj4.style.backgroundColor==="rgb(0, 0, 0)"&&obj5.style.backgroundColor==="rgb(0, 0, 0)"){
                //     console.log('白棋赢',objStr);
                // }
            }
            
            // let obj =document.getElementById(objStr[j]);
                // calc.push(obj)
                // if(obj.style.display==="block"){
                //     if(obj.style.backgroundColor==="rgb(0, 0, 0)"){
                //         k++;
                //     }
                //     console.log('k',k)
                // }

            
        }

        
    }

    render() {
        return (
            <div className="game-container">
                <p>当前棋手是:{this.state.num%2 ? '黑色' : '白色'}</p>
                <table className="game-table">
                    <tbody>
                    {
                        [...Array(19).keys()].map((value,index)=>(
                            <tr key={index} className="game-tr">
                                {[...Array(19).keys()].map((v,i)=>(
                                    <td key={i} id={`s${value+1}-${v+1}`} className="game-td" onClick={this.draw}>
                                        <div className="game-td-cell" id={`${value+1}-${v+1}`}></div>
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className="game-steps">
                {
                    this.state.steps.map((val,i)=>(
                        <span className="game-step" key={i}>{val}</span>
                    ))
                }
                </div>
            </div>
        )
    }
}