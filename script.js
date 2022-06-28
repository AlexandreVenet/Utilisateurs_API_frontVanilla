"use strict";

let DOMform = document.getElementById('DOMform');
let DOMvalider = document.getElementById('DOMvalider');
let DOMoutput = document.getElementById('DOMoutput');


async function LogMe(emailParam, passeParam)
{
    // const response = await fetch(`http://localhost:3000/login/?email=${email}&passe=${passe}`)
    const response = await fetch('http://localhost:3000/login/?' + new URLSearchParams({email:emailParam, passe:passeParam}))
        .then(res => {
            if (res.ok) 
            {
                return res.json();
            }
            else 
            {
                throw new TypeError("No fetch data");
            }
        })
        .catch(err => "erreur");

    return response;
}


DOMvalider.onclick = (e)=>
{
    e.preventDefault();

    // TESTER LES ENTREES UTILISATEUR

    let email = DOMform.email.value;
    let passe = DOMform.passe.value;

    LogMe(email, passe)
        .then(data => 
            {
                // console.log(data);
                if(data.data == null)
                {
                    DOMoutput.textContent = "Utilisateur inconnu.";
                }
                else
                {
                    DOMoutput.textContent = `Utilisateur trouvé : ${data.data.prenom} ${data.data.nom}.`;
                }
            });
}