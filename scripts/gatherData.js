import { createCircle } from "./circleGraph.js";

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
    .then(response => response.json())
    .then(data => {
        let div01xp = 0;
        let lvl = 0;
        let auditDown = 0;
        let auditUp = 0;
        let skills = new Map();
        let finished = 0;


        data.data.transaction.forEach(element => {
            switch (element.type){
                case "xp" : div01xp+= element.amount
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
         document.getElementById("auditDown").textContent += auditDown.toFixed(0) ;
         document.getElementById("auditUp").textContent += auditUp.toFixed(0) ;
         document.getElementById("ratio").textContent += (auditUp / auditDown).toFixed(1) ;
         document.getElementById("finished").textContent += finished ;

         createCircle(skills)
         


    }
    )
    .catch(error => console.error('Erreur lors de la requête:', error));
}