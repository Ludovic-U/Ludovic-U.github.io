export function createCircle(skills){

    const nombreDeParties = skills.size;
    const rayonDuCercle = 200;
    const centreX = 200; 
    const centreY = 200; 
    const pointsDeDivision = diviserCercle(nombreDeParties, rayonDuCercle, centreX, centreY);
    console.log(pointsDeDivision);


    let i = 0
    let path = "M "
    skills.forEach((valeur, skill) => {
        addSegment(centreX, centreY, pointsDeDivision[i], skill)

        if (i != 0){
            path += "L "
        }
        path += drawPath(centreX, centreY, pointsDeDivision[i], valeur)
        i++
    });
    addSvg("path", undefined, undefined, undefined, path+"Z")

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
    let directionX = pointExterieur.x - centreX;
    let directionY = pointExterieur.y - centreY;
    let length = Math.sqrt(directionX * directionX + directionY * directionY);
        if (length != 0) {
            directionX /= length;
            directionY /= length;
        }
    for ( let i = 1; i <= 9; i++){        
        let posX = centreX + directionX * (i*20);
        let posY = centreY + directionY * (i*20);

    addSvg("circle", posX, posY)        
    }
                
}

function addSvg(type, x1, y1, pointExt, other){
    let newSvg = document.createElementNS("http://www.w3.org/2000/svg", type)
    
    switch(type){
        case "text":
            newSvg.setAttribute("x", pointExt.x);
            newSvg.setAttribute("y", pointExt.y);
            newSvg.textContent = other.substring(6, other.length)
            break
        case "line":
            newSvg.setAttribute("x1", x1);
            newSvg.setAttribute("x2", pointExt.x);
            newSvg.setAttribute("y1", y1);
            newSvg.setAttribute("y2", pointExt.y);
            break
        case "circle":
            newSvg.setAttribute("cx", x1);
            newSvg.setAttribute("cy", y1);
            newSvg.setAttribute("r", 2);
            break
        case "path":
            newSvg.setAttribute("d", other);
            break
        default : console.log("svg exception")
    }


    document.getElementById("svgWindow").appendChild(newSvg)
}

function drawPath(centreX, centreY, pointExt, value) {
    let directionX = pointExt.x - centreX;
    let directionY = pointExt.y - centreY;
    let length = Math.sqrt(directionX * directionX + directionY * directionY);
        if (length != 0) {
            directionX /= length;
            directionY /= length;
        }      
        let posX = centreX + directionX * (value*2);
        let posY = centreY + directionY * (value*2);
    
    return `${posX} ${posY} `
}

