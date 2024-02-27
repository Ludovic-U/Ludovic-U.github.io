export function createCircle(skills){

    const nombreDeParties = skills.size;
    const rayonDuCercle = 200;
    const centreX = 200; 
    const centreY = 200; 
    const pointsDeDivision = diviserCercle(nombreDeParties, rayonDuCercle, centreX, centreY);
    console.log(pointsDeDivision);


    let i = 0
    skills.forEach((valeur, skill) => {
        addSegment(centreX, centreY, pointsDeDivision[i], skill)
        i++
    });

}

function diviserCercle(N, rayon, centreX, centreY) {
    const angleTotal = 2 * Math.PI;
    const angleSegment = angleTotal / N;
    const points = [];
    
    for (let i = 0; i < N; i++) {
        const angle = i * angleSegment;
        const x = centreX + rayon * Math.cos(angle);
        const y = centreY + rayon * Math.sin(angle);
        points.push({ x, y });
    }
    
    return points;
}

function addSegment(centreX, centreY, pointExterieur, skill){

    addSvg("line", centreX, centreY, pointExterieur)
    addSvg("text", undefined, undefined, pointExterieur, skill)
                // let directionX = stat.p_x + stat.player.offsetWidth/2 - enemy.x;
                // let directionY = stat.p_y + stat.player.offsetHeight/2 - enemy.y;
                // let length = Math.sqrt(directionX * directionX + directionY * directionY);
                // if (length != 0) {
                //     directionX /= length;
                //     directionY /= length;
                // }
                // enemy.x += directionX * enemy.speed;
                // enemy.y += directionY * enemy.speed;
}

function addSvg(type, x1, y1, pointExt, other){
    let newSvg = document.createElementNS("http://www.w3.org/2000/svg", type)
    
    switch(type){
        case "text":
            newSvg.setAttribute("x", pointExt.x);
            newSvg.setAttribute("y", pointExt.y);
            newSvg.textContent = other.strip(5)
            break
        case "line":
            newSvg.setAttribute("x1", x1);
            newSvg.setAttribute("x2", pointExt.x);
            newSvg.setAttribute("y1", y1);
            newSvg.setAttribute("y2", pointExt.y);
            break
        case "circle":
            break
        default : console.log("exception")
    }

    newSvg.setAttribute("x1", x1);
    newSvg.setAttribute("x2", pointExt.x);
    newSvg.setAttribute("y1", y1);
    newSvg.setAttribute("y2", pointExt.y);
    // newSvg.setAttribute("stroke-width", 0.75);
    // newSvg.setAttribute("stroke", "rgb(170, 170, 170)");

    document.getElementById("svgWindow").appendChild(newSvg)
}


