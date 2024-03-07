export function createCircle(skills){

    const nombreDeParties = skills.size;
    const rayonDuCercle = 200;
    const centreX = 200; 
    const centreY = 200; 
    const pointsDeDivision = diviserCercle(nombreDeParties, rayonDuCercle, centreX, centreY);



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
    addSvg("svgCircleGraph", "path", undefined, undefined, undefined, undefined, path+"Z")

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

    addSvg("svgCircleGraph", "line", centreX, centreY, pointExterieur.x, pointExterieur.y)
    addSvg("svgCircleGraph", "text", undefined, undefined, pointExterieur.x, pointExterieur.y, skill.substring(6, skill.length))
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

    addSvg("svgCircleGraph", "circle", posX, posY)        
    }
                
}

export function addSvg(destination, type, x1, y1, x2, y2, other){
    let newSvg = document.createElementNS("http://www.w3.org/2000/svg", type)
    
    switch(type){
        case "text":
            newSvg.setAttribute("x", x2);
            newSvg.setAttribute("y", y2);
            newSvg.textContent = other
            break
        case "line":
            newSvg.setAttribute("x1", x1);
            newSvg.setAttribute("x2", x2);
            newSvg.setAttribute("y1", y1);
            newSvg.setAttribute("y2", y2);
            if (other != undefined){
                newSvg.setAttribute("class", other);
            }
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


    document.getElementById(destination).appendChild(newSvg)
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

