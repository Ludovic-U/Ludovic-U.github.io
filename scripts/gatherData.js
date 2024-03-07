import { createCircle } from "./circleGraph.js";
import { progressGraph } from "./progressGraph.js"

export function GatherData(token){
    console.log("gathering")

    fetch('https://zone01normandie.org/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Si nécessaire
    },
    body: JSON.stringify({
        query: `
        {
            transaction (where: {eventId: {_eq: 148}}){
              id
              amount
              type
              createdAt
              path
              eventId
            }
            
            user {
                groups {
                    group {
                    path
                    status
                    eventId
                    createdAt
                    }
                }  

                attrs
            }
        }
          
        `
    }),
    })
    .then(res => res.json())
    .then(data => {
        let div01xp = 0;
        let lvl = 0;
        let auditDown = 0;
        let auditUp = 0;
        let skills = new Map();
        let finished = 0;
        let progress = [];


        data.data.transaction.forEach(element => {
            switch (element.type){
                case "xp" : div01xp+= element.amount
                let dateformated = element.createdAt.substring(0, 10)
                let tmp = dateformated.split("-")
                dateformated = tmp.join("")
                    progress.push({date: dateformated, amount: element.amount})
                    break;

                case "level" : 
                        lvl++                  
                    break;

                case "up" : auditUp += element.amount                    
                    break;

                case "down" : auditDown += element.amount                    
                    break;
                                    
                default: 
                if (skills.has(element.type)) { 
                    if (skills.get(element.type) <= element.amount) { 
                        skills.set(element.type, element.amount); 
                    }
                } else {
                    skills.set(element.type, element.amount); 
                }
                 

            }
        });
        
         data.data.user.forEach(u => {
            let workingCount = 0
            u.groups.forEach(grp => {
                if (grp.group.eventId == 148){
                    if (grp.group.status == "finished") {
                        finished++
                    } else {
                        let text = grp.group.path.split("/")
                        let newDiv = document.createElement("a")
                        newDiv.href = `https://zone01normandie.org/intra/rouen/div-01/${text[text.length -1]}`
                        newDiv.textContent = text[text.length -1]
                        document.getElementById("working").appendChild(newDiv);
                        workingCount++
                    }
                }
            })
            if (workingCount == 0){
                document.getElementById("working").textContent = "No new project started yet."
            }
         })


         // Print result
         document.getElementById("name").textContent += data.data.user[0].attrs.firstName +" "+ data.data.user[0].attrs.lastName;
         document.getElementById("div01xp").textContent += (div01xp / 1000).toFixed(0) + "k" ;
         document.getElementById("lvl").textContent += lvl ;

         document.getElementById("ratio").textContent += (auditUp / auditDown).toFixed(1) ;
         if (auditDown > auditUp) {
            document.getElementById("lineUp").setAttribute("x2", 100*(auditUp/auditDown));
         } else {
            document.getElementById("lineDown").setAttribute("x2", 100*(auditDown/auditUp));
         }
         if (auditDown>1000000){
            document.getElementById("auditDown").textContent += (auditDown/1000000).toFixed(2) + "Mb" ;
            document.getElementById("auditUp").textContent += (auditUp/1000000).toFixed(2) + "Mb" ; 
         } else if (auditDown>1000){
            document.getElementById("auditDown").textContent += (auditDown/1000).toFixed(2) + "Kb" ;
            document.getElementById("auditUp").textContent += (auditUp/1000).toFixed(2) + "Kb" ; 
         }       
         
         document.getElementById("finished").textContent += finished ;

         createCircle(skills)

         progress.sort((a, b) => a.date - b.date)
         progressGraph(progress, div01xp)

    }
    )
    .catch(error => console.error('Erreur lors de la requête:', error));
}