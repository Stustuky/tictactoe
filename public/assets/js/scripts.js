"use strict";

// global
const statut = document.querySelector("h2");
const resultatJ1 = document.querySelector(".scoreJ1");
const resultatJ2 = document.querySelector(".scoreJ2");
const resultatEgal = document.querySelector(".scoreEgal");

let scoreJ1 = 1;
let scoreJ2 = 1;
let scoreEgal = 1;

let jeuActif = true;
let joueurActif = "X"
let etatDuJeu = ["", "", "", "", "", "", "", "", ""];



const conditionDeVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//messages

const win = () => ` Le joueur ${joueurActif} a gagné `;
const egal = () => "Egalité";
const tourJoueur = () => ` C'est au tour du joueur ${joueurActif}`;


statut.innerHTML = tourJoueur();

resultatJ1.innerHTML = " Le joueur X a 0 points.";

resultatJ2.innerHTML = " Le joueur O a 0 points.";

resultatEgal.innerHTML = " Le nombre d'égalité est de 0 points.";



document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClickCase));

document.querySelector("#reset").addEventListener("click", reset);

//fonctions

function gestionClickCase()
{  // recuperation des case au click
    const indexCase = parseInt(this.dataset.index);
    console.log(indexCase);

    if(etatDuJeu[indexCase] !== "" || !jeuActif)
    {
        return;
    }

    etatDuJeu[indexCase]= joueurActif;
    this.innerHTML= joueurActif;
    
    verificationDuGagnant();
}

function verificationDuGagnant()
{
    let gagnant = false;

    for(let conditonVictoire of conditionDeVictoire)
    {
        let val1= etatDuJeu[conditonVictoire[0]];
        let val2= etatDuJeu[conditonVictoire[1]];
        let val3= etatDuJeu[conditonVictoire[2]];

        if(val1 == "" || val2 == "" || val3 == "")
        {
            continue;
        };

        if(val1 == val2 && val2 == val3)
        {
            gagnant= true;
            break;
        };
    }
    if(gagnant)
    {
        statut.innerHTML = win();

        switch (joueurActif) {
            case "X":
                resultatJ1.innerHTML = " Le joueur X a " + scoreJ1++ + " points.";
                console.log(scoreJ1);
                break;
            case "O":
                resultatJ2.innerHTML = " Le joueur O a " + scoreJ2++ + " points.";
                console.log(scoreJ2);
                break;
            default:
                break;
        }
        jeuActif = false;

        return;
    }

    if(!etatDuJeu.includes(""))
    {
        statut.innerHTML= egal();
        resultatEgal.innerHTML = " Le nombre d'égalité est de " + scoreEgal++ + " points.";
        console.log(scoreEgal);
        jeuActif= false;
        return;
    }

    joueurActif = joueurActif == "X" ? "O" : "X";
    statut.innerHTML= tourJoueur();
}

function reset()
{
    jeuActif= "X";
    jeuActif= true;
    etatDuJeu = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML= tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML= "");
}



