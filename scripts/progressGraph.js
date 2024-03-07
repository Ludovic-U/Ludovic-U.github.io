import { addSvg } from "./circleGraph.js";

export function progressGraph(progress, totalXp){
    // draw path
    let months = []
    let path = [{x:0, y:400}]
    let amount = 0
    let wordMonth = ["Jan.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Aout", "Sep.", "Oct.", "Nov.", "Dec."]
    progress.forEach((p)=> {
        if (p.date.substring(0, 6) != months[months.length-1]){
            months.push(p.date.substring(0, 6))
            if (months.length%2 == 0){
                addSvg("svgProgressGraph", "line", (months.length)*62-31, 400, (months.length)*62-31, 0, "even")
            } else {
                addSvg("svgProgressGraph", "line", (months.length)*62-31, 400, (months.length)*62-31, 0, "odd")
            }

            addSvg("svgProgressGraph", "text", undefined, undefined,(months.length-1)*62, 420, wordMonth[parseInt(months[months.length-1].substring(4,6))-1] + "\n" + months[months.length-1].substring(2,4))
            
        }
        path.push({x:(months.length-1)*62+(parseInt(p.date.substring(6,8))*2), y:(100-100*(amount/totalXp))*4})
        amount += p.amount        
        path.push({x:(months.length-1)*62+(parseInt(p.date.substring(6,8))*2), y:(100-100*(amount/totalXp))*4})
    })

    let strPath = "M "
    path.forEach((dot) => {
        if (strPath.length > 2) {
            strPath += "L "
        }
        strPath += `${dot.x} ${dot.y} `
    })
    strPath += `H ${months.length*62} V 400 Z`

    addSvg("svgProgressGraph", "path", undefined, undefined, undefined, undefined, strPath)

    // draw graph base
    addSvg("svgProgressGraph", "line", 0, 0, 0, 400, "baseLine")
    addSvg("svgProgressGraph", "line", 0, 400, 600, 400, "baseLine")    
    for (let i = 100000 ; i < totalXp ; i += 100000){
        let posY = (100-100*(i/totalXp))*4
        addSvg("svgProgressGraph", "line", 0, posY, 600, posY, "nbLine")
        addSvg("svgProgressGraph", "text", undefined, undefined, -35, posY, i/1000)
    }
    
}